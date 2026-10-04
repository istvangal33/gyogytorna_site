"use server";

import { revalidatePath } from "next/cache";
import { bejelentkezettFelhasznalo } from "@/lib/munkamenet";
import { szolgaltatasMentese, ujSzolgaltatas } from "@/lib/db";

export type Eredmeny = { ok: true; uzenet: string } | { ok: false; hiba: string };

// Az árlista mindenki foglalására hat, ezért adminisztrátori jog kell hozzá.
async function adminJog() {
  const user = await bejelentkezettFelhasznalo();
  if (!user || user.role !== "ADMIN") return null;
  return user;
}

export type SzolgaltatasAdat = {
  name: string;
  description: string | null;
  price: number;
  durationMin: number;
  blockMin: number;
  bookable: boolean;
  active: boolean;
};

function ellenoriz(a: SzolgaltatasAdat): string | null {
  if (!a.name.trim()) return "A szolgáltatás neve kötelező.";

  for (const [cimke, ertek] of [
    ["ár", a.price],
    ["kezelés hossza", a.durationMin],
    ["naptárban elfoglalt idő", a.blockMin],
  ] as const) {
    if (!Number.isInteger(ertek) || ertek < 0) {
      return `A(z) „${cimke}" csak nemnegatív egész szám lehet.`;
    }
  }

  // A blokk a naptárban elfoglalt idő: tartalmazza a kezelést és az átállást.
  // Ha rövidebb lenne, a foglalások egymásra csúsznának.
  if (a.blockMin < a.durationMin) {
    return "A naptárban elfoglalt idő nem lehet rövidebb a kezelésnél.";
  }
  if (a.durationMin > 8 * 60 || a.blockMin > 8 * 60) {
    return "Nyolc óránál hosszabb kezelés nem valószínű — nézd meg a megadott perceket.";
  }
  return null;
}

export async function szolgaltatasModositas(
  id: string,
  adat: SzolgaltatasAdat
): Promise<Eredmeny> {
  const admin = await adminJog();
  if (!admin) return { ok: false, hiba: "Ehhez adminisztrátori jog kell." };

  const hiba = ellenoriz(adat);
  if (hiba) return { ok: false, hiba };

  const sikeres = await szolgaltatasMentese(id, {
    ...adat,
    name: adat.name.trim(),
    description: adat.description?.trim() || null,
  });
  if (!sikeres) return { ok: false, hiba: "A szolgáltatás nem található." };

  revalidatePath("/admin/szolgaltatasok");
  revalidatePath("/admin/naptar");

  return {
    ok: true,
    uzenet:
      `„${adat.name.trim()}" mentve. ` +
      `Az új ár a mostantól felvett foglalásokra érvényes — a korábbiakon a régi marad.`,
  };
}

export async function szolgaltatasLetrehozas(adat: SzolgaltatasAdat): Promise<Eredmeny> {
  const admin = await adminJog();
  if (!admin) return { ok: false, hiba: "Ehhez adminisztrátori jog kell." };

  const hiba = ellenoriz(adat);
  if (hiba) return { ok: false, hiba };

  await ujSzolgaltatas({
    name: adat.name.trim(),
    description: adat.description?.trim() || null,
    price: adat.price,
    durationMin: adat.durationMin,
    blockMin: adat.blockMin,
  });

  revalidatePath("/admin/szolgaltatasok");
  revalidatePath("/admin/naptar");

  return { ok: true, uzenet: `„${adat.name.trim()}" felvéve.` };
}
