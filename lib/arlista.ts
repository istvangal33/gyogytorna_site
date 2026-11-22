/**
 * A nyilvános árlista — EGY helyen.
 *
 * Eddig az /arak oldal kódjába volt beírva. Amint a szolgáltatásoldalak is
 * kiírják az árat, két másolat keletkezne, és előbb-utóbb szétmennének:
 * valaki árat emel az árlistán, a szolgáltatásoldalon meg marad a régi.
 * Ezért olvas mindkettő innen.
 *
 * FONTOS: ez a NYILVÁNOS lista. A foglalórendszer a saját `Service`
 * táblájából számol, és ott munkatársanként eltérő ár is beállítható. A
 * kettőt a scripts/arak-ellenorzese.mjs veti össze — az figyelmeztet, ha
 * valahol kevesebb van kiírva, mint amennyit ténylegesen számolnak.
 */

export type ArTetel = {
  name: string;
  duration?: string;
  price: number;
  /** Mit tartalmaz az ár — halvány leírás a név alatt. */
  includes?: string;
  highlight?: boolean;
};

export const SZOLGALTATASOK: ArTetel[] = [
  {
    name: 'Egyéni gyógytorna/rehabilitáció',
    duration: '50 P',
    price: 16000,
    includes:
      'Állapotfelmérés, rehabilitációs ütemterv, célzott gyakorlatorientált terápia, házi feladatok',
  },
  {
    name: 'Egyéni gyógytorna/rehabilitáció',
    duration: '30 P',
    price: 9000,
    includes:
      'Célzott terápia, házi feladatok · első alkalom esetén kizárólag 50 perces foglalható',
  },
  {
    name: 'Lágy rész manuál terápia (FDM kezelések)',
    duration: '50 P',
    price: 18000,
    includes:
      'FDM kezelés, triggerpont terápia, eszköztámogatott manuális technikák, Medical Flossing',
  },
  { name: 'Lágy rész manuál terápia (FDM kezelések)', duration: '30 P', price: 10000 },
  {
    name: 'Schroth terápia',
    duration: '50 P',
    price: 16000,
    includes:
      'Gerincferdülés Schroth-módszeren alapuló kezelése, izomerősítő és mobilizációs technikákkal',
  },
  {
    name: 'TMI (Állkapocs ízületi) terápia',
    duration: '50 P',
    price: 20000,
    includes:
      'Komplex állapotfelmérés, kezelési terv, manuális kezelés extra- és intraorálisan, házi feladatok',
  },
  { name: 'Csoportos gerinc core edzés', duration: '50 P', price: 8000 },
  { name: 'Csoportos gerinc core edzés', duration: '30 P', price: 6000 },
  { name: 'Kineziológiai tape', price: 5000 },
  { name: 'Dinamikus tape', price: 8000 },
];

export const BERLETEK: ArTetel[] = [
  {
    name: 'Egyéni gyógytorna bérlet',
    duration: '5 ALK',
    price: 75000,
    includes: 'Igénybevétele minimum heti 2 alkalom vállalásával lehetséges',
  },
  { name: 'Egyéni gyógytorna bérlet', duration: '10 ALK', price: 144000 },
  { name: 'TMI (Állkapocs ízületi) terápia bérlet', duration: '3 ALK', price: 55000 },
];

export const BERLES: ArTetel[] = [
  { name: 'BEMER készülék bérlése', duration: '1 HÓNAP', price: 100000 },
];

export function forint(ertek: number) {
  return new Intl.NumberFormat('hu-HU').format(ertek) + ' Ft';
}

/** Az /arak oldal rövidítései („50 P”, „5 ALK”) folyó szövegbe illő alakban. */
export function idotartamSzovegesen(idotartam: string) {
  return idotartam
    .replace(/^(\d+) P$/, '$1 perc')
    .replace(/^(\d+) ALK$/, '$1 alkalom')
    .replace(/^(\d+) HÓNAP$/, '$1 hónap');
}

/** Bérletnél az alkalmak száma, minden másnál undefined. */
export function alkalmakSzama(t: ArTetel) {
  const talalat = t.duration?.match(/^(\d+) ALK$/);
  return talalat ? Number(talalat[1]) : undefined;
}

/** Bérletnél egy alkalom ára egész forintra kerekítve, minden másnál undefined. */
export function alkalmankentiAr(t: ArTetel) {
  const alkalom = alkalmakSzama(t);
  return alkalom ? Math.round(t.price / alkalom) : undefined;
}

/**
 * Egy tétel kikeresése név és időtartam szerint.
 *
 * Azért dob hibát, ha nincs találat, mert a szolgáltatásoldalak fordítás
 * közben hívják: egy elgépelt név így a fordításnál derül ki, nem élesben,
 * egy üres ár képében.
 */
export function ar(nev: string, idotartam?: string): ArTetel {
  const t = [...SZOLGALTATASOK, ...BERLETEK, ...BERLES].find(
    (x) => x.name === nev && x.duration === idotartam
  );
  if (!t) {
    throw new Error(
      `Nincs ilyen tétel az árlistában: "${nev}"${idotartam ? ` (${idotartam})` : ''}`
    );
  }
  return t;
}
