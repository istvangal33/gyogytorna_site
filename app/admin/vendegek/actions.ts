"use server";

import { revalidatePath } from "next/cache";
import { bejelentkezettFelhasznalo } from "@/lib/munkamenet";
import {
  vendegAzonositoval,
  vendegFrissitese,
  masikVendegEzzelAzEmaillel,
} from "@/lib/db";

export type Eredmeny = { ok: true; uzenet: string } | { ok: false; hiba: string };

/**
 * Vendég adatainak javítása.
 *
 * Szándékosan nem adminhoz kötött: a vendégeket az rögzíti, aki foglal, és a
 * saját elgépelését neki is tudnia kell helyrehozni. Egy alkalmazott sem tud
 * vele többet, mint amit a foglaláskor amúgy is beír.
 */
export async function vendegModositas(
  id: string,
  adat: { nev: string; email: string; telefon: string }
): Promise<Eredmeny> {
  const user = await bejelentkezettFelhasznalo();
  if (!user) return { ok: false, hiba: "Nincs bejelentkezve." };

  const vendeg = await vendegAzonositoval(id);
  if (!vendeg) return { ok: false, hiba: "A vendég nem található." };

  const nev = adat.nev.trim();
  const email = adat.email.trim().toLowerCase() || null;
  const telefon = adat.telefon.trim() || null;

  if (!nev) return { ok: false, hiba: "A vendég neve kötelező." };
  if (email && !email.includes("@")) {
    return { ok: false, hiba: "Az e-mail cím hibás. Hagyd üresen, ha nincs meg." };
  }

  // Az e-mail egyedi. Ha már másé, azt előre megmondjuk — érthetőbb, mint egy
  // adatbázishiba, és gyakran épp ez jelzi, hogy két lapra került ugyanaz az
  // ember.
  if (email) {
    const masik = await masikVendegEzzelAzEmaillel(id, email);
    if (masik) {
      return {
        ok: false,
        hiba:
          `Ez az e-mail cím már „${masik.name}" vendéghez tartozik. ` +
          `Ha ugyanarról a személyről van szó, az ő lapján javítsd az adatokat, ` +
          `és ezt a lapot hagyd e-mail nélkül.`,
      };
    }
  }

  try {
    const frissitett = await vendegFrissitese(id, { nev, email, telefon });
    if (!frissitett) return { ok: false, hiba: "A módosítás nem sikerült." };
  } catch (err) {
    if ((err as { code?: string }).code === "23505") {
      return { ok: false, hiba: "Ez az e-mail cím már egy másik vendéghez tartozik." };
    }
    console.error("[vendég] módosítás sikertelen:", err);
    return { ok: false, hiba: "A módosítás nem sikerült." };
  }

  revalidatePath(`/admin/vendegek/${id}`);
  revalidatePath("/admin/vendegek");
  revalidatePath("/admin/naptar");

  return {
    ok: true,
    uzenet:
      vendeg.name !== nev
        ? `Mentve. A korábbi foglalásokon is „${nev}" fog szerepelni.`
        : "Mentve.",
  };
}
