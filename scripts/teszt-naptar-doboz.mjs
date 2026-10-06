// A foglalasdobozok szovegelrendezese.
//
// Futtatas:  node scripts/teszt-naptar-doboz.mjs
//
// MIERT: a dobozok magassaga a kezeles hosszaval aranyos, a szoveg magassaga
// viszont allando. Ha tobb sort rajzolunk ki, mint amennyi befer, az utolso
// sor betuinek a teteje latszik — ez nez torottnek. Ez a teszt azt ellenorzi,
// hogy EGYETLEN valos dobozmeretnel sem lograthat ki szoveg.
import { ferosorok, szolgaltatasRovid } from "../components/admin/naptar-alap.ts";

let hiba = 0;
const all = (ok, cim, reszlet = "") => {
  console.log(`  ${ok ? "OK  " : "HIBA"}  ${cim}${reszlet ? "  — " + reszlet : ""}`);
  if (!ok) hiba++;
};

// A komponensekben beallitott meretek. Ha ott valtoznak, itt is at kell irni.
const NAPI = { margo: 4, elsoSor: 14, tovabbiSor: 13, max: 3 };
const HETI = { margo: 4, elsoSor: 13, tovabbiSor: 12, max: 3 };

const nezetek = [
  { nev: "napi, telefon", pxPerOra: 48, m: NAPI, minMagas: 22 },
  { nev: "napi, asztali", pxPerOra: 64, m: NAPI, minMagas: 22 },
  { nev: "heti",          pxPerOra: 48, m: HETI, minMagas: 18 },
];

// 1. A legfontosabb: semmi nem loghat ki, semmilyen hosszusagnal.
console.log("Semmilyen dobozbol nem log ki szoveg");
for (const n of nezetek) {
  let rossz = null;
  for (let perc = 5; perc <= 240; perc += 5) {
    const magas = Math.max(n.minMagas, (perc * n.pxPerOra) / 60);
    const sor = ferosorok(magas, n.m);
    const kell = n.m.elsoSor + (sor - 1) * n.m.tovabbiSor;
    if (sor > 1 && kell > magas - n.m.margo) rossz = { perc, magas, sor, kell };
  }
  all(!rossz, n.nev, rossz ? `${rossz.perc} percnel ${rossz.sor} sor (${rossz.kell}px) ${rossz.magas}px-be` : "5–240 perc");
}

// 2. A gyakorlatban elofordulo ket hossz. Ezt latja a felhasznalo.
console.log("\nA valodi kezeleshosszak");
const eset = (nezet, blokkPerc, vart) => {
  const n = nezetek.find((x) => x.nev === nezet);
  const magas = Math.max(n.minMagas, (blokkPerc * n.pxPerOra) / 60);
  const sor = ferosorok(magas, n.m);
  all(sor === vart, `${nezet}: ${blokkPerc} perces blokk`, `${magas}px → ${sor} sor (vart: ${vart})`);
};
// 30 perces kezeles -> 30 perces blokk; 50 perces -> 60 perces blokk
eset("napi, telefon", 60, 3); // ido+nev, majd a szolgaltatas ket sorban
eset("napi, telefon", 30, 1); // csak ido+nev fer ki — de az kifer!
eset("napi, asztali", 60, 3);
eset("napi, asztali", 30, 2);
eset("heti", 60, 3);
eset("heti", 30, 1);

// 3. Az elso sor (ido + nev) MINDIG kifer. Ez a minimum, amit latni kell.
console.log("\nAz ido es a nev minden dobozban kifer");
for (const n of nezetek) {
  all(n.minMagas - n.m.margo >= n.m.elsoSor, n.nev,
      `${n.minMagas - n.m.margo}px hely, ${n.m.elsoSor}px kell`);
}

// 4. A nevrovidites.
console.log("\nA szolgaltatas nevenek rovidítese");
const r = [
  ["Lágy rész manuál terápia (FDM) – 50 perc", "Lágy rész manuál terápia (FDM)"],
  ["Egyéni gyógytorna / rehabilitáció – 30 perc", "Egyéni gyógytorna / rehabilitáció"],
  ["Csoportos gerinc core edzés – 50 perc", "Csoportos gerinc core edzés"],
  ["TMI (állkapocs ízületi) terápia – 50 perc", "TMI (állkapocs ízületi) terápia"],
  ["Csoportos Core gyerek", "Csoportos Core gyerek"],   // nincs utotag, marad
  ["Kineziológiai tape", "Kineziológiai tape"],
  ["30 perc", "30 perc"],                                 // nem urulhet ki
];
for (const [be, ki] of r) all(szolgaltatasRovid(be) === ki, `"${be}"`, `→ "${szolgaltatasRovid(be)}"`);

console.log(hiba === 0 ? "\nMinden ellenorzes rendben." : `\n${hiba} ellenorzes bukott.`);
process.exitCode = hiba === 0 ? 0 : 1;
