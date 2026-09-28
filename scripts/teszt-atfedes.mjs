// Az atfedo foglalasok savkiosztasanak ellenorzese. Adatbazis nem kell hozza.
//   node scripts/teszt-atfedes.mjs
import { savKiosztas } from "../lib/atfedes.ts";

let siker = 0, bukas = 0;
const ok = (cimke, felt, reszlet = "") => {
  if (felt) { siker++; console.log("  OK    " + cimke); }
  else { bukas++; console.log("  BUKAS " + cimke + (reszlet ? "  -> " + reszlet : "")); }
};

// perc a nap kezdetetol: e(9, 30) === 9:30
const e = (o, p = 0) => o * 60 + p;
const f = (id, k, v) => ({ id, kezdet: k, veg: v });
const keres = (lista, id) => lista.find((x) => x.id === id);

console.log("=== 1. Hatareset: ures es egyelemu ===");
ok("ures lista -> ures eredmeny", savKiosztas([]).length === 0);

let r = savKiosztas([f("a", e(9), e(10))]);
ok("egy elem: sav 0", r[0].sav === 0);
ok("egy elem: nem osztozik", r[0].savok === 1);
ok("az eredeti mezok megmaradnak", r[0].id === "a" && r[0].kezdet === e(9));

console.log("\n=== 2. Nem atfedo elemek ===");
r = savKiosztas([f("a", e(9), e(10)), f("b", e(11), e(12))]);
ok("mindketto a 0. savba kerul", keres(r, "a").sav === 0 && keres(r, "b").sav === 0);
ok("egyik sem osztozik", keres(r, "a").savok === 1 && keres(r, "b").savok === 1);

console.log("\n=== 3. Erintkezes nem atfedes ===");
// 9:00-10:00 es 10:00-11:00: a masodik pont ott kezdodik, ahol az elso vegzodik
r = savKiosztas([f("a", e(9), e(10)), f("b", e(10), e(11))]);
ok("a szomszedos foglalasok teljes szelesek", keres(r, "a").savok === 1 && keres(r, "b").savok === 1);
ok("mindketto a 0. savban", keres(r, "a").sav === 0 && keres(r, "b").sav === 0);

console.log("\n=== 4. Ket atfedo elem ===");
r = savKiosztas([f("a", e(9), e(10)), f("b", e(9, 30), e(10, 30))]);
ok("kulon savba kerulnek", keres(r, "a").sav !== keres(r, "b").sav);
ok("ketten osztoznak", keres(r, "a").savok === 2 && keres(r, "b").savok === 2);
ok("a korabbi van az elso savban", keres(r, "a").sav === 0);

console.log("\n=== 5. Azonos idopont (ket munkatars ugyanakkor) ===");
r = savKiosztas([f("a", e(9), e(10)), f("b", e(9), e(10))]);
ok("ket kulon sav", new Set(r.map((x) => x.sav)).size === 2);
ok("mindketto ketten osztozik", r.every((x) => x.savok === 2));

console.log("\n=== 6. Harom egymasba logo ===");
r = savKiosztas([f("a", e(9), e(11)), f("b", e(9, 30), e(11, 30)), f("c", e(10), e(12))]);
ok("harom kulon sav", new Set(r.map((x) => x.sav)).size === 3);
ok("mindharman harman osztoznak", r.every((x) => x.savok === 3));

console.log("\n=== 7. Lanc: A-B atfed, B-C atfed, A-C nem ===");
// A 9:00-10:00, B 9:30-10:30, C 10:00-11:00
r = savKiosztas([f("a", e(9), e(10)), f("b", e(9, 30), e(10, 30)), f("c", e(10), e(11))]);
ok("egy csoportot alkotnak: mind 2 savon osztozik", r.every((x) => x.savok === 2), r.map((x) => x.id + ":" + x.savok).join(" "));
ok("C ujra az A savjaba kerul", keres(r, "c").sav === keres(r, "a").sav);
ok("B kulon savban", keres(r, "b").sav !== keres(r, "a").sav);

console.log("\n=== 8. Hosszu ala becsuszo rovidek ===");
// A 9:00-12:00, B 9:00-10:00, C 10:00-11:00
r = savKiosztas([f("a", e(9), e(12)), f("b", e(9), e(10)), f("c", e(10), e(11))]);
ok("ketten osztoznak", r.every((x) => x.savok === 2));
ok("B es C ugyanabba a savba kerul", keres(r, "b").sav === keres(r, "c").sav);
ok("A kulon savban", keres(r, "a").sav !== keres(r, "b").sav);

console.log("\n=== 9. Csoportok kulon szamolnak ===");
// A-B atfed (delelott), C-D-E atfed (delutan) — a ket csoport ne hasson egymasra
r = savKiosztas([
  f("a", e(9), e(10)), f("b", e(9), e(10)),
  f("c", e(14), e(16)), f("d", e(14, 30), e(16)), f("e", e(15), e(16)),
]);
ok("a delelotti csoport 2 savos", keres(r, "a").savok === 2 && keres(r, "b").savok === 2);
ok("a delutani csoport 3 savos", ["c", "d", "e"].every((id) => keres(r, id).savok === 3));

console.log("\n=== 10. A bemenet sorrendje es epsege ===");
const bemenet = [f("kesoi", e(15), e(16)), f("korai", e(9), e(10)), f("kozepso", e(9, 30), e(10, 30))];
const masolat = JSON.parse(JSON.stringify(bemenet));
r = savKiosztas(bemenet);
ok("a kimenet kezdet szerint rendezett", r.map((x) => x.kezdet).every((v, i, t) => i === 0 || t[i - 1] <= v));
ok("minden elem megvan", r.length === 3);
ok("a bemeneti tombot nem irja at", JSON.stringify(bemenet) === JSON.stringify(masolat));

console.log("\n========================================");
console.log("  SIKERES: " + siker + "    BUKOTT: " + bukas);
console.log("========================================");
process.exit(bukas > 0 ? 1 : 0);
