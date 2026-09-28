// A User tablahoz hozzaadja a passwordChangedAt oszlopot.
//
//   node --env-file=.env.local scripts/migrate-jelszo-valtozott.mjs
//
// Ez teszi lehetove, hogy jelszovaltas utan a korabbi bejelentkezesek
// ervenyuket veszitsek: a munkamenet magaval hozza a belepeskor ervenyes
// idobelyeget, es ha az adatbazisban mar ujabb all, a munkamenet elavult.
//
// A meglevo sorokban szandekosan NULL marad az ertek: igy a migracio nem
// lepteti ki azokat, akik eppen be vannak jelentkezve.
import { pool } from "../lib/db.ts";

try {
  await pool.query(
    `ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "passwordChangedAt" timestamptz`
  );
  console.log("OK: User.passwordChangedAt keszen all.");

  const r = await pool.query(
    `SELECT count(*)::int AS osszes,
            count("passwordChangedAt")::int AS kitoltott
     FROM "User"`
  );
  console.log(`   felhasznalok: ${r.rows[0].osszes}, ebbol kitoltott belyeg: ${r.rows[0].kitoltott}`);
} catch (err) {
  console.error("Hiba:", err.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
