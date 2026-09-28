// Ideiglenes tesztadat a naptár ellenőrzéséhez.
//   node --env-file=.env.local scripts/teszt-naptar-adat.mjs letrehoz
//   node --env-file=.env.local scripts/teszt-naptar-adat.mjs torol
//
// Minden létrehozott sor neve "TESZT" előtaggal kezdődik, hogy a törlés
// biztosan csak ezeket érintse.
import bcrypt from "bcryptjs";
import { pool } from "../lib/db.ts";

const parancs = process.argv[2];
const ALKALMAZOTT_EMAIL = "teszt.alkalmazott@example.invalid";
const JELSZO = "TesztJelszo123";

async function letrehoz() {
  const hash = await bcrypt.hash(JELSZO, 10);

  const alk = await pool.query(
    `INSERT INTO "User" (name, email, "passwordHash", role, "canViewAll", active)
     VALUES ($1, $2, $3, 'EMPLOYEE', false, true)
     ON CONFLICT (email) DO UPDATE SET "passwordHash" = EXCLUDED."passwordHash"
     RETURNING id`,
    ["TESZT Alkalmazott", ALKALMAZOTT_EMAIL, hash]
  );
  const alkId = alk.rows[0].id;

  const admin = await pool.query(`SELECT id FROM "User" WHERE role = 'ADMIN' LIMIT 1`);
  const adminId = admin.rows[0].id;

  const vendegek = [
    ["TESZT Kiss Anna", "teszt.kiss@example.invalid", "+36 30 111 1111"],
    ["TESZT Nagy Béla", "teszt.nagy@example.invalid", "+36 30 222 2222"],
    ["TESZT Tóth Csaba", "teszt.toth@example.invalid", "+36 30 333 3333"],
    ["TESZT Szabó Éva", "teszt.szabo@example.invalid", "+36 30 444 4444"],
  ];

  const vendegIdk = [];
  for (const [nev, mail, tel] of vendegek) {
    const r = await pool.query(
      `INSERT INTO "Client" (name, email, phone) VALUES ($1, $2, $3)
       ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name
       RETURNING id`,
      [nev, mail, tel]
    );
    vendegIdk.push(r.rows[0].id);
  }

  const szolgak = await pool.query(
    `SELECT id, "blockMin", name, price FROM "Service" WHERE bookable ORDER BY price DESC LIMIT 4`
  );

  const ma = new Date();
  const idopont = (ora) => {
    const d = new Date(ma);
    d.setHours(ora, 0, 0, 0);
    return d;
  };

  // [munkatárs, óra, vendég, szolgáltatás, állapot]
  const tervek = [
    [alkId, 9, 0, 0, "BOOKED"],
    [alkId, 11, 1, 1, "COMPLETED"],
    [alkId, 14, 2, 2, "CANCELLED"],
    [adminId, 10, 3, 1, "BOOKED"],
    [adminId, 13, 0, 3, "NO_SHOW"],
    [adminId, 16, 1, 0, "BOOKED"],
  ];

  let letrejott = 0;
  for (const [staffId, ora, vIdx, szIdx, allapot] of tervek) {
    const sz = szolgak.rows[szIdx % szolgak.rowCount];
    const kezd = idopont(ora);
    const vege = new Date(kezd.getTime() + sz.blockMin * 60000);
    try {
      await pool.query(
        `INSERT INTO "Booking" ("clientId", "serviceId", "staffId", "startsAt", "endsAt", "createdById", status, notes, price)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [vendegIdk[vIdx], sz.id, staffId, kezd, vege, adminId, allapot, "TESZT foglalás", sz.price]
      );
      letrejott++;
    } catch (e) {
      // ha az idosav mar foglalt, ezt a sort kihagyjuk
      if (e.code !== "23P01") throw e;
    }
  }

  console.log(`${letrejott} teszt foglalas letrehozva mai napra (${ma.toLocaleDateString("hu-HU")})`);
  console.log("alkalmazott: " + ALKALMAZOTT_EMAIL + " / " + JELSZO);
}

async function torol() {
  const b = await pool.query(`DELETE FROM "Booking" WHERE notes LIKE 'TESZT%'`);
  const c = await pool.query(`DELETE FROM "Client" WHERE name LIKE 'TESZT%'`);
  const u = await pool.query(`DELETE FROM "User" WHERE email = $1`, [ALKALMAZOTT_EMAIL]);
  console.log(`torolve - foglalas: ${b.rowCount}, vendeg: ${c.rowCount}, alkalmazott: ${u.rowCount}`);
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
