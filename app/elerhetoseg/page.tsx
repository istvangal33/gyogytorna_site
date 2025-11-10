import type { Metadata } from 'next';
import ContactSection from '@/components/ContactSection';

const BRAND_PRIMARY = 'var(--color-brand-primary, #004A6D)';
const BRAND_ACCENT = 'var(--color-brand-accent, #EC7007)';

export const metadata: Metadata = {
  title: 'Elérhetőség & Kapcsolat | ReStart Physio - Győr, Máté Mária u. 4/B',
  description: 'ReStart Physio gyógytorna rendelő elérhetősége Győrben: +36 30 819 8449, restart.gyor@gmail.com. Máté Mária u. 4/B. Nyitvatartás, parkolás, tömegközlekedés, kapcsolatfelvételi űrlap.', 
  keywords: 'ReStart Physio elérhetőség, gyógytorna Győr cím, fizioterapeuta Győr telefon, Máté Mária utca, időpontfoglalás, kapcsolat gyógytornász',
  
  openGraph: {
    title: 'Kapcsolat | ReStart Physio Győr',
    description: 'Vegye fel velünk a kapcsolatot! Máté Mária u. 4/B, Győr. Telefon: +36 30 819 8449',
    images: [
      {
        url: 'https://restartphysio.hu/group_core1.jpg',
        width: 1200,
        height: 630,
        alt: 'ReStart Physio rendelő Győr - Elérhetőség',
      }
    ],
    type: 'website',
    url: 'https://restartphysio.hu/elerhetoseg',
    siteName: 'ReStart Physio',
    locale: 'hu_HU',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Kapcsolat | ReStart Physio Győr',
    description: 'Vegye fel velünk a kapcsolatot! Máté Mária u. 4/B, Győr.',
    images: ['https://restartphysio.hu/group_core1.jpg'],
  },

  alternates: {
    canonical: 'https://restartphysio.hu/elerhetoseg',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// ✅ ENHANCED STRUCTURED DATA
function ContactSchema() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MedicalBusiness"],
    "name": "ReStart Physio",
    "description": "Szakszerű gyógytorna és fizioterápia rendelő Győrben. Időpontfoglalás és kapcsolatfelvétel.",
    "url": "https://restartphysio.hu",
    "image": "https://restartphysio.hu/group_core1.jpg",
    
    "telephone": "+36-30-819-8449",
    "email": "restart.gyor@gmail.com",
    
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Máté Mária u. 4/B",
      "addressLocality": "Győr",
      "addressRegion": "Győr-Moson-Sopron",
      "postalCode": "9028",
      "addressCountry": "HU"
    },
    
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 47.6596433009664,
      "longitude": 17.659999426322084
    },
    
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "14:00"
      }
    ],
    
    "priceRange": "7000-17000 HUF",
    "paymentAccepted": ["Cash", "Credit Card"],
    "currenciesAccepted": "HUF",
    
    "hasMap": "https://www.google.com/maps?ll=47.65947,17.659989&z=16&t=m&hl=hu&gl=HU&mapclient=embed&q=M%C3%A1t%C3%A9+M%C3%A1ria+u.+4b+Gy%C5%91r+9028",
    
    "sameAs": [
      "https://www.facebook.com/Restartphysiogyor/",
      "https://www.instagram.com/restartphysiogyor/"
    ],
    
    "founder": {
      "@type": "Person",
      "name": "Forrás Fernanda",
      "jobTitle": "Gyógytornász-fizioterapeuta",
      "url": "https://restartphysio.hu/bemutatkozas"
    },

    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+36-30-819-8449",
      "contactType": "customer service",
      "email": "restart.gyor@gmail.com",
      "availableLanguage": "Hungarian"
    },

    // ✅ EXTRA SEO FEATURES
    "areaServed": [
      {
        "@type": "City",
        "name": "Győr"
      },
      {
        "@type": "AdministrativeArea", 
        "name": "Győr-Moson-Sopron megye"
      }
    ],

    "knowsAbout": [
      "Sportrehabilitáció",
      "Gerincstabilizáció", 
      "TMI terápia",
      "FDM kezelés",
      "Schroth terápia",
      "Manuálterápia"
    ],

    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "1"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(contactSchema)
      }}
    />
  );
}

