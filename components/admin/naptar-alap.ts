// A naptár nézetek közös típusai, színei és időszámolói. A napi és a heti
// nézet ugyanezeket használja, hogy egy munkatárs mindkettőben ugyanazt a
// színt kapja, és az óraskála is egyezzen.

export type Munkaido = { staffId: string; weekday: number; startMinute: number; endMinute: number };

export type Munkatars = { id: string; nev: string };

export type Foglalas = {
  id: string;
  staffId: string;
  kezdet: string;
  veg: string;
  vendeg: string;
  email: string;
  telefon: string | null;
  serviceId: string;
  szolgaltatas: string;
  ar: number;
  /** Sorozat címkéje, ha ismétlődő foglalásként készült. */
  seriesId: string | null;
  allapot: 'BOOKED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
  megjegyzes: string | null;
};

export type Tavollet = {
  id: string;
  staffId: string | null;
  kezdet: string;
  veg: string;
  ok: string | null;
};

export type Szin = { alap: string; sotet: string; halvany: string };

// Munkatársanként egy szín. A sorrend a munkatárs listabeli helyéhez kötött,
// így ugyanaz a személy mindig ugyanazt a színt kapja.
export const SZINEK: Szin[] = [
  { alap: '#2563eb', sotet: '#1d4ed8', halvany: '#dbeafe' },
  { alap: '#16a34a', sotet: '#15803d', halvany: '#dcfce7' },
  { alap: '#7c3aed', sotet: '#6d28d9', halvany: '#ede9fe' },
  { alap: '#ea580c', sotet: '#c2410c', halvany: '#ffedd5' },
  { alap: '#0891b2', sotet: '#0e7490', halvany: '#cffafe' },
  { alap: '#db2777', sotet: '#be185d', halvany: '#fce7f3' },
];

export const NAP_ROVID = ['V', 'H', 'K', 'Sze', 'Cs', 'P', 'Szo'];

export const ORA_KEZD = 7;
export const ORA_VEG = 20;

export const ALLAPOT_FELIRAT: Record<Foglalas['allapot'], string> = {
  BOOKED: 'Foglalt',
  COMPLETED: 'Fizetve',
  CANCELLED: 'Lemondva',
  NO_SHOW: 'Nem jelent meg',
};

export function napKezdete(d: Date) {
  const uj = new Date(d);
  uj.setHours(0, 0, 0, 0);
  return uj;
}

export function hetNapjai(kozepe: Date) {
  // hétfővel kezdődő hét
  const eltolas = (kozepe.getDay() + 6) % 7;
  const hetfo = napKezdete(kozepe);
  hetfo.setDate(hetfo.getDate() - eltolas);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(hetfo);
    d.setDate(hetfo.getDate() + i);
    return d;
  });
}

export function ugyanaznap(a: Date, b: Date) {
  return a.toDateString() === b.toDateString();
}

export function ora(d: Date) {
  return new Intl.DateTimeFormat('hu-HU', { hour: '2-digit', minute: '2-digit' }).format(d);
}

/**
 * Hány perccel a nézet teteje (ORA_KEZD) után kezdődik az adott időpont.
 *
 * Szándékosan a faliórát nézi (getHours/getMinutes), nem az eltelt abszolút
 * időt: a rács sorai falióra szerinti címkék, így óraátállítás napján is a
 * 10:00-s sorba kerül az, ami helyi idő szerint 10:00-kor kezdődik.
 */
export function percOffset(d: Date) {
  return (d.getHours() - ORA_KEZD) * 60 + d.getMinutes();
}

/**
 * A kezelés nevéből elhagyja a „– 50 perc" utótagot.
 *
 * A hosszt a doboz magassága és a kezdés ideje már elmondja, a név végén
 * viszont elvesz a helyet a lényeg elől: a szűk oszlopokban emiatt vágódott
 * le a „Lágy rész manuál terápia (FDM)" vége.
 */
export function szolgaltatasRovid(nev: string) {
  return nev.replace(/\s*[–—-]\s*\d+\s*perc\s*$/i, '').trim() || nev;
}

/**
 * Hány szövegsor fér ki egy foglalásdobozban úgy, hogy egyik se vágódjon
 * félbe.
 *
 * A dobozok magassága a kezelés hosszával arányos, tehát egy 30 perces
 * foglalás dobozába kevesebb fér, mint egy 50 percesébe. Eddig mindig
 * ugyanannyi sort rajzoltunk ki, és a felesleget a túlcsordulás nyírta le —
 * ettől a legalsó sor betűinek a teteje látszott, ami töröttnek néz ki.
 * Inkább elhagyunk egy egész sort, mint hogy félbevágva lógjon ki.
 */
export function ferosorok(
  magas: number,
  m: { margo: number; elsoSor: number; tovabbiSor: number; max: number }
) {
  const hely = magas - m.margo;
  let sor = 1;
  let kell = m.elsoSor;
  while (sor < m.max && kell + m.tovabbiSor <= hely) {
    kell += m.tovabbiSor;
    sor++;
  }
  return sor;
}
