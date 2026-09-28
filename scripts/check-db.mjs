// Adatbázis-kapcsolat ellenőrzése.
// Futtatás a projekt gyökeréből:  node --env-file=.env.local scripts/check-db.mjs
import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
  console.error("HIBA: nincs DATABASE_URL. Futtasd így: node --env-file=.env.local scripts/check-db.mjs");
  process.exit(1);
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

try {
  const info = await pool.query(
    "SELECT current_database() AS db, current_user AS felhasznalo, version() AS verzio"
  );
  const { db, felhasznalo, verzio } = info.rows[0];

  console.log("Kapcsolat OK");
  console.log("  adatbázis:  ", db);
  console.log("  felhasználó:", felhasznalo);
  console.log("  szerver:    ", verzio.split(",")[0]);

  const tables = await pool.query(
    `SELECT table_name
     FROM information_schema.tables
     WHERE table_schema = 'public'
     ORDER BY table_name`
  );

  console.log(`\nTáblák a public sémában (${tables.rowCount} db):`);
  if (tables.rowCount === 0) {
    console.log("  (egy sincs — a sémát még létre kell hozni)");
  } else {
    for (const row of tables.rows) console.log("  -", row.table_name);
  }
} catch (err) {
  // a connection stringet szándékosan nem írjuk ki, mert jelszót tartalmaz
  console.error("Kapcsolódási hiba:", err.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
