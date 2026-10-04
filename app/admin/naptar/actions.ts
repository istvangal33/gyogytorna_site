"use server";

import { revalidatePath } from "next/cache";
import { bejelentkezettFelhasznalo } from "@/lib/munkamenet";
import {
  foglalhatoSzolgaltatasok,
  vendegRogzitese,
  vendegKereses,
  ervenyesAr,
  vendegKorabbiFoglalasai,
  foglalasMentese,
  foglalasAzonositoval,
  foglalasAllapota,
  foglalasModositasa,
  foglalasTorlese,
  foglalasok,
  tavolletek,
  munkaidok,
  foglalasReszletei,
} from "@/lib/db";
import { foglalasVisszaigazolas, foglalasLemondas } from "@/lib/mail";
import { icsKeszites } from "@/lib/ics";
import { PRAXIS } from "@/lib/praxis";
import {
  szabadResek,
  munkaidoSavKeszites,
  type Idosav,
} from "@/lib/szabad-idopontok";

export type FoglalasEredmeny =
  | { ok: true; id: string; figyelmeztetes?: string }
  | { ok: false; hiba: string };

export type EgyszeruEredmeny =
  | { ok: true; figyelmeztetes?: string }
  | { ok: false; hiba: string };

const ALLAPOTOK = ["BOOKED", "COMPLETED", "CANCELLED", "NO_SHOW"] as const;
export type Allapot = (typeof ALLAPOTOK)[number];

// Közös belépőpont: kiadja a bejelentkezett felhasználót és a jogosultságát.
async function jogosultsag() {
  const user = await bejelentkezettFelhasznalo();
  if (!user) return null;

  return {
    user,
    lathatMindent: user.role === "ADMIN" || user.canViewAll,
    // A foglalás joga független a látástól: lehet valaki, aki mindent lát,
    // de csak magának foglalhat.
    foglalhatMasnak: user.canBookOthers === true,
    admin: user.role === "ADMIN",
  };
}

// Hozzányúlhat-e ehhez a foglaláshoz? Aki nem lát mindent, az csak a sajátjához.
async function sajatjaVagyLathatja(foglalasId: string) {
  const jog = await jogosultsag();
  if (!jog) return { ok: false as const, hiba: "Nincs jogosultság." };

  const foglalas = await foglalasAzonositoval(foglalasId);
  if (!foglalas) return { ok: false as const, hiba: "A foglalás nem található." };

  if (!jog.lathatMindent && foglalas.staffId !== jog.user.id) {
    return { ok: false as const, hiba: "Ehhez a foglaláshoz nincs jogosultságod." };
  }

  return { ok: true as const, jog, foglalas };
}

/**
 * Hány perc szabad ettől a kezdéstől a rés végéig? null, ha a kezdés nem esik
 * szabad résbe (például munkaidőn kívül van, kézi megadásnál).
 *
 * A kliens által küldött értékben nem bízunk: a hosszt itt számoljuk újra.
 */
async function szabadHely(staffId: string, kezdet: Date, kihagyId: string | null) {
  const napKezd = new Date(kezdet);
  napKezd.setHours(0, 0, 0, 0);
  const napVeg = new Date(napKezd);
  napVeg.setDate(napVeg.getDate() + 1);

  const [lista, tavol, idok] = await Promise.all([
    foglalasok(napKezd, napVeg, staffId),
    tavolletek(napKezd, napVeg, staffId),
    munkaidok(),
  ]);

  const foglalt: Idosav[] = lista
    .filter((f) => f.status !== "CANCELLED" && f.id !== kihagyId)
    .map((f) => ({ kezdet: new Date(f.startsAt), veg: new Date(f.endsAt) }));

  for (const t of tavol) {
    foglalt.push({ kezdet: new Date(t.startsAt), veg: new Date(t.endsAt) });
  }

  const napiMunkaido = idok
    .filter((m) => m.staffId === staffId && m.weekday === napKezd.getDay())
    .map((m) => munkaidoSavKeszites(napKezd, m.startMinute, m.endMinute));

  const res = szabadResek(napiMunkaido, foglalt).find(
    (r) => kezdet >= r.kezdet && kezdet < r.veg
  );

  return res ? Math.floor((+res.veg - +kezdet) / 60000) : null;
}

