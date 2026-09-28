import { Pool } from "pg";

// dev alatt a hot-reload ne nyisson újabb és újabb poolt
const globalForDb = globalThis as unknown as { pool?: Pool };

export const pool =
  globalForDb.pool ?? new Pool({ connectionString: process.env.DATABASE_URL });

if (process.env.NODE_ENV !== "production") globalForDb.pool = pool;

export async function getUserByEmail(email: string) {
  const result = await pool.query(
    `SELECT id, name, email, "passwordHash", role, active, "passwordChangedAt"
     FROM "User"
     WHERE email = $1
     LIMIT 1`,
    [email]
  );
  return result.rows[0] ?? null;
}

// --- jelszó-visszaállítás ---

export async function ujVisszaallitoToken(
  userId: string,
  lenyomat: string,
  lejarat: Date
) {
  // egy felhasználónak egyszerre csak egy élő linkje legyen: a korábbiakat
  // érvénytelenítjük, így egy régebbi e-mail már nem használható
  await pool.query(
    `UPDATE "PasswordResetToken"
     SET "usedAt" = now()
     WHERE "userId" = $1 AND "usedAt" IS NULL`,
    [userId]
  );

  await pool.query(
    `INSERT INTO "PasswordResetToken" ("userId", "tokenHash", "expiresAt")
     VALUES ($1, $2, $3)`,
    [userId, lenyomat, lejarat]
  );
}

/**
 * Hány visszaállító link készült ehhez a fiókhoz a megadott időpont óta.
 *
 * A már felhasznált és a lejárt tokeneket is beleszámolja: nem az a kérdés,
 * hány link él, hanem hogy hány levelet küldtünk ki — a rátekorlátozás ezt
 * akarja fékezni.
 */
export async function visszaallitoKeresekSzama(userId: string, ota: Date) {
  const result = await pool.query(
    `SELECT count(*)::int AS db
     FROM "PasswordResetToken"
     WHERE "userId" = $1 AND "createdAt" >= $2`,
    [userId, ota]
  );
  return result.rows[0].db as number;
}

export async function ervenyesToken(lenyomat: string) {
  const result = await pool.query(
    `SELECT t.id, t."userId", u.name, u.email
     FROM "PasswordResetToken" t
     JOIN "User" u ON u.id = t."userId"
     WHERE t."tokenHash" = $1
       AND t."usedAt" IS NULL
       AND t."expiresAt" > now()
       AND u.active
     LIMIT 1`,
    [lenyomat]
  );
  return result.rows[0] ?? null;
}

// A token beváltása és a jelszócsere egyetlen tranzakcióban történik: vagy
// mindkettő megtörténik, vagy egyik sem. A FOR UPDATE zárolás miatt két
// egyszerre érkező kérés közül csak az egyik tudja felhasználni a tokent.
export async function tokenBevaltas(
  lenyomat: string,
  ujJelszoHash: string
): Promise<boolean> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const talalat = await client.query(
      `SELECT t.id, t."userId"
       FROM "PasswordResetToken" t
       JOIN "User" u ON u.id = t."userId"
       WHERE t."tokenHash" = $1
         AND t."usedAt" IS NULL
         AND t."expiresAt" > now()
         AND u.active
       FOR UPDATE OF t`,
      [lenyomat]
    );

    if (talalat.rowCount === 0) {
      await client.query("ROLLBACK");
      return false;
    }

    const { userId } = talalat.rows[0];

    await client.query(
      // A passwordChangedAt frissitese lepteti ki a korabbi bejelentkezeseket:
      // a regi munkamenet a valtas elotti belyeget hozza magaval.
      `UPDATE "User"
          SET "passwordHash" = $1, "updatedAt" = now(), "passwordChangedAt" = now()
        WHERE id = $2`,
      [ujJelszoHash, userId]
    );

    // a felhasznált és minden más függőben lévő token egyszerre évül el
    await client.query(
      `UPDATE "PasswordResetToken"
       SET "usedAt" = now()
       WHERE "userId" = $1 AND "usedAt" IS NULL`,
      [userId]
    );

    await client.query("COMMIT");
    return true;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}
// --- naptár ---

export async function felhasznaloAzonositoval(id: string) {
  const result = await pool.query(
    `SELECT id, name, email, role, "canViewAll", "canBookOthers", active, "passwordChangedAt"
     FROM "User" WHERE id = $1 LIMIT 1`,
    [id]
  );
  return result.rows[0] ?? null;
}

