import crypto from "crypto";

// A linkben szereplő token élettartama. Rövidre vesszük: aki tényleg most kérte,
// annak bőven elég, egy kiszivárgott link viszont hamar használhatatlan lesz.
export const TOKEN_ELETTARTAM_PERC = 60;

// A nyers tokent csak a felhasználó látja (az e-mailben lévő linkben).
// Az adatbázisba kizárólag a lenyomata kerül — így egy adatbázis-szivárgás
// önmagában nem elég ahhoz, hogy valaki jelszót állítson át.
export function tokenLenyomat(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function ujToken(): { token: string; lenyomat: string } {
  const token = crypto.randomBytes(32).toString("base64url");
  return { token, lenyomat: tokenLenyomat(token) };
}

export function lejaratIdopont(): Date {
  return new Date(Date.now() + TOKEN_ELETTARTAM_PERC * 60 * 1000);
}

// --- rátekorlátozás ---
//
// Egy fiókra adott időn belül csak korlátozott számú visszaállító levél megy
// ki. E nélkül bárki, aki ismer egy e-mail címet, korlátlanul kérhetne új
// linket: elárasztaná vele a postafiókot, és elhasználná a levélküldő havi
// keretét is. A korlát fiókra szól, nem böngészőre vagy IP-címre — így akkor
// is véd, ha a kéréseket több gépről indítják.

export const KERES_ABLAK_PERC = 60;
export const KERES_MAX_ABLAKBAN = 3;

/** Az ablak kezdete: ennél frissebb kéréseket számoljuk. */
export function keresAblakKezdete(most: Date = new Date()): Date {
  return new Date(most.getTime() - KERES_ABLAK_PERC * 60 * 1000);
}

/** Igaz, ha az ablakban már kiment a megengedett mennyiségű levél. */
export function keretTullepve(eddigiKeresek: number): boolean {
  return eddigiKeresek >= KERES_MAX_ABLAKBAN;
}

export const JELSZO_MIN_HOSSZ = 8;

export function jelszoHiba(jelszo: string, megegyszer: string): string | null {
  if (jelszo.length < JELSZO_MIN_HOSSZ) {
    return `A jelszó legyen legalább ${JELSZO_MIN_HOSSZ} karakter hosszú.`;
  }
  if (jelszo !== megegyszer) {
    return "A két megadott jelszó nem egyezik.";
  }
  return null;
}