/**
 * A naptárban elfoglalt hossz. Alapesetben a szolgáltatás blokkja, de ha a rés
 * ennél szűkebb, ráhúzzuk a résre: az átállási idő elhagyható, a kezelés nem.
 */
function blokkHossza(
  szolgaltatas: { durationMin: number; blockMin: number },
  hely: number | null
): { ok: true; perc: number } | { ok: false; hiba: string } {
  if (hely === null) return { ok: true, perc: szolgaltatas.blockMin };

  if (hely < szolgaltatas.durationMin) {
    return {
      ok: false,
      hiba: `Ebbe a résbe csak ${hely} perc fér, a kezelés viszont ${szolgaltatas.durationMin} perces.`,
    };
  }

  return { ok: true, perc: Math.min(szolgaltatas.blockMin, hely) };
}

/**
 * Értesíti a vendéget a foglalásáról, naptármeghívóval együtt.
 *
 * A küldés hibája soha nem buktatja el a foglalást: a foglalás a fontos, a
 * levél csak kényelem. A hibát naplózzuk, és visszaadjuk, hogy a felület
 * jelezhesse.
 */
async function vendegErtesitese(
  foglalasId: string,
  fajta: "uj" | "modositas" | "lemondas",
  sorszam = 0
): Promise<string | undefined> {
  try {
    const f = await foglalasReszletei(foglalasId);
    if (!f) return "A foglalás adatai nem olvashatók, értesítés nem ment ki.";

    // E-mail cím nélküli vendégnek nincs hova küldeni. Új foglalásnál ez
    // magától értetődő — a rögzítő épp most hagyta üresen. Módosításnál és
    // lemondásnál viszont szólni kell: a vendég ilyenkor NEM tudja meg, hogy
    // az időpontja megváltozott vagy elmaradt, és telefonon kell értesíteni.
    if (!f.vendeg_email) {
      if (fajta === "uj") return undefined;
      return fajta === "lemondas"
        ? "A vendégnek nincs e-mail címe, a lemondásról nem kapott értesítést — hívd fel."
        : "A vendégnek nincs e-mail címe, a módosításról nem kapott értesítést — hívd fel.";
    }

    const kezdet = new Date(f.startsAt);
    const veg = new Date(f.endsAt);

    const ics = icsKeszites({
      uid: `foglalas-${foglalasId}@restartphysio.hu`,
      kezdet,
      veg,
      cim: `${f.szolgaltatas} – ${PRAXIS.nev}`,
      leiras: `Kollégánk: ${f.munkatars}`,
      helyszin: PRAXIS.helyszin,
      szervezoNev: PRAXIS.nev,
      szervezoEmail: PRAXIS.email,
      vendegNev: f.vendeg,
      vendegEmail: f.vendeg_email,
      sorszam,
      lemondas: fajta === "lemondas",
    });

    const adat = {
      vendegNev: f.vendeg,
      vendegEmail: f.vendeg_email,
      szolgaltatas: f.szolgaltatas,
      kezdet,
      veg,
      munkatars: f.munkatars,
      ar: f.price,
      helyszin: PRAXIS.helyszin,
      terkep: PRAXIS.terkep,
      megjegyzes: f.notes,
      ics,
    };

    const eredmeny =
      fajta === "lemondas"
        ? await foglalasLemondas(adat)
        : await foglalasVisszaigazolas(adat, fajta === "modositas");

    if (!eredmeny.ok) {
      console.error("[foglalás] vendégértesítés sikertelen:", eredmeny.hiba);
      return "A foglalás elmentve, de a vendégnek szóló levél nem ment ki.";
    }

    return undefined;
  } catch (err) {
    console.error("[foglalás] vendégértesítés hiba:", err);
    return "A foglalás elmentve, de a vendégnek szóló levél nem ment ki.";
  }
}

