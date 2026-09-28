// Bemutatóhoz való, élethű adat. A demó rekordokat a @demo.local e-mail
// végződés jelöli, így a nevek valósághűek lehetnek, a törlés mégis biztonságos.
//
//   node --env-file=.env.local scripts/demo-adat.mjs letrehoz
//   node --env-file=.env.local scripts/demo-adat.mjs letrehoz "Forrás Fernanda" "Kovács Anna"
//   node --env-file=.env.local scripts/demo-adat.mjs torol
import bcrypt from "bcryptjs";
import { pool } from "../lib/db.ts";

const parancs = process.argv[2];
const NEV_1 = process.argv[3] ?? "Forrás Fernanda";
const NEV_2 = process.argv[4] ?? "Kolléga";
const JELSZO = "Demo1234";
const DOMAIN = "@demo.local";

// Élethű vendégnevek. A telefonszámok szándékosan nem valós számok.
const VENDEGEK = [
  ["Kovács Éva", "+36 30 214 8871"],
  ["Nagy Péter", "+36 20 553 1140"],
  ["Tóth Ildikó", "+36 70 882 3396"],
  ["Szabó Gergely", "+36 30 447 9025"],
  ["Horváth Zsuzsanna", "+36 20 118 6634"],
  ["Varga Máté", "+36 70 329 5518"],
  ["Kiss Andrea", "+36 30 776 2043"],
  ["Molnár Tamás", "+36 20 940 7712"],
  ["Balogh Réka", "+36 70 605 3387"],
  ["Farkas Dániel", "+36 30 251 9964"],
];

function ekezetNelkul(s) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z]+/g, ".");
}

async function letrehoz() {
  const hash = await bcrypt.hash(JELSZO, 10);

  // --- munkatársak ---
  const munkatarsak = [];
  for (const [i, nev] of [NEV_1, NEV_2].entries()) {
    const email = ekezetNelkul(nev) + DOMAIN;
    const szerep = i === 0 ? "ADMIN" : "EMPLOYEE";
    const r = await pool.query(
      `INSERT INTO "User" (name, email, "passwordHash", role, "canViewAll", active)
       VALUES ($1, $2, $3, $4::"Role", false, true)
       ON CONFLICT (email) DO UPDATE
         SET name = EXCLUDED.name, "passwordHash" = EXCLUDED."passwordHash", role = EXCLUDED.role
       RETURNING id, name, email, role`,
      [nev, email, hash, szerep]
    );
    munkatarsak.push(r.rows[0]);
  }

  // --- munkaidő: hétfő–péntek 7:00–19:00 ---
  for (const m of munkatarsak) {
    await pool.query(`DELETE FROM "WorkingHours" WHERE "staffId" = $1`, [m.id]);
    for (const nap of [1, 2, 3, 4, 5]) {
      await pool.query(
        `INSERT INTO "WorkingHours" ("staffId", weekday, "startMinute", "endMinute")
         VALUES ($1, $2, 420, 1140)`,
        [m.id, nap]
      );
    }
  }

  // --- vendégek ---
  const vendegek = [];
  for (const [nev, tel] of VENDEGEK) {
    const r = await pool.query(
      `INSERT INTO "Client" (name, email, phone) VALUES ($1, $2, $3)
       ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name, phone = EXCLUDED.phone
       RETURNING id, name`,
      [nev, ekezetNelkul(nev) + DOMAIN, tel]
    );
    vendegek.push(r.rows[0]);
  }

  const szolg = await pool.query(
    `SELECT id, name, "blockMin", "durationMin", price FROM "Service"
     WHERE bookable AND active ORDER BY price DESC`
  );

  // --- foglalások az aktuális hétre ---
  const ma = new Date();
  const hetfo = new Date(ma);
  hetfo.setDate(ma.getDate() - ((ma.getDay() + 6) % 7));
  hetfo.setHours(0, 0, 0, 0);

  // [napeltolás hétfőtől, óra, perc, munkatárs-index, vendég-index, szolgáltatás-index, állapot]
  const tervek = [
    [0, 8, 0, 0, 0, 0, "COMPLETED"],
    [0, 9, 30, 0, 1, 2, "COMPLETED"],
    [0, 11, 0, 1, 2, 4, "COMPLETED"],
    [0, 14, 0, 0, 3, 1, "COMPLETED"],
    [0, 15, 30, 1, 4, 5, "NO_SHOW"],

    [1, 8, 30, 0, 5, 0, "COMPLETED"],
    [1, 10, 0, 1, 6, 3, "COMPLETED"],
    [1, 13, 0, 0, 7, 2, "CANCELLED"],
    [1, 16, 0, 1, 8, 1, "COMPLETED"],

    [2, 9, 0, 0, 9, 0, "BOOKED"],
    [2, 10, 30, 1, 0, 4, "BOOKED"],
    [2, 13, 30, 0, 2, 1, "BOOKED"],
    [2, 15, 0, 1, 3, 5, "BOOKED"],

    [3, 8, 0, 0, 4, 2, "BOOKED"],
    [3, 11, 0, 1, 5, 0, "BOOKED"],
    [3, 14, 30, 0, 6, 3, "BOOKED"],

    [4, 9, 30, 0, 7, 1, "BOOKED"],
    [4, 11, 30, 1, 8, 2, "BOOKED"],
    [4, 16, 0, 0, 9, 0, "BOOKED"],
  ];

  let db = 0;
  for (const [nap, ora, perc, mIdx, vIdx, szIdx, allapot] of tervek) {
    const sz = szolg.rows[szIdx % szolg.rowCount];
    const kezd = new Date(hetfo);
    kezd.setDate(hetfo.getDate() + nap);
    kezd.setHours(ora, perc, 0, 0);
    const vege = new Date(kezd.getTime() + sz.blockMin * 60000);

    try {
      await pool.query(
        `INSERT INTO "Booking"
           ("clientId", "serviceId", "staffId", "startsAt", "endsAt", "createdById", status, notes, price)
         VALUES ($1, $2, $3, $4, $5, $6, $7::"BookingStatus", $8, $9)`,
        [
          vendegek[vIdx].id, sz.id, munkatarsak[mIdx].id, kezd, vege,
          munkatarsak[0].id, allapot,
          allapot === "CANCELLED" ? "Lemondta telefonon." : null,
          sz.price,
        ]
      );
      db++;
    } catch (e) {
      if (e.code !== "23P01") throw e;
      // ütköző sor kihagyása — a demó adat nem lehet ellentmondásos
    }
  }

  console.log("Demo adat letrehozva:");
  for (const m of munkatarsak) console.log(`  ${m.role.padEnd(9)} ${m.name}  <${m.email}>`);
  console.log(`  ${vendegek.length} vendeg, ${db} foglalas az aktualis hetre`);
  console.log(`\n  Belepesi jelszo mindkettohoz: ${JELSZO}`);
}