export default function Elerhetoseg() {
  return (
    <>
      <ContactSchema />
      
      {/* Hero – visszafogott brand hátterekkel */}
      <section className="relative bg-gradient-to-br from-[#004A6D]/5 via-white to-[#EC7007]/5 py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-x-0 bottom-0">
          <svg
            className="w-full h-16 md:h-24 text-white"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path d="M0,96L48,106.7C96,117,192,139,288,160C384,181,480,203,576,186.7C672,171,768,117,864,117.3C960,117,1056,171,1152,186.7C1248,203,1344,181,1392,170.7L1440,160L1440,320L0,320Z"></path>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#004A6D] mb-4">
              Vegye fel velünk a kapcsolatot
            </h1>
            <p className="text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
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
                  borderColor: 'color-mix(in srgb, var(--color-brand-primary, #004A6D) 18%, transparent)',
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

            {/* Rendelő adatai - MICRODATA ENHANCED */}
            <div className="lg:pl-2" itemScope itemType="https://schema.org/LocalBusiness">
              <div className="mb-8">
                <h2
                  className="text-3xl font-bold mb-2"
                  style={{ color: BRAND_PRIMARY } as React.CSSProperties}
                >
                  <span itemProp="name">ReStart Physio</span> - Rendelő adatai
                </h2>
                <div
                  className="h-[3px] w-20 rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, color-mix(in srgb, var(--color-brand-accent, #EC7007) 85%, white), white)',
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
                  microdata={{
                    scope: "address",
                    type: "PostalAddress",
                    props: [
                      { prop: "postalCode", value: "9028" },
                      { prop: "addressLocality", value: "Győr" },
                      { prop: "streetAddress", value: "Máté Mária u. 4/B" }
                    ]
                  }}
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
                  microdata={{
                    scope: "telephone",
                    props: [
                      { prop: "telephone", value: "+36308198449" }
                    ]
                  }}
                />

                <ContactRow
                  title="Email"
                  lines={['restart.gyor@gmail.com']}
                  href="mailto:restart.gyor@gmail.com"
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
                  microdata={{
                    scope: "email",
                    props: [
                      { prop: "email", value: "restart.gyor@gmail.com" }
                    ]
                  }}
                />

                {/* ✅ ÚJ: NYITVATARTÁS */}
                <ContactRow
                  title="Nyitvatartás"
                  lines={['Hétfő-Péntek: 08:00-18:00', 'Szombat: 09:00-14:00', 'Vasárnap: zárva']}
                  icon={
                    <svg className="w-6 h-6 text-[color:var(--color-brand-accent,#EC7007)]" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor"
                    >
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12,6 12,12 16,14"/>
                    </svg>
                  }
                  tone="none"
                  microdata={{
                    scope: "openingHours",
                    props: [
                      { prop: "openingHours", value: "Mo-Fr 08:00-18:00" },
                      { prop: "openingHours", value: "Sa 09:00-14:00" }
                    ]
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kapcsolat űrlap */}
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

// ✅ ENHANCED CONTACTROW WITH MICRODATA
function ContactRow({
  title,
  lines,
  href,
  icon,
  tone = 'blue',
  microdata,
}: {
  title: string;
  lines: string[];
  href?: string;
  icon: React.ReactNode;
  tone?: 'blue' | 'green' | 'purple' | 'accent' | 'none';
  microdata?: {
    scope?: string;
    type?: string;
    props?: { prop: string; value: string }[];
  };
}) {
  const map = {
    blue:   { bg: 'rgba(59,130,246,0.12)',  color: 'rgb(37,99,235)' },
    green:  { bg: 'rgba(16,185,129,0.10)',  color: 'rgb(5,122,85)' },
    purple: { bg: 'rgba(168,85,247,0.10)',  color: 'rgb(126,34,206)' },
    accent: { bg: 'rgba(236,112,7,0.12)',   color: 'var(--color-brand-accent, #EC7007)' },
    none:   { bg: 'transparent',            color: 'inherit' },
  } as const;

  const { bg, color } = map[tone] ?? map.blue;

  const containerProps = microdata?.scope ? {
    itemProp: microdata.scope,
    ...(microdata.type && { itemScope: true, itemType: `https://schema.org/${microdata.type}` })
  } : {};

  return (
    <div className="flex items-start gap-4" {...containerProps}>
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
            {...(microdata?.props?.[0] && { itemProp: microdata.props[0].prop, content: microdata.props[0].value })}
          >
            {lines[0]}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        ) : (
          <div className="text-gray-800 leading-relaxed">
            {lines.map((l, i) => {
              const microdataProp = microdata?.props?.[i];
              return (
                <p 
                  key={i}
                  {...(microdataProp && { itemProp: microdataProp.prop, content: microdataProp.value })}
                >
                  {l}
                </p>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
