// A rendszer egyetlen időzónában működik: a rendelő Győrben van, a munkaidő,
// a foglalások és a levelek mind magyar idő szerint értendők.
//
// A kód ezt a szerver saját időzónájából veszi — a `setHours`, a dátum-
// értelmezés és a formázás mind arra épül. Fejlesztői gépen ez magától
// stimmel, felhőben viszont a szerverek UTC-ben futnak, és akkor minden
// időpont két órát csúszik (télen egyet).
//
// Ezért az éles környezetben BE KELL állítani a TZ környezeti változót:
//
//     TZ=Europe/Budapest
//
// Az alábbi ellenőrzés induláskor szól, ha ez hiányzik — némán elcsúszó
// időpontoknál nincs rosszabb.

export const IDOZONA = "Europe/Budapest";

const futo = Intl.DateTimeFormat().resolvedOptions().timeZone;

if (futo !== IDOZONA) {
  console.warn(
    `[időzóna] A szerver "${futo}" zónában fut, nem "${IDOZONA}". ` +
      `Az időpontok el fognak csúszni. Állítsd be a TZ környezeti változót.`
  );
}
