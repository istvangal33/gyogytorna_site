// A megkeresesek merese.
//
// Futtatas:  node scripts/teszt-meres.mjs
//
// MIERT: a meres nema. Ha elromlik, semmi nem jelez — csak honapok mulva
// tunik fel, hogy nincs adat. Ezert ellenorizzuk gepileg.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { esemeny, URLAP_ELKULDVE, TELEFON_KATTINTAS } from "../lib/meres.ts";

let hiba = 0;
const all = (ok, cim, reszlet = "") => {
  console.log(`  ${ok ? "OK  " : "HIBA"}  ${cim}${reszlet ? "  — " + reszlet : ""}`);
  if (!ok) hiba++;
};

// 1. Hozzajarulas nelkul semmi nem mehet ki.
console.log("A meres csak hozzajarulas utan fut");
delete globalThis.window;
let dobott = false;
try { esemeny(URLAP_ELKULDVE); } catch { dobott = true; }
all(!dobott, "kiszolgalon (nincs window) nem dob hibat");

globalThis.window = {};               // betoltott oldal, de nincs gtag (elutasitva)
dobott = false;
try { esemeny(URLAP_ELKULDVE); } catch { dobott = true; }
all(!dobott, "elutasitott sutinel (nincs gtag) nem dob hibat");

// 2. Hozzajarulas utan viszont pontosan egyszer, a jo nevvel.
const kuldott = [];
globalThis.window = { gtag: (...a) => kuldott.push(a) };
esemeny(URLAP_ELKULDVE);
esemeny(TELEFON_KATTINTAS, { hely: "/arak" });
console.log("\nHozzajarulas utan kimegy");
all(kuldott.length === 2, "ket esemeny ment ki", `${kuldott.length} db`);
all(kuldott[0]?.[0] === "event" && kuldott[0]?.[1] === "urlap_elkuldve",
    "az urlap esemeny neve", JSON.stringify(kuldott[0]));
all(kuldott[1]?.[1] === "telefon_kattintas" && kuldott[1]?.[2]?.hely === "/arak",
    "a telefon esemeny neve es helye", JSON.stringify(kuldott[1]));

// 3. A ket esemenynev kulonbozo — kulonben osszemosodnanak a GA4-ben.
all(URLAP_ELKULDVE !== TELEFON_KATTINTAS, "a ket esemenynev kulonbozo");

// 4. A figyelo valasztoja MINDEN telefonszamra illeszkedik-e?
//    A selector: a[href^="tel:"] — tehat a href-nek "tel:"-lel kell kezdodnie.
console.log("\nA figyelo valasztoja minden telefonszamra illeszkedik");
const osszes = [];
(function bejar(m) {
  for (const n of readdirSync(m)) {
    if (n === "node_modules" || n === ".next" || n === ".git") continue;
    const p = join(m, n);
    if (statSync(p).isDirectory()) bejar(p);
    else if (n.endsWith(".tsx")) {
      const sz = readFileSync(p, "utf8");
      for (const t of sz.matchAll(/href=(["'`])([^"'`]*tel:[^"'`]*)\1/g)) osszes.push([p, t[2]]);
    }
  }
})(".");
const rosszak = osszes.filter(([, h]) => !h.startsWith("tel:"));
all(osszes.length >= 12, `megtalalt telefonszamok`, `${osszes.length} db`);
all(rosszak.length === 0, "mindegyik 'tel:'-lel kezdodik",
    rosszak.length ? rosszak.map(([p, h]) => `${p}: ${h}`).join(", ") : "");

// 5. A figyelo a lefogas szakaszaban fut-e? (kulonben egy stopPropagation elnyelne)
const fig = readFileSync("components/TelefonMeres.tsx", "utf8");
console.log("\nA figyelo beallitasa");
all(/addEventListener\(\s*["']click["']\s*,\s*\w+\s*,\s*true\s*\)/.test(fig),
    "a lefogas (capture) szakaszaban figyel");
all(/removeEventListener/.test(fig), "leszereli magat, amikor eltunik");
all(/a\[href\^="tel:"\]/.test(fig), "a valaszto a tel: hivatkozasokra szol");

console.log(hiba === 0 ? "\nMinden ellenorzes rendben." : `\n${hiba} ellenorzes bukott.`);
process.exitCode = hiba === 0 ? 0 : 1;
