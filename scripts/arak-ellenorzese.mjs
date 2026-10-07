// A nyilvanos arlista osszevetese azzal, amit a foglalorendszer tenylegesen
// szamol.
//
//   node --env-file=.env.prod scripts/arak-ellenorzese.mjs
//
// MIERT: ket arlista letezik. A nyilvanos a lib/arlista.ts-ben van (ezt
// latja a latogato az /arak oldalon es a szolgaltatasoldalak kartyain), a
// szamlazott pedig a foglalorendszer "Service" tablajaban, munkatarsankenti
// felulirasokkal. A kettot semmi nem tartja egyutt: ha valaki az admin
// feluleten arat emel, a weboldalon marad a regi.
//
// A SULYOS eset az, ha a weboldalon KEVESEBB all, mint amennyit
// tenylegesen kernek. Az igeret, amit nem tartunk — ezert az hiba.
// Ha tobb all kint (pl. egy munkatars olcsobban dolgozik), az csak
// megjegyzes.
import { pool } from "../lib/db.ts";
import { SZOLGALTATASOK, forint } from "../lib/arlista.ts";

// A nyilvanos nev es a foglalorendszer neve nem beture egyezik, ezert
// kezzel parositjuk. Ha uj szolgaltatas jon, ide is fel kell venni —
// a script szol, ha valamelyik oldalon parositatlan tetel marad.
const PAROK = [
  ["Egyéni gyógytorna/rehabilitáció",          "50 P", "Egyéni gyógytorna / rehabilitáció – 50 perc"],
  ["Egyéni gyógytorna/rehabilitáció",          "30 P", "Egyéni gyógytorna / rehabilitáció – 30 perc"],
  ["Lágy rész manuál terápia (FDM kezelések)", "50 P", "Lágy rész manuál terápia (FDM) – 50 perc"],
  ["Lágy rész manuál terápia (FDM kezelések)", "30 P", "Lágy rész manuál terápia (FDM) – 30 perc"],
  ["Schroth terápia",                          "50 P", "Schroth terápia – 50 perc"],
  ["TMI (Állkapocs ízületi) terápia",          "50 P", "TMI (állkapocs ízületi) terápia – 50 perc"],
  ["Csoportos gerinc core edzés",              "50 P", "Csoportos gerinc core edzés – 50 perc"],
  ["Csoportos gerinc core edzés",              "30 P", "Csoportos gerinc core edzés – 30 perc"],
  ["Kineziológiai tape",                   undefined, "Kineziológiai tape"],
  ["Dinamikus tape",                       undefined, "Dinamikus tape"],
];

// Tudott es elfogadott elteresek. A felhasznalo dontese, datummal, hogy
// kesobb is lehessen tudni, miert van itt kivetel.
//
// 2026-10-07 — Gombas Adam csoportos-edzes felulirasai (15 000 / 8 000) a
// "kitoltes idotartam szerint" gombbol maradtak ott, nem szandekos arak.
// Adam nem tart csoportos orat, ezert ez a gyakorlatban nem fordulhat elo.
// A felhasznalo kifejezetten kerte, hogy ezt engedjuk el. Ha egyszer megis
// tartana csoportos orat, ezt a ket sort torolni kell innen.
const ELFOGADOTT = [
  { szolgaltatas: "Csoportos gerinc core edzés – 50 perc", munkatars: "Gombás Ádám" },
  { szolgaltatas: "Csoportos gerinc core edzés – 30 perc", munkatars: "Gombás Ádám" },
];

const elfogadott = (szolgaltatas, ki) =>
  ELFOGADOTT.some(e => e.szolgaltatas === szolgaltatas && e.munkatars === ki);

let hiba = 0, megjegyzes = 0, kihagyott = 0;

try {
  const sz = await pool.query(`SELECT id, name, price FROM "Service" WHERE active`);
  const fel = await pool.query(
    `SELECT p."staffId", p."serviceId", p.price, u.name AS munkatars
     FROM "StaffServicePrice" p JOIN "User" u ON u.id = p."staffId" WHERE u.active`);

  const db = new Map(sz.rows.map(r => [r.name, r]));
  const parositott = new Set();

  for (const [nev, idotartam, dbNev] of PAROK) {
    const nyilvanos = SZOLGALTATASOK.find(x => x.name === nev && x.duration === idotartam);
    if (!nyilvanos) {
      console.log(`  HIBA  A parositasban szerepel, de a nyilvanos listaban nincs: "${nev}" ${idotartam ?? ""}`);
      hiba++; continue;
    }
    const s = db.get(dbNev);
    if (!s) {
      console.log(`  HIBA  A foglalorendszerben nincs ilyen szolgaltatas: "${dbNev}"`);
      hiba++; continue;
    }
    parositott.add(dbNev);

    // Minden ar, amit ezert a szolgaltatasert kerhetnek
    const arak = [{ ki: "listaár", ar: s.price }];
    for (const f of fel.rows) if (f.serviceId === s.id) arak.push({ ki: f.munkatars, ar: f.price });

    for (const { ki, ar } of arak) {
      if (ar > nyilvanos.price && elfogadott(dbNev, ki)) {
        kihagyott++;
      } else if (ar > nyilvanos.price) {
        console.log(`  HIBA  ${dbNev}`);
        console.log(`        a weboldalon ${forint(nyilvanos.price)}, de ${ki} szerint ${forint(ar)} — TOBBET kernek, mint ami ki van irva`);
        hiba++;
      } else if (ar < nyilvanos.price) {
        console.log(`  megj. ${dbNev}: ${ki} olcsobb (${forint(ar)} a kiirt ${forint(nyilvanos.price)} helyett)`);
        megjegyzes++;
      }
    }
  }

  // Ami a foglalorendszerben van, de a nyilvanos listan nincs
  for (const s of sz.rows) {
    if (!parositott.has(s.name)) {
      console.log(`  megj. A foglalorendszerben van, de a nyilvanos arlistan nincs: "${s.name}" (${forint(s.price)})`);
      megjegyzes++;
    }
  }

  console.log(
    hiba === 0
      ? `\nRendben. A weboldalon sehol nem all kevesebb ar, mint amennyit szamolnak.` +
        (megjegyzes ? ` (${megjegyzes} megjegyzes fent.)` : "") +
        (kihagyott ? ` ${kihagyott} tudott elteres kihagyva — lasd az ELFOGADOTT listat.` : "")
      : `\n${hiba} eltéres: valahol TOBBET kernek, mint ami a weboldalon all.`
  );
} catch (err) {
  console.error("Hiba:", err.message);
  hiba++;
} finally {
  await pool.end();
}

process.exitCode = hiba === 0 ? 0 : 1;
