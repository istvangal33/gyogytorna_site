// Munkaidő beállítása. Alapból hétfő–péntek 7:00–19:00, minden valós
// (nem TESZT) aktív felhasználóra.
//
//   node --env-file=.env.local scripts/seed-munkaido.mjs
//   node --env-file=.env.local scripts/seed-munkaido.mjs 08:00 18:00
//   node --env-file=.env.local scripts/seed-munkaido.mjs 07:00 19:00 1,2,3,4,5,6
//
// A napok számozása a JavaScript getDay() szerinti: 0 = vasárnap, 1 = hétfő …
// 6 = szombat. A naptár komponens is ezt használja.
import { pool } from "../lib/db.ts";

const [kezdArg = "07:00", vegArg = "19:00", napokArg = "1,2,3,4,5"] = process.argv.slice(2);

function percbe(ido) {
  const [o, p] = ido.split(":").map(Number);
  if (Number.isNaN(o) || Number.isNaN(p)) throw new Error("Hibás időpont: " + ido);
  return o * 60 + p;
}

const kezdPerc = percbe(kezdArg);
const vegPerc = percbe(vegArg);
const napok = napokArg.split(",").map((n) => Number(n.trim()));

if (vegPerc <= kezdPerc) throw new Error("A vége nem lehet korábban, mint a kezdet.");

try {
  const userek = await pool.query(
    `SELECT id, name FROM "User" WHERE active AND name NOT LIKE 'TESZT%' ORDER BY name`
  );

  if (userek.rowCount === 0) {
    console.log("Nincs felhasznalo, akire beallithatnank.");
    process.exit(0);
  }

  for (const u of userek.rows) {
    // a felhasználó korábbi munkaidejét lecseréljük, hogy ne halmozódjon
    await pool.query(`DELETE FROM "WorkingHours" WHERE "staffId" = $1`, [u.id]);

    for (const nap of napok) {
      await pool.query(
        `INSERT INTO "WorkingHours" ("staffId", weekday, "startMinute", "endMinute")
         VALUES ($1, $2, $3, $4)`,
        [u.id, nap, kezdPerc, vegPerc]
      );
    }
    console.log(`${u.name}: ${napok.length} nap, ${kezdArg}-${vegArg}`);
  }
} catch (err) {
  console.error("Hiba:", err.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
