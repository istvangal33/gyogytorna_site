// Leallitja a buildet, ha egy Next.js kulonleges fajl neve nagybetus
// (peldaul Layout.tsx a layout.tsx helyett).
//
// MIERT: a Windows fajlrendszere nem tesz kulonbseget kis- es nagybetu kozott,
// a Linuxe igen. A fejlesztoi gepen tehat a Layout.tsx is mukodik, a Netlify
// Linuxan viszont a Next.js nem ismeri fel kulonleges fajlkent — es az oldal
// nema modon elveszti a metaadatait vagy egyaltalan nem jelenik meg.
//
// Ez mar megtortent egyszer az /arak oldalon, egyetlen nagy "L" betu miatt.
//
// Az npm a "prebuild" szkriptet magatol lefuttatja minden "npm run build"
// elott, igy az eles telepites is vedve van.
import { readdirSync } from "node:fs";
import { join } from "node:path";

const KULONLEGES = [
  "layout",
  "page",
  "route",
  "template",
  "loading",
  "error",
  "not-found",
  "default",
  "global-error",
];

const hibak = [];

function bejar(mappa) {
  for (const elem of readdirSync(mappa, { withFileTypes: true })) {
    const utvonal = join(mappa, elem.name);

    if (elem.isDirectory()) {
      bejar(utvonal);
      continue;
    }

    const nev = elem.name.replace(/\.(tsx|ts|jsx|js|mdx)$/, "");
    if (KULONLEGES.includes(nev.toLowerCase()) && nev !== nev.toLowerCase()) {
      hibak.push(utvonal);
    }
  }
}

bejar("app");

if (hibak.length > 0) {
  console.error(
    "\nNagybetus Next.js fajlnev — eles kornyezetben (Linux) nem fog mukodni:\n  " +
      hibak.join("\n  ") +
      "\n\nNevezd at kisbetusre. A Windows nem tesz kulonbseget, a Netlify Linuxa igen.\n"
  );
  process.exit(1);
}
