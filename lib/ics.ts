// Naptármeghívó (iCalendar, RFC 5545) előállítása. Tiszta függvények,
// önállóan tesztelhetők.

export type IcsAdat = {
  // stabil azonosító: ugyanahhoz a foglaláshoz mindig ugyanaz legyen, hogy a
  // módosítás frissítse a meglévő bejegyzést, ne újat hozzon létre
  uid: string;
  kezdet: Date;
  veg: Date;
  cim: string;
  leiras?: string;
  helyszin?: string;
  szervezoNev: string;
  szervezoEmail: string;
  vendegNev: string;
  vendegEmail: string;
  // módosításkor növelni kell, különben a naptárak figyelmen kívül hagyják
  sorszam?: number;
  lemondas?: boolean;
};

// "20260914T083000Z"
function utcIdo(d: Date) {
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

// A vesszőt, pontosvesszőt, visszaperjelet és sortörést escapelni kell.
function szoveg(s: string) {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

// A szabvány 75 oktettnél hosszabb sort nem enged: a folytatás szóközzel kezdődik.
function hajtas(sor: string) {
  const bajtok = Buffer.from(sor, "utf8");
  if (bajtok.length <= 75) return sor;

  const darabok: string[] = [];
  let kezdet = 0;
  let hossz = 75;

  while (kezdet < bajtok.length) {
    // többbájtos karakter közepén nem vághatunk
    let vag = Math.min(kezdet + hossz, bajtok.length);
    while (vag > kezdet && (bajtok[vag] & 0xc0) === 0x80) vag--;

    darabok.push(bajtok.subarray(kezdet, vag).toString("utf8"));
    kezdet = vag;
    hossz = 74; // a folytatósorok elé egy szóköz kerül
  }

  return darabok.join("\r\n ");
}

export function icsKeszites(adat: IcsAdat): string {
  const most = utcIdo(new Date());

  const sorok = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//ReStart Physio//Idopontfoglalo//HU",
    "CALSCALE:GREGORIAN",
    `METHOD:${adat.lemondas ? "CANCEL" : "REQUEST"}`,
    "BEGIN:VEVENT",
    `UID:${adat.uid}`,
    `DTSTAMP:${most}`,
    `DTSTART:${utcIdo(adat.kezdet)}`,
    `DTEND:${utcIdo(adat.veg)}`,
    `SEQUENCE:${adat.sorszam ?? 0}`,
    `STATUS:${adat.lemondas ? "CANCELLED" : "CONFIRMED"}`,
    `SUMMARY:${szoveg(adat.cim)}`,
  ];

  if (adat.leiras) sorok.push(`DESCRIPTION:${szoveg(adat.leiras)}`);
  if (adat.helyszin) sorok.push(`LOCATION:${szoveg(adat.helyszin)}`);

  sorok.push(
    `ORGANIZER;CN=${szoveg(adat.szervezoNev)}:mailto:${adat.szervezoEmail}`,
    `ATTENDEE;CN=${szoveg(adat.vendegNev)};ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=FALSE:mailto:${adat.vendegEmail}`
  );

  if (!adat.lemondas) {
    // emlékeztető a kezdés előtt egy nappal
    sorok.push(
      "BEGIN:VALARM",
      "TRIGGER:-P1D",
      "ACTION:DISPLAY",
      `DESCRIPTION:${szoveg(adat.cim)}`,
      "END:VALARM"
    );
  }

  sorok.push("END:VEVENT", "END:VCALENDAR");

  return sorok.map(hajtas).join("\r\n") + "\r\n";
}
