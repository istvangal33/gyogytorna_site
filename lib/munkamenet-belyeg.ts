// A munkamenet és a jelszó összetartozásának ellenőrzése.
//
// Külön fájlban van, hogy semmilyen külső modult ne kelljen behúznia: így
// önmagában tesztelhető, és a sima Node-szkriptek is be tudják tölteni.

/**
 * Elavult-e a munkamenet a jelszóhoz képest.
 *
 * A munkamenet a belépéskor érvényes időbélyeget hordozza. Ha az adatbázisban
 * ennél más áll, a jelszó azóta megváltozott — a munkamenet érvénytelen.
 *
 * A bélyeg nélküli (null) munkameneteket csak az a fiók fogadja el, amelynél
 * soha nem volt jelszóváltás. Ez az átállás kedvéért van így: a bevezetés
 * pillanatában nyitva lévő munkamenetek nem szállnak el, az első jelszóváltás
 * után viszont már ezek sem érvényesek.
 */
export function munkamenetElavult(
  munkamenetBelyeg: string | null | undefined,
  jelszoValtozott: Date | string | null | undefined
): boolean {
  const adatbazis = jelszoValtozott ? new Date(jelszoValtozott).toISOString() : null;
  return (munkamenetBelyeg ?? null) !== adatbazis;
}
