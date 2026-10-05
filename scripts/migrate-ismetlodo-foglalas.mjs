// Ismetlodo foglalas: a sorozat cimkeje.
//
// Futtatas:  node --env-file=.env.local scripts/migrate-ismetlodo-foglalas.mjs
//       es:  node --env-file=.env.prod  scripts/migrate-ismetlodo-foglalas.mjs
//
// MIERT: egy kezelesi sorozat tipikusan hetente ismetlodik, es ezt eddig
// egyesevel kellett felvinni. A sorozat MINDEN alkalma onallo foglalas marad
// — sajat hellyel a naptarban, sajat allapottal, sajat arral es sajat
// emlekeztetovel. A seriesId csak egy cimke rajtuk: ebbol tudjuk, hogy
// egyutt keszultek, es ezert lehet a hatralevoket egy mozdulattal lemondani.
//
// Idempotens.
import { pool } from "../lib/db.ts";

try {
  await pool.query(`ALTER TABLE "Booking" ADD COLUMN IF NOT EXISTS "seriesId" uuid`);

  // A sorozat alkalmait mindig egyutt kerdezzuk le (hanyadik, mi a hatralevo).
  await pool.query(
    `CREATE INDEX IF NOT EXISTS "Booking_seriesId_idx" ON "Booking" ("seriesId") WHERE "seriesId" IS NOT NULL`
  );

  const r = await pool.query(
    `SELECT count(*)::int AS db, count(DISTINCT "seriesId")::int AS sorozat
     FROM "Booking" WHERE "seriesId" IS NOT NULL`
  );
  console.log(
    `Kesz. A seriesId oszlop letezik. Jelenleg ${r.rows[0].db} foglalas tartozik ` +
      `${r.rows[0].sorozat} sorozathoz.`
  );
} catch (err) {
  console.error("Hiba:", err.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
