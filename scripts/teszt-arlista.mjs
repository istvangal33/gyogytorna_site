// Az arlista modositasanak es a foglalas egyedi aranak ellenorzese.
//
//   node --env-file=.env.local scripts/teszt-arlista.mjs
//
// MIERT VAN EZ A TESZT:
// A legfontosabb allitas, amire a rendelo epit: egy aremeles NEM irja at
// visszamenoleg a mar meglevo foglalasokat. Enelkul a februari kezeles a
// juniusi araval jelenne meg az elozmenyekben es a statisztikaban — nem
// azzal, amit a vendeg tenylegesen fizetett.
//
// A masik: egy foglalason kezzel megadott ar (kedvezmeny) megmarad akkor is,
// ha kozben az arlista valtozik.
import { pool, szolgaltatasMentese, ujSzolgaltatas, foglalasModositasa } from "../lib/db.ts";

const JELOLO = "ZZARLISTA";

let siker = 0, bukas = 0;
const ok = (cimke, felt, reszlet = "") => {
  if (felt) { siker++; console.log("  OK    " + cimke); }
  else { bukas++; console.log("  BUKAS " + cimke + (reszlet ? "  -> " + reszlet : "")); }
};

async function takarit() {
  await pool.query(
    `DELETE FROM "Booking" WHERE "serviceId" IN (SELECT id FROM "Service" WHERE name LIKE $1)`,
    [`%${JELOLO}%`]
  );
  await pool.query(`DELETE FROM "Client" WHERE name LIKE $1`, [`%${JELOLO}%`]);
  await pool.query(`DELETE FROM "Service" WHERE name LIKE $1`, [`%${JELOLO}%`]);
  await pool.query(
    `DELETE FROM "WorkingHours" WHERE "staffId" IN (SELECT id FROM "User" WHERE name LIKE $1)`,
    [`%${JELOLO}%`]
  );
  await pool.query(`DELETE FROM "User" WHERE name LIKE $1`, [`%${JELOLO}%`]);
}

try {
  await takarit();
  console.log("\n=== Arlista es foglalasi ar ===\n");

  const serviceId = await ujSzolgaltatas({
    name: `Teszt kezeles ${JELOLO}`,
    description: null,
    price: 16000,
    durationMin: 50,
    blockMin: 60,
  });
  ok("uj szolgaltatas letrehozhato", Boolean(serviceId));

  const u = (await pool.query(
    `INSERT INTO "User" (name, email, role) VALUES ($1, $2, 'EMPLOYEE') RETURNING id`,
    [`Arlista ${JELOLO}`, `arlista.${JELOLO}@pelda.hu`]
  )).rows[0].id;

  const c = (await pool.query(
    `INSERT INTO "Client" (name, email) VALUES ($1, $2) RETURNING id`,
    [`Vendeg ${JELOLO}`, `vendeg.${JELOLO}@pelda.hu`]
  )).rows[0].id;

  const kezd = new Date(Date.now() + 86400000 * 500);
  const veg = new Date(kezd.getTime() + 3600000);
  const foglalasId = (await pool.query(
    `INSERT INTO "Booking" ("clientId","serviceId","staffId","startsAt","endsAt","createdById",price)
     VALUES ($1,$2,$3,$4,$5,$3,$6) RETURNING id`,
    [c, serviceId, u, kezd, veg, 16000]
  )).rows[0].id;

  // A LENYEG: aremeles utan a meglevo foglalas ara valtozatlan
  await szolgaltatasMentese(serviceId, {
    name: `Teszt kezeles ${JELOLO}`,
    description: null,
    price: 17000,
    durationMin: 50,
    blockMin: 60,
    bookable: true,
    active: true,
  });

  const ar1 = (await pool.query(`SELECT price FROM "Booking" WHERE id = $1`, [foglalasId])).rows[0].price;
  ok("aremeles utan a MEGLEVO foglalas ara valtozatlan (16000)", ar1 === 16000, `most: ${ar1}`);

  const uj = (await pool.query(`SELECT price FROM "Service" WHERE id = $1`, [serviceId])).rows[0].price;
  ok("az arlistan viszont mar az uj ar all (17000)", uj === 17000, `most: ${uj}`);

  // Kezzel megadott ar egy foglalason
  await foglalasModositasa(foglalasId, {
    serviceId, staffId: u, kezdet: kezd, veg, megjegyzes: null, ar: 12000,
  });
  const ar2 = (await pool.query(`SELECT price FROM "Booking" WHERE id = $1`, [foglalasId])).rows[0].price;
  ok("kezzel megadott kedvezmenyes ar rogzul (12000)", ar2 === 12000, `most: ${ar2}`);

  // ...es egy ujabb aremeles sem irja felul
  await szolgaltatasMentese(serviceId, {
    name: `Teszt kezeles ${JELOLO}`,
    description: null,
    price: 19000,
    durationMin: 50,
    blockMin: 60,
    bookable: true,
    active: true,
  });
  const ar3 = (await pool.query(`SELECT price FROM "Booking" WHERE id = $1`, [foglalasId])).rows[0].price;
  ok("a kedvezmenyt egy kesobbi aremeles sem irja felul", ar3 === 12000, `most: ${ar3}`);

  // Kivezetes: eltunik a valasztekbol, de a foglalason olvashato marad
  await szolgaltatasMentese(serviceId, {
    name: `Teszt kezeles ${JELOLO}`,
    description: null,
    price: 19000,
    durationMin: 50,
    blockMin: 60,
    bookable: true,
    active: false,
  });
  const foglalhato = await pool.query(
    `SELECT id FROM "Service" WHERE id = $1 AND active AND bookable`,
    [serviceId]
  );
  ok("kivezetett szolgaltatas nem foglalhato", foglalhato.rowCount === 0);

  const nev = await pool.query(
    `SELECT s.name FROM "Booking" b JOIN "Service" s ON s.id = b."serviceId" WHERE b.id = $1`,
    [foglalasId]
  );
  ok("a regi foglalason viszont olvashato marad, mi tortent",
    String(nev.rows[0]?.name).includes(JELOLO));

  await takarit();

  console.log("\n" + "=".repeat(46));
  console.log(`  SIKERES: ${siker}    BUKOTT: ${bukas}`);
  console.log("=".repeat(46));
  process.exitCode = bukas > 0 ? 1 : 0;
} catch (err) {
  console.error("Hiba:", err.message);
  await takarit().catch(() => {});
  process.exitCode = 1;
} finally {
  await pool.end();
}
