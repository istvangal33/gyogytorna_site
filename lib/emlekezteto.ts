import { IDOZONA } from "./idozona.ts";
import {
  emlekeztetoreVaroFoglalasok,
  emlekeztetoJelolese,
} from "@/lib/db";
import { foglalasEmlekezteto } from "@/lib/mail";
import { icsKeszites } from "@/lib/ics";
import { PRAXIS } from "@/lib/praxis";

export type EmlekeztetoOsszegzes = {
  talalt: number;
  kikuldve: number;
  sikertelen: number;
  reszletek: { vendeg: string; idopont: string; ok: boolean; hiba?: string }[];
};

/**
 * Kiküldi az emlékeztetőket a megadott nappal későbbre szóló foglalásokra.
 *
 * A jelölés csak sikeres küldés után történik meg, így egy elbukott levél a
 * következő futásnál újra sorra kerül. Egy vendégnek tehát legfeljebb egyszer
 * megy ki — de ha a küldés hibázik, nem vész el.
 */
export async function emlekeztetokKuldese(napokElore = 1): Promise<EmlekeztetoOsszegzes> {
  const varo = await emlekeztetoreVaroFoglalasok(napokElore);

  const osszegzes: EmlekeztetoOsszegzes = {
    talalt: varo.length,
    kikuldve: 0,
    sikertelen: 0,
    reszletek: [],
  };

  for (const f of varo) {
    const kezdet = new Date(f.startsAt);
    const veg = new Date(f.endsAt);
    const idopont = new Intl.DateTimeFormat("hu-HU", {
      timeZone: IDOZONA,
      dateStyle: "short",
      timeStyle: "short",
    }).format(kezdet);

    try {
      const ics = icsKeszites({
        uid: `foglalas-${f.id}@restartphysio.hu`,
        kezdet,
        veg,
        cim: `${f.szolgaltatas} – ${PRAXIS.nev}`,
        leiras: `Kollégánk: ${f.munkatars}`,
        helyszin: PRAXIS.helyszin,
        szervezoNev: PRAXIS.nev,
        szervezoEmail: PRAXIS.email,
        vendegNev: f.vendeg,
        vendegEmail: f.vendeg_email,
        // ugyanaz az azonosító, mint a visszaigazolásnál: a naptár nem hoz
        // létre másodikat, csak frissíti a meglévőt
        sorszam: 3,
      });

      const eredmeny = await foglalasEmlekezteto({
        vendegNev: f.vendeg,
        vendegEmail: f.vendeg_email,
        szolgaltatas: f.szolgaltatas,
        kezdet,
        veg,
        munkatars: f.munkatars,
        ar: f.price,
        helyszin: PRAXIS.helyszin,
        terkep: PRAXIS.terkep,
        ics,
      });

      if (eredmeny.ok) {
        await emlekeztetoJelolese(f.id);
        osszegzes.kikuldve++;
        osszegzes.reszletek.push({ vendeg: f.vendeg, idopont, ok: true });
      } else {
        osszegzes.sikertelen++;
        osszegzes.reszletek.push({
          vendeg: f.vendeg,
          idopont,
          ok: false,
          hiba: eredmeny.hiba,
        });
      }
    } catch (err) {
      osszegzes.sikertelen++;
      osszegzes.reszletek.push({
        vendeg: f.vendeg,
        idopont,
        ok: false,
        hiba: (err as Error).message,
      });
    }
  }

  return osszegzes;
}
