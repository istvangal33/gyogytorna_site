// Ki szerepeljen a naptarban munkatarskent?
//
// Futtatas:  node --env-file=.env.local scripts/migrate-naptarban-szerepel.mjs
//       es:  node --env-file=.env.prod  scripts/migrate-naptarban-szerepel.mjs
//
// MIERT: eddig minden aktiv felhasznalo automatikusan oszlopot kapott a
// naptarban. A rendszert viszont olyan is adminisztralhatja, aki nem fogad
// pacienseket — az o oszlopa csak foglalja a helyet, es tevedesbol oda is
// kerulhet foglalas.
//
// Az uj oszlop alapertelmezese `true`, hogy a meglevo munkatarsak
// viselkedese ne valtozzon. Akinel ez nem igaz, azt a felhasznaloi feluleten
// lehet atallitani.
//
// Idempotens.
import { pool } from "../lib/db.ts";

try {
  await pool.query(
    `ALTER TABLE "User"
     ADD COLUMN IF NOT EXISTS "takesBookings" boolean NOT NULL DEFAULT true`
  );

  const r = await pool.query(
    `SELECT name, "takesBookings" FROM "User" WHERE active ORDER BY "createdAt"`
  );
  console.log("\n  Aktiv felhasznalok:");
  for (const x of r.rows) {
    console.log(`    ${String(x.name).padEnd(22)}${x.takesBookings ? "szerepel a naptarban" : "NEM szerepel"}`);
  }
  console.log("\n  Kesz. Az atallitas a Felhasznalok oldalon tortenik.\n");
} catch (err) {
  console.error("Hiba:", err.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
