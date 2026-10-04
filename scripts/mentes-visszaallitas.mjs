// Mentes visszaallitasa.
//
// 1) Csak kicsomagolas, hogy megnezhesd, mi van benne:
//      node --env-file=.env.prod scripts/mentes-visszaallitas.mjs <fajl>
//
// 2) Visszatoltes egy adatbazisba (a celt KIFEJEZETTEN meg kell adni):
//      node --env-file=.env.prod scripts/mentes-visszaallitas.mjs <fajl> --cel "postgres://..."
//
// A cel sosem alapertelmezett. Ha az lenne, egy elgepeles az eles adatbazist
// irna felul azzal, ami a mentesben van — es a kozben keletkezett foglalasok
// nyom nelkul eltunnenek.
//
// A jelszo a MENTES_JELSZO kornyezeti valtozobol jon, ugyanonnan, ahova a
// mentes irta.
import { execFileSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const [fajlArg, ...tobbi] = process.argv.slice(2);
const celIndex = tobbi.indexOf("--cel");
const cel = celIndex >= 0 ? tobbi[celIndex + 1] : null;

function psqlUtja() {
  const jeloltek = [
    process.env.PSQL,
    "C:/Program Files/PostgreSQL/17/bin/psql.exe",
    "C:/Program Files/PostgreSQL/16/bin/psql.exe",
    "C:/Program Files/PostgreSQL/pgsql/bin/psql.exe",
    "psql",
  ].filter(Boolean);
  for (const j of jeloltek) {
    try {
      execFileSync(j, ["--version"], { stdio: "ignore" });
      return j;
    } catch {}
  }
  throw new Error("Nem talalom a psql programot. Allitsd be a PSQL kornyezeti valtozot.");
}

function kibont(fajl, jelszo) {
  const adat = fs.readFileSync(fajl);
  if (adat.subarray(0, 5).toString() !== "RSPB1") {
    throw new Error("Ez nem ReStart Physio mentes, vagy serult a fajl.");
  }
  const salt = adat.subarray(5, 21);
  const iv = adat.subarray(21, 33);
  const authTag = adat.subarray(33, 49);
  const titkos = adat.subarray(49);

  const kulcs = crypto.scryptSync(jelszo, salt, 32);
  const megfejto = crypto.createDecipheriv("aes-256-gcm", kulcs, iv);
  megfejto.setAuthTag(authTag);

  let tomoritett;
  try {
    tomoritett = Buffer.concat([megfejto.update(titkos), megfejto.final()]);
  } catch {
    throw new Error(
      "A megfejtes nem sikerult. Vagy rossz a MENTES_JELSZO, vagy megserult a fajl."
    );
  }
  return zlib.gunzipSync(tomoritett);
}

try {
  if (!fajlArg) {
    console.error("Add meg a mentesfajlt. Pelda:");
    console.error("  node --env-file=.env.prod scripts/mentes-visszaallitas.mjs <fajl>");
    process.exit(1);
  }
  if (!fs.existsSync(fajlArg)) throw new Error(`Nincs ilyen fajl: ${fajlArg}`);

  const jelszo = process.env.MENTES_JELSZO;
  if (!jelszo) throw new Error("Nincs MENTES_JELSZO. Enelkul a mentes nem fejtheto meg.");

  console.log(`  Mentes: ${path.basename(fajlArg)}`);
  const sql = kibont(fajlArg, jelszo);
  console.log(`  Megfejtve es kicsomagolva: ${(sql.length / 1024).toFixed(1)} kB SQL`);

  // mit tartalmaz? — ebbol latszik, hogy nem ures a mentes
  const szoveg = sql.toString("utf8");
  const tablak = [...szoveg.matchAll(/CREATE TABLE public\."([^"]+)"/g)].map((m) => m[1]);
  const sorok = [...szoveg.matchAll(/^COPY public\."([^"]+)"/gm)].map((m) => m[1]);
  console.log(`  Tablak: ${tablak.length ? tablak.join(", ") : "(egy sincs!)"}`);
  console.log(`  Adatot tartalmazo tablak: ${sorok.length ? sorok.join(", ") : "(egy sincs)"}`);

  if (!cel) {
    const ki = fajlArg.replace(/\.enc$/, "").replace(/\.gz$/, "") + ".sql";
    fs.writeFileSync(ki, sql);
    console.log(`\n  Kiirva ide: ${ki}`);
    console.log(`  FIGYELEM: ez a fajl TITKOSITATLAN paciensadatot tartalmaz.`);
    console.log(`  Ha vegeztel vele, torold.`);
    console.log(`\n  Visszatoltes egy adatbazisba:`);
    console.log(`    node --env-file=.env.prod scripts/mentes-visszaallitas.mjs "${fajlArg}" --cel "postgres://..."`);
    process.exit(0);
  }

  console.log(`\n  Visszatoltes ide: ${cel.replace(/:[^:@/]+@/, ":****@")}`);
  const ideiglenes = path.join(process.env.TEMP ?? ".", `visszaallitas-${Date.now()}.sql`);
  fs.writeFileSync(ideiglenes, sql);
  try {
    execFileSync(psqlUtja(), ["--quiet", "--file", ideiglenes, cel], { stdio: "inherit" });
    console.log("\n  Kesz.");
  } finally {
    fs.unlinkSync(ideiglenes); // a titkositatlan masolat ne maradjon ott
  }
} catch (err) {
  console.error("Hiba:", err.message);
  process.exitCode = 1;
}