async function torol() {
  const b = await pool.query(
    `DELETE FROM "Booking" WHERE "clientId" IN (SELECT id FROM "Client" WHERE email LIKE $1)
        OR "staffId" IN (SELECT id FROM "User" WHERE email LIKE $1)`,
    ["%" + DOMAIN]
  );
  const c = await pool.query(`DELETE FROM "Client" WHERE email LIKE $1`, ["%" + DOMAIN]);
  const w = await pool.query(
    `DELETE FROM "WorkingHours" WHERE "staffId" IN (SELECT id FROM "User" WHERE email LIKE $1)`,
    ["%" + DOMAIN]
  );
  const u = await pool.query(`DELETE FROM "User" WHERE email LIKE $1`, ["%" + DOMAIN]);
  console.log(
    `torolve - foglalas: ${b.rowCount}, vendeg: ${c.rowCount}, munkaido: ${w.rowCount}, munkatars: ${u.rowCount}`
  );
}

// Bemutató előtt: elrejti a nem demó munkatársakat és kitakarítja a
// próbafoglalásokat, hogy csak a demó adat látszódjon.
async function elokeszit() {
  const b = await pool.query(
    `DELETE FROM "Booking" WHERE "clientId" IN
       (SELECT id FROM "Client" WHERE email NOT LIKE $1)`,
    ["%" + DOMAIN]
  );
  const c = await pool.query(`DELETE FROM "Client" WHERE email NOT LIKE $1`, ["%" + DOMAIN]);
  // A munkaidot vesszuk el, nem a fiokot inaktivaljuk: igy a belepes es a
  // jelszo-visszaallitas tovabbra is mukodik, csak a naptarban nem lesz oszlopa.
  const u = await pool.query(
    `DELETE FROM "WorkingHours" WHERE "staffId" IN
       (SELECT id FROM "User" WHERE email NOT LIKE $1)
     RETURNING "staffId"`,
    ["%" + DOMAIN]
  );
  const nevek = await pool.query(
    `SELECT name, email FROM "User" WHERE email NOT LIKE $1`, ["%" + DOMAIN]
  );

  console.log(`Torolt nem-demo foglalas: ${b.rowCount}, vendeg: ${c.rowCount}`);
  console.log("A naptarban nem kap oszlopot (de be tud lepni):");
  u.rows = nevek.rows;
  for (const r of u.rows) console.log(`  ${r.name} <${r.email}>`);
  console.log("");
  console.log("  A bemutato alatt igy lepj be:");
  console.log(`  ${ekezetNelkul(NEV_1)}${DOMAIN} / ${JELSZO}`);
  console.log("");
  console.log("  Visszaallitas utana:  node --env-file=.env.local scripts/demo-adat.mjs visszaall");
}

async function visszaall() {
  const u = await pool.query(
    `UPDATE "User" SET active = true WHERE email NOT LIKE $1 RETURNING id, name, email`,
    ["%" + DOMAIN]
  );
  // munkaido visszaadasa: hetfo-pentek 7:00-19:00
  for (const r of u.rows) {
    await pool.query(`DELETE FROM "WorkingHours" WHERE "staffId" = $1`, [r.id]);
    for (const nap of [1, 2, 3, 4, 5]) {
      await pool.query(
        `INSERT INTO "WorkingHours" ("staffId", weekday, "startMinute", "endMinute")
         VALUES ($1, $2, 420, 1140)`,
        [r.id, nap]
      );
    }
  }
  console.log("Helyreallitva (aktiv + munkaido):");
  for (const r of u.rows) console.log(`  ${r.name} <${r.email}>`);
}

try {
  if (parancs === "letrehoz") await letrehoz();
  else if (parancs === "torol") await torol();
  else if (parancs === "elokeszit") await elokeszit();
  else if (parancs === "visszaall") await visszaall();
  else console.log('Hasznalat: letrehoz ["Nev 1"] ["Nev 2"] | elokeszit | visszaall | torol');
} catch (err) {
  console.error("Hiba:", err.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
