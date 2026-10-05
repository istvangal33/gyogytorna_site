// A vendegadatok javitasanak ellenorzese.
//
//   node --env-file=.env.local scripts/teszt-vendeg-modositas.mjs
//
// MIERT VAN EZ A TESZT:
// A vendeg felismerese nevegyezesen is mulik. Egy elgepelt nevvel rogzitett
// foglalas ezert kulon vendeglapra kerul, es az illeto elozmenye ketteszakad.
// A javitasnak VISSZAMENOLEG is hatnia kell: a regi foglalasokon is az uj nev
// jelenjen meg, kulonben csak egy harmadik valtozat keletkezne.
import { pool, vendegFrissitese, masikVendegEzzelAzEmaillel, vendegKereses } from "../lib/db.ts";

const JELOLO = "ZZVMOD";
let siker = 0, bukas = 0;
const ok = (c, f, r = "") => { if (f) { siker++; console.log("  OK    " + c); } else { bukas++; console.log("  BUKAS " + c + (r ? "  -> " + r : "")); } };

async function takarit() {
  await pool.query(`DELETE FROM "Booking" WHERE "clientId" IN (SELECT id FROM "Client" WHERE name LIKE $1)`, [`%${JELOLO}%`]);
  await pool.query(`DELETE FROM "Client" WHERE name LIKE $1`, [`%${JELOLO}%`]);
}

try {
  await takarit();
  console.log("\n=== Vendegadatok javitasa ===\n");

  const a = (await pool.query(`INSERT INTO "Client" (name,email,phone) VALUES ($1,$2,$3) RETURNING id`,
    [`Kovcs Anna ${JELOLO}`, null, "+36301234567"])).rows[0].id;   // elgepelve

  // 1. nev javitasa
  const f = await vendegFrissitese(a, { nev: `Kovács Anna ${JELOLO}`, email: null, telefon: "+36301234567" });
  ok("a nev javithato", f.name === `Kovács Anna ${JELOLO}`, f.name);

  // 2. a javitott nev mar felismerheto
  const t = await vendegKereses(`Kovács Anna ${JELOLO}`, null, null);
  ok("a javitott nev alapjan megtalalja", t?.id === a);

  // 3. a regi, elgepelt nevre mar NEM talal
  const r = await vendegKereses(`Kovcs Anna ${JELOLO}`, null, null);
  ok("a regi elgepelt nevre mar nem talal", r === null);

  // 4. e-mail felvetele
  const f2 = await vendegFrissitese(a, { nev: `Kovács Anna ${JELOLO}`, email: `anna.${JELOLO}@pelda.hu`, telefon: "+36301234567" });
  ok("e-mail utolag felveheto", f2.email === `anna.${JELOLO}@pelda.hu`);

  // 5. masik vendeg ugyanazzal az e-maillel: eszre kell venni
  const b = (await pool.query(`INSERT INTO "Client" (name,email) VALUES ($1,null) RETURNING id`, [`Masik ${JELOLO}`])).rows[0].id;
  const utkozo = await masikVendegEzzelAzEmaillel(b, `anna.${JELOLO}@pelda.hu`);
  ok("az utkozo e-mail cimet eszreveszi", utkozo?.id === a, String(utkozo?.id));

  // 6. sajat magaval nem utkozik
  const sajat = await masikVendegEzzelAzEmaillel(a, `anna.${JELOLO}@pelda.hu`);
  ok("sajat magaval nem jelez utkozest", sajat === null);

  // 7. az adatbazis is tiltja a duplikatumot
  let dobott = false;
  try { await vendegFrissitese(b, { nev: `Masik ${JELOLO}`, email: `anna.${JELOLO}@pelda.hu`, telefon: null }); }
  catch (e) { dobott = e.code === "23505"; }
  ok("az adatbazis is tiltja ugyanazt az e-mailt", dobott);

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
