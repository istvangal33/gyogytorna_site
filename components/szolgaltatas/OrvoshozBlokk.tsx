// Minden szolgáltatásoldalon ugyanaz az alap, oldalanként 1–2 saját ponttal
// kiegészítve. Egészségügyi oldalon ez nem formaság: a páciensnek tudnia kell,
// mikor NE gyógytornásszal kezdjen, és hova forduljon helyette.
//
// Sürgősség szerint rendezve: előbb a 112, aztán a sürgősségi osztály, aztán
// az aznapi orvos, végül a háziorvos. A blokk a TMI-oldalra is kerül, ezért
// szerepel a mellkasi pontban az állkapocs is.
const ALTALANOS = [
  'Hirtelen féloldali gyengeség vagy zsibbadás, lefittyedő arc, beszéd- vagy látászavar. Ilyenkor azonnal hívja a 112-t.',
  'Hirtelen kezdődő, szokatlanul erős nyak- vagy fejfájás, főleg ha szédüléssel, kettőslátással, beszéd- vagy nyelészavarral, egyensúlyzavarral jár. Ilyenkor hívja a 112-t.',
  'Mellkasi fájdalommal, nehézlégzéssel vagy verejtékezéssel együtt járó kar-, váll-, nyak-, állkapocs- vagy hátfájás. Ilyenkor hívja a 112-t.',
  'Zsibbadás a gát, a végbél vagy a nemi szervek környékén, illetve újonnan jelentkező vizelet- vagy székletürítési zavar. Ilyenkor azonnal menjen kórházi sürgősségi osztályra.',
  'Napok alatt romló izomgyengeség a karban vagy a lábban, mindkét kéz zsibbadása, ügyetlensége (például nehezen gombol), vagy bizonytalanná váló járás. Ezzel még aznap forduljon orvoshoz.',
  'Baleset vagy esés után kialakult erős fájdalom, duzzanat, vagy ha a végtagot nem tudja terhelni.',
  'Lázzal, hidegrázással vagy megmagyarázhatatlan fogyással együtt jelentkező fájdalom.',
  'Korábbi daganatos betegség után újonnan jelentkező hát-, derék- vagy csontfájdalom.',
  'Nyugalomban és éjszaka sem enyhülő, egyre erősödő fájdalom.',
];

export default function OrvoshozBlokk({ extra = [] }: { extra?: string[] }) {
  return (
    <div className="rounded-2xl border border-[#EC7007]/30 bg-[#EC7007]/5 p-6 sm:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#004A6D] mb-4">
        Mikor forduljon inkább orvoshoz?
      </h2>
      <p className="mb-4">
        Az alábbi tünetek orvosi ellátást igényelnek, ezért ilyenkor ne gyógytornával kezdje. Ahol
        a pont mást nem mond, forduljon háziorvosához:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        {[...ALTALANOS, ...extra].map((tunet) => (
          <li key={tunet}>{tunet}</li>
        ))}
      </ul>
      <p className="mt-6 font-semibold text-gray-900">
        A gyógytorna nem helyettesíti az orvosi vizsgálatot. Ha az állapotfelmérés ilyen jelre utal,
        kezelés helyett orvoshoz irányítjuk.
      </p>
    </div>
  );
}
