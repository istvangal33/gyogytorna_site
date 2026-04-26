import Link from 'next/link';

const services = [
  { slug: 'bemer-terapia', title: 'BEMER terápia' },
  { slug: 'core-edzes', title: 'Core edzés' },
  { slug: 'dinamikus-tape', title: 'Dinamikus Tape' },
  { slug: 'manualterapia-fdm', title: 'FDM Manuálterápia' },
  { slug: 'gerincpanaszok-kezelese', title: 'Gerincpanaszok kezelése' },
  { slug: 'schroth-terapia', title: 'Schroth terápia' },
  { slug: 'sportrehabilitacio', title: 'Sportrehabilitáció' },
  { slug: 'tmi-terapia', title: 'TMI (Állkapocs) terápia' }
];

export default function RelatedServices({ currentSlug }: { currentSlug: string }) {
  const filtered = services.filter(s => s.slug !== currentSlug);
  
  // Kis trükk: A slug hosszából toljuk el, hogy ne mindig ugyanaz a 3 szolgáltatás jöjjön be
  // Ezzel elkerüljük az SSR hydration errokat amiket a random okozna.
  const shiftIndex = currentSlug.length % filtered.length;
  
  const related = [
    filtered[shiftIndex],
    filtered[(shiftIndex + 1) % filtered.length],
    filtered[(shiftIndex + 2) % filtered.length]
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
          További szolgáltatásaink
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {related.map((service, idx) => (
            <Link 
              key={idx} 
              href={`/szolgaltatasok/${service.slug}`} 
              className="text-sm md:text-base text-[#004A6D] bg-[#004A6D]/5 hover:bg-[#004A6D]/10 hover:text-[#EC7007] px-6 py-2.5 rounded-full transition-colors font-medium border border-[#004A6D]/5"
            >
              {service.title}
            </Link>
          ))}
          <Link 
            href="/szolgaltatasok#services-details" 
            className="text-sm md:text-base text-gray-500 hover:text-[#EC7007] px-4 py-2.5 font-medium transition-colors"
          >
            Összes listázása &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}