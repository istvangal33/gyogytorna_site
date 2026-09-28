// Emlékeztető levelek nyilvántartása.
// Futtatás:  node --env-file=.env.local scripts/migrate-emlekezteto.mjs
//
// Idempotens.
import { pool } from "../lib/db.ts";

try {
  await pool.query(
    `ALTER TABLE "Booking"
     ADD COLUMN IF NOT EXISTS "reminderSentAt" timestamptz`
  );

  // A küldésre váró sorok keresése ezen a szűrésen fut, érdemes indexelni.
  await pool.query(
    `CREATE INDEX IF NOT EXISTS "Booking_emlekezteto_idx"
     ON "Booking" ("startsAt")
     WHERE status = 'BOOKED' AND "reminderSentAt" IS NULL`
  );

  console.log('A "reminderSentAt" oszlop es az index keszen all.');

  const r = await pool.query(
    `SELECT count(*)::int AS db FROM "Booking" WHERE "reminderSentAt" IS NOT NULL`
  );
  console.log(`Eddig kikuldott emlekezteto: ${r.rows[0].db}`);
} catch (err) {
  console.error("Hiba:", err.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
