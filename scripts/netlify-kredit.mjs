// Netlify kreditfogyasztas becslese.
//
//   node scripts/netlify-kredit.mjs
//
// A Netlify nem ad nyilvanos vegpontot a kreditfogyasztasra, csak a felulet
// mutatja. Viszont a fogyasztas gyakorlatilag egyetlen tetelbol all: egy ELES
// telepites 15 kredit, minden mas elenyeszo (2321 keres = fel kredit).
//
// Ezert egy ismert meresi pontbol indulunk ki, es azota szamoljuk a telepiteseket.
// A kiindulast a scripts/netlify-kredit-alap.json tartalmazza; ha a Netlify
// feluleten pontosabb szamot latsz, ird at ott.
import fs from "node:fs";
import path from "node:path";

const ALAP_FAJL = "scripts/netlify-kredit-alap.json";
const KREDIT_PER_TELEPITES = 15;
// a keretet es a ciklus veget az alapfajl mondja meg — csomagvaltaskor csak ott kell atirni

function token() {
  const p = path.join(
    process.env.APPDATA || `${process.env.HOME}/.config`,
    "netlify/Config/config.json"
  );
  const o = JSON.parse(fs.readFileSync(p, "utf8"));
  const u = Object.values(o.users)[0];
  return u.auth.token;
}

async function hivas(ut, t) {
  const r = await fetch("https://api.netlify.com" + ut, {
    headers: { authorization: "Bearer " + t },
  });
  if (!r.ok) throw new Error(`HTTP ${r.status} — ${ut}`);
  return r.json();
}

try {
  const alap = JSON.parse(fs.readFileSync(ALAP_FAJL, "utf8"));
  const t = token();

  const fiokok = await hivas("/api/v1/accounts", t);
  const fiok = fiokok[0];

  const sav = await hivas(`/api/v1/accounts/${fiok.id}/bandwidth`, t);
  const HAVI_KERET = alap.keret ?? 300;
  const ciklusVege = new Date(alap.lejar ?? sav.period_end_date);
  const hatraNap = Math.max(0, Math.ceil((ciklusVege - new Date()) / 86400000));

  // eles telepitesek a meresi pont ota, minden projekten
  const projektek = await hivas(`/api/v1/${fiok.slug}/sites`, t);
  let ujTelepites = 0;
  const reszletek = [];
  for (const p of projektek) {
    const deployok = await hivas(`/api/v1/sites/${p.id}/deploys`, t);
    for (const d of deployok) {
      const mikor = new Date(d.created_at);
      if (mikor > new Date(alap.idopont) && d.context === "production") {
        ujTelepites++;
        reszletek.push(`${d.created_at.slice(5, 16)}  ${p.name}`);
      }
    }
  }

  const becsult = alap.kredit + ujTelepites * KREDIT_PER_TELEPITES;
  const maradek = HAVI_KERET - becsult;

  console.log(`\n  Számlázási ciklus vége: ${sav.period_end_date.slice(0, 10)}  (${hatraNap} nap múlva)`);
  console.log(`  Sávszélesség:           ${(sav.used / 1048576).toFixed(0)} MB`);
  console.log();
  console.log(`  Mérési pont (${alap.idopont.slice(0, 16)}):  ${alap.kredit} kredit`);
  console.log(`  Azóta éles telepítés:                 ${ujTelepites} db  (${ujTelepites * KREDIT_PER_TELEPITES} kredit)`);
  for (const r of reszletek) console.log(`     ${r}`);
  console.log();
  console.log(`  BECSÜLT FOGYASZTÁS:  ${becsult} / ${HAVI_KERET}`);
  console.log(`  MARADÉK:             ${maradek} kredit  =  ${Math.floor(maradek / KREDIT_PER_TELEPITES)} további telepítés`);

  if (maradek < 30) console.log(`\n  FIGYELEM: kevesebb mint két telepítésnyi keret maradt.`);
  else if (maradek < 60) console.log(`\n  Figyelj: négy telepítésnyi alatt vagyunk.`);
} catch (err) {
  console.error("Hiba:", err.message);
  process.exitCode = 1;
}
