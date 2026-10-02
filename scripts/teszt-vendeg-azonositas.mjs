// A vendeg felismeresenek ellenorzese.
//
//   node --env-file=.env.local scripts/teszt-vendeg-azonositas.mjs
//
// MIERT VAN EZ A TESZT:
// Belso rendszer: a gyogytornasz a vendeg helyett rogzit, es a legtobb paciens
// e-mail cime nincs meg. Ezert a felismeres harom lepcsos — e-mail, majd azonos
// neven belul a telefonszam, vegul a nev. Ezek a szabalyok finomak, es rosszul
// beallitva nem hibat okoznak, hanem NEMA adatosszekeveredest: ket paciens
// egyetlen vendeglapra kerul, es az egyikuk elozmenyei kozt ott lesz a masike.
//
// A legfontosabb eset a 6-os: egy rendeloben hetkoznapi, hogy anya es gyereke
// ugyanazt a telefonszamot adja meg. Oket soha nem szabad osszevonni.
import { pool, vendegKereses } from "../lib/db.ts";

const JELOLO = "ZZTESZT";

let siker = 0, bukas = 0;
const ok = (cimke, felt, reszlet = "") => {
  if (felt) { siker++; console.log("  OK    " + cimke); }
  else { bukas++; console.log("  BUKAS " + cimke + (reszlet ? "  -> " + reszlet : "")); }
};

async function vendeg(nev, email, telefon) {
  const r = await pool.query(
    `INSERT INTO "Client" (name, email, phone) VALUES ($1, $2, $3) RETURNING id`,
    [nev, email, telefon]
  );
  return r.rows[0].id;
}

async function takarit() {
  await pool.query(`DELETE FROM "Booking" WHERE "clientId" IN (SELECT id FROM "Client" WHERE name LIKE $1)`, [`%${JELOLO}%`]);
  const r = await pool.query(`DELETE FROM "Client" WHERE name LIKE $1`, [`%${JELOLO}%`]);
  return r.rowCount;
}

try {
  await takarit();

  console.log("\n=== A vendeg felismerese ===\n");

  // 1. ismeretlen nev
  ok("ismeretlen nevre nem talal semmit",
    (await vendegKereses(`Ismeretlen ${JELOLO}`, null, null)) === null);

  // 2. nev alapjan, e-mail es telefon nelkul
  const anna = await vendeg(`Kiss Anna ${JELOLO}`, null, null);
  const t2 = await vendegKereses(`Kiss Anna ${JELOLO}`, null, null);
  ok("nev alapjan megtalalja", t2?.id === anna);

  // 3. a nev irasmodja ne szamitson
  const t3 = await vendegKereses(`  kiss anna ${JELOLO}  `, null, null);
  ok("kis-nagybetu es szokoz nem szamit", t3?.id === anna);

  // 4. e-mail eroesebb a nevnel: mas nevvel is megtalalja
  const bela = await vendeg(`Nagy Bela ${JELOLO}`, `bela.${JELOLO}@pelda.hu`, null);
  const t4 = await vendegKereses(`Teljesen Mas Nev ${JELOLO}`, `bela.${JELOLO}@pelda.hu`, null);
  ok("e-mail alapjan akkor is megtalalja, ha a nev mas", t4?.id === bela);

  // 5. ket azonos nevu, kulonbozo telefonnal — a szam dont
  const janos1 = await vendeg(`Kovacs Janos ${JELOLO}`, null, "+36301111111");
  const janos2 = await vendeg(`Kovacs Janos ${JELOLO}`, null, "+36302222222");
  const t5a = await vendegKereses(`Kovacs Janos ${JELOLO}`, null, "+36302222222");
  ok("ket azonos nevu kozul a telefonszam dont", t5a?.id === janos2,
    t5a?.id === janos1 ? "a masikat adta" : String(t5a?.id));

  // 6. A LEGFONTOSABB: azonos telefon, kulonbozo nev — NEM ugyanaz a szemely
  const t6 = await vendegKereses(`Kovacs Peter ${JELOLO}`, null, "+36301111111");
  ok("azonos telefonszam, mas nev -> NEM vonja ossze (anya es gyereke)",
    t6 === null, t6 ? `osszevonta ezzel: ${t6.name}` : "");

  // 7. azonos nev, de a megadott szam egyikukhoz sem tartozik
  const t7 = await vendegKereses(`Kovacs Janos ${JELOLO}`, null, "+36309999999");
  ok("azonos nev, ismeretlen szam -> uj vendeg lesz", t7 === null,
    t7 ? `tevesen ezt adta: ${t7.phone}` : "");

  // 8. akinek meg nincs szama, ahhoz kerulhet az uj szam
  const szamNelkul = await vendeg(`Szabo Eva ${JELOLO}`, null, null);
  const t8 = await vendegKereses(`Szabo Eva ${JELOLO}`, null, "+36307777777");
  ok("akinek meg nincs telefonszama, ahhoz kerul az uj szam", t8?.id === szamNelkul);

  // 9. e-mail nelkuli vendeg mellett letezhet masik e-mail nelkuli
  const t9 = await pool.query(
    `SELECT count(*)::int db FROM "Client" WHERE name LIKE $1 AND email IS NULL`,
    [`%${JELOLO}%`]
  );
  ok("tobb e-mail nelkuli vendeg is letezhet egyszerre", t9.rows[0].db >= 2,
    `talalt: ${t9.rows[0].db}`);

  const torolt = await takarit();
  console.log(`\n  (takaritas: ${torolt} tesztvendeg torolve)`);

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
