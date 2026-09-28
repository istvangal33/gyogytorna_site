// A Netlify utemezett fuggvenyek ellenorzese.
//
//   node --env-file=.env.local scripts/teszt-netlify-fuggvenyek.mjs
//
// Futo dev szervert feltetelez a 3000-es porton. Ezek a fuggvenyek felugyelet
// nelkul futnak elesben, ezert a hibaagakat is ellenorizzuk: ha csendben
// elszallnanak, senki nem venne eszre.
const BASE = "http://localhost:3000";

let siker = 0, bukas = 0;
const bukottak = [];
const ok = (cimke, felt, reszlet = "") => {
  if (felt) { siker++; console.log("  OK    " + cimke); }
  else { bukas++; bukottak.push(cimke); console.log("  BUKAS " + cimke + (reszlet ? "  -> " + reszlet : "")); }
};
const fejezet = (cim) => console.log("\n=== " + cim + " ===");

// a fuggvenyek a kornyezeti valtozokbol olvasnak, ezert azokat allitgatjuk
const eredetiTitok = process.env.CRON_SECRET;
const eredetiCim = process.env.NEXT_PUBLIC_SITE_URL;

// a modulok ujratoltese nem kell: minden hivaskor frissen olvassak a kornyezetet
const { default: emlekezteto } = await import("../netlify/functions/emlekezteto.mjs");
const { default: adattorles } = await import("../netlify/functions/adattorles.mjs");

try {
  process.env.NEXT_PUBLIC_SITE_URL = BASE;

  fejezet("1. Hianyzo beallitasok eseten nem fut le");

  process.env.CRON_SECRET = "";
  let r = await emlekezteto();
  ok("titok nelkul az emlekezteto 503-at ad", r.status === 503, "HTTP " + r.status);
  r = await adattorles(null, {});
  ok("titok nelkul az adattorles 503-at ad", r.status === 503, "HTTP " + r.status);

  process.env.CRON_SECRET = eredetiTitok;
  process.env.NEXT_PUBLIC_SITE_URL = "";
  const regiUrl = process.env.URL;
  delete process.env.URL;
  r = await emlekezteto();
  ok("cim nelkul az emlekezteto 503-at ad", r.status === 503, "HTTP " + r.status);
  r = await adattorles(null, {});
  ok("cim nelkul az adattorles 503-at ad", r.status === 503, "HTTP " + r.status);
  if (regiUrl !== undefined) process.env.URL = regiUrl;

  fejezet("2. Rossz titokkal nem vegez munkat");

  process.env.NEXT_PUBLIC_SITE_URL = BASE;
  process.env.CRON_SECRET = "teljesen-rossz-titok";
  r = await emlekezteto();
  ok("rossz titokkal az emlekezteto 502-t ad", r.status === 502, "HTTP " + r.status);
  r = await adattorles(null, {});
  ok("rossz titokkal az adattorles 502-t ad", r.status === 502, "HTTP " + r.status);

  fejezet("3. Helyes beallitassal lefut");

  process.env.CRON_SECRET = eredetiTitok;
  r = await emlekezteto();
  ok("az emlekezteto lefut", r.status === 200, "HTTP " + r.status);
  const e = await r.json();
  ok("az emlekezteto valasza ertelmezheto", typeof e.talalt === "number", JSON.stringify(e));

  r = await adattorles(null, { proba: true });
  ok("az adattorles proba modban lefut", r.status === 200, "HTTP " + r.status);
  const a = await r.json();
  ok("proba modban tenyleg nem torol", a.proba === true, JSON.stringify(a));
  ok("a valasz tartalmazza a hatarnapot", typeof a.hatarnap === "string", JSON.stringify(a));

  fejezet("4. Az utemezes a netlify.toml-ban van");

  const fs = await import("node:fs");
  const toml = fs.readFileSync("netlify.toml", "utf8");
  ok('van utemezes az "emlekezteto" fuggvenyhez', /\[functions\."emlekezteto"\][\s\S]*?schedule\s*=/.test(toml));
  ok('van utemezes az "adattorles" fuggvenyhez', /\[functions\."adattorles"\][\s\S]*?schedule\s*=/.test(toml));
  ok("az emlekezteto naponta egyszer fut", toml.includes('"0 16 * * *"'));
  ok("az adattorles havonta egyszer fut", toml.includes('"0 3 1 * *"'));
} finally {
  process.env.CRON_SECRET = eredetiTitok;
  if (eredetiCim === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
  else process.env.NEXT_PUBLIC_SITE_URL = eredetiCim;

  console.log("\n" + "=".repeat(46));
  console.log(`  SIKERES: ${siker}    BUKOTT: ${bukas}`);
  if (bukottak.length) {
    console.log("\n  Bukott ellenorzesek:");
    for (const x of bukottak) console.log("    - " + x);
  }
  console.log("=".repeat(46));
  if (bukas > 0) process.exitCode = 1;
}