export async function ujFoglalas(adat: {
  vendegNev: string;
  vendegEmail: string;
  vendegTelefon: string;
  serviceId: string;
  staffId: string;
  kezdet: string;
  megjegyzes: string;
  ertesites?: boolean;
}): Promise<FoglalasEredmeny> {
  const jog = await jogosultsag();
  if (!jog) return { ok: false, hiba: "Nincs jogosultság." };

  const nev = adat.vendegNev.trim();
  // Az e-mail cím nem kötelező: belső rendszer, a legtöbb páciensé nincs meg.
  // Enélkül a foglalás létrejön, csak levél nem megy róla.
  const email = adat.vendegEmail.trim().toLowerCase() || null;

  if (!nev) return { ok: false, hiba: "A vendég neve kötelező." };
  if (email && !email.includes("@")) {
    return { ok: false, hiba: "Az e-mail cím hibás. Hagyd üresen, ha nincs meg." };
  }
  if (!adat.serviceId) return { ok: false, hiba: "Válassz szolgáltatást." };
  if (!adat.staffId) return { ok: false, hiba: "Válassz munkatársat." };

  const kezdet = new Date(adat.kezdet);
  if (Number.isNaN(kezdet.getTime())) return { ok: false, hiba: "Hibás időpont." };

  if (!jog.foglalhatMasnak && adat.staffId !== jog.user.id) {
    return { ok: false, hiba: "Csak magadnak vihetsz fel foglalást." };
  }

  const szolgaltatasok = await foglalhatoSzolgaltatasok();
  const szolgaltatas = szolgaltatasok.find((s) => s.id === adat.serviceId);
  if (!szolgaltatas) return { ok: false, hiba: "Ismeretlen szolgáltatás." };

  const hely = await szabadHely(adat.staffId, kezdet, null);
  const blokk = blokkHossza(szolgaltatas, hely);
  if (!blokk.ok) return { ok: false, hiba: blokk.hiba };

  const veg = new Date(kezdet.getTime() + blokk.perc * 60000);

  const telefon = adat.vendegTelefon.trim() || null;

  const meglevo = await vendegKereses(nev, email, telefon);
  const korabbiak = meglevo ? await vendegKorabbiFoglalasai(meglevo.id) : 0;

  const vendeg = await vendegRogzitese(nev, email, telefon);

  const uzenetek: string[] = [];

  if (korabbiak === 0 && szolgaltatas.durationMin < 50) {
    uzenetek.push(
      "Ez a vendég most jár először, az árlista szerint viszont az első alkalom csak 50 perces lehet."
    );
  }

  // Csak akkor szólunk, ha a név tényleg kétértelmű: több azonos nevű vendég
  // van, és sem e-mail, sem telefonszám nem döntötte el, melyikükről van szó.
  // Egyértelmű névnél hallgatunk — különben minden visszatérő vendégnél
  // felvillanna, és épp azt tanítaná meg, hogy ne olvassák el.
  if (!vendeg.ujVendeg && !email && !telefon && meglevo?.tobbAzonosNevu) {
    uzenetek.push(
      `Több "${vendeg.name}" nevű vendég is van. Ez ${korabbiak} korábbi ` +
        `foglalással rendelkezőhöz került — ha nem ő az, adj meg telefonszámot.`
    );
  }

  let figyelmeztetes: string | undefined = uzenetek.join(" ") || undefined;

  try {
    const id = await foglalasMentese({
      clientId: vendeg.id,
      serviceId: szolgaltatas.id,
      staffId: adat.staffId,
      kezdet,
      veg,
      createdById: jog.user.id,
      megjegyzes: adat.megjegyzes.trim() || null,
      // A munkatársra érvényes akkori ár rögzül a foglaláson: egy későbbi
      // áremelés nem írja át visszamenőleg az előzményeket.
      ar: await ervenyesAr(adat.staffId, szolgaltatas.id, szolgaltatas.price),
    });

    if (adat.ertesites !== false) {
      const levelHiba = await vendegErtesitese(id, "uj");
      if (levelHiba) figyelmeztetes = [figyelmeztetes, levelHiba].filter(Boolean).join(" ");
    }

    revalidatePath("/admin/naptar");
    return { ok: true, id, figyelmeztetes };
  } catch (err) {
    if ((err as { code?: string }).code === "23P01") {
      return { ok: false, hiba: "Ebben az idősávban már van foglalása ennek a munkatársnak." };
    }
    console.error("[foglalás] mentés sikertelen:", err);
    return { ok: false, hiba: "A foglalást nem sikerült menteni." };
  }
}

