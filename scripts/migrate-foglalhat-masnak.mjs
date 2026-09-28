// Új jogosultság: foglalhat-e a felhasználó más munkatárs nevében.
// Futtatás:  node --env-file=.env.local scripts/migrate-foglalhat-masnak.mjs
//
// Idempotens. Alapértelmezés: senki nem foglalhat másnak. A meglévő
// adminisztrátorok viszont megkapják a jogot, hogy a mostani működésük
// ne változzon egyik pillanatról a másikra.
import { pool } from "../lib/db.ts";

try {
  await pool.query(
    `ALTER TABLE "User"
     ADD COLUMN IF NOT EXISTS "canBookOthers" boolean NOT NULL DEFAULT false`
  );
  console.log('A "canBookOthers" oszlop keszen all.');

  const volt = await pool.query(
    `SELECT count(*)::int AS db FROM "User" WHERE "canBookOthers"`
  );

  if (volt.rows[0].db === 0) {
    const r = await pool.query(
      `UPDATE "User" SET "canBookOthers" = true WHERE role = 'ADMIN' RETURNING name`
    );
    console.log(`Adminisztratorok megkaptak a jogot (${r.rowCount}):`);
    for (const x of r.rows) console.log("  " + x.name);
  } else {
    console.log("Mar volt beallitott jog, a meglevo ertekekhez nem nyulunk.");
  }
} catch (err) {
  console.error("Hiba:", err.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
