// Leallitja a buildet, ha a kodban kitoltetlen [[FERNANDA: ...]] jeloles maradt.
//
// MIERT: a szolgaltatasoldalak szoveget Claude fogalmazza, de ez egeszsegugyi
// tartalom. Fernanda olvassa at, es o potolja, amit csak o tudhat (peldaul a
// sajat szavaival irt bekezdest). Amig jeloles van a kodban, az oldal nem
// mehet elesbe: a paciens a nyers "[[FERNANDA: ...]]" szoveget latna.
//
// Az npm a "prebuild" szkriptet magatol lefuttatja minden "npm run build"
// elott. Ha a Netlify forditasa itt megall, elesben az elozo valtozat marad.
// A helyi "npm run dev"-et nem zavarja: Fernanda ott latja a jeloleseket.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

// Kis-nagybetutol es a zarojelek utani szokoztol fuggetlenul ("[[ Fernanda").
const JELOLES = /\[\[\s*fernanda/i;
const talalatok = [];

function bejar(mappa) {
  for (const elem of readdirSync(mappa, { withFileTypes: true })) {
    const utvonal = join(mappa, elem.name);

    if (elem.isDirectory()) {
      bejar(utvonal);
      continue;
    }
    if (!/\.(tsx|ts|jsx|js|mdx|md)$/.test(elem.name)) continue;

    readFileSync(utvonal, "utf8")
      .split("\n")
      .forEach((sor, i) => {
        if (JELOLES.test(sor)) {
          talalatok.push(`${utvonal}:${i + 1}  ${sor.trim().slice(0, 100)}`);
        }
      });
  }
}

for (const mappa of ["app", "components", "lib"]) bejar(mappa);

if (talalatok.length > 0) {
  console.error(
    "\nKitoltetlen [[FERNANDA: ...]] jeloles maradt, ez az oldal meg nem mehet elesbe:\n  " +
      talalatok.join("\n  ") +
      "\n\nFernanda potolja oket, es kozben olvassa at az oldal teljes szoveget:" +
      "\nugyanaz az oldal azt allitja, hogy o szakmailag ellenorizte.\n"
  );
  process.exit(1);
}
