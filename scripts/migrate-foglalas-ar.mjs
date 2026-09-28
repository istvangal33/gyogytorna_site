// A foglalás eltárolja a kori árát, hogy egy későbbi áremelés ne írja át
// visszamenőleg az előzményeket.
//
// Futtatás:  node --env-file=.env.local scripts/migrate-foglalas-ar.mjs
//
// Idempotens. A meglévő sorokat a szolgáltatás mostani árával tölti fel —
// azoknál ez a legjobb, ami visszanyerhető.
import { pool } from "../lib/db.ts";

try {
  await pool.query(`ALTER TABLE "Booking" ADD COLUMN IF NOT EXISTS price integer`);

  const feltoltendo = await pool.query(
    `SELECT count(*)::int AS db FROM "Booking" WHERE price IS NULL`
  );

  if (feltoltendo.rows[0].db > 0) {
    const r = await pool.query(
      `UPDATE "Booking" b
       SET price = s.price
       FROM "Service" s
       WHERE s.id = b."serviceId" AND b.price IS NULL`
    );
    console.log(`Meglevo sorok feltoltve a mostani arral: ${r.rowCount}`);
  } else {
    console.log("Nincs feltoltendo sor.");
  }

  // csak a feltöltés után tesszük kötelezővé
  await pool.query(`ALTER TABLE "Booking" ALTER COLUMN price SET NOT NULL`);
  console.log('A "price" oszlop kesz es kotelezo.');

  const e = await pool.query(
    `SELECT count(*)::int AS elter
     FROM "Booking" b JOIN "Service" s ON s.id = b."serviceId"
     WHERE b.price <> s.price`
  );
  console.log(`Olyan foglalas, aminek az ara mar elter a mostani listaartol: ${e.rows[0].elter}`);
} catch (err) {
  console.error("Hiba:", err.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
