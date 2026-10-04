// A munkatarsankenti ar es a naptar-szures ellenorzese.
//
//   node --env-file=.env.local scripts/teszt-munkatars-arak.mjs
//
// MIERT VAN EZ A TESZT:
// Az ar ket helyrol johet — az arlistabol vagy a munkatars sajat arabol —, es
// a foglalasra RAMASOLODIK. Ha a masolas elmarad, egy kesobbi aremeles
// visszamenoleg atirna a regi foglalasokat: a tavalyi kezeles a tavalyi
// szamlan mas osszeggel jelenne meg, mint amit a vendeg fizetett.
//
// A naptar-szures pedig azt vedi, hogy aki nem fogad pacienst (peldaul a
// rendszert adminisztralo tulajdonos), ne foglaljon oszlopot a naptarban.
import { pool, ervenyesAr, arFelulirasMentese, munkatarsak } from "../lib/db.ts";

const JELOLO = "ZZARTESZT";

let siker = 0, bukas = 0;
const ok = (cimke, felt, reszlet = "") => {
  if (felt) { siker++; console.log("  OK    " + cimke); }
  else { bukas++; console.log("  BUKAS " + cimke + (reszlet ? "  -> " + reszlet : "")); }
};

async function takarit() {
  await pool.query(`DELETE FROM "User" WHERE name LIKE $1`, [`%${JELOLO}%`]);
  await pool.query(`DELETE FROM "Service" WHERE name LIKE $1`, [`%${JELOLO}%`]);
}

try {
  await takarit();

  console.log("\n=== Munkatarsankenti ar ===\n");

  const u = await pool.query(
    `INSERT INTO "User" (name, email, role) VALUES ($1, $2, 'EMPLOYEE') RETURNING id`,
    [`Arteszt ${JELOLO}`, `arteszt.${JELOLO}@pelda.hu`]
  );
  const staffId = u.rows[0].id;

  const sz = await pool.query(
    `INSERT INTO "Service" (name, price, "durationMin", "blockMin") VALUES ($1, 16000, 50, 60) RETURNING id`,
    [`Teszt kezeles ${JELOLO}`]
  );
  const serviceId = sz.rows[0].id;

  // 1. felulirás nelkul az arlista ara ervenyes
  ok("felulirás nelkul az arlista ara jon", (await ervenyesAr(staffId, serviceId, 16000)) === 16000);

  // 2. felulirás utan a sajat ar
  await arFelulirasMentese(staffId, serviceId, 15000);
  ok("felulirás utan a sajat ar jon", (await ervenyesAr(staffId, serviceId, 16000)) === 15000);

  // 3. ugyanazt megadni ketszer ne hibazzon (upsert)
  await arFelulirasMentese(staffId, serviceId, 14000);
  ok("a felulirás felulirhato", (await ervenyesAr(staffId, serviceId, 16000)) === 14000);

  // 4. null torli: vissza az arlistara
  await arFelulirasMentese(staffId, serviceId, null);
  ok("null torli a felulirást, vissza az arlistara",
    (await ervenyesAr(staffId, serviceId, 16000)) === 16000);

  // 5. masik munkatars arat ez nem erinti
  const u2 = await pool.query(
    `INSERT INTO "User" (name, email, role) VALUES ($1, $2, 'EMPLOYEE') RETURNING id`,
    [`Masik ${JELOLO}`, `masik.${JELOLO}@pelda.hu`]
  );
  await arFelulirasMentese(staffId, serviceId, 15000);
  ok("a felulirás csak az adott munkatarsra vonatkozik",
    (await ervenyesAr(u2.rows[0].id, serviceId, 16000)) === 16000);

  // 6. az ar a foglalasra ramasolodik: kesobbi valtozas nem irja at
  const kliens = await pool.query(
    `INSERT INTO "Client" (name, email) VALUES ($1, $2) RETURNING id`,
    [`Arteszt vendeg ${JELOLO}`, `vendeg.${JELOLO}@pelda.hu`]
  );
  const kezd = new Date(Date.now() + 86400000 * 400);
  const f = await pool.query(
    `INSERT INTO "Booking" ("clientId","serviceId","staffId","startsAt","endsAt","createdById",price)
     VALUES ($1,$2,$3,$4,$5,$3,$6) RETURNING id`,
    [kliens.rows[0].id, serviceId, staffId, kezd, new Date(kezd.getTime() + 3600000), 15000]
  );
  await arFelulirasMentese(staffId, serviceId, 19000); // keptelen aremeles utolag
  const utana = await pool.query(`SELECT price FROM "Booking" WHERE id = $1`, [f.rows[0].id]);
  ok("a meglevo foglalas arat egy kesobbi valtozas nem irja at",
    utana.rows[0].price === 15000, `most: ${utana.rows[0].price}`);

  console.log("\n=== Naptar-szures ===\n");

  // 7. aki fogad pacienst, szerepel a naptarban
  const lista1 = await munkatarsak();
  ok("aki fogad pacienst, szerepel a naptarban",
    lista1.some((m) => m.id === staffId));

  // 8. akit levettunk, nem szerepel
  await pool.query(`UPDATE "User" SET "takesBookings" = false WHERE id = $1`, [staffId]);
  const lista2 = await munkatarsak();
  ok("akit levettunk, nem szerepel a naptarban",
    !lista2.some((m) => m.id === staffId));

  // 9. a tobbieket ez nem erinti
  ok("a tobbi munkatars valtozatlanul szerepel",
    lista2.some((m) => m.id === u2.rows[0].id));

  await pool.query(`DELETE FROM "Booking" WHERE "staffId" = $1`, [staffId]);
  await pool.query(`DELETE FROM "Client" WHERE name LIKE $1`, [`%${JELOLO}%`]);
  await takarit();

  console.log("\n" + "=".repeat(46));
  console.log(`  SIKERES: ${siker}    BUKOTT: ${bukas}`);
  console.log("=".repeat(46));
  process.exitCode = bukas > 0 ? 1 : 0;
} catch (err) {
  console.error("Hiba:", err.message);
  await pool.query(`DELETE FROM "Client" WHERE name LIKE $1`, [`%${JELOLO}%`]).catch(() => {});
  await takarit().catch(() => {});
  process.exitCode = 1;
} finally {
  await pool.end();
}
