// Levélküldés a Resend REST API-ján keresztül.
//
// Környezeti változók:
//   RESEND_API_KEY      - a Resend kulcs
//   MAIL_FROM           - feladó (ha nincs, a CONTACT_FROM-ra esik vissza)
//   MAIL_DEV_REDIRECT   - ha ki van töltve, MINDEN levél erre a címre megy a
//                         valódi címzett helyett. Fejlesztéshez való: így a
//                         tesztadatokban szereplő címekre soha nem megy ki levél.

import { IDOZONA } from "./idozona.ts";

export type KuldesEredmeny =
  | { ok: true; atiranyitva?: string }
  | { ok: false; hiba: string };

// A levelek fejlécében szereplő logó. Levelezőben csak abszolút URL működik,
// és szándékosan PNG (a WebP-t az Outlook és több régi kliens nem jeleníti meg).
const LOGO_URL = "https://restartphysio.hu/logo.png";

// Betűkészlet. A Clarity City (VMware, SIL OFL) a public/fonts alól töltődik,
// abszolút URL-lel, mert levélben relatív hivatkozás nem működik.
//
// FIGYELEM: webfontot a levelezők nagy része NEM támogat. A Gmail (web és
// mobil) és az Outlook.com kivágja a @font-face szabályt, az asztali Outlook
// pedig Word-motorral rendel. Ezért a lista második elemétől kezdve végig
// rendszerbetűk állnak, és az MSO-ág külön Arialt kényszerít – enélkül a Word
// Times New Romanra esne vissza. Gyakorlatban az Apple Mail / iOS Mail
// olvasóknál jelenik meg a Clarity City, máshol a tartalék.
const BETU = "'Clarity City',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

const LEVEL_FEJ = `<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<!-- A levelezők (Gmail, Apple Mail) maguktól linkké alakítják a címnek,
     telefonszámnak vagy dátumnak vélt szövegeket. Ez aláhúzott, kék
     szövegdarabokat eredményez ott is, ahol nincs mire kattintani. -->
<meta name="format-detection" content="telephone=no,date=no,address=no,email=no">
<!-- Az asztali Outlook Word-motorral rendel és nem ismeri a webfontot.
     Nélküle Times New Romanra esne vissza, ezért ott Arialt kényszerítünk. -->
<!--[if mso]>
<style>* { font-family: Arial, Helvetica, sans-serif !important; }</style>
<![endif]-->
<style>
  @font-face {
    font-family: 'Clarity City';
    src: url('https://restartphysio.hu/fonts/ClarityCity-Regular.woff2') format('woff2');
    font-weight: 400; font-style: normal; font-display: swap;
  }
  @font-face {
    font-family: 'Clarity City';
    src: url('https://restartphysio.hu/fonts/ClarityCity-SemiBold.woff2') format('woff2');
    font-weight: 600; font-style: normal; font-display: swap;
  }
  @font-face {
    font-family: 'Clarity City';
    src: url('https://restartphysio.hu/fonts/ClarityCity-Bold.woff2') format('woff2');
    font-weight: 700; font-style: normal; font-display: swap;
  }
  a[x-apple-data-detectors] {
    color: inherit !important;
    text-decoration: none !important;
    font-size: inherit !important;
    font-family: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
  }
  .nolink a { color: inherit !important; text-decoration: none !important; }
</style>
</head>`;

function escapeHtml(s: string) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export type Csatolmany = {
  filename: string;
  // nyers szöveg; base64-re itt kódoljuk
  tartalom: string;
  tipus?: string;
};

