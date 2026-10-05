// Ismetlodo foglalas (sorozat) ellenorzese.
//
//   node --env-file=.env.local scripts/teszt-ismetlodo.mjs
//
// MIERT VAN EZ A TESZT:
// A heti lepteteskor az oraatallitas a buktato. Ha a kovetkezo alkalmat
// 7*86400000 ezredmasodperc hozzaadasaval szamolnank, az oraatallitas hetén
// az egesz sorozat egy orat csuszna — a 10:00-as kezeles 9:00 vagy 11:00
// lenne. Naptari nappal leptetve a falioranyi idopont marad helyes.
//
// A masik: egy utkozo alkalom ne buktassa el a tobbit.
import { pool, sorozatFoglalasai, sorozatHelye, sorozatHatralevoLemondasa } from "../lib/db.ts";
import { randomUUID } from "node:crypto";

const JELOLO = "ZZSOROZAT";
let siker = 0, bukas = 0;
const ok = (c, f, r = "") => { if (f) { siker++; console.log("  OK    " + c); } else { bukas++; console.log("  BUKAS " + c + (r ? "  -> " + r : "")); } };

async function takarit() {
  await pool.query(`DELETE FROM "Booking" WHERE "clientId" IN (SELECT id FROM "Client" WHERE name LIKE $1)`, [`%${JELOLO}%`]);
  await pool.query(`DELETE FROM "Client" WHERE name LIKE $1`, [`%${JELOLO}%`]);
  await pool.query(`DELETE FROM "WorkingHours" WHERE "staffId" IN (SELECT id FROM "User" WHERE name LIKE $1)`, [`%${JELOLO}%`]);
  await pool.query(`DELETE FROM "User" WHERE name LIKE $1`, [`%${JELOLO}%`]);
  await pool.query(`DELETE FROM "Service" WHERE name LIKE $1`, [`%${JELOLO}%`]);
}

const ora = (d) => new Intl.DateTimeFormat("hu-HU", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Budapest" }).format(d);

try {
  await takarit();
  console.log("\n=== Ismetlodo foglalas ===\n");

  const u = (await pool.query(`INSERT INTO "User" (name,email,role) VALUES ($1,$2,'EMPLOYEE') RETURNING id`,
    [`Sorozat ${JELOLO}`, `sorozat.${JELOLO}@pelda.hu`])).rows[0].id;
  const sz = (await pool.query(`INSERT INTO "Service" (name,price,"durationMin","blockMin") VALUES ($1,16000,50,60) RETURNING id`,
    [`Kezeles ${JELOLO}`])).rows[0].id;
  const c = (await pool.query(`INSERT INTO "Client" (name,email) VALUES ($1,$2) RETURNING id`,
    [`Vendeg ${JELOLO}`, `v.${JELOLO}@pelda.hu`])).rows[0].id;

  // Az oraatallitas hete: 2026. oktober 25., vasarnap hajnalban vissza.
  // A sorozat oktober 20-an (kedd) 10:00-kor indul, heti 3 alkalom —
  // a harmadik mar az atallitas UTAN van.
  const seriesId = randomUUID();
  const alap = new Date(2026, 9, 20, 10, 0, 0);   // helyi ido szerint 10:00
  const idok = [];
  for (let i = 0; i < 3; i++) {
    const k = new Date(alap);
    k.setDate(k.getDate() + i * 7);               // NAPTARI nap, nem ezredmasodperc
    const v = new Date(k.getTime() + 60 * 60000);
    idok.push(k);
    await pool.query(
      `INSERT INTO "Booking" ("clientId","serviceId","staffId","startsAt","endsAt","createdById",price,"seriesId")
       VALUES ($1,$2,$3,$4,$5,$3,16000,$6)`,
      [c, sz, u, k, v, seriesId]
    );
  }

  // 1. mind a harom alkalom 10:00-kor kezdodik, az oraatallitas utan is
  const alkalmak = await sorozatFoglalasai(seriesId);
  const orak = alkalmak.map((a) => ora(new Date(a.startsAt)));
  ok("mind a harom alkalom 10:00-kor kezdodik (oraatallitason at is)",
    orak.every((o) => o === "10:00"), orak.join(", "));

  // 2. pontosan 7 naponta
  // A getDate() osszehasonlitasa honapfordulon ertelmetlen (27. utan 3. jon),
  // ezert naptari napokban szamolunk, delre normalizalva — igy az
  // oraatallitas 23 vagy 25 oras napja sem rontja el az osztast.
  const delben = (d) => { const x = new Date(d); x.setHours(12, 0, 0, 0); return x.getTime(); };
  const napKulonbseg = (a, b) => Math.round((delben(b) - delben(a)) / 86400000);
  const kulonbsegek = [
    napKulonbseg(alkalmak[0].startsAt, alkalmak[1].startsAt),
    napKulonbseg(alkalmak[1].startsAt, alkalmak[2].startsAt),
  ];
  ok("pontosan 7 naponta kovetkeznek", kulonbsegek.every((k) => k === 7), kulonbsegek.join(", "));

  // 3. hanyadik alkalom
  const h = await sorozatHelye(seriesId, alkalmak[1].id);
  ok("a masodik alkalom 2. a 3-bol", h.hanyadik === 2 && h.osszesen === 3, JSON.stringify(h));

  // 4. utkozes: ugyanoda nem megy be masodszor
  let utkozott = false;
  try {
    await pool.query(
      `INSERT INTO "Booking" ("clientId","serviceId","staffId","startsAt","endsAt","createdById",price)
       VALUES ($1,$2,$3,$4,$5,$3,16000)`,
      [c, sz, u, idok[0], new Date(idok[0].getTime() + 60 * 60000)]
    );
  } catch (e) { utkozott = e.code === "23P01"; }
  ok("ugyanarra az idopontra nem megy be masodik foglalas", utkozott);

  // 5. a hatralevok lemondasa a masodiktol
  const db = await sorozatHatralevoLemondasa(seriesId, new Date(alkalmak[1].startsAt));
  ok("a masodiktol kezdve ketto lemondva", db === 2, String(db));

  // 6. az elso erintetlen marad
  const utana = await sorozatFoglalasai(seriesId);
  ok("az elso alkalom foglalt maradt", utana[0].status === "BOOKED", utana[0].status);
  ok("a hatralevok lemondva", utana[1].status === "CANCELLED" && utana[2].status === "CANCELLED");

  await takarit();
  console.log("\n" + "=".repeat(46));
  console.log(`  SIKERES: ${siker}    BUKOTT: ${bukas}`);
  console.log("=".repeat(46));
  process.exitCode = bukas > 0 ? 1 : 0;
} catch (err) {
  console.error("Hiba:", err.message);
  await takarit().catch(() => {});
  process.exitCode = 1;
} finally { await pool.end(); }
