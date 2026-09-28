// A megőrzési idő lejárta utáni automatikus törlés.
//
// Az adatvédelmi tájékoztató azt ígéri, hogy a foglalás adatait az időpont
// napjától számított MEGORZES_EV év elteltével töröljük. Ez a modul tartja be
// ezt az ígéretet — enélkül a tájékoztató olyat állítana, ami nem történik meg.
//
// Ha a megőrzési idő változik (például mert a könyvelő szerint a számviteli
// határidő az irányadó), itt kell átírni, és a tájékoztató 5.4. pontjában.

export const MEGORZES_EV = 5;

/**
 * A határnap: az ennél korábban kezdődött foglalások törlendők.
 *
 * Évszámmal számol, nem napokkal, így a szökőévek nem csúsztatják el.
 */
export function hatarnap(most: Date = new Date()): Date {
  const d = new Date(most);
  d.setFullYear(d.getFullYear() - MEGORZES_EV);
  d.setHours(0, 0, 0, 0);
  return d;
}