export async function levelKuldes(
  cimzett: string,
  targy: string,
  html: string,
  csatolmanyok?: Csatolmany[]
): Promise<KuldesEredmeny> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM ?? process.env.CONTACT_FROM;

  if (!apiKey || !from) {
    return {
      ok: false,
      hiba: "Nincs RESEND_API_KEY vagy MAIL_FROM/CONTACT_FROM beállítva.",
    };
  }

  // Fejlesztői átirányítás: a valódi címzettet a levél tetején jelezzük,
  // hogy egyértelmű legyen, kinek szólt volna.
  const atiranyit = process.env.MAIL_DEV_REDIRECT;
  const valodiCimzett = atiranyit || cimzett;
  const vegsoTargy = atiranyit ? `[teszt → ${cimzett}] ${targy}` : targy;
  const vegsoHtml = atiranyit
    ? `<div style="background:#fff3cd;border:1px solid #ffe08a;padding:12px 16px;margin:0 0 16px 0;font-family:sans-serif;font-size:13px;color:#664d03;">
         <strong>Fejlesztői átirányítás.</strong> Ez a levél eredetileg ide szólt:
         <strong>${escapeHtml(cimzett)}</strong>
       </div>${html}`
    : html;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [valodiCimzett],
        subject: vegsoTargy,
        html: vegsoHtml,
        ...(csatolmanyok?.length
          ? {
              attachments: csatolmanyok.map((cs) => ({
                filename: cs.filename,
                content: Buffer.from(cs.tartalom, "utf8").toString("base64"),
                ...(cs.tipus ? { content_type: cs.tipus } : {}),
              })),
            }
          : {}),
      }),
    });

    if (!res.ok) {
      const szoveg = await res.text().catch(() => "");
      let uzenet = szoveg;
      try {
        uzenet = JSON.parse(szoveg).message ?? szoveg;
      } catch {
        // marad a nyers szöveg
      }
      return { ok: false, hiba: `Resend ${res.status}: ${uzenet}` };
    }

    return atiranyit ? { ok: true, atiranyitva: atiranyit } : { ok: true };
  } catch (err) {
    return { ok: false, hiba: `Hálózati hiba: ${(err as Error).message}` };
  }
}

export async function jelszoVisszaallitoLevel(
  cimzett: string,
  nev: string,
  link: string,
  ervenyessegPerc: number
): Promise<KuldesEredmeny> {
  const html = `
<!DOCTYPE html>
<html lang="hu">
${LEVEL_FEJ}
<body style="margin:0;padding:0;background-color:#f4f4f7;font-family:${BETU};">
  <table role="presentation" style="width:100%;border-collapse:collapse;background:#f4f4f7;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" style="max-width:560px;width:100%;border-collapse:collapse;background:#ffffff;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
          <tr>
            <td align="center" style="padding:32px 40px;text-align:center;border-bottom:4px solid #EC7007;">
              <img src="${LOGO_URL}" width="180" height="95" alt="ReStart Physio"
                   style="display:block;margin:0 auto;border:0;width:180px;height:auto;max-width:100%;font-size:20px;font-weight:700;color:#004a6d;">
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:36px 40px;text-align:center;">
              <p style="margin:0 0 16px 0;font-size:16px;color:#1a1a1a;">Kedves ${escapeHtml(nev)}!</p>
              <p style="margin:0 0 24px 0;font-size:15px;line-height:1.6;color:#1a1a1a;">
                Új jelszó beállítását kérted a foglalórendszerhez. Az alábbi gombbal tudod megadni:
              </p>
              <table role="presentation" style="border-collapse:collapse;margin:0 auto 24px auto;">
                <tr>
                  <td style="border-radius:8px;background:#EC7007;">
                    <a href="${link}" style="display:inline-block;padding:15px 36px;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;border-radius:8px;">Új jelszó beállítása</a>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 8px 0;font-size:14px;line-height:1.6;color:#666666;">
                A link <strong>${ervenyessegPerc} percig</strong> érvényes, és csak egyszer használható fel.
              </p>
              <p style="margin:0;font-size:14px;line-height:1.6;color:#666666;">
                Ha nem te kérted, nyugodtan hagyd figyelmen kívül ezt a levelet — a jelszavad változatlan marad.
              </p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:20px 40px;text-align:center;background-color:#f8f9fa;border-radius:0 0 12px 12px;border-top:1px solid #e9ecef;">
              <p style="margin:0;font-size:12px;line-height:1.6;color:#999999;">
                Ha a gomb nem működik, másold be ezt a címet a böngésződbe:<br>
                <span style="color:#004a6d;word-break:break-all;">${escapeHtml(link)}</span>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return levelKuldes(cimzett, "Új jelszó beállítása – ReStart Physio", html);
}

export async function fiokMeghivoLevel(
  cimzett: string,
  nev: string,
  link: string,
  ervenyessegPerc: number
): Promise<KuldesEredmeny> {
  const html = `
<!DOCTYPE html>
<html lang="hu">
${LEVEL_FEJ}
<body style="margin:0;padding:0;background-color:#f4f4f7;font-family:${BETU};">
  <table role="presentation" style="width:100%;border-collapse:collapse;background:#f4f4f7;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" style="max-width:560px;width:100%;border-collapse:collapse;background:#ffffff;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
          <tr>
            <td align="center" style="padding:32px 40px;text-align:center;border-bottom:4px solid #EC7007;">
              <img src="${LOGO_URL}" width="180" height="95" alt="ReStart Physio"
                   style="display:block;margin:0 auto;border:0;width:180px;height:auto;max-width:100%;font-size:20px;font-weight:700;color:#004a6d;">
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:36px 40px;text-align:center;">
              <p style="margin:0 0 16px 0;font-size:16px;color:#1a1a1a;">Kedves ${escapeHtml(nev)}!</p>
              <p style="margin:0 0 24px 0;font-size:15px;line-height:1.6;color:#1a1a1a;">
                Fiók készült számodra a ReStart Physio időpontfoglaló rendszerében.
                Az alábbi gombbal tudod beállítani a saját jelszavadat, és onnantól
                be tudsz lépni.
              </p>
              <table role="presentation" style="border-collapse:collapse;margin:0 auto 24px auto;">
                <tr>
                  <td style="border-radius:8px;background:#EC7007;">
                    <a href="${link}" style="display:inline-block;padding:15px 36px;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;border-radius:8px;">Jelszó beállítása</a>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 8px 0;font-size:14px;line-height:1.6;color:#666666;">
                A link <strong>${ervenyessegPerc} percig</strong> érvényes, és csak egyszer használható fel.
                Ha lejár, kérj újat attól, aki a fiókot létrehozta.
              </p>
              <p style="margin:0;font-size:14px;line-height:1.6;color:#666666;">
                Belépési azonosítód ez az e-mail cím: <strong>${escapeHtml(cimzett)}</strong>
              </p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:20px 40px;text-align:center;background-color:#f8f9fa;border-radius:0 0 12px 12px;border-top:1px solid #e9ecef;">
              <p style="margin:0;font-size:12px;line-height:1.6;color:#999999;">
                Ha a gomb nem működik, másold be ezt a címet a böngésződbe:<br>
                <span style="color:#004a6d;word-break:break-all;">${escapeHtml(link)}</span>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return levelKuldes(cimzett, "Fiók létrehozva – ReStart Physio időpontfoglaló", html);
}

