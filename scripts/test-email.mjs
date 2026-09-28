// Levélküldés próbája a UI megkerülésével.
// Futtatás:
//   node --env-file=.env.local scripts/test-email.mjs <cimzett>
//
// A Resend válaszát nyersen kiírja — ha elutasítja, a hibaüzenetből kiderül,
// mely címekre lehet egyáltalán küldeni a jelenlegi beállítással.

const cimzett = process.argv[2];

if (!cimzett) {
  console.error("Használat: node --env-file=.env.local scripts/test-email.mjs <cimzett>");
  process.exit(1);
}

const apiKey = process.env.RESEND_API_KEY;
const from = process.env.MAIL_FROM ?? process.env.CONTACT_FROM;
const atiranyit = process.env.MAIL_DEV_REDIRECT;

console.log("Feladó:            ", from ?? "(nincs beállítva)");
console.log("Kért címzett:      ", cimzett);
console.log("Átirányítás:       ", atiranyit ?? "(nincs)");
console.log("Tényleges címzett: ", atiranyit || cimzett);
console.log("API kulcs:         ", apiKey ? "beállítva" : "(nincs beállítva)");
console.log("");

if (!apiKey || !from) {
  console.error("Hiányzik a RESEND_API_KEY vagy a MAIL_FROM/CONTACT_FROM.");
  process.exit(1);
}

const res = await fetch("https://api.resend.com/emails", {
  method: "POST",
  headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
  body: JSON.stringify({
    from,
    to: [atiranyit || cimzett],
    subject: "Teszt – ReStart Physio időpontfoglaló",
    html: `<p>Ez egy teszt levél a foglalórendszerből.</p>
           <p>Eredetileg ide szólt: <strong>${cimzett}</strong></p>
           <p>Küldve: ${new Date().toLocaleString("hu-HU")}</p>`,
  }),
});

const szoveg = await res.text();

if (res.ok) {
  console.log("SIKER – HTTP", res.status);
  console.log(szoveg);
  console.log("\nNézd meg a postafiókot (a spam mappát is).");
} else {
  console.log("ELUTASÍTVA – HTTP", res.status);
  try {
    console.log(JSON.parse(szoveg).message);
  } catch {
    console.log(szoveg);
  }
  process.exitCode = 1;
}
