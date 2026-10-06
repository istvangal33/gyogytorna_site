// Egy ismetlodo sorozat MINDEN alkalmanak athelyezese mas napszakra.
//
//   node --env-file=.env.prod scripts/sorozat-atidozites.mjs --vendeg "Core gyerek" --ora 17:30
//
// Alapbol csak MEGMUTATJA, mi tortenne. A valtoztatashoz kell a --mentem.
//
// MIERT SCRIPT: a feluleten egy foglalast lehet modositani, sorozatot nem.
// Tiz alkalmat kezzel atirni hibazas; ez egyszerre, ellenorzotten teszi.
//
// Az uj idot HELYI idoben adjuk meg, es helyi idoben is allitjuk be. Igy a
// nyari-teli idoszamitas valtasa nem szamit: a sorozat oszi es teli alkalma
// is ugyanakkor kezdodik az ora szerint.
import { pool } from "../lib/db.ts";

const ertek = (kapcsolo) => {
  const i = process.argv.indexOf(kapcsolo);
  return i === -1 ? null : process.argv[i + 1];
};
const vendeg = ertek("--vendeg");
const ujOra = ertek("--ora");
const mentem = process.argv.includes("--mentem");

if (!vendeg || !ujOra || !/^\d{1,2}:\d{2}$/.test(ujOra)) {
  console.error('Hasznalat: --vendeg "<nev reszlete>" --ora HH:MM [--mentem]');
  process.exit(1);
}

const HU = (d) =>
  d.toLocaleString("hu-HU", { timeZone: "Europe/Budapest", dateStyle: "short", timeStyle: "short" });

const ugyfel = await pool.connect();
try {
  const s = await ugyfel.query(
    `SELECT DISTINCT b."seriesId" FROM "Booking" b JOIN "Client" c ON c.id = b."clientId"
     WHERE c.name ILIKE $1 AND b."seriesId" IS NOT NULL`,
    [`%${vendeg}%`]
  );
  if (s.rowCount === 0) throw new Error(`Nincs sorozat erre: "${vendeg}"`);
  if (s.rowCount > 1) throw new Error(`Tobb sorozat is illeszkedik (${s.rowCount}) — pontositsd a nevet.`);
  const seriesId = s.rows[0].seriesId;

  // Mi lenne az uj idopont? A helyi datumhoz tesszuk hozza az uj orat, a
  // hosszat valtozatlanul hagyjuk.
  const terv = await ugyfel.query(
    `SELECT b.id, b."startsAt" regi_kezd, b."endsAt" regi_veg, b.status,
            c.email, c.name vendeg,
            ((b."startsAt" AT TIME ZONE 'Europe/Budapest')::date + $2::time)
              AT TIME ZONE 'Europe/Budapest' AS uj_kezd,
            ((b."startsAt" AT TIME ZONE 'Europe/Budapest')::date + $2::time)
              AT TIME ZONE 'Europe/Budapest' + (b."endsAt" - b."startsAt") AS uj_veg
     FROM "Booking" b JOIN "Client" c ON c.id = b."clientId"
     WHERE b."seriesId" = $1 ORDER BY b."startsAt"`,
    [seriesId, ujOra]
  );

  console.log(`Sorozat: ${terv.rows[0].vendeg}  (${terv.rowCount} alkalom)\n`);
  const most = new Date();
  let valtozik = 0, mult = 0;
  for (const x of terv.rows) {
    const azonos = +x.regi_kezd === +x.uj_kezd;
    if (!azonos) valtozik++;
    if (x.regi_kezd < most) mult++;
    console.log(
      `  ${HU(x.regi_kezd)}–${HU(x.regi_veg).slice(-5)}` +
        (azonos ? "   (mar jo)" : `  ->  ${HU(x.uj_kezd)}–${HU(x.uj_veg).slice(-5)}`) +
        (x.regi_kezd < most ? "   MAR ELMULT" : "")
    );
  }

  // Utkozes-ellenorzes. Az adatbazisban van kizarasi feltetel, de jobb elore
  // megmondani, mi all utban, mint egy nyers hibauzenetet kapni.
  const utk = await ugyfel.query(
    `SELECT c.name, o."startsAt", o."endsAt" FROM "Booking" b
     JOIN "Booking" o ON o.id <> b.id AND o."staffId" = b."staffId" AND o.status <> 'CANCELLED'
     JOIN "Client" c ON c.id = o."clientId"
     WHERE b."seriesId" = $1 AND o."seriesId" IS DISTINCT FROM $1
       AND o."startsAt" < ((b."startsAt" AT TIME ZONE 'Europe/Budapest')::date + $2::time)
             AT TIME ZONE 'Europe/Budapest' + (b."endsAt" - b."startsAt")
       AND ((b."startsAt" AT TIME ZONE 'Europe/Budapest')::date + $2::time)
             AT TIME ZONE 'Europe/Budapest' < o."endsAt"`,
    [seriesId, ujOra]
  );
  if (utk.rowCount > 0) {
    console.log(`\nUTKOZES — ${utk.rowCount} foglalas all utban:`);
    for (const x of utk.rows) console.log(`  ${HU(x.startsAt)}–${HU(x.endsAt).slice(-5)}  ${x.name}`);
    throw new Error("Utkozes miatt nem valtoztatok semmit.");
  }
  console.log("\nUtkozes: nincs.");
  if (mult > 0) console.log(`FIGYELEM: ${mult} alkalom mar elmult — azok is athelyezodnek.`);

  const cimzett = terv.rows.filter((x) => x.email).length;
  console.log(
    cimzett === 0
      ? "Ertesites: a vendegnek nincs e-mail cime, level nem megy ki."
      : `FIGYELEM: ${cimzett} alkalomhoz tartozik e-mail cim, de ez a script NEM kuld ertesitest.`
  );

  if (!mentem) {
    console.log(`\nEz csak elonezet. ${valtozik} alkalom valtozna. Vegrehajtas: --mentem`);
  } else {
    await ugyfel.query("BEGIN");
    const r = await ugyfel.query(
      `UPDATE "Booking" b
         SET "startsAt" = ((b."startsAt" AT TIME ZONE 'Europe/Budapest')::date + $2::time)
                            AT TIME ZONE 'Europe/Budapest',
             "endsAt"   = ((b."startsAt" AT TIME ZONE 'Europe/Budapest')::date + $2::time)
                            AT TIME ZONE 'Europe/Budapest' + (b."endsAt" - b."startsAt"),
             "updatedAt" = now()
       WHERE b."seriesId" = $1 RETURNING b.id`,
      [seriesId, ujOra]
    );
    await ugyfel.query("COMMIT");
    console.log(`\nKesz. ${r.rowCount} alkalom athelyezve ${ujOra}-ra.`);
  }
} catch (err) {
  await ugyfel.query("ROLLBACK").catch(() => {});
  console.error("\nHiba:", err.message);
  process.exitCode = 1;
} finally {
  ugyfel.release();
  await pool.end();
}
