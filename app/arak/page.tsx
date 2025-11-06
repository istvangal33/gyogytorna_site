"use client";

import React from "react";

const BRAND_PRIMARY = "var(--color-brand-primary, #004A6D)";
const BRAND_ACCENT = "var(--color-brand-accent, #EC7007)";

function formatPrice(value: number) {
  return new Intl.NumberFormat("hu-HU").format(value) + " Ft";
}

interface PriceItem {
  name: string;
  duration?: string;
  price: number;
  highlight?: boolean; // <- szükséges, mert PriceGroup használja
}

const SERVICES: PriceItem[] = [
  { name: "Egyéni gyógytorna/rehabilitáció", duration: "50 P", price: 15000 },
  { name: "Egyéni gyógytorna/rehabilitáció", duration: "30 P", price: 8000 },
  { name: "Lágy rész manuál terápia (FDM kezelések)", duration: "50 P", price: 16000 },
  { name: "Lágy rész manuál terápia (FDM kezelések)", duration: "30 P", price: 8500 },
  { name: "Schroth terápia", duration: "50 P", price: 15000 },
  { name: "TMI (Állkapocs ízületi) terápia", duration: "50 P", price: 15000 },
  { name: "Komplex rehabilitáció", duration: "50 P", price: 17000 },
  { name: "Csoportos gerinc core edzés", duration: "50 P", price: 7000 },
  { name: "Kinesiológiai tape", price: 5000 },
  { name: "Dinamikus tape", price: 7500 },
];

const PASSES: PriceItem[] = [
  { name: "Egyéni gyógytorna bérlet", duration: "5 ALK", price: 70000 },
  { name: "Egyéni gyógytorna bérlet", duration: "10 ALK", price: 135000 },
  { name: "Komplex rehabilitációs bérlet", duration: "5 ALK", price: 80000 },
  { name: "Komplex rehabilitációs bérlet", duration: "10 ALK", price: 155000 },
  { name: "Csoportos gerinc core edzés bérlet", duration: "5 ALK", price: 30000 },
  { name: "Csoportos gerinc core edzés bérlet", duration: "10 ALK", price: 55000 },
];
  const RENT: PriceItem[] = [
  { name: "BEMER készülék bérlése", duration: "1 HÓNAP", price: 100000 },
];


function PriceSchema() {
  const businessWithPricesSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MedicalBusiness"],
    "name": "ReStart Physio",
    "description": "Szakszerű gyógytorna és fizioterápia Győrben. Átlátható árazással, professzionális kezelésekkel.",
    "url": "https://restartphysio.hu",
    "image": "https://restartphysio.hu/group_core1.jpg",
    "telephone": "+36-30-819-8449",
    "email": "restart.gyor@gmail.com",
    
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Máté Mária u. 4b",
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
    
    "openingHours": [
      "Mo-Fr 08:00-18:00",
      "Sa 09:00-14:00"
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
    
    "employee": {
      "@type": "Person",
      "name": "Forrás Fernanda",
      "jobTitle": "Gyógytornász-fizioterapeuta"
    },
    
    // ✅ ÁRAK STRUCTURED DATA
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "ReStart Physio Árlista",
      "itemListElement": [...SERVICES, ...PASSES, ...RENT].map((service, index) => ({
        "@type": "Offer",
        "name": service.name,
        "description": `${service.duration ? `${service.duration} időtartam` : 'Professzionális kezelés'}`,
        "price": service.price,
        "priceCurrency": "HUF",
        "priceValidUntil": "2025-12-31",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "MedicalBusiness",
          "name": "ReStart Physio"
        },
        "itemOffered": {
          "@type": "Service",
          "name": service.name,
          "serviceType": "MedicalTherapy",
          "provider": {
            "@type": "MedicalBusiness",
            "name": "ReStart Physio"
          }
        }
      }))
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(businessWithPricesSchema)
      }}
    />
  );
}

