// Teljes adatbazis-mentes, titkositva.
//
//   node --env-file=.env.prod scripts/mentes.mjs
//
// MIERT: a Supabase Free csomagjaban nincs automatikus mentes. Ha az adatbazis
// elveszik vagy valaki veletlenul torol, nincs visszaut — paciensnevekkel,
// idopontokkal es elerhetosegekkel egyutt.
//
// MIERT TITKOSITVA: a mentes paciensadatot tartalmaz, es felhobe szinkronizalt
// mappaba kerul. Titkositas nelkul a felhoszolgaltato is adatfeldolgozova
// valna ebben a lancban. Igy viszont csak egy olvashatatlan fajl ul ott.
//
// A JELSZO: a MENTES_JELSZO kornyezeti valtozobol jon. Ha nincs, a szkript
// generál egyet es beleirja a .env.prod fajlba — ilyenkor KIIRJA a kepernyore,
// es azt le kell irni egy jelszokezelobe vagy papirra. Ha csak a gepen marad
// es a gep meghal, a mentes hasznalhatatlan.
//
// Visszaallitas:  node scripts/mentes-visszaallitas.mjs <fajl>
import { execFileSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const MEGTARTOTT = 12; // ennyi legutobbi mentes marad meg

// --- a pg_dump megkeresese -------------------------------------------------
function pgDumpUtja() {
  const jeloltek = [
    process.env.PG_DUMP,
    "C:/Program Files/PostgreSQL/17/bin/pg_dump.exe",
    "C:/Program Files/PostgreSQL/16/bin/pg_dump.exe",
    "C:/Program Files/PostgreSQL/pgsql/bin/pg_dump.exe",
    "pg_dump",
  ].filter(Boolean);
  for (const j of jeloltek) {
    try {
      execFileSync(j, ["--version"], { stdio: "ignore" });
      return j;
    } catch {}
  }
  throw new Error("Nem talalom a pg_dump programot. Allitsd be a PG_DUMP kornyezeti valtozot.");
}

// --- a celmappa ------------------------------------------------------------
function celMappa() {
  // Kezzel megadott mappa mindent felulir.
  if (process.env.MENTES_MAPPA) return path.join(process.env.MENTES_MAPPA, "ReStart Physio mentesek");

  // A OneDrive tobbfele kornyezeti valtozot allit be attol fuggoen, hogy
  // szemelyes vagy munkahelyi fiokkal jelentkeztek be. Mindharmat megnezzuk.
  for (const v of ["OneDriveConsumer", "OneDriveCommercial", "OneDrive"]) {
    const ut = process.env[v];
    if (ut && fs.existsSync(ut)) return path.join(ut, "ReStart Physio mentesek");
  }

  // Ha a OneDrive nem fut, akkor sem maradunk mentes nelkul — csak ilyenkor
  // a masolat ugyanazon a gepen van, mint az eredeti.
  return path.join(process.cwd(), "mentesek");
}

// --- jelszo ----------------------------------------------------------------
function jelszo() {
  if (process.env.MENTES_JELSZO) return { ertek: process.env.MENTES_JELSZO, uj: false };

  const uj = crypto.randomBytes(24).toString("base64url");
  const env = ".env.prod";
  const sor = `\nMENTES_JELSZO=${uj}\n`;
  if (fs.existsSync(env)) fs.appendFileSync(env, sor, "utf8");
  else fs.writeFileSync(env, sor.trimStart(), "utf8");
  return { ertek: uj, uj: true };
}

// --- titkositas ------------------------------------------------------------
// AES-256-GCM. A fajl eleje: "RSPB1" | salt(16) | iv(12) | authTag(16),
// utana a tomoritett, titkositott adat.
function titkosit(adat, jelszoErtek) {
  const salt = crypto.randomBytes(16);
  const iv = crypto.randomBytes(12);
  const kulcs = crypto.scryptSync(jelszoErtek, salt, 32);
  const rejtjelezo = crypto.createCipheriv("aes-256-gcm", kulcs, iv);
  const tomoritett = zlib.gzipSync(adat, { level: 9 });
  const titkos = Buffer.concat([rejtjelezo.update(tomoritett), rejtjelezo.final()]);
  return Buffer.concat([Buffer.from("RSPB1"), salt, iv, rejtjelezo.getAuthTag(), titkos]);
}

// --- futtatas --------------------------------------------------------------
try {
  const kapcsolat = process.env.DATABASE_URL;
  if (!kapcsolat) throw new Error("Nincs DATABASE_URL. Futtasd igy: node --env-file=.env.prod scripts/mentes.mjs");

  const mappa = celMappa();
  fs.mkdirSync(mappa, { recursive: true });

  const most = new Date();
  const belyeg =
    most.getFullYear() +
    "-" + String(most.getMonth() + 1).padStart(2, "0") +
    "-" + String(most.getDate()).padStart(2, "0") +
    "-" + String(most.getHours()).padStart(2, "0") +
    String(most.getMinutes()).padStart(2, "0");

  console.log("  Mentes keszul…");
  const nyers = execFileSync(pgDumpUtja(), ["--no-owner", "--no-privileges", kapcsolat], {
    maxBuffer: 1024 * 1024 * 512,
  });

  const { ertek: jelszoErtek, uj: ujJelszo } = jelszo();
  const titkositott = titkosit(nyers, jelszoErtek);

  const fajl = path.join(mappa, `restartphysio-${belyeg}.sql.gz.enc`);
  fs.writeFileSync(fajl, titkositott);

  // regiek forgatasa
  const regiek = fs
    .readdirSync(mappa)
    .filter((n) => /^restartphysio-.*\.sql\.gz\.enc$/.test(n))
    .sort()
    .reverse();
  let torolt = 0;
  for (const n of regiek.slice(MEGTARTOTT)) {
    fs.unlinkSync(path.join(mappa, n));
    torolt++;
  }

  const kb = (m) => (m / 1024).toFixed(1) + " kB";
  console.log(`  Kesz: ${path.basename(fajl)}`);
  console.log(`  Mappa: ${mappa}`);
  console.log(`  Meret: ${kb(titkositott.length)} titkositva (nyersen ${kb(nyers.length)})`);
  console.log(`  Megtartott mentesek: ${Math.min(regiek.length, MEGTARTOTT)}${torolt ? `, torolve: ${torolt}` : ""}`);

  if (ujJelszo) {
    console.log("\n" + "!".repeat(62));
    console.log("  UJ TITKOSITASI JELSZO KESZULT, es bekerult a .env.prod fajlba.");
    console.log("  IRD LE EGY JELSZOKEZELOBE VAGY PAPIRRA — enelkul a mentes");
    console.log("  visszaallithatatlan. Ha csak a gepen marad, es a gep meghal,");
    console.log("  a mentes is hasznalhatatlan.\n");
    console.log("    " + jelszoErtek + "\n");
    console.log("!".repeat(62));
  }
} catch (err) {
  console.error("Hiba:", err.message);
  process.exitCode = 1;
}
