// Egy munkatárs adott napi szabad kezdési időpontjait adja vissza, mindegyikhez
// azzal, hány perc fér el onnantól. A kliens ez alapján szűri a szolgáltatásokat.
import { bejelentkezettFelhasznalo } from "@/lib/munkamenet";
import {
  foglalasok,
  tavolletek,
  munkaidok,
  foglalhatoSzolgaltatasok,
} from "@/lib/db";
import {
  szabadResek,
  jeloltIdopontok,
  munkaidoSavKeszites,
  type Idosav,
} from "@/lib/szabad-idopontok";

export async function GET(req: Request) {
  const user = await bejelentkezettFelhasznalo();
  if (!user) {
    return Response.json({ hiba: "Nincs bejelentkezve." }, { status: 401 });
  }

  const url = new URL(req.url);
  const kertStaff = url.searchParams.get("staffId");
  const napSzoveg = url.searchParams.get("nap");
  // szerkesztésnél a saját idősávját ne tekintsük foglaltnak
  const kihagyId = url.searchParams.get("kihagyId");

  if (!napSzoveg) return Response.json({ hiba: "Hiányzó nap." }, { status: 400 });

  const nap = new Date(napSzoveg + "T00:00:00");
  if (Number.isNaN(nap.getTime())) {
    return Response.json({ hiba: "Hibás nap." }, { status: 400 });
  }

  const lathatMindent = user.role === "ADMIN" || user.canViewAll;
  const staffId = lathatMindent ? (kertStaff ?? user.id) : user.id;

  const napVege = new Date(nap);
  napVege.setDate(napVege.getDate() + 1);

  const [lista, tavol, idok, szolgaltatasok] = await Promise.all([
    foglalasok(nap, napVege, staffId),
    tavolletek(nap, napVege, staffId),
    munkaidok(),
    foglalhatoSzolgaltatasok(),
  ]);

  // A lemondott foglalás felszabadítja a sávot; a fizetett és a meg nem
  // jelent viszont ténylegesen elhasználta az időt, ezért foglaltnak számít.
  const foglalt: Idosav[] = lista
    .filter((f) => f.status !== "CANCELLED" && f.id !== kihagyId)
    .map((f) => ({ kezdet: new Date(f.startsAt), veg: new Date(f.endsAt) }));

  for (const t of tavol) {
    foglalt.push({ kezdet: new Date(t.startsAt), veg: new Date(t.endsAt) });
  }

  const napiMunkaido = idok
    .filter((m) => m.staffId === staffId && m.weekday === nap.getDay())
    .map((m) => munkaidoSavKeszites(nap, m.startMinute, m.endMinute));

  const resek = szabadResek(napiMunkaido, foglalt);

  // A legrövidebb KEZELÉS hossza a mérce, nem a blokké. A blokkban lévő
  // átállási idő nem kötelező: ha egy rés pont annyi, mint a kezelés, az
  // időpont felajánlható — csak szünet nem marad utána.
  const legrovidebb = szolgaltatasok.length
    ? Math.min(...szolgaltatasok.map((s) => s.durationMin))
    : 0;

  const ma = new Date();
  const maVan = nap.toDateString() === ma.toDateString();

  const jeloltek = jeloltIdopontok(resek, {
    racsPerc: 30,
    minPerc: legrovidebb,
    nemKorabban: maVan ? ma : undefined,
  });

  return Response.json({
    jeloltek,
    // ha nincs munkaidő aznap, azt külön jelezzük
    vanMunkaido: napiMunkaido.length > 0,
  });
}
