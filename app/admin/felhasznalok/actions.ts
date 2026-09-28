"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { bejelentkezettFelhasznalo } from "@/lib/munkamenet";
import {
  felhasznaloAzonositoval,
  ujFelhasznalo,
  felhasznaloLathatMindent,
  felhasznaloFoglalhatMasnak,
  felhasznaloAktiv,
  aktivAdminokSzama,
  getUserByEmail,
  ujVisszaallitoToken,
} from "@/lib/db";
import { fiokMeghivoLevel } from "@/lib/mail";
import { ujToken, lejaratIdopont, TOKEN_ELETTARTAM_PERC } from "@/lib/password-reset";

export type Eredmeny = { ok: true; uzenet: string } | { ok: false; hiba: string };

const SZEREPEK = ["ADMIN", "EMPLOYEE"] as const;
export type Szerep = (typeof SZEREPEK)[number];

// Minden művelet adminhoz kötött.
async function adminJog() {
  const user = await bejelentkezettFelhasznalo();
  if (!user || user.role !== "ADMIN") return null;

  return user;
}

// Éles környezetben a NEXT_PUBLIC_SITE_URL a megbízható forrás — a Host
// fejlécet a kérés küldője állítja be, arra nem hagyatkozhatunk.
async function alapCim() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  const h = await headers();
  const proto = h.get("x-forwarded-proto") ?? "http";
  return `${proto}://${h.get("host")}`;
}

async function meghivoKuldes(userId: string, nev: string, email: string) {
  const { token, lenyomat } = ujToken();
  await ujVisszaallitoToken(userId, lenyomat, lejaratIdopont());

  const link = `${await alapCim()}/admin/uj-jelszo?token=${token}`;
  const eredmeny = await fiokMeghivoLevel(email, nev, link, TOKEN_ELETTARTAM_PERC);

  if (!eredmeny.ok) {
    console.error("[felhasználó] meghívó nem ment ki:", eredmeny.hiba);
    // Fejlesztés alatt a linket a konzolra írjuk, hogy tesztelhető legyen.
    if (process.env.NODE_ENV === "development") {
      console.warn(`[felhasználó] a ${email} címre szóló link:\n${link}`);
    }
  }

  return eredmeny.ok;
}

export async function ujMunkatars(adat: {
  nev: string;
  email: string;
  szerep: Szerep;
}): Promise<Eredmeny> {
  const admin = await adminJog();
  if (!admin) return { ok: false, hiba: "Ehhez adminisztrátori jog kell." };

  const nev = adat.nev.trim();
  const email = adat.email.trim().toLowerCase();

  if (!nev) return { ok: false, hiba: "A név kötelező." };
  if (!email.includes("@")) return { ok: false, hiba: "Adj meg érvényes e-mail címet." };
  if (!SZEREPEK.includes(adat.szerep)) return { ok: false, hiba: "Ismeretlen szerepkör." };

  const letezik = await getUserByEmail(email);
  if (letezik) return { ok: false, hiba: "Ezzel az e-mail címmel már van felhasználó." };

  try {
    const user = await ujFelhasznalo(nev, email, adat.szerep);
    const kiment = await meghivoKuldes(user.id, nev, email);

    revalidatePath("/admin/felhasznalok");
    return {
      ok: true,
      uzenet: kiment
        ? `${nev} létrehozva, a jelszó-beállító linket elküldtük a ${email} címre.`
        : `${nev} létrehozva, de a meghívó levelet nem sikerült elküldeni. Küldd újra, vagy ellenőrizd az e-mail beállítást.`,
    };
  } catch (err) {
    console.error("[felhasználó] létrehozás sikertelen:", err);
    return { ok: false, hiba: "A felhasználót nem sikerült létrehozni." };
  }
}