export async function munkatarsak() {
  const result = await pool.query(
    `SELECT id, name, email, role, "canViewAll"
     FROM "User" WHERE active ORDER BY name`
  );
  return result.rows;
}

// A staffId szűrést a hívó dönti el a jogosultság alapján — ha nem null,
// csak az adott munkatárs foglalásai jönnek vissza.
export async function foglalasok(kezdet: Date, veg: Date, staffId: string | null) {
  const result = await pool.query(
    `SELECT b.id, b."startsAt", b."endsAt", b.status, b.notes, b."serviceId",
            c.name AS vendeg, c.email AS vendeg_email, c.phone AS vendeg_telefon,
            s.name AS szolgaltatas, s."durationMin", b.price,
            u.id AS staff_id, u.name AS staff_nev
     FROM "Booking" b
     JOIN "Client"  c ON c.id = b."clientId"
     JOIN "Service" s ON s.id = b."serviceId"
     JOIN "User"    u ON u.id = b."staffId"
     WHERE b."startsAt" < $2 AND b."endsAt" > $1
       AND ($3::uuid IS NULL OR b."staffId" = $3)
     ORDER BY b."startsAt"`,
    [kezdet, veg, staffId]
  );
  return result.rows;
}

export async function munkaidok() {
  const result = await pool.query(
    `SELECT "staffId", weekday, "startMinute", "endMinute"
     FROM "WorkingHours" ORDER BY weekday, "startMinute"`
  );
  return result.rows;
}

export async function tavolletek(kezdet: Date, veg: Date, staffId: string | null) {
  const result = await pool.query(
    `SELECT id, "staffId", "startsAt", "endsAt", reason
     FROM "TimeOff"
     WHERE "startsAt" < $2 AND "endsAt" > $1
       AND ($3::uuid IS NULL OR "staffId" = $3 OR "staffId" IS NULL)
     ORDER BY "startsAt"`,
    [kezdet, veg, staffId]
  );
  return result.rows;
}

// --- foglalás felvitele ---

export async function foglalhatoSzolgaltatasok() {
  const result = await pool.query(
    `SELECT id, name, price, "durationMin", "blockMin"
     FROM "Service" WHERE active AND bookable ORDER BY name`
  );
  return result.rows;
}

// A vendéget e-mail alapján azonosítjuk: ha van már ilyen, frissítjük az
// adatait, ha nincs, létrejön. Így nem keletkezik két rekord ugyanahhoz
// az emberhez, és megmarad a foglalási előzménye.
export async function vendegRogzitese(nev: string, email: string, telefon: string | null) {
  const result = await pool.query(
    `INSERT INTO "Client" (name, email, phone)
     VALUES ($1, $2, $3)
     ON CONFLICT (email) DO UPDATE
       SET name = EXCLUDED.name,
           phone = COALESCE(EXCLUDED.phone, "Client".phone),
           "updatedAt" = now()
     RETURNING id, name, email`,
    [nev, email, telefon]
  );
  return result.rows[0];
}

export async function vendegEmaillel(email: string) {
  const result = await pool.query(
    `SELECT id, name, email, phone FROM "Client" WHERE email = $1 LIMIT 1`,
    [email]
  );
  return result.rows[0] ?? null;
}

// Hányszor járt már ez a vendég? Az "első alkalom csak 50 perces" szabályhoz.
export async function vendegKorabbiFoglalasai(clientId: string) {
  const result = await pool.query(
    `SELECT count(*)::int AS db FROM "Booking"
     WHERE "clientId" = $1 AND status <> 'CANCELLED'`,
    [clientId]
  );
  return result.rows[0].db as number;
}

export async function foglalasMentese(adat: {
  clientId: string;
  serviceId: string;
  staffId: string;
  kezdet: Date;
  veg: Date;
  createdById: string;
  megjegyzes: string | null;
  ar: number;
}) {
  const result = await pool.query(
    `INSERT INTO "Booking"
       ("clientId", "serviceId", "staffId", "startsAt", "endsAt", "createdById", notes, price)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING id`,
    [
      adat.clientId,
      adat.serviceId,
      adat.staffId,
      adat.kezdet,
      adat.veg,
      adat.createdById,
      adat.megjegyzes,
      adat.ar,
    ]
  );
  return result.rows[0].id as string;
}

// --- foglalás módosítása ---

