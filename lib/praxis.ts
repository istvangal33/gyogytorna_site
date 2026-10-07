// A praxis adatai, ahogy a vendégnek szóló levelekben és a naptármeghívóban
// megjelennek. Egy helyen, hogy ne kelljen több fájlban keresgélni.
export const PRAXIS = {
  nev: "ReStart Physio",
  email: "restart.gyor@gmail.com",
  helyszin: "Győr, Máté Mária u. 4b, 9028",
  // Ugyanaz a hivatkozás, ami az oldal strukturált adataiban szerepel.
  // Ha mi adjuk meg a linket, a levelezőnek nincs mit kitalálnia.
  terkep: "https://maps.app.goo.gl/MAsW9JaN2v5PcCR59",

  // A weboldalon is megjelenő alakok. A Google a helyi rangsorolásnál
  // figyeli, hogy a név, a cím és a telefonszám MINDENHOL betűre ugyanúgy
  // szerepeljen-e; ha háromféleképpen van leírva, az bizalmatlanságot kelt.
  // Ezért van itt a megjelenítendő és a tárcsázható alak is.
  cim: "9028 Győr, Máté Mária u. 4b",
  telefon: "+36 30 819 8449",
  telefonHivas: "tel:+36308198449",
  nyitvatartas: "Hétfő–Péntek: 8:00–18:00",
} as const;