export async function meghivoUjrakuldes(userId: string): Promise<Eredmeny> {
  const admin = await adminJog();
  if (!admin) return { ok: false, hiba: "Ehhez adminisztrátori jog kell." };

  const user = await felhasznaloAzonositoval(userId);
  if (!user) return { ok: false, hiba: "A felhasználó nem található." };
  if (!user.active) return { ok: false, hiba: "Inaktív felhasználónak nem küldünk linket." };

  const kiment = await meghivoKuldes(user.id, user.name, user.email);
  return kiment
    ? { ok: true, uzenet: `Jelszó-beállító link elküldve a ${user.email} címre.` }
    : { ok: false, hiba: "A levelet nem sikerült elküldeni." };
}

/**
 * Ez a kapcsoló dönti el, hogy az alkalmazott csak a saját foglalásait látja-e,
 * vagy mindenkiét. Adminra nincs hatása: ő mindig mindent lát.
 */
export async function lathatosagValtas(userId: string, ertek: boolean): Promise<Eredmeny> {
  const admin = await adminJog();
  if (!admin) return { ok: false, hiba: "Ehhez adminisztrátori jog kell." };

  const user = await felhasznaloAzonositoval(userId);
  if (!user) return { ok: false, hiba: "A felhasználó nem található." };

  if (user.role === "ADMIN") {
    return { ok: false, hiba: "Adminisztrátor mindig mindent lát, ezt nem lehet korlátozni." };
  }

  const sikeres = await felhasznaloLathatMindent(userId, ertek);
  if (!sikeres) return { ok: false, hiba: "A módosítás nem sikerült." };

  revalidatePath("/admin/felhasznalok");
  revalidatePath("/admin/naptar");

  return {
    ok: true,
    uzenet: ertek
      ? `${user.name} mostantól minden munkatárs foglalását látja.`
      : `${user.name} mostantól csak a saját foglalásait látja.`,
  };
}

/**
 * Ez a kapcsoló dönti el, hogy a felhasználó felvihet-e foglalást más
 * munkatárs nevében, vagy csak a sajátjába. Alapból senki nem teheti.
 */
export async function foglalasJogValtas(userId: string, ertek: boolean): Promise<Eredmeny> {
  const admin = await adminJog();
  if (!admin) return { ok: false, hiba: "Ehhez adminisztrátori jog kell." };

  const user = await felhasznaloAzonositoval(userId);
  if (!user) return { ok: false, hiba: "A felhasználó nem található." };

  const sikeres = await felhasznaloFoglalhatMasnak(userId, ertek);
  if (!sikeres) return { ok: false, hiba: "A módosítás nem sikerült." };

  revalidatePath("/admin/felhasznalok");
  revalidatePath("/admin/naptar");

  return {
    ok: true,
    uzenet: ertek
      ? `${user.name} mostantól bárkinek vihet fel foglalást.`
      : `${user.name} mostantól csak magának vihet fel foglalást.`,
  };
}

export async function aktivValtas(userId: string, ertek: boolean): Promise<Eredmeny> {
  const admin = await adminJog();
  if (!admin) return { ok: false, hiba: "Ehhez adminisztrátori jog kell." };

  if (userId === admin.id && !ertek) {
    return { ok: false, hiba: "A saját fiókodat nem kapcsolhatod ki." };
  }

  const user = await felhasznaloAzonositoval(userId);
  if (!user) return { ok: false, hiba: "A felhasználó nem található." };

  // ne lehessen kizárni magunkat a rendszerből
  if (!ertek && user.role === "ADMIN" && (await aktivAdminokSzama()) <= 1) {
    return { ok: false, hiba: "Legalább egy aktív adminisztrátornak maradnia kell." };
  }

  const sikeres = await felhasznaloAktiv(userId, ertek);
  if (!sikeres) return { ok: false, hiba: "A módosítás nem sikerült." };

  revalidatePath("/admin/felhasznalok");
  revalidatePath("/admin/naptar");

  return {
    ok: true,
    uzenet: ertek ? `${user.name} fiókja újra aktív.` : `${user.name} fiókja kikapcsolva.`,
  };
}
