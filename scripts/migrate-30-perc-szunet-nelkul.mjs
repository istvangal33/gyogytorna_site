// A 30 perces kezelesek ne foglaljanak 40 percet a naptarban.
//
// Futtatas:  node --env-file=.env.local scripts/migrate-30-perc-szunet-nelkul.mjs
//       es:  node --env-file=.env.prod  scripts/migrate-30-perc-szunet-nelkul.mjs
//
// MIERT: a seed minden kezeleshez hozzaadott 10 perc atallast, igy a 30 perces
// kezeles 40 percet foglalt. Az 50 percesnel ez aranyos (a blokk 60 perc, szep
// orahatarra esik), a 30 percesnel viszont a kezeles EGYHARMADAT toldja hozza,
// es elcsusztatja a napot a fel oras rasztertol. A 30 perces sav rovid, ket
// ilyen kezeles kozott nincs szukseg kulon atallasra.
//
// A meglevo foglalasok sajat kezdes- es vegidovel elnek, ezert a szolgaltatas
// atallitasa CSAK az ezutan rogzitett foglalasokra hat. A mar bent levo,
// jovobeli 30 perces foglalasok rovidite a --foglalasokat-is kapcsoloval
// kerheto kulon.
//
// Idempotens.
import { pool } from "../lib/db.ts";

const foglalasokatIs = process.argv.includes("--foglalasokat-is");

try {
  // 1. A szolgaltatasok.
  const sz = await pool.query(
    `UPDATE "Service" SET "blockMin" = "durationMin"
     WHERE "durationMin" = 30 AND "blockMin" <> "durationMin"
     RETURNING name, "durationMin", "blockMin"`
  );

  if (sz.rowCount === 0) {
    console.log("A 30 perces szolgaltatasok mar 30 percet foglalnak. Nincs teendo.");
  } else {
    console.log(`Atallitva ${sz.rowCount} szolgaltatas 30 percre:`);
    for (const r of sz.rows) console.log("  -", r.name);
  }

  // 2. A mar bent levo, meg meg nem kezdodott foglalasok.
  const erintett = await pool.query(
    `SELECT b.id, b."startsAt", s.name,
            EXTRACT(EPOCH FROM (b."endsAt" - b."startsAt"))/60 AS perc
     FROM "Booking" b JOIN "Service" s ON s.id = b."serviceId"
     WHERE s."durationMin" = 30
       AND b."startsAt" > now()
       AND b."endsAt" > b."startsAt" + interval '30 minutes'
     ORDER BY b."startsAt"`
  );

  if (erintett.rowCount === 0) {
    console.log("\nNincs olyan jovobeli foglalas, amely 30 percnel tobbet foglalna.");
  } else if (!foglalasokatIs) {
    console.log(
      `\n${erintett.rowCount} jovobeli foglalas tovabbra is 40 perces marad. ` +
        `Ezeket NEM nyultam hozza.\nHa roviditeni kered oket, futtasd ugyanezt ` +
        `a --foglalasokat-is kapcsoloval. A kezdesi ido nem valtozik, csak a vege.`
    );
    for (const r of erintett.rows) {
      console.log(
        "  ", r.startsAt.toISOString().slice(0, 16).replace("T", " "),
        `${Number(r.perc)} perc`, "-", r.name
      );
    }
  } else {
    // Csak a veget huzzuk be. A kezdes nem mozdul: arrol a vendeg mar tud.
    // Rovidites utkozest nem okozhat, ezert a GIST kizarasi feltetel biztos.
    const f = await pool.query(
      `UPDATE "Booking" b SET "endsAt" = b."startsAt" + interval '30 minutes',
                              "updatedAt" = now()
       FROM "Service" s
       WHERE s.id = b."serviceId" AND s."durationMin" = 30
         AND b."startsAt" > now()
         AND b."endsAt" > b."startsAt" + interval '30 minutes'
       RETURNING b.id`
    );
    console.log(`\nRovidite ${f.rowCount} jovobeli foglalas 30 percre.`);
    console.log(
      "A vendegeknek kikuldott naptarmeghivo meg a regi, 40 perces veget " +
        "tartalmazza. Ha ez szamit, a foglalast ujra el kell kuldeni."
    );
  }
} catch (err) {
  console.error("Hiba:", err.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
