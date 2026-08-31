// A süti-hozzájárulás közös pontja a bannernek és a méréseknek.
//
// Fontos: elfogadáskor NEM töltjük újra az oldalt. A `location.reload()`
// felülírja a `document.referrer`-t az oldal saját címére, amitől a GA minden
// látogatót önhivatkozásként lát, és az egész forgalom a "Direct" csatornába
// esik. Helyette eseményt küldünk, amire a mérőkód azonnal reagál.
export const CONSENT_COOKIE = 'cookieConsent';
export const CONSENT_EVENT = 'cookie-consent-changed';

export type ConsentValue = 'true' | 'false';
