// A naptármeghívó előállításának ellenőrzése. Adatbázis nem kell hozzá.
//   node scripts/teszt-ics.mjs
import { icsKeszites } from "../lib/ics.ts";

let siker = 0, bukas = 0;
const ok = (c, f, r = "") => {
  if (f) { siker++; console.log("  OK    " + c); }
  else { bukas++; console.log("  BUKAS " + c + (r ? " -> " + r : "")); }
};

const alap = {
  uid: "foglalas-abc123@restartphysio.hu",
  kezdet: new Date("2026-09-14T08:00:00Z"),
  veg: new Date("2026-09-14T09:00:00Z"),
  cim: "Egyéni gyógytorna – ReStart Physio",
  leiras: "Kollégánk: Forrás Fernanda",
  helyszin: "9028 Győr, Máté Mária utca 4/B 3. emelet 24.",
  szervezoNev: "ReStart Physio",
  szervezoEmail: "restart.gyor@gmail.com",
  vendegNev: "Kovács Éva",
  vendegEmail: "kovacs.eva@example.com",
};

console.log("=== Alapszerkezet ===");
let ics = icsKeszites(alap);
ok("VCALENDAR nyit es zar", ics.startsWith("BEGIN:VCALENDAR") && ics.trimEnd().endsWith("END:VCALENDAR"));
ok("VEVENT benne van", ics.includes("BEGIN:VEVENT") && ics.includes("END:VEVENT"));
ok("CRLF sorvegek", ics.includes("\r\n") && !/[^\r]\n/.test(ics));
ok("UID atkerult", ics.includes("UID:foglalas-abc123@restartphysio.hu"));
ok("METHOD:REQUEST", ics.includes("METHOD:REQUEST"));
ok("STATUS:CONFIRMED", ics.includes("STATUS:CONFIRMED"));

console.log("\n=== Idopontok UTC-ben ===");
ok("DTSTART helyes", ics.includes("DTSTART:20260914T080000Z"), ics.match(/DTSTART:[^\r]*/)?.[0]);
ok("DTEND helyes", ics.includes("DTEND:20260914T090000Z"), ics.match(/DTEND:[^\r]*/)?.[0]);

console.log("\n=== Resztvevok ===");
ok("ORGANIZER", ics.includes("mailto:restart.gyor@gmail.com"));
ok("ATTENDEE", ics.includes("mailto:kovacs.eva@example.com"));
ok("emlekezteto egy nappal elotte", ics.includes("TRIGGER:-P1D"));

console.log("\n=== Escapeles ===");
ics = icsKeszites({ ...alap, cim: "Teszt; vesszo, es \\ jel", leiras: "Elso sor\nMasodik sor" });
ok("pontosvesszo escapelve", ics.includes("Teszt\\;"));
ok("vesszo escapelve", ics.includes("vesszo\\,"));
ok("sortores \\n-re valt", ics.includes("Elso sor\\nMasodik sor"));

console.log("\n=== Hosszu sor hajtasa ===");
ics = icsKeszites({ ...alap, leiras: "x".repeat(200) });
const sorok = ics.split("\r\n");
ok("egyik sor sem hosszabb 75 oktettnel",
   sorok.every((s) => Buffer.from(s, "utf8").length <= 75),
   "leghosszabb: " + Math.max(...sorok.map((s) => Buffer.from(s, "utf8").length)));
ok("a folytatas szokozzel kezdodik", sorok.some((s) => s.startsWith(" ")));

console.log("\n=== Ekezetes karakter a hajtasnal nem torik el ===");
ics = icsKeszites({ ...alap, leiras: "őűéáí".repeat(40) });
ok("ervenyes UTF-8 marad", Buffer.from(ics, "utf8").toString("utf8") === ics);
ok("nincs kerdojeles csere", !ics.includes("�"));

console.log("\n=== Lemondas ===");
ics = icsKeszites({ ...alap, lemondas: true, sorszam: 2 });
ok("METHOD:CANCEL", ics.includes("METHOD:CANCEL"));
ok("STATUS:CANCELLED", ics.includes("STATUS:CANCELLED"));
ok("SEQUENCE:2", ics.includes("SEQUENCE:2"));
ok("lemondasnal nincs emlekezteto", !ics.includes("BEGIN:VALARM"));

console.log("\n" + "=".repeat(44));
console.log(`  SIKERES: ${siker}    BUKOTT: ${bukas}`);
console.log("=".repeat(44));
process.exitCode = bukas === 0 ? 0 : 1;
