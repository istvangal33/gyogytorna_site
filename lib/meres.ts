/**
 * Megkeresések mérése a Google Analyticsben.
 *
 * A mérőkód CSAK a süti-hozzájárulás után töltődik be (lásd
 * GoogleAnalytics.tsx), tehát a `window.gtag` addig nem létezik. Ha a
 * látogató elutasította a sütiket, az alábbi függvény nem csinál semmit —
 * ez nem hiba, hanem a helyes viselkedés: a mérés a hozzájárulással együtt
 * kapcsol be és ki.
 */

declare global {
  interface Window {
    gtag?: (
      parancs: string,
      esemeny: string,
      adatok?: Record<string, unknown>
    ) => void;
  }
}

/**
 * Szándékosan két külön eseménynév, nem egy közös paraméterrel.
 *
 * A GA4 az eseményneveket magától kilistázza, a paramétereket viszont csak
 * akkor, ha előbb egyedi dimenziót vesz fel hozzájuk valaki a felületen.
 * Két névvel tehát beállítás nélkül, azonnal látszik mindkét szám.
 */
export const URLAP_ELKULDVE = 'urlap_elkuldve';

/**
 * A telefonszámra kattintás NEM bizonyítja, hogy a hívás létre is jött — a
 * böngésző ennél többet nem árul el. Ez a legjobb elérhető közelítés.
 */
export const TELEFON_KATTINTAS = 'telefon_kattintas';

export function esemeny(nev: string, adatok?: Record<string, unknown>) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', nev, adatok);
}
