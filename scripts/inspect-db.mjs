// Séma-részletek kiírása: enumok, megszorítások, indexek.
// Futtatás:  node --env-file=.env.local scripts/inspect-db.mjs
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const enums = await pool.query(`
  SELECT t.typname, string_agg(l.enumlabel, ', ' ORDER BY l.enumsortorder) AS ertekek
  FROM pg_type t
  JOIN pg_enum l ON l.enumtypid = t.oid
  GROUP BY t.typname
  ORDER BY t.typname
`);
console.log("== Enumok ==");
for (const r of enums.rows) console.log(`  ${r.typname}: ${r.ertekek}`);

const cons = await pool.query(`
  SELECT conrelid::regclass::text AS tabla, contype, pg_get_constraintdef(oid) AS def
  FROM pg_constraint
  WHERE connamespace = 'public'::regnamespace AND contype IN ('u', 'x', 'c', 'f')
  ORDER BY 1, 2
`);
console.log("\n== Megszorítások ==");
for (const r of cons.rows) console.log(`  ${r.tabla.padEnd(15)} ${r.def}`);

const idx = await pool.query(`
  SELECT indexdef FROM pg_indexes WHERE schemaname = 'public' ORDER BY tablename, indexname
`);
console.log("\n== Indexek ==");
for (const r of idx.rows) console.log("  " + r.indexdef.replace(" ON public.", " ON "));

await pool.end();
