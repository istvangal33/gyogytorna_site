import { execFileSync } from 'node:child_process';

/**
 * Egy oldal utolsó módosítása: az oldalt felépítő fájlok legutóbbi
 * commitjának dátuma.
 *
 * Két helyen kell, és a kettőnek egyeznie kell: a sitemap lastmod mezőjében
 * és a szolgáltatásoldalak látható „Frissítve” sorában. Ha a kettő eltérne,
 * a Google joggal nem bízna egyikben sem.
 *
 * MIÉRT GITBŐL: korábban egyetlen, kézzel beírt dátum szerepelt mind a 14
 * oldalnál, és öt és fél hónapig nem frissült senki. A Google ebből dönti
 * el, melyik oldalt érdemes hamarabb újra megnéznie; ha minden dátum
 * egyforma és láthatóan régi, megtanulja, hogy ennek a sitemapnek a
 * dátumaiban nem lehet bízni, és figyelmen kívül hagyja őket.
 *
 * A fordítás a Netlifyn fut, GitHubról. A Netlify „blobless" klónt készít
 * (--filter=blob:none): minden commit és könyvtárfa benne van, csak a
 * fájltartalmak töltődnek le igény szerint. A git log útvonalszűrése épp a
 * fákat hasonlítja, nem a tartalmat, ezért ott is helyes dátumot ad.
 *
 * Ha a git mégsem érhető el, a dátum KIMARAD. A hiányzó dátum jobb, mint a
 * téves: a téves dátumok miatt a Google az egész sitemap dátumait
 * elvetheti.
 */
export function utolsoModositas(...fajlok: string[]): Date | undefined {
  try {
    const datum = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...fajlok], {
      encoding: 'utf8',
    }).trim();

    // Üres válasz = a git fut, de egyik útvonalra sem talált commitot.
    // Ez jellemzően elgépelt útvonal (vagy még nem commitolt új oldal), és
    // némán tüntetné el a dátumot — ezért a fordítás naplójában jelezzük.
    if (!datum) {
      console.warn(`Nincs commit ezekre az útvonalakra: ${fajlok.join(', ')}`);
      return undefined;
    }
    return new Date(datum);
  } catch {
    return undefined;
  }
}
