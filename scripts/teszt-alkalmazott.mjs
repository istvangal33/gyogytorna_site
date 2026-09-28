// Teszt alkalmazott a jogosultság-kapcsoló kipróbálásához.
//   node --env-file=.env.local scripts/teszt-alkalmazott.mjs letrehoz
//   node --env-file=.env.local scripts/teszt-alkalmazott.mjs torol
//
// Jelszóval együtt jön létre, hogy azonnal be lehessen vele lépni — a valós
// felhasználók az admin felületről, e-mailes linkkel kapnak jelszót.
import bcrypt from "bcryptjs";
import { pool } from "../lib/db.ts";

const parancs = process.argv[2];
const EMAIL = "teszt.alkalmazott@demo.local";
const JELSZO = "Teszt1234";

async function letrehoz() {
  const hash = await bcrypt.hash(JELSZO, 10);

  const u = await pool.query(
    `INSERT INTO "User" (name, email, "passwordHash", role, "canViewAll", active)
     VALUES ($1, $2, $3, 'EMPLOYEE', false, true)
     ON CONFLICT (email) DO UPDATE
       SET "passwordHash" = EXCLUDED."passwordHash", role = 'EMPLOYEE', active = true
     RETURNING id, name`,
    ["Teszt Alkalmazott", EMAIL, hash]
  );
  const alkId = u.rows[0].id;

  // munkaidő, különben nem kap oszlopot a naptárban
  await pool.query(`DELETE FROM "WorkingHours" WHERE "staffId" = $1`, [alkId]);
  for (const nap of [1, 2, 3, 4, 5]) {
    await pool.query(
      `INSERT INTO "WorkingHours" ("staffId", weekday, "startMinute", "endMinute")
       VALUES ($1, $2, 420, 1140)`,
      [alkId, nap]
    );
  }

  const admin = await pool.query(
    `SELECT id, name FROM "User" WHERE role = 'ADMIN' AND active ORDER BY name LIMIT 1`
  );
  const adminId = admin.rows[0].id;

  const szolg = await pool.query(
    `SELECT id, "blockMin", price FROM "Service" WHERE bookable AND active ORDER BY price DESC LIMIT 2`
  );

  const vendegek = [];
  for (const [nev, mail] of [
    ["Teszt Vendég Egy", "teszt.vendeg1@demo.local"],
    ["Teszt Vendég Kettő", "teszt.vendeg2@demo.local"],
  ]) {
    const r = await pool.query(
      `INSERT INTO "Client" (name, email, phone) VALUES ($1, $2, '+36 30 000 0000')
       ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name RETURNING id`,
      [nev, mail]
    );
    vendegek.push(r.rows[0].id);
  }

  // következő hétfő, hogy biztosan munkanapra essen
  const nap = new Date();
  nap.setDate(nap.getDate() + ((8 - nap.getDay()) % 7 || 7));

  const idopont = (ora) => {
    const d = new Date(nap);
    d.setHours(ora, 0, 0, 0);
    return d;
  };

  let db = 0;
  for (const [staffId, ora, vIdx] of [
    [alkId, 9, 0],
    [alkId, 11, 1],
    [adminId, 10, 0],
    [adminId, 14, 1],
  ]) {
    const sz = szolg.rows[db % szolg.rowCount];
    const kezd = idopont(ora);
    try {
      await pool.query(
        `INSERT INTO "Booking" ("clientId", "serviceId", "staffId", "startsAt", "endsAt", "createdById", notes, price)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [vendegek[vIdx], sz.id, staffId, kezd,
         new Date(kezd.getTime() + sz.blockMin * 60000), adminId, "Teszt foglalás", sz.price]
      );
      db++;
    } catch (e) {
      if (e.code !== "23P01") throw e;
    }
  }

  console.log("Teszt alkalmazott letrehozva:");
  console.log(`  ${EMAIL} / ${JELSZO}`);
  console.log(`  ${db} foglalas ${nap.toLocaleDateString("hu-HU")}-re (2 nala, 2 az adminnal)`);
}

async function torol() {
  const b = await pool.query(
    `DELETE FROM "Booking" WHERE notes = 'Teszt foglalás'
        OR "staffId" IN (SELECT id FROM "User" WHERE email = $1)`,
    [EMAIL]
  );
  const c = await pool.query(`DELETE FROM "Client" WHERE email LIKE 'teszt.vendeg%@demo.local'`);
  const w = await pool.query(
    `DELETE FROM "WorkingHours" WHERE "staffId" IN (SELECT id FROM "User" WHERE email = $1)`,
    [EMAIL]
  );
  const u = await pool.query(`DELETE FROM "User" WHERE email = $1`, [EMAIL]);
  console.log(
    `torolve - foglalas: ${b.rowCount}, vendeg: ${c.rowCount}, munkaido: ${w.rowCount}, felhasznalo: ${u.rowCount}`
  );
}

try {
  if (parancs === "letrehoz") await letrehoz();
  else if (parancs === "torol") await torol();
  else console.log("Hasznalat: letrehoz | torol");
} catch (err) {
  console.error("Hiba:", err.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