export async function foglalasAzonositoval(id: string) {
  const result = await pool.query(
    `SELECT b.id, b."clientId", b."serviceId", b."staffId",
            b."startsAt", b."endsAt", b.status, b.notes
     FROM "Booking" b WHERE b.id = $1 LIMIT 1`,
    [id]
  );
  return result.rows[0] ?? null;
}

export async function foglalasAllapota(id: string, allapot: string) {
  const result = await pool.query(
    `UPDATE "Booking" SET status = $2::"BookingStatus", "updatedAt" = now()
     WHERE id = $1 RETURNING id`,
    [id, allapot]
  );
  return result.rowCount === 1;
}

export async function foglalasModositasa(
  id: string,
  adat: {
    serviceId: string;
    staffId: string;
    kezdet: Date;
    veg: Date;
    megjegyzes: string | null;
    ar: number;
  }
) {
  const result = await pool.query(
    `UPDATE "Booking"
     SET "serviceId" = $2, "staffId" = $3, "startsAt" = $4, "endsAt" = $5,
         notes = $6, price = $7, "updatedAt" = now()
     WHERE id = $1
     RETURNING id`,
    [id, adat.serviceId, adat.staffId, adat.kezdet, adat.veg, adat.megjegyzes, adat.ar]
  );
  return result.rowCount === 1;
}

export async function foglalasTorlese(id: string) {
  const result = await pool.query(`DELETE FROM "Booking" WHERE id = $1`, [id]);
  return result.rowCount === 1;
}

/**
 * A megőrzési időn túli foglalások és a hozzájuk tartozó vendégadatok törlése.
 *
 * Két lépés, egy tranzakcióban:
 *   1. a határnapnál korábban kezdődött foglalások,
 *   2. azok a vendégek, akikre ezután már egyetlen foglalás sem hivatkozik.
 *
 * A vendégnél a `createdAt` is feltétel: egy frissen felvett vendéget, akihez
 * még nem készült foglalás, nem söprünk ki a rendszerből.
 *
 * `proba` módban mindent végigszámol, majd visszagörget — így pontosan az a
 * darabszám jön ki, amit egy éles futás törölne, de nem vész el semmi.
 */
export async function regiAdatokTorlese(hatar: Date, proba: boolean) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const foglalas = await client.query(
      `DELETE FROM "Booking" WHERE "startsAt" < $1`,
      [hatar]
    );

    const vendeg = await client.query(
      `DELETE FROM "Client" c
        WHERE c."createdAt" < $1
          AND NOT EXISTS (SELECT 1 FROM "Booking" b WHERE b."clientId" = c.id)`,
      [hatar]
    );

    await client.query(proba ? "ROLLBACK" : "COMMIT");

    return {
      proba,
      hatarnap: hatar.toISOString(),
      foglalas: foglalas.rowCount ?? 0,
      vendeg: vendeg.rowCount ?? 0,
    };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

// --- felhasználókezelés ---

export async function felhasznalokReszletesen() {
  const result = await pool.query(
    `SELECT u.id, u.name, u.email, u.role, u."canViewAll", u."canBookOthers", u.active,
            u."passwordHash" IS NOT NULL AS van_jelszo,
            to_char(u."createdAt", 'YYYY-MM-DD') AS letrehozva,
            (SELECT count(*)::int FROM "Booking" b WHERE b."staffId" = u.id) AS foglalas_db
     FROM "User" u
     ORDER BY u.active DESC, u.role, u.name`
  );
  return result.rows;
}

// Jelszó nélkül jön létre: a felhasználó e-mailben kapott linken állítja be.
export async function ujFelhasznalo(nev: string, email: string, szerep: string) {
  const result = await pool.query(
    `INSERT INTO "User" (name, email, role, "canViewAll", active)
     VALUES ($1, $2, $3::"Role", false, true)
     RETURNING id, name, email, role`,
    [nev, email, szerep]
  );
  return result.rows[0];
}

export async function felhasznaloLathatMindent(id: string, ertek: boolean) {
  const result = await pool.query(
    `UPDATE "User" SET "canViewAll" = $2, "updatedAt" = now() WHERE id = $1 RETURNING id`,
    [id, ertek]
  );
  return result.rowCount === 1;
}

export async function felhasznaloAktiv(id: string, ertek: boolean) {
  const result = await pool.query(
    `UPDATE "User" SET active = $2, "updatedAt" = now() WHERE id = $1 RETURNING id`,
    [id, ertek]
  );
  return result.rowCount === 1;
}

