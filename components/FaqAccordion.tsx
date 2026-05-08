import React from 'react';
import Link from 'next/link';

interface FAQ {
  question: string;
  answer: React.ReactNode;
}

const faqs: FAQ[] = [
  {
    question: "Kell-e beutaló a gyógytornához?",
    answer: (
      <>
        Magánrendelésünkön nem szükséges beutaló. Közvetlenül foglalhat időpontot telefonon vagy e-mailben. Ha rendelkezik orvosi lelettel (MR, röntgen, szakorvosi lelet), kérjük hozza magával az első alkalomra – segíti a pontos állapotfelmérést. Leleteit előzetesen is elküldheti a{" "}
        <Link href="/elerhetoseg#contact" className="text-[#004A6D] font-semibold hover:text-[#EC7007] transition-colors underline">
          kapcsolatfelvételi űrlapunkon
        </Link>{" "}
        keresztül.
      </>
    )
  },
  {
    question: "Le lehet-e mondani az időpontot ingyenesen?",
    answer: "Igen, a lefoglalt időpontokat díjmentesen lemondhatja vagy módosíthatja legkésőbb 24 órával az adott kezelés megkezdése előtt. 24 órán belüli lemondás vagy meg nem jelenés esetén a kezelés teljes díja kiszámlázásra kerül, bérletes vendégeinknél pedig az adott alkalom levonásra kerül a bérletből."
  },
  {
    question: "Melyik kezelést válasszam?",
    answer: "Az első alkalommal egy mindenre kiterjedő állapotfelmérést végzünk, és ennek alapján közösen állítjuk fel a kezelési tervet. Önnek nem kell előre tudnia, hogy pontosan milyen technika (pl. manuálterápia, FDM, tape) a legjobb a számára – ez a mi feladatunk."
  },
  {
    question: "TB-támogatott a kezelés?",
    answer: "Rendelőnk tisztán magánpraxisként működik, a kezelésekre OEP/NEAK alapú TB-támogatás nem vehető igénybe. Cserébe hónapokig tartó várólista-mentes, azonnali, rugalmas időpontfoglalást, dupla annyi kezelési időt és teljes odafigyelést biztosítunk."
  }
];

export default function FaqAccordion() {
  return (
    <div className="space-y-4">
      {faqs.map((faq, idx) => (
        <details
          key={idx}
          className="group bg-gray-50 border border-gray-100 rounded-xl overflow-hidden shadow-sm transition-all duration-300 [&_summary::-webkit-details-marker]:hidden"
        >
          <summary className="flex items-center justify-between cursor-pointer p-6 bg-white group-hover:bg-[#004A6D]/5 transition-colors focus:outline-none focus:bg-[#004A6D]/5">
            <h3 className="font-semibold text-[#004A6D] text-lg pr-4">{faq.question}</h3>
            <span className="flex-shrink-0 bg-[#004A6D]/10 text-[#004A6D] w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 group-open:rotate-180 group-open:bg-[#EC7007] group-open:text-white">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </summary>
          <div className="p-6 pt-0 bg-white text-gray-600 leading-relaxed border-t border-gray-50 group-open:animate-fadeIn">
            {faq.answer}
          </div>
        </details>
      ))}
    </div>
  );
}