// --- vendégnek szóló foglalási levelek ---

export type FoglalasLevelAdat = {
  vendegNev: string;
  vendegEmail: string;
  szolgaltatas: string;
  kezdet: Date;
  veg: Date;
  munkatars: string;
  ar: number;
  helyszin: string;
  terkep?: string;
  megjegyzes?: string | null;
  ics?: string;
};

export function idopontSzoveg(kezdet: Date, veg: Date) {
  // Az időzóna itt kifejezetten meg van adva: ez a szöveg megy ki a
  // vendégnek, és nem múlhat azon, hogy a szerver milyen zónában fut.
  const nap = new Intl.DateTimeFormat("hu-HU", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    timeZone: IDOZONA,
  }).format(kezdet);
  const ora = (d: Date) =>
    new Intl.DateTimeFormat("hu-HU", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: IDOZONA,
    }).format(d);
  return `${nap}, ${ora(kezdet)}–${ora(veg)}`;
}

function forint(ertek: number) {
  return new Intl.NumberFormat("hu-HU").format(ertek) + " Ft";
}

function foglalasTorzs(adat: FoglalasLevelAdat, bevezeto: string, athuzott: boolean) {
  const stilus = athuzott ? "text-decoration:line-through;color:#999999;" : "color:#1a1a1a;";

  return `
<!DOCTYPE html>
<html lang="hu">
${LEVEL_FEJ}
<body style="margin:0;padding:0;background-color:#f4f4f7;font-family:${BETU};">
  <table role="presentation" class="nolink" style="width:100%;border-collapse:collapse;background:#f4f4f7;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" style="max-width:560px;width:100%;border-collapse:collapse;background:#ffffff;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
          <tr>
            <td align="center" style="padding:32px 40px;text-align:center;border-bottom:4px solid #EC7007;">
              <img src="${LOGO_URL}" width="180" height="95" alt="ReStart Physio"
                   style="display:block;margin:0 auto;border:0;width:180px;height:auto;max-width:100%;font-size:20px;font-weight:700;color:#004a6d;">
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:36px 40px;text-align:center;">
              <p style="margin:0 0 ${bevezeto ? "16px" : "24px"} 0;font-size:16px;color:#1a1a1a;">Kedves ${escapeHtml(adat.vendegNev)}!</p>
              ${bevezeto ? `<p style="margin:0 0 24px 0;font-size:15px;line-height:1.6;color:#1a1a1a;">${bevezeto}</p>` : ""}

              <table role="presentation" style="width:100%;border-collapse:collapse;background:#f8f9fa;border-radius:8px;">
                <tr>
                  <td align="center" style="padding:20px;text-align:center;">
                    <p style="margin:0 0 4px 0;font-size:12px;font-weight:600;color:#004a6d;text-transform:uppercase;letter-spacing:0.5px;">Időpont</p>
                    <p style="margin:0 0 16px 0;font-size:16px;font-weight:600;${stilus}">${escapeHtml(idopontSzoveg(adat.kezdet, adat.veg))}</p>

                    <p style="margin:0 0 4px 0;font-size:12px;font-weight:600;color:#004a6d;text-transform:uppercase;letter-spacing:0.5px;">Szolgáltatás</p>
                    <p style="margin:0 0 16px 0;font-size:15px;color:#1a1a1a;">${escapeHtml(adat.szolgaltatas)} · ${forint(adat.ar)}</p>

                    <p style="margin:0 0 4px 0;font-size:12px;font-weight:600;color:#004a6d;text-transform:uppercase;letter-spacing:0.5px;">Kollégánk</p>
                    <p style="margin:0 0 16px 0;font-size:15px;color:#1a1a1a;">${escapeHtml(adat.munkatars)}</p>

                    <p style="margin:0 0 4px 0;font-size:12px;font-weight:600;color:#004a6d;text-transform:uppercase;letter-spacing:0.5px;">Helyszín</p>
                    <p style="margin:0;font-size:15px;color:#1a1a1a;">${
                      adat.terkep
                        ? `<a href="${adat.terkep}" style="color:#004a6d;text-decoration:underline;">${escapeHtml(adat.helyszin)}</a>`
                        : escapeHtml(adat.helyszin)
                    }</p>
                    ${adat.terkep ? '<p style="margin:4px 0 0 0;font-size:12px;color:#999999;">A címre kattintva megnyílik a térkép.</p>' : ""}
                  </td>
                </tr>
              </table>

              ${
                adat.ics
                  ? `<p style="margin:24px 0 0 0;font-size:14px;line-height:1.6;color:#666666;">A levélhez csatoltunk egy naptárbejegyzést — nyisd meg, és egy kattintással beteheted a saját naptáradba.</p>`
                  : ""
              }

              <p style="margin:24px 0 0 0;font-size:14px;line-height:1.6;color:#666666;">Ha az időpont nem megfelelő, kérjük jelezd minél előbb.</p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:20px 40px;text-align:center;background-color:#f8f9fa;border-radius:0 0 12px 12px;border-top:1px solid #e9ecef;">
              <p style="margin:0;font-size:12px;line-height:1.6;color:#999999;">
                ReStart Physio · ${
                  adat.terkep
                    ? `<a href="${adat.terkep}" style="color:#999999;text-decoration:none;">${escapeHtml(adat.helyszin)}</a>`
                    : escapeHtml(adat.helyszin)
                }<br>
                Ez egy automatikus értesítés, erre a levélre nem tudsz válaszolni.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function foglalasVisszaigazolas(adat: FoglalasLevelAdat, modositas = false) {
  const bevezeto = modositas
    ? "Az időpontod módosult. Az új adatok:"
    : "Rögzítettük az időpontodat. Az adatok:";

  const html = foglalasTorzs(adat, bevezeto, false);
  const targy = modositas
    ? "Módosított időpont – ReStart Physio"
    : "Foglalás visszaigazolása – ReStart Physio";

  return levelKuldes(
    adat.vendegEmail,
    targy,
    html,
    adat.ics
      ? [{ filename: "idopont.ics", tartalom: adat.ics, tipus: "text/calendar; charset=utf-8" }]
      : undefined
  );
}

export async function foglalasLemondas(adat: FoglalasLevelAdat) {
  const html = foglalasTorzs(
    adat,
    "A lenti időpontod lemondásra került. Ha ez tévedés, kérjük keress minket.",
    true
  );

  return levelKuldes(
    adat.vendegEmail,
    "Lemondott időpont – ReStart Physio",
    html,
    adat.ics
      ? [{ filename: "lemondas.ics", tartalom: adat.ics, tipus: "text/calendar; charset=utf-8" }]
      : undefined
  );
}

export async function foglalasEmlekezteto(adat: FoglalasLevelAdat) {
  // Bevezető mondat nélkül: a tárgy már elmondja, hogy emlékeztetőről van szó,
  // az időpont pedig közvetlenül alatta látszik.
  const html = foglalasTorzs(adat, "", false);

  return levelKuldes(
    adat.vendegEmail,
    "Emlékeztető: holnapi időpontod – ReStart Physio",
    html,
    adat.ics
      ? [{ filename: "idopont.ics", tartalom: adat.ics, tipus: "text/calendar; charset=utf-8" }]
      : undefined
  );
}