export default function PriceList() {
  return (
    <div className="min-h-screen bg-white">
      <PriceSchema />

      <section
        aria-labelledby="price-list-heading"
        className="mx-auto max-w-3xl px-4 py-12 sm:py-16 md:py-20 font-sans bg-white"
      >
        {/* Papír stílusú konténer – kisebb padding az összehúzáshoz */}
        <div
          className="
            bg-white border rounded-lg p-6 md:p-8
            shadow-[0_4px_20px_rgba(0,0,0,0.04)]
            border-[color:rgba(0,74,109,0.12)]
          "
          style={{ borderColor: "color-mix(in srgb, " + BRAND_PRIMARY + " 20%, transparent)" } as React.CSSProperties}
        >
          {/* Fejléc */}
          <div className="flex flex-col items-center mb-8 sm:mb-10">
            <div className="flex items-center w-full">
              <span
                className="flex-1 h-px"
                style={{ backgroundColor: "color-mix(in srgb, " + BRAND_PRIMARY + " 25%, #e3ded7)" } as React.CSSProperties}
              />
              <h1
                id="price-list-heading"
                className="mx-6 text-center tracking-[0.2em] text-[0.75rem] sm:text-sm font-medium text-[#001219]"
              >
                R E S T A R T&nbsp;&nbsp;P H Y S I O
              </h1>
              <span
                className="flex-1 h-px"
                style={{ backgroundColor: "color-mix(in srgb, " + BRAND_PRIMARY + " 25%, #e3ded7)" } as React.CSSProperties}
              />
            </div>
            <h2
              className="mt-3 text-[0.95rem] sm:text-base tracking-[0.2em] font-semibold"
              style={{ color: BRAND_ACCENT } as React.CSSProperties}
            >
              Á R L I S T A
            </h2>
          </div>

          {/* Szolgáltatások */}
          <PriceGroup items={SERVICES} />

          {/* Vékony elválasztó */}
          <div
            className="my-6 h-px w-full"
            style={{ backgroundColor: "color-mix(in srgb, " + BRAND_PRIMARY + " 15%, #e3ded7)" } as React.CSSProperties}
          />

          {/* Bérletek */}
          <PriceGroup items={PASSES} />

          <div
            className="my-6 h-px w-full"
            style={{ backgroundColor: "color-mix(in srgb, " + BRAND_PRIMARY + " 15%, #e3ded7)" } as React.CSSProperties}
          />

          <PriceGroup items={RENT} />

          {/* Kapcsolat footer – feljebb húzva és balra indított vonal */}
          <div className="mt-8 sm:mt-10 text-[#001219]">
            {/* Telefon sor – picit feljebb hozva, balra igazítva md-től */}
            <div className="flex justify-center md:justify-start">
              <div
                className="tracking-[0.2em] text-[0.7rem] font-medium"
                style={{ color: BRAND_PRIMARY } as React.CSSProperties}
              >
                +36 30 / 819 8449
              </div>
            </div>

            {/* Sor: vonal (bal), email (közép), logó (jobb) */}
            <div className="mt-4 md:mt-5 w-full">
              <div className="flex items-center w-full">
                {/* Vonal balról indul, fix szélesség */}
                <span
                  className="h-px w-40 md:w-48"
                  style={{ backgroundColor: "color-mix(in srgb, " + BRAND_PRIMARY + " 15%, #e3ded7)" } as React.CSSProperties}
                />
                {/* Email középen */}
                <span
                  className="tracking-[0.2em] lowercase text-[0.65rem] font-medium whitespace-nowrap mx-auto px-3"
                  style={{ color: BRAND_PRIMARY } as React.CSSProperties}
                >
                  restart.gyor@gmail.com
                </span>
                {/* Logó jobb szélre tolva */}
                <img
                  src="/logo.png"
                  alt="Restart Physio"
                  className="h-10 w-auto md:h-14 ml-auto select-none"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

interface PriceGroupProps {
  items: PriceItem[];
}

function PriceGroup({ items }: PriceGroupProps) {
  return (
    <div className="w-full">
      {/* Desktop táblázat */}
      <div className="hidden md:grid grid-cols-[1fr_min-content_min-content] gap-x-8">
        {items.map((item, i) => {
          const isBold = i % 2 === 0;
          const nameClasses = `
            py-2 pr-2 text-[0.78rem] tracking-wide leading-snug text-[#1d2b32]
            ${isBold ? "font-bold" : "font-medium"}
            ${item.highlight ? "relative pl-3" : ""}
          `;
          return (
            <React.Fragment key={i}>
              <div className={nameClasses}>
                {item.highlight && (
                  <span
                    aria-hidden
                    className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full"
                    style={{ backgroundColor: BRAND_ACCENT } as React.CSSProperties}
                  />
                )}
                {item.name}
              </div>
              <div
                className="py-2 text-[0.66rem] font-medium tabular-nums whitespace-nowrap"
                style={{ color: "color-mix(in srgb, " + BRAND_PRIMARY + " 70%, #47535a)" } as React.CSSProperties}
              >
                {item.duration ?? "—"}
              </div>
              <div
              className="py-2 -mt-0.5 text-[0.76rem] font-semibold tabular-nums whitespace-nowrap"
              style={{ color: BRAND_PRIMARY } as React.CSSProperties}
            >
              {formatPrice(item.price)}
            </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Mobil / Tablet lista */}
      <ul className="md:hidden space-y-3">
        {items.map((item, i) => {
          const isBold = i % 2 === 0;
          const liClasses = `
            border-b pb-3 last:border-none
            ${item.highlight ? "border-[#e6e1db] pl-3 -ml-3 rounded-sm" : "border-[#e6e1db]"}
          `;
        return (
            <li
              key={i}
              className={liClasses}
              style={
                item.highlight
                  ? ({
                      borderLeft: "3px solid var(--color-brand-accent, #EC7007)",
                      backgroundColor: "color-mix(in srgb, var(--color-brand-accent, #EC7007) 6%, transparent)",
                    } as React.CSSProperties)
                  : undefined
              }
            >
              <div className={`text-[0.9rem] leading-snug ${isBold ? "font-semibold" : "font-medium"} text-[#1d2b32]`}>
                {item.name}
              </div>
              <div className="mt-1 flex items-center gap-3 text-[0.72rem]">
                <span
                  className="font-medium"
                  style={{ color: "color-mix(in srgb, " + BRAND_PRIMARY + " 70%, #47535a)" } as React.CSSProperties}
                >
                  {item.duration ?? "—"}
                </span>
                <span
                  className="inline-block h-1 w-1 rounded-full"
                  aria-hidden="true"
                  style={{ backgroundColor: "color-mix(in srgb, " + BRAND_PRIMARY + " 40%, #bcb6ae)" } as React.CSSProperties}
                />
                <span className="font-semibold" style={{ color: BRAND_PRIMARY } as React.CSSProperties}>
                  {formatPrice(item.price)}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}