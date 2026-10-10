// A praxis adatai, ahogy a vendégnek szóló levelekben és a naptármeghívóban
// megjelennek. Egy helyen, hogy ne kelljen több fájlban keresgélni.
export const PRAXIS = {
  nev: "ReStart Physio",
  email: "restart.gyor@gmail.com",
  helyszin: "Győr, Máté Mária u. 4b, 9028",
  // Ugyanaz a hivatkozás, ami az oldal strukturált adataiban szerepel.
  // Ha mi adjuk meg a linket, a levelezőnek nincs mit kitalálnia.
  terkep: "https://maps.app.goo.gl/MAsW9JaN2v5PcCR59",

  // A telefonszám megjelenítendő és tárcsázható alakja. Azért innen jön,
  // mert a weboldalon korábban két formában is szerepelt, és a Google a
  // helyi rangsorolásnál figyeli, hogy mindenhol betűre ugyanúgy álljon-e.
  telefon: "+36 30 819 8449",
  telefonHivas: "tel:+36308198449",
} as const;