export async function aktivAdminokSzama() {
  const result = await pool.query(
    `SELECT count(*)::int AS db FROM "User" WHERE role = 'ADMIN' AND active`
  );
  return result.rows[0].db as number;
}

export async function felhasznaloFoglalhatMasnak(id: string, ertek: boolean) {
  const result = await pool.query(
    `UPDATE "User" SET "canBookOthers" = $2, "updatedAt" = now() WHERE id = $1 RETURNING id`,
    [id, ertek]
  );
  return result.rowCount === 1;
}

// Egy foglalás minden adata, ami a vendégnek szóló levélhez kell.
export async function foglalasReszletei(id: string) {
  const result = await pool.query(
    `SELECT b.id, b."startsAt", b."endsAt", b.status, b.notes,
            c.name AS vendeg, c.email AS vendeg_email,
            s.name AS szolgaltatas, b.price,
            u.name AS munkatars
     FROM "Booking" b
     JOIN "Client"  c ON c.id = b."clientId"
     JOIN "Service" s ON s.id = b."serviceId"
     JOIN "User"    u ON u.id = b."staffId"
     WHERE b.id = $1
     LIMIT 1`,
    [id]
  );
  return result.rows[0] ?? null;
}

// --- vendégek ---

// A staffId szűrést a hívó adja meg a jogosultság alapján. Ha meg van adva,
// csak azok a vendégek jönnek vissza, akik nála jártak — és a számláló is
// kizárólag az ő foglalásait veszi.
export async function vendegLista(kereses: string, staffId: string | null) {
  const minta = `%${kereses.trim()}%`;
  const result = await pool.query(
    `SELECT c.id, c.name, c.email, c.phone,
            count(b.id)::int AS osszes,
            count(b.id) FILTER (WHERE b.status = 'COMPLETED')::int AS megtortent,
            max(b."startsAt") AS utolso
     FROM "Client" c
     JOIN "Booking" b ON b."clientId" = c.id
       AND ($2::uuid IS NULL OR b."staffId" = $2)
     WHERE ($1 = '%%' OR c.name ILIKE $1 OR c.email ILIKE $1 OR c.phone ILIKE $1)
     GROUP BY c.id
     ORDER BY max(b."startsAt") DESC NULLS LAST, c.name
     LIMIT 200`,
    [minta, staffId]
  );
  return result.rows;
}

export async function vendegAzonositoval(id: string) {
  const result = await pool.query(
    `SELECT id, name, email, phone, to_char("createdAt", 'YYYY-MM-DD') AS letrehozva
     FROM "Client" WHERE id = $1 LIMIT 1`,
    [id]
  );
  return result.rows[0] ?? null;
}

// A staffId szűrést a hívó adja meg a jogosultság alapján.
export async function vendegElozmenyei(clientId: string, staffId: string | null) {
  const result = await pool.query(
    `SELECT b.id, b."startsAt", b."endsAt", b.status, b.notes,
            s.name AS szolgaltatas, b.price,
            u.name AS munkatars
     FROM "Booking" b
     JOIN "Service" s ON s.id = b."serviceId"
     JOIN "User"    u ON u.id = b."staffId"
     WHERE b."clientId" = $1
       AND ($2::uuid IS NULL OR b."staffId" = $2)
     ORDER BY b."startsAt" DESC`,
    [clientId, staffId]
  );
  return result.rows;
}

// --- emlékeztető levelek ---

/**
 * Azok a foglalások, amikre emlékeztetőt kell küldeni: adott nappal későbbre
 * szólnak, még élnek, és még nem kaptak levelet.
 */
export async function emlekeztetoreVaroFoglalasok(napokElore: number) {
  const result = await pool.query(
    `SELECT b.id, b."startsAt", b."endsAt",
            c.name AS vendeg, c.email AS vendeg_email,
            s.name AS szolgaltatas, b.price,
            u.name AS munkatars
     FROM "Booking" b
     JOIN "Client"  c ON c.id = b."clientId"
     JOIN "Service" s ON s.id = b."serviceId"
     JOIN "User"    u ON u.id = b."staffId"
     WHERE b.status = 'BOOKED'
       AND b."reminderSentAt" IS NULL
       AND b."startsAt"::date = (now() + ($1 || ' days')::interval)::date
     ORDER BY b."startsAt"`,
    [String(napokElore)]
  );
  return result.rows;
}

