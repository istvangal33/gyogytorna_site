// Az idozona-kezeles ellenorzese. Adatbazis nem kell hozza.
//
//   node scripts/teszt-idozona.mjs
//
// MIERT VAN EZ A TESZT:
// A rendszer abbol indult ki, hogy a szerver magyar idozonaban jar. A
// fejlesztoi gepen igy is volt, a felhoben viszont a szerverek UTC-ben
// futnak — es akkor minden idopont ket orat csuszott: a munkaido 7-19 helyett
// 9-21 lett, a kezzel beirt 15:00-bol 17:00, a vendegnek kikuldott levelben
// pedig a 16:30-as foglalas 14:30-kent jelent meg.
//
// Ezert ez a teszt SZANDEKOSAN UTC-ben futtatja magat: azt vizsgalja, hogy a
// vendegnek szolo szoveg akkor is magyar idot mutat-e, ha a szerver nem abban jar.
import { spawnSync } from "node:child_process";

// Ha nem UTC-ben futunk, ujrainditjuk magunkat UTC-vel — a lenyeg epp az,
// hogy a rossz kornyezetet utanozzuk.
if (process.env.TZ !== "UTC") {
  const r = spawnSync(process.execPath, [import.meta.filename], {
    env: { ...process.env, TZ: "UTC" },
    stdio: "inherit",
  });
  process.exit(r.status ?? 1);
}

const { idopontSzoveg } = await import("../lib/mail.ts");
const { IDOZONA } = await import("../lib/idozona.ts");

let siker = 0, bukas = 0;
const ok = (cimke, felt, reszlet = "") => {
  if (felt) { siker++; console.log("  OK    " + cimke); }
  else { bukas++; console.log("  BUKAS " + cimke + (reszlet ? "  -> " + reszlet : "")); }
};

console.log("=== A szerver szandekosan UTC-ben fut (" + Intl.DateTimeFormat().resolvedOptions().timeZone + ") ===\n");

ok("az idozona Europe/Budapest", IDOZONA === "Europe/Budapest");

// nyari idoszamitas: +2 ora
const nyar = idopontSzoveg(
  new Date("2026-10-02T16:30:00+02:00"),
  new Date("2026-10-02T17:30:00+02:00")
);
ok("nyari idoszamitasban 16:30-at ir", nyar.includes("16:30"), nyar);
ok("a veget is jol irja (17:30)", nyar.includes("17:30"), nyar);
ok("nem UTC-ben ir (nincs benne 14:30)", !nyar.includes("14:30"), nyar);
ok("a napot is jol irja (oktober 2.)", nyar.includes("október 2"), nyar);

// teli idoszamitas: +1 ora — az oraatallitas utan is stimmelnie kell
const tel = idopontSzoveg(
  new Date("2026-12-10T09:00:00+01:00"),
  new Date("2026-12-10T10:00:00+01:00")
);
ok("teli idoszamitasban 09:00-at ir", tel.includes("09:00"), tel);
ok("teli idoszamitasban nem csuszik (nincs 08:00)", !tel.includes("08:00"), tel);

// az oraatallitas napja: 2026. oktober 25., hajnali 3-kor vissza 2-re
const atallitasElott = idopontSzoveg(
  new Date("2026-10-25T01:30:00+02:00"),
  new Date("2026-10-25T02:00:00+02:00")
);
ok("az oraatallitas hajnalan is ertelmes idot ir", /0[12]:[0-9]{2}/.test(atallitasElott), atallitasElott);

console.log("\n" + "=".repeat(46));
console.log(`  SIKERES: ${siker}    BUKOTT: ${bukas}`);
console.log("=".repeat(46));
process.exit(bukas > 0 ? 1 : 0);
