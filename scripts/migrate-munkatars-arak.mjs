// Munkatarsankenti ar-felulirás.
//
// Futtatas:  node --env-file=.env.local scripts/migrate-munkatars-arak.mjs
//       es:  node --env-file=.env.prod  scripts/migrate-munkatars-arak.mjs
//
// MIERT: egy szolgaltatasnak eddig egyetlen ara volt, munkatarstol fuggetlenul.
// A valosagban viszont ugyanaz a kezeles munkatarsankent mas penzbe kerulhet.
//
// A megoldas FELULIRAS, nem teljes arlista: ahol nincs sor ebben a tablaban,
// ott a Service.price ervenyes. Igy aki az arlistat koveti, annal semmit nem
// kell karbantartani — az aremeles automatikusan ervenyesul nala.
//
// A foglalasra tovabbra is RAMASOLODIK az ar, tehat egy kesobbi valtozas a
// meglevo foglalasokat nem irja at visszamenoleg.
//
// Idempotens.
import { pool } from "../lib/db.ts";

try {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS "StaffServicePrice" (
      "staffId"   uuid    NOT NULL REFERENCES "User"(id)    ON DELETE CASCADE,
      "serviceId" uuid    NOT NULL REFERENCES "Service"(id) ON DELETE CASCADE,
      price       integer NOT NULL CHECK (price >= 0),
      "createdAt" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "updatedAt" timestamp(3) with time zone DEFAULT now() NOT NULL,
      PRIMARY KEY ("staffId", "serviceId")
    )
  `);

  // A foglalas mentesekor munkatarsra szurunk, az admin feluleten pedig
  // munkatarsankent listazunk — mindketto ezt az indexet hasznalja.
  await pool.query(
    `CREATE INDEX IF NOT EXISTS "StaffServicePrice_staffId_idx" ON "StaffServicePrice" ("staffId")`
  );

  const r = await pool.query(`SELECT count(*)::int d FROM "StaffServicePrice"`);
  console.log(`Kesz. A StaffServicePrice tabla letezik, ${r.rows[0].d} felulirassal.`);
} catch (err) {
  console.error("Hiba:", err.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
