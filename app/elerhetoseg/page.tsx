import type { Metadata } from 'next';
import ContactSection from '@/components/ContactSection';

const BRAND_PRIMARY = 'var(--color-brand-primary, #004A6D)';
const BRAND_ACCENT = 'var(--color-brand-accent, #EC7007)';

export const metadata: Metadata = {
  title: 'Elérhetőség | Gyógytorna - Professzionális Fizioterápia',
  description:
    'Gyógytorna rendelő címe, nyitvatartása, parkolási lehetőségek és megközelítés tömegközlekedéssel.',
  openGraph: {
    title: 'Elérhetőség | Gyógytorna - Professzionális Fizioterápia',
    description:
      'Gyógytorna rendelő címe, nyitvatartása, parkolási lehetőségek és megközelítés tömegközlekedéssel.',
    url: '/elerhetoseg',
  },
  alternates: { canonical: '/elerhetoseg' },
};

export default function Elerhetoseg() {
  return (
    <>
      {/* Hero – visszafogott brand hátterekkel */}
      <section className="relative bg-gradient-to-br from-[#004A6D]/5 via-white to-[#EC7007]/5 py-20 md:py-28 overflow-hidden">
  {/* Animated background elements */}
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute top-10 right-10 w-64 h-64 bg-[#004A6D]/10 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute bottom-10 left-10 w-48 h-48 bg-[#EC7007]/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
  </div>

  <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
    {/* Header */}
    <div className="text-center mb-16">      
      <h1 className="text-4xl md:text-6xl font-extrabold text-[#004A6D] mb-4">
        Vegye fel velünk a kapcsolatot
      </h1>
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
        Válaszolunk minden kérdésére és segítünk időpontot foglalni
      </p>
    </div>
  </div>
</section>

      {/* Helyszín + adatok kártyákban */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Google Térkép */}
            <div className="relative">
              <div
                className="rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.06)] border"
                style={{
                  borderColor:
                    'color-mix(in srgb, var(--color-brand-primary, #004A6D) 18%, transparent)',
                } as React.CSSProperties}
              >
                <div className="aspect-[4/3] relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2687.2842845431364!2d17.657413776724603!3d47.65947348432445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476bc07d6ea485db%3A0x4b9c597308aacbc3!2zR3nFkXIsIE3DoXTDqSBNw6FyaWEgdS4gNGIsIDkwMjg!5e0!3m2!1shu!2shu!4v1760255470417!5m2!1shu!2shu"
                    width="100%"
                    height="100%"
                    className="absolute inset-0 w-full h-full"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Rendelő helye – ReStart Physio"
                  />
                </div>
              </div>
            </div>

            {/* Rendelő adatai */}
            <div className="lg:pl-2">
              <div className="mb-8">
                <h2
                  className="text-3xl font-bold mb-2"
                  style={{ color: BRAND_PRIMARY } as React.CSSProperties}
                >
                  Rendelő adatai
                </h2>
                <div
                  className="h-[3px] w-20 rounded-full"
                  style={{
                    background:
                      'linear-gradient(90deg, color-mix(in srgb, var(--color-brand-accent, #EC7007) 85%, white), white)',
                  } as React.CSSProperties}
                />
              </div>

              <div className="space-y-8">
                <ContactRow
                  title="Cím"
                  lines={['9028 Győr', 'Máté Mária u. 4/B']}
                  icon={
                    <svg className="w-6 h-6 text-[color:var(--color-brand-accent,#EC7007)]" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  }
                  tone="none"
                />

                <ContactRow
                  title="Telefon"
                  lines={['+36 30 819 8449']}
                  href="tel:+36308198449"
                  icon={
                    <svg className="w-6 h-6 text-[color:var(--color-brand-accent,#EC7007)]" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  }
                  tone="none"
                />

                <ContactRow
                  title="Email"
                  lines={['email@email.com']}
                  href="mailto:email@email.com"
                  icon={
                    <svg className="w-6 h-6 text-[color:var(--color-brand-accent,#EC7007)]" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  }
                  tone="none"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kapcsolat űrlap – scroll offset a fix topbarhoz */}
      <div
        id="contact"
        className="
          scroll-mt-[1.5rem]
          sm:scroll-mt-[0rem]
          md:scroll-mt-[0rem]
          lg:scroll-mt-[0rem]
          xl:scroll-mt-[0rem]
        "
      >
        <ContactSection />
      </div>
    </>
  );
}

/* Kiegészítő: egységes sor komponens ikon-szín badge-dzsel */
// ... a fájl többi része változatlan

function ContactRow({
  title,
  lines,
  href,
  icon,
  tone = 'blue',
}: {
  title: string;
  lines: string[];
  href?: string;
  icon: React.ReactNode;
  tone?: 'blue' | 'green' | 'purple' | 'accent' | 'none';
}) {
  const map = {
    blue:   { bg: 'rgba(59,130,246,0.12)',  color: 'rgb(37,99,235)' },
    green:  { bg: 'rgba(16,185,129,0.10)',  color: 'rgb(5,122,85)' },
    purple: { bg: 'rgba(168,85,247,0.10)',  color: 'rgb(126,34,206)' },
    accent: { bg: 'rgba(236,112,7,0.12)',   color: 'var(--color-brand-accent, #EC7007)' },
    none:   { bg: 'transparent',            color: 'inherit' },
  } as const;

  const { bg, color } = map[tone] ?? map.blue;

  return (
    <div className="flex items-start gap-4">
      <div
        className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
        style={{ background: bg, color } as React.CSSProperties}
        aria-hidden="true"
      >
        {icon}
      </div>
      <div>
        <h3
          className="text-lg font-bold mb-1"
          style={{ color: 'var(--color-brand-primary, #004A6D)' } as React.CSSProperties}
        >
          {title}
        </h3>
        {href ? (
          <a
            href={href}
            className="text-gray-700 hover:text-[color:var(--color-brand-accent,#EC7007)] transition-colors font-medium inline-flex items-center gap-2"
          >
            {lines[0]}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        ) : (
          <div className="text-gray-800 leading-relaxed">
            {lines.map((l, i) => (
              <p key={i}>{l}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}