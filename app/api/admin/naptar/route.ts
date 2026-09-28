// A naptár adatait adja vissza. A láthatóságot itt döntjük el, nem a
// kliensen: az alkalmazott a kérés paramétereivel sem tud más foglalásaihoz
// hozzáférni, ha nincs rá joga.
import { bejelentkezettFelhasznalo } from "@/lib/munkamenet";
import {
  foglalasok,
  tavolletek,
  munkatarsak,
  munkaidok,
} from "@/lib/db";

export async function GET(req: Request) {
  // A canViewAll értékét mindig az adatbázisból nézzük, nem a tokenből: így az
  // admin átállítása azonnal érvényes, újbóli belépés nélkül. Ugyanez a hívás
  // ejti ki a jelszóváltás előtt nyitott munkameneteket is.
  const user = await bejelentkezettFelhasznalo();
  if (!user) {
    return Response.json({ hiba: "Nincs bejelentkezve." }, { status: 401 });
  }

  const url = new URL(req.url);
  const kezdet = new Date(url.searchParams.get("kezdet") ?? "");
  const veg = new Date(url.searchParams.get("veg") ?? "");

  if (Number.isNaN(kezdet.getTime()) || Number.isNaN(veg.getTime())) {
    return Response.json({ hiba: "Hibás időszak." }, { status: 400 });
  }

  const lathatMindent = user.role === "ADMIN" || user.canViewAll;

  // aki nem lát mindent, az kizárólag a sajátját kapja — a kérés paramétere
  // ezen nem változtat
  const staffSzuro = lathatMindent ? null : user.id;

  const [lista, tavol, osszesMunkatars, idok] = await Promise.all([
    foglalasok(kezdet, veg, staffSzuro),
    tavolletek(kezdet, veg, staffSzuro),
    munkatarsak(),
    munkaidok(),
  ]);

  // Csak azok kapnak oszlopot, akiknek a kért időszakban van munkaidejük vagy
  // foglalásuk. Így nem lóg be üres oszlop olyan fióktól, aki nem fogad vendéget
  // — és ehhez nem kell inaktiválni a felhasználót, ami a belépését is elvenné.
  //
  // Az időszak egy nap (napi nézet) vagy egy hét (heti nézet) is lehet, ezért
  // az összes érintett hétköznapot összeszedjük. A napok számát kerekítjük: az
  // óraátállítás napja 23 vagy 25 órás, ott a puszta osztás elcsúszna.
  const napokSzama = Math.max(
    1,
    Math.round((veg.getTime() - kezdet.getTime()) / 86_400_000)
  );
  const erintettNapok = new Set<number>();
  for (let i = 0; i < napokSzama; i++) {
    const d = new Date(kezdet);
    d.setDate(d.getDate() + i);
    erintettNapok.add(d.getDay());
  }

  const dolgozikMa = new Set(
    idok.filter((m) => erintettNapok.has(m.weekday)).map((m) => m.staffId)
  );
  const vanFoglalasa = new Set(lista.map((f) => f.staff_id));

  const szurt = osszesMunkatars.filter(
    (m) => dolgozikMa.has(m.id) || vanFoglalasa.has(m.id)
  );

  const alap = szurt.length > 0 ? szurt : osszesMunkatars;

  // A bejelentkezett felhasználó mindig szerepeljen, akkor is, ha aznap nem
  // dolgozik — különben nem tudna magának foglalást felvinni arra a napra.
  const sajatBenne = alap.some((m) => m.id === user.id);
  const teljes = sajatBenne
    ? alap
    : [...alap, osszesMunkatars.find((m) => m.id === user.id)].filter(Boolean);

  const lathatoMunkatarsak = lathatMindent
    ? (teljes as typeof alap).map((m) => ({ id: m.id, nev: m.name }))
    : [{ id: user.id, nev: user.name }];

  return Response.json({
    lathatMindent,
    munkatarsak: lathatoMunkatarsak,
    foglalasok: lista.map((f) => ({
      id: f.id,
      staffId: f.staff_id,
      kezdet: f.startsAt,
      veg: f.endsAt,
      vendeg: f.vendeg,
      email: f.vendeg_email,
      telefon: f.vendeg_telefon,
      serviceId: f.serviceId,
      szolgaltatas: f.szolgaltatas,
      ar: f.price,
      allapot: f.status,
      megjegyzes: f.notes,
    })),
    tavolletek: tavol.map((t) => ({
      id: t.id,
      staffId: t.staffId,
      kezdet: t.startsAt,
      veg: t.endsAt,
      ok: t.reason,
    })),
  });
}