export async function allapotValtas(
  foglalasId: string,
  allapot: Allapot
): Promise<EgyszeruEredmeny> {
  if (!ALLAPOTOK.includes(allapot)) return { ok: false, hiba: "Ismeretlen állapot." };

  const ell = await sajatjaVagyLathatja(foglalasId);
  if (!ell.ok) return { ok: false, hiba: ell.hiba };

  try {
    const sikeres = await foglalasAllapota(foglalasId, allapot);
    if (!sikeres) return { ok: false, hiba: "A foglalás nem található." };

    // Lemondásról értesítjük a vendéget, a többi állapotváltás belső ügy.
    // Ha a levél nem megy ki, azt meg kell tudni: a vendég ilyenkor nem
    // értesül róla, hogy az időpontja elmaradt.
    let levelHiba: string | undefined;
    if (allapot === "CANCELLED") {
      levelHiba = await vendegErtesitese(foglalasId, "lemondas", 2);
    }

    revalidatePath("/admin/naptar");
    return { ok: true, figyelmeztetes: levelHiba };
  } catch (err) {
    // visszaállításnál ütközhet egy időközben felvett másik foglalással
    if ((err as { code?: string }).code === "23P01") {
      return {
        ok: false,
        hiba: "Az idősávot időközben lefoglalták, ezért nem állítható vissza foglaltra.",
      };
    }
    console.error("[foglalás] állapotváltás sikertelen:", err);
    return { ok: false, hiba: "Az állapotot nem sikerült módosítani." };
  }
}

export async function foglalasSzerkesztes(adat: {
  id: string;
  serviceId: string;
  staffId: string;
  kezdet: string;
  megjegyzes: string;
  ertesites?: boolean;
}): Promise<EgyszeruEredmeny> {
  const ell = await sajatjaVagyLathatja(adat.id);
  if (!ell.ok) return { ok: false, hiba: ell.hiba };

  const kezdet = new Date(adat.kezdet);
  if (Number.isNaN(kezdet.getTime())) return { ok: false, hiba: "Hibás időpont." };

  if (!ell.jog.foglalhatMasnak && adat.staffId !== ell.jog.user.id) {
    return { ok: false, hiba: "Csak magadhoz rakhatod át a foglalást." };
  }

  const szolgaltatasok = await foglalhatoSzolgaltatasok();
  const szolgaltatas = szolgaltatasok.find((s) => s.id === adat.serviceId);
  if (!szolgaltatas) return { ok: false, hiba: "Ismeretlen szolgáltatás." };

  const hely = await szabadHely(adat.staffId, kezdet, adat.id);
  const blokk = blokkHossza(szolgaltatas, hely);
  if (!blokk.ok) return { ok: false, hiba: blokk.hiba };

  const veg = new Date(kezdet.getTime() + blokk.perc * 60000);

  try {
    const sikeres = await foglalasModositasa(adat.id, {
      serviceId: szolgaltatas.id,
      staffId: adat.staffId,
      kezdet,
      veg,
      megjegyzes: adat.megjegyzes.trim() || null,
      // Szolgáltatás- vagy munkatársváltáskor újraszámoljuk: a foglalás
      // ahhoz a munkatárshoz tartozó mostani árat kapja.
      ar: await ervenyesAr(adat.staffId, szolgaltatas.id, szolgaltatas.price),
    });
    if (!sikeres) return { ok: false, hiba: "A foglalás nem található." };

    let levelHiba: string | undefined;
    if (adat.ertesites !== false) {
      // a sorszám növelése kell, hogy a naptárak frissítsék a meglévő bejegyzést
      levelHiba = await vendegErtesitese(adat.id, "modositas", 1);
    }

    revalidatePath("/admin/naptar");
    return { ok: true, figyelmeztetes: levelHiba };
  } catch (err) {
    if ((err as { code?: string }).code === "23P01") {
      return { ok: false, hiba: "Ebben az idősávban már van foglalása ennek a munkatársnak." };
    }
    console.error("[foglalás] módosítás sikertelen:", err);
    return { ok: false, hiba: "A módosítást nem sikerült menteni." };
  }
}

// A törlés végleges, ezért adminra korlátozzuk. A szokásos művelet a lemondás,
// ami megtartja a rekordot, de felszabadítja az idősávot.
export async function foglalasTorles(foglalasId: string): Promise<EgyszeruEredmeny> {
  const jog = await jogosultsag();
  if (!jog) return { ok: false, hiba: "Nincs jogosultság." };
  if (!jog.admin) {
    return { ok: false, hiba: "Törölni csak adminisztrátor tud. Lemondani viszont te is." };
  }

  const sikeres = await foglalasTorlese(foglalasId);
  if (!sikeres) return { ok: false, hiba: "A foglalás nem található." };

  revalidatePath("/admin/naptar");
  return { ok: true };
}
