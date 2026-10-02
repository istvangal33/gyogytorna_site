// A vendeg e-mail cime opcionalis lesz.
//
// Futtatas:  node --env-file=.env.prod scripts/migrate-email-opcionalis.mjs
//
// MIERT: ez belso foglalasi rendszer — a gyogytornasz a vendeg helyett rogzit,
// es a legtobb paciens e-mail cime egyszeruen nincs meg. E-mail nelkul eddig
// egyaltalan nem lehetett foglalni.
//
// Az egyedi megszoritas MARAD: a Postgres tobb NULL erteket is megenged egy
// egyedi oszlopban, tehat tobb e-mail nelkuli vendeg is letezhet egymas
// mellett, de ket vendeg nem kaphatja ugyanazt a cimet.
//
// Idempotens: tobbszor is lefuttathato, a masodik futas mar nem valtoztat semmin.
import { pool } from "../lib/db.ts";

async function nullLehet() {
  const r = await pool.query(
    `SELECT is_nullable FROM information_schema.columns
     WHERE table_name = 'Client' AND column_name = 'email'`
  );
  return r.rows[0]?.is_nullable ?? "?";
}

try {
  console.log(`Elotte:  email NULL lehet? ${await nullLehet()}`);

  await pool.query(`ALTER TABLE "Client" ALTER COLUMN email DROP NOT NULL`);

  // Ures sztring nem jo: az egyedi megszoritas miatt csak EGY ilyen vendeg
  // letezhetne. Ami esetleg igy keletkezett, azt NULL-ra visszuk.
  const javitott = await pool.query(
    `UPDATE "Client" SET email = NULL WHERE btrim(email) = ''`
  );
  if (javitott.rowCount) {
    console.log(`Ures e-mail NULL-ra allitva: ${javitott.rowCount} sor`);
  }

  console.log(`Utana:   email NULL lehet? ${await nullLehet()}`);
  console.log("Kesz.");
} catch (err) {
  console.error("Hiba:", err.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
