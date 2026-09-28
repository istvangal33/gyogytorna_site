// Átfedő időpontok egymás mellé rendezése.
//
// A napi nézetben minden munkatársnak saját oszlopa van, ezért ott nincs
// ütközés. A heti nézetben viszont egy naposzlopban több munkatárs foglalása
// is szerepel, és ezek időben átfedhetik egymást — ilyenkor vízszintesen
// osztjuk el őket, mint a naptáralkalmazások.
//
// A bemenet percben érkezik (a nap kezdetéhez képest), nem Date-ként: így a
// számolás független az időzónától és az óraátállítástól. A hívó dolga, hogy
// minden napot a saját éjfeléhez képest számoljon.

export type Idosav = { kezdet: number; veg: number };

export type Elhelyezes = {
  /** hányadik sávba kerül, nullától számozva */
  sav: number;
  /** hány sáv között osztozik — ebből jön a szélesség: 1 / savok */
  savok: number;
};

/**
 * Sávokba rendezi az elemeket úgy, hogy az egymást átfedők ne takarják ki
 * egymást. Az érintkezés (az egyik vége = a másik kezdete) nem átfedés.
 *
 * Az egymással láncban átfedő elemek egy csoportot alkotnak, és a csoport
 * minden tagja ugyanannyi sávon osztozik — így a blokkok széle egy vonalban
 * marad, nem ugrál elemenként.
 */
export function savKiosztas<T extends Idosav>(elemek: T[]): (T & Elhelyezes)[] {
  const rendezett = [...elemek].sort((a, b) => a.kezdet - b.kezdet || a.veg - b.veg);

  const eredmeny: (T & Elhelyezes)[] = [];
  let csoport: (T & Elhelyezes)[] = [];
  // sávonként az eddigi legkésőbbi végpont
  let savVegek: number[] = [];

  const csoportZarasa = () => {
    for (const e of csoport) e.savok = savVegek.length;
    eredmeny.push(...csoport);
    csoport = [];
    savVegek = [];
  };

  for (const elem of rendezett) {
    // Ha ez az elem már egyik nyitott sávval sem ér össze, a csoport lezárul:
    // ami utána jön, az nem osztozik a korábbiakkal a szélességen.
    if (savVegek.length > 0 && savVegek.every((veg) => veg <= elem.kezdet)) {
      csoportZarasa();
    }

    let sav = savVegek.findIndex((veg) => veg <= elem.kezdet);
    if (sav === -1) {
      sav = savVegek.length;
      savVegek.push(elem.veg);
    } else {
      savVegek[sav] = Math.max(savVegek[sav], elem.veg);
    }

    csoport.push({ ...elem, sav, savok: 1 });
  }

  csoportZarasa();
  return eredmeny;
}
