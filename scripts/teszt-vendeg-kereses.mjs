// A foglalasi urlap vendegkeresesenek ellenorzese.
//
//   node --env-file=.env.local scripts/teszt-vendeg-kereses.mjs
//
// MIERT VAN EZ A TESZT:
// A kereses feladata az elgepeles MEGELOZESE. Ha egy mar rogzitett vendeget
// nem ajanl fel, a felhasznalo ujra begepeli a nevet — esetleg maskepp —, es
// masodpeldany keletkezik, kettehasadt elozmennyel.
//
// A legfontosabb eset a 4-es: az is jojjon elo, akinek meg EGYETLEN foglalasa
// sincs. Eppen a most felvett vendeget kell felajanlani, amikor a kovetkezo
// idopontjat rogzitik.
import { pool, vendegKeresese } from "../lib/db.ts";

const JELOLO = "ZZKERES";
let siker = 0, bukas = 0;
const ok = (c, f, r = "") => { if (f) { siker++; console.log("  OK    " + c); } else { bukas++; console.log("  BUKAS " + c + (r ? "  -> " + r : "")); } };

const takarit = () => pool.query(`DELETE FROM "Client" WHERE name LIKE $1`, [`%${JELOLO}%`]);

try {
  await takarit();
  console.log("\n=== Vendegkereses ===\n");

  await pool.query(`INSERT INTO "Client" (name,email,phone) VALUES ($1,$2,$3)`,
    [`Kovács Anna ${JELOLO}`, `anna.${JELOLO}@pelda.hu`, "+36301112233"]);
  await pool.query(`INSERT INTO "Client" (name,email,phone) VALUES ($1,null,$2)`,
    [`Kovács Béla ${JELOLO}`, "+36304445566"]);

  // 1. egy karakter nem indit kereset (feleslegesen terhelne)
  ok("egy karakterre nem keres", (await vendegKeresese("K")).length === 0);

  // 2. nevreszletre talal
  const t2 = await vendegKeresese("Kovács");
  ok("nevreszletre megtalalja mindkettot", t2.filter(v => v.name.includes(JELOLO)).length === 2, String(t2.length));

  // 3. e-mail reszletre is talal
  const t3 = await vendegKeresese(`anna.${JELOLO}`);
  ok("e-mail reszletre is talal", t3.some(v => v.name === `Kovács Anna ${JELOLO}`));

  // 4. A LENYEG: foglalas nelkuli vendeg is elojon
  ok("foglalas nelkuli vendeget is felajanl",
    (await vendegKeresese(`Kovács Béla ${JELOLO}`)).some(v => v.foglalas_db === 0));

  // 5. telefonszamra is talal
  ok("telefonszamra is talal",
    (await vendegKeresese("+3630444")).some(v => v.name === `Kovács Béla ${JELOLO}`));

  // 6. a kis-nagybetu ne szamitson
  ok("a kis-nagybetu nem szamit",
    (await vendegKeresese("kovács")).filter(v => v.name.includes(JELOLO)).length === 2);

  // 7. ismeretlen nevre ures lista, nem hiba
  ok("ismeretlen nevre ures lista", (await vendegKeresese(`Nincsilyen ${JELOLO}`)).length === 0);

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