export async function emlekeztetoJelolese(id: string) {
  const result = await pool.query(
    `UPDATE "Booking" SET "reminderSentAt" = now() WHERE id = $1 RETURNING id`,
    [id]
  );
  return result.rowCount === 1;
}

// --- vezérlőpult ---

/**
 * Foglalások száma nap és óra bontásban — a hőtérképhez.
 * A nap a JavaScript getDay() szerinti: 0 = vasárnap.
 */
export async function hotérkep(kezdet: Date, veg: Date, staffId: string | null) {
  const result = await pool.query(
    `SELECT EXTRACT(DOW FROM b."startsAt")::int  AS nap,
            EXTRACT(HOUR FROM b."startsAt")::int AS ora,
            count(*)::int AS db
     FROM "Booking" b
     WHERE b."startsAt" >= $1 AND b."startsAt" < $2
       AND b.status <> 'CANCELLED'
       AND ($3::uuid IS NULL OR b."staffId" = $3)
     GROUP BY 1, 2`,
    [kezdet, veg, staffId]
  );
  return result.rows as { nap: number; ora: number; db: number }[];
}

export async function kovetkezoFoglalasok(darab: number, staffId: string | null) {
  const result = await pool.query(
    `SELECT b.id, b."startsAt", b."endsAt", b.status,
            c.name AS vendeg,
            s.name AS szolgaltatas,
            u.name AS munkatars, u.id AS staff_id
     FROM "Booking" b
     JOIN "Client"  c ON c.id = b."clientId"
     JOIN "Service" s ON s.id = b."serviceId"
     JOIN "User"    u ON u.id = b."staffId"
     WHERE b."startsAt" >= now()
       AND b.status = 'BOOKED'
       AND ($2::uuid IS NULL OR b."staffId" = $2)
     ORDER BY b."startsAt"
     LIMIT $1`,
    [darab, staffId]
  );
  return result.rows;
}

/**
 * Mai terhelés munkatársanként. A kapacitás a munkaidőből jön: hány 60 perces
 * blokk fér be aznap. Így nem kell külön beállítani semmit.
 */
export async function maiTerheles(staffId: string | null) {
  const result = await pool.query(
    `WITH ma AS (SELECT now()::date AS nap, EXTRACT(DOW FROM now())::int AS dow),
     kapacitas AS (
       SELECT w."staffId",
              floor(sum(w."endMinute" - w."startMinute") / 60.0)::int AS ferohely
       FROM "WorkingHours" w, ma
       WHERE w.weekday = ma.dow
       GROUP BY w."staffId"
     ),
     foglalt AS (
       SELECT b."staffId", count(*)::int AS db
       FROM "Booking" b, ma
       WHERE b."startsAt"::date = ma.nap AND b.status <> 'CANCELLED'
       GROUP BY b."staffId"
     )
     SELECT u.id, u.name,
            COALESCE(f.db, 0) AS db,
            COALESCE(k.ferohely, 0) AS ferohely
     FROM "User" u
     LEFT JOIN kapacitas k ON k."staffId" = u.id
     LEFT JOIN foglalt   f ON f."staffId" = u.id
     WHERE u.active
       AND ($1::uuid IS NULL OR u.id = $1)
       AND (k.ferohely IS NOT NULL OR f.db IS NOT NULL)
     ORDER BY u.name`,
    [staffId]
  );
  return result.rows as { id: string; name: string; db: number; ferohely: number }[];
}

/** Egy időszak összesítői. A bevétel csak a fizetett kezelésekből számol. */
export async function idoszakStatisztika(kezdet: Date, veg: Date, staffId: string | null) {
  const result = await pool.query(
    `SELECT count(*)::int AS osszes,
            count(*) FILTER (WHERE status = 'COMPLETED')::int AS megtortent,
            count(*) FILTER (WHERE status = 'BOOKED')::int    AS foglalt,
            count(*) FILTER (WHERE status = 'NO_SHOW')::int   AS nem_jott,
            count(*) FILTER (WHERE status = 'CANCELLED')::int AS lemondva,
            COALESCE(sum(price) FILTER (WHERE status = 'COMPLETED'), 0)::int AS bevetel
     FROM "Booking"
     WHERE "startsAt" >= $1 AND "startsAt" < $2
       AND ($3::uuid IS NULL OR "staffId" = $3)`,
    [kezdet, veg, staffId]
  );
  return result.rows[0] as {
    osszes: number; megtortent: number; foglalt: number;
    nem_jott: number; lemondva: number; bevetel: number;
  };
}
