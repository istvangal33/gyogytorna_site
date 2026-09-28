// A szabad idősáv-számítás ellenőrzése. Adatbázis nem kell hozzá.
//   node scripts/teszt-szabad-idopontok.mjs
import { szabadResek, jeloltIdopontok, munkaidoSavKeszites } from "../lib/szabad-idopontok.ts";

let siker = 0, bukas = 0;
const ok = (cimke, felt, reszlet = "") => {
  if (felt) { siker++; console.log("  OK    " + cimke); }
  else { bukas++; console.log("  BUKAS " + cimke + (reszlet ? "  -> " + reszlet : "")); }
};

const NAP = new Date(2026, 8, 9); // 2026-09-09, szerda
const t = (o, p = 0) => { const d = new Date(NAP); d.setHours(o, p, 0, 0); return d; };
const sav = (o1, p1, o2, p2) => ({ kezdet: t(o1, p1), veg: t(o2, p2) });
const ora = (iso) => new Date(iso).toTimeString().slice(0, 5);

const munkaido = [munkaidoSavKeszites(NAP, 7 * 60, 19 * 60)];

console.log("=== 1. Ures nap ===");
let res = szabadResek(munkaido, []);
ok("egy osszefuggo res", res.length === 1);
ok("7:00-tol 19:00-ig", ora(res[0].kezdet.toISOString()) === "07:00" && ora(res[0].veg.toISOString()) === "19:00");

console.log("\n=== 2. Egy foglalas kozepen ===");
res = szabadResek(munkaido, [sav(10, 0, 11, 0)]);
ok("ket resre bomlik", res.length === 2, "db=" + res.length);
ok("elso res 7:00-10:00", ora(res[0].kezdet.toISOString()) === "07:00" && ora(res[0].veg.toISOString()) === "10:00");
ok("masodik res 11:00-19:00", ora(res[1].kezdet.toISOString()) === "11:00" && ora(res[1].veg.toISOString()) === "19:00");

console.log("\n=== 3. Egymas utani es atfedo foglalasok ===");
res = szabadResek(munkaido, [sav(9, 0, 10, 0), sav(10, 0, 11, 0), sav(10, 30, 12, 0)]);
ok("osszevonja oket egy blokka", res.length === 2, "db=" + res.length);
ok("a res 12:00-kor folytatodik", ora(res[1].kezdet.toISOString()) === "12:00", ora(res[1].kezdet.toISOString()));

console.log("\n=== 4. Foglalas a munkaido szelen ===");
res = szabadResek(munkaido, [sav(7, 0, 8, 0), sav(18, 0, 19, 0)]);
ok("egy res marad", res.length === 1);
ok("8:00-18:00", ora(res[0].kezdet.toISOString()) === "08:00" && ora(res[0].veg.toISOString()) === "18:00");

console.log("\n=== 5. Munkaidon kivuli foglalas nem szamit ===");
res = szabadResek(munkaido, [sav(5, 0, 6, 0), sav(20, 0, 21, 0)]);
ok("a teljes nap szabad marad", res.length === 1 && ora(res[0].veg.toISOString()) === "19:00");

console.log("\n=== 6. Jelolt idopontok ===");
res = szabadResek(munkaido, [sav(9, 0, 9, 40)]);
let j = jeloltIdopontok(res, { racsPerc: 30, minPerc: 40 });
const idok = j.map((x) => ora(x.kezdet));
ok("7:00 szerepel", idok.includes("07:00"));
ok("9:40 szerepel (a foglalas vege)", idok.includes("09:40"), idok.slice(0, 8).join(", "));
ok("9:00 NEM szerepel (foglalt)", !idok.includes("09:00"));
ok("18:30 NEM szerepel (csak 30 perc ferne)", !idok.includes("18:30"));
ok("18:20 nem kerul be (nem racspont)", !idok.includes("18:20"));

const nyolc = j.find((x) => ora(x.kezdet) === "08:00");
ok("8:00-nal 60 perc a max (9:00-ig)", nyolc?.maxPerc === 60, "maxPerc=" + nyolc?.maxPerc);

const otven = j.find((x) => ora(x.kezdet) === "09:40");
ok("9:40-nel 560 perc a max (19:00-ig)", otven?.maxPerc === 560, "maxPerc=" + otven?.maxPerc);

console.log("\n=== 7. Szuk res ===");
res = szabadResek(munkaido, [sav(7, 0, 10, 0), sav(10, 40, 19, 0)]);
ok("egy 40 perces res marad", res.length === 1);
j = jeloltIdopontok(res, { racsPerc: 30, minPerc: 40 });
ok("10:00 felajanlva", j.some((x) => ora(x.kezdet) === "10:00"));
ok("pontosan 40 perc fer bele", j.find((x) => ora(x.kezdet) === "10:00")?.maxPerc === 40);
j = jeloltIdopontok(res, { racsPerc: 30, minPerc: 60 });
ok("60 perces igenyre nincs jelolt", j.length === 0, "db=" + j.length);

console.log("\n=== 8. Mult nem ajanlhato ===");
res = szabadResek(munkaido, []);
j = jeloltIdopontok(res, { racsPerc: 30, minPerc: 40, nemKorabban: t(14, 0) });
ok("14:00 elotti idopont nincs", j.every((x) => new Date(x.kezdet) >= t(14, 0)));
ok("14:00 szerepel", j.some((x) => ora(x.kezdet) === "14:00"));

console.log("\n" + "=".repeat(40));
console.log(`  SIKERES: ${siker}    BUKOTT: ${bukas}`);
console.log("=".repeat(40));
process.exitCode = bukas === 0 ? 0 : 1;
