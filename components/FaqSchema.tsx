export default function FaqSchema() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Kell-e beutaló a gyógytornához?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Magánrendelésünkön nem szükséges beutaló. Közvetlenül foglalhat időpontot telefonon vagy e-mailben. Ha rendelkezik orvosi lelettel (MR, röntgen, szakorvosi lelet), kérjük hozza magával, vagy küldje el a <a href=\"https://restartphysio.hu/elerhetoseg#contact\">kapcsolatfelvételi űrlapunkon</a> keresztül."
        }
      },
      {
        "@type": "Question",
        "name": "Le lehet-e mondani az időpontot ingyenesen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Igen, a lefoglalt időpontokat díjmentesen lemondhatja vagy módosíthatja legkésőbb 24 órával az adott kezelés megkezdése előtt. 24 órán belüli lemondás vagy meg nem jelenés esetén a kezelés teljes díja kiszámlázásra kerül, bérletes vendégeinknél pedig az adott alkalom levonásra kerül a bérletből."
        }
      },
      {
        "@type": "Question",
        "name": "Melyik kezelést válasszam?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Az első alkalommal egy mindenre kiterjedő állapotfelmérést végzünk, és ennek alapján közösen állítjuk fel a kezelési tervet. Önnek nem kell előre tudnia, hogy pontosan milyen technika (pl. manuálterápia, FDM, tape) a legjobb a számára – ez a mi feladatunk."
        }
      },
      {
        "@type": "Question",
        "name": "TB-támogatott a kezelés?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Rendelőnk tisztán magánpraxisként működik, a kezelésekre OEP/NEAK alapú TB-támogatás nem vehető igénybe. Cserébe hónapokig tartó várólista-mentes, azonnali, rugalmas időpontfoglalást, dupla annyi kezelési időt és teljes odafigyelést biztosítunk."
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqSchema).replace(/<\/script/gi, "<\\/script"),
      }}
    />
  );
}