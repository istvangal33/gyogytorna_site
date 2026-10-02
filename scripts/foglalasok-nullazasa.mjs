// A foglalasok (es a hozzajuk tartozo vendegkartonok) torlese.
//
// Eloszor MINDIG szarazon fut — csak megmutatja, mit torolne:
//   node --env-file=.env.prod scripts/foglalasok-nullazasa.mjs
//
// A tenyleges torleshez kifejezett megerosites kell:
//   node --env-file=.env.prod scripts/foglalasok-nullazasa.mjs --torlom
//
// MIT NEM BANT: a felhasznaloi fiokokat ("User"), a szolgaltatasokat
// ("Service"), a munkaidot ("WorkingHours") es a tavolleteket ("TimeOff").
// Ezek a rendelo beallitasai, nem pacienshez tartozo adatok.
//
// A vendegkartonokbol csak azokat torli, amelyekhez a foglalasok torlese utan
// mar egy foglalas sem tartozik. Igy ha valami miatt maradna foglalas, az o
// vendege is megmarad — nem keletkezik gazdatlan hivatkozas.
import { pool } from "../lib/db.ts";

const ELES = process.argv.includes("--torlom");
const IDOZONA = "Europe/Budapest";

const fmt = (d) =>
  new Intl.DateTimeFormat("hu-HU", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: IDOZONA,
  }).format(d);

try {
  const foglalasok = await pool.query(
    `SELECT b."startsAt", b.status, c.name, c.email
     FROM "Booking" b JOIN "Client" c ON c.id = b."clientId"
     ORDER BY b."startsAt"`
  );

  const vendegek = await pool.query(`SELECT name, email, phone FROM "Client" ORDER BY "createdAt"`);

  console.log(`\n  FOGLALASOK (${foglalasok.rowCount}):`);
  for (const x of foglalasok.rows) {
    console.log(
      `    ${fmt(x.startsAt).padEnd(18)}${String(x.name).padEnd(16)}${String(x.status).padEnd(10)}${x.email ?? "nincs e-mail"}`
    );
  }

  console.log(`\n  VENDEGKARTONOK (${vendegek.rowCount}):`);
  for (const x of vendegek.rows) {
    console.log(`    ${String(x.name).padEnd(18)}${String(x.email ?? "-").padEnd(26)}${x.phone ?? "-"}`);
  }

  // ami biztosan marad
  for (const [cimke, tabla] of [
    ["felhasznalo", "User"],
    ["szolgaltatas", "Service"],
    ["munkaido", "WorkingHours"],
    ["tavollet", "TimeOff"],
  ]) {
    const r = await pool.query(`SELECT count(*)::int d FROM "${tabla}"`);
    console.log(`  MARAD: ${cimke.padEnd(14)}${r.rows[0].d}`);
  }

  if (!ELES) {
    console.log(`\n  ---- SZARAZ FUTAS: semmi nem torlodott ----`);
    console.log(`  Ha tenyleg ezt akarod torolni, futtasd ujra igy:`);
    console.log(`\n    node --env-file=.env.prod scripts/foglalasok-nullazasa.mjs --torlom\n`);
    process.exit(0);
  }

  await pool.query("BEGIN");
  const tf = await pool.query(`DELETE FROM "Booking"`);
  const tv = await pool.query(
    `DELETE FROM "Client" c
     WHERE NOT EXISTS (SELECT 1 FROM "Booking" b WHERE b."clientId" = c.id)`
  );
  await pool.query("COMMIT");

  console.log(`\n  TOROLVE: ${tf.rowCount} foglalas, ${tv.rowCount} vendegkarton.`);
  console.log(`  A felhasznaloi fiokok, szolgaltatasok es a munkaido erintetlen.\n`);
} catch (err) {
  await pool.query("ROLLBACK").catch(() => {});
  console.error("Hiba:", err.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
