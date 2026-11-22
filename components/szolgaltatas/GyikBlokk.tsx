type Kerdes = { kerdes: string; valasz: string };

/**
 * Lenyitható GYIK és a hozzá tartozó FAQPage schema, egy forrásból: a
 * látható szöveg és a schema így nem térhet el egymástól.
 *
 * A válasz szándékosan sima szöveg, mert szó szerint a schemába is bekerül.
 */
export default function GyikBlokk({
  cim = 'Gyakori kérdések',
  kerdesek,
}: {
  cim?: string;
  kerdesek: Kerdes[];
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: kerdesek.map((k) => ({
      '@type': 'Question',
      name: k.kerdes,
      acceptedAnswer: { '@type': 'Answer', text: k.valasz },
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
      />
      <h2 className="text-3xl font-bold text-[#004A6D] mb-6">{cim}</h2>
      <div className="space-y-4">
        {kerdesek.map((k) => (
          <details
            key={k.kerdes}
            className="group bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex items-center justify-between gap-4 cursor-pointer p-5 sm:p-6 group-hover:bg-[#004A6D]/5 transition-colors">
              <h3 className="font-semibold text-[#004A6D] text-lg">{k.kerdes}</h3>
              <span
                aria-hidden="true"
                className="shrink-0 bg-[#004A6D]/10 text-[#004A6D] w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 group-open:rotate-180 group-open:bg-[#EC7007] group-open:text-white"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </summary>
            <p className="px-5 sm:px-6 pb-6">{k.valasz}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
