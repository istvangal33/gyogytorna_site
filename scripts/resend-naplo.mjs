// A kikuldott levelek naploja — a Resend API-jabol.
//
//   node scripts/resend-naplo.mjs          az utolso 10 level
//   node scripts/resend-naplo.mjs 25       az utolso 25
//
// MIERT KELL: a foglalasi visszaigazolok es a kapcsolati urlap levelei olyan
// cimekre mennek, amikhez nem feltetlenul van hozzaferesunk. A Resend naploja
// viszont mindegyiket mutatja — cimzettel, targgyal es kezbesitesi allapottal
// egyutt. Igy a levelkuldes ugy is ellenorizheto, hogy a postafiokot nem
// nyitjuk meg.
//
// A kulcsot a .env.local-bol olvassa; a kepernyore sosem irja ki.
import fs from "node:fs";

const IDOZONA = "Europe/Budapest";

function kulcs() {
  if (process.env.RESEND_API_KEY) return process.env.RESEND_API_KEY;
  for (const f of [".env.local", ".env"]) {
    if (!fs.existsSync(f)) continue;
    for (const sor of fs.readFileSync(f, "utf8").split(/\r?\n/)) {
      if (sor.startsWith("#") || !sor.includes("=")) continue;
      const i = sor.indexOf("=");
      if (sor.slice(0, i).trim() === "RESEND_API_KEY") {
        return sor.slice(i + 1).trim().replace(/^["']|["']$/g, "");
      }
    }
  }
  return null;
}

// a Resend UTC-ben ad datumot — magyar idore valtjuk, kulonben ket orat tevedunk
const helyiIdo = (s) =>
  new Intl.DateTimeFormat("hu-HU", {
    month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    timeZone: IDOZONA,
  }).format(new Date(s.replace(" ", "T").replace("+00", "Z")));

const ALLAPOT = {
  delivered: "kezbesitve",
  sent: "elkuldve",
  bounced: "VISSZAPATTANT",
  complained: "PANASZ",
  delivery_delayed: "keslekedik",
  queued: "sorban all",
};

const k = kulcs();
if (!k) {
  console.error("Nincs RESEND_API_KEY sem a kornyezetben, sem a .env.local-ban.");
  process.exit(1);
}

const darab = Number(process.argv[2]) || 10;
const r = await fetch(`https://api.resend.com/emails?limit=${darab}`, {
  headers: { authorization: "Bearer " + k },
});
if (!r.ok) {
  console.error(`A Resend HTTP ${r.status} valaszt adott.`);
  process.exit(1);
}

const { data } = await r.json();
if (!data?.length) {
  console.log("\n  Nincs levél a naplóban.\n");
  process.exit(0);
}

console.log();
for (const e of data) {
  const allapot = ALLAPOT[e.last_event] ?? e.last_event;
  const gond = ["bounced", "complained"].includes(e.last_event);
  console.log(
    `  ${helyiIdo(e.created_at)}  ${allapot.padEnd(11)} ${String(e.to).padEnd(30)} ${e.subject}`
  );
  if (gond) console.log(`      ^^^ ez a levél NEM jutott el a címzetthez`);
}
console.log(`\n  (${data.length} levél, magyar idő szerint)\n`);
