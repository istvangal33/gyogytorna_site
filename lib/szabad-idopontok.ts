// Szabad idősávok számítása. Szándékosan tiszta függvények: nem nyúlnak
// adatbázishoz, így önállóan tesztelhetők.

export type Idosav = { kezdet: Date; veg: Date };

export type Jelolt = {
  // ISO időbélyeg
  kezdet: string;
  // hány perc áll rendelkezésre ettől a kezdéstől a rés végéig
  maxPerc: number;
};

const PERC = 60000;

/**
 * A munkaidő-ablakokból kivonja a foglalt sávokat, és visszaadja,
 * mi marad szabadon.
 */
export function szabadResek(munkaidoSavok: Idosav[], foglaltSavok: Idosav[]): Idosav[] {
  const foglalt = [...foglaltSavok]
    .filter((f) => f.veg > f.kezdet)
    .sort((a, b) => a.kezdet.getTime() - b.kezdet.getTime());

  const eredmeny: Idosav[] = [];

  for (const ablak of munkaidoSavok) {
    let kurzor = new Date(ablak.kezdet);

    for (const f of foglalt) {
      // az ablakon kívüli foglalás nem érdekes
      if (f.veg <= kurzor) continue;
      if (f.kezdet >= ablak.veg) break;

      if (f.kezdet > kurzor) {
        eredmeny.push({ kezdet: new Date(kurzor), veg: new Date(Math.min(+f.kezdet, +ablak.veg)) });
      }
      if (f.veg > kurzor) kurzor = new Date(f.veg);
      if (kurzor >= ablak.veg) break;
    }

    if (kurzor < ablak.veg) {
      eredmeny.push({ kezdet: new Date(kurzor), veg: new Date(ablak.veg) });
    }
  }

  return eredmeny.filter((r) => r.veg > r.kezdet);
}

/**
 * A szabad résekből kezdési időpontokat állít elő.
 *
 * Kétféle jelöltet ad: a rács szerinti kerek időpontokat (pl. minden fél óra),
 * és minden rés legelejét. Ez utóbbi azért kell, hogy egy 9:40-kor véget érő
 * kezelés után 9:40-re is lehessen foglalni, ne csak 10:00-ra — különben
 * elveszne 20 perc.
 */
export function jeloltIdopontok(
  szabadok: Idosav[],
  opciok: { racsPerc?: number; minPerc?: number; nemKorabban?: Date } = {}
): Jelolt[] {
  const racsPerc = opciok.racsPerc ?? 30;
  const minPerc = opciok.minPerc ?? 0;
  const nemKorabban = opciok.nemKorabban;

  const jeloltek = new Map<number, number>();

  for (const res of szabadok) {
    const resVeg = +res.veg;

    const hozzaad = (mikor: Date) => {
      const t = +mikor;
      if (t < +res.kezdet || t >= resVeg) return;
      if (nemKorabban && t < +nemKorabban) return;

      const maxPerc = Math.floor((resVeg - t) / PERC);
      if (maxPerc < minPerc) return;

      // ugyanarra az időpontra a nagyobb szabad hossz a mérvadó
      const meglevo = jeloltek.get(t);
      if (meglevo === undefined || maxPerc > meglevo) jeloltek.set(t, maxPerc);
    };

    // a rés legeleje
    hozzaad(res.kezdet);

    // rács szerinti kerek időpontok a résen belül
    const elso = new Date(res.kezdet);
    const maradek = (elso.getHours() * 60 + elso.getMinutes()) % racsPerc;
    if (maradek !== 0) elso.setTime(+elso + (racsPerc - maradek) * PERC);
    elso.setSeconds(0, 0);

    for (let t = +elso; t < resVeg; t += racsPerc * PERC) {
      hozzaad(new Date(t));
    }
  }

  return [...jeloltek.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([t, maxPerc]) => ({ kezdet: new Date(t).toISOString(), maxPerc }));
}

/** A perc alapú munkaidőt (0–1440) konkrét naphoz köti. */
export function munkaidoSavKeszites(nap: Date, startMinute: number, endMinute: number): Idosav {
  const kezdet = new Date(nap);
  kezdet.setHours(0, startMinute, 0, 0);
  const veg = new Date(nap);
  veg.setHours(0, endMinute, 0, 0);
  return { kezdet, veg };
}
