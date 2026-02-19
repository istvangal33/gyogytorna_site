// components/StructuredData.tsx
import Script from "next/script";

export default function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalBusiness",
        "@id": "https://restartphysio.hu/#business",
        "name": "ReStart Physio Győr",
        "description":
          "Szakszerű gyógytorna és fizioterápia Győrben. Manuálterápia, sportrehabilitáció, gerincstabilizáció és mozgásszervi kezelések.",
        "url": "https://restartphysio.hu",
        "logo": "https://restartphysio.hu/logo.png",
        "image": "https://restartphysio.hu/gerinc_core1.jpg",
        "telephone": "+36 30 819 8449",
        "email": "restart.gyor@gmail.com",

        "medicalSpecialty": ["Physiotherapy"],

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
          "latitude": 47.6596433,
          "longitude": 17.6599994
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
            "dayOfWeek": ["Saturday"],
            "opens": "09:00",
            "closes": "14:00"
          }
        ],

        "priceRange": "5000–17000 HUF",
        "currenciesAccepted": "HUF",
        "paymentAccepted": ["Cash", "Credit Card", "NFC mobile payments"],

        "hasMap": "https://maps.app.goo.gl/MAsW9JaN2v5PcCR59",

        "sameAs": [
          "https://www.facebook.com/Restartphysiogyor/",
          "https://www.instagram.com/restartphysiogyor/"
        ],

        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Szolgáltatások",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Gyógytorna" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Fizioterápia" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Rehabilitáció" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Műtét utáni rehabilitáció" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Gerinckezelés és gerinc core edzés" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Állkapocs ízületi (TMJ) terápia" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Fascia kezelések (FDM)" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ízületi panaszok kezelése" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Schroth terápia gerincferdülésre" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Dinamikus tape alkalmazás" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Kineziológiai tape" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "BEMER terápia" } }
          ]
        },

        "founder": { "@id": "https://restartphysio.hu/#person" },
        "employee": { "@id": "https://restartphysio.hu/#person" }
      },

      {
        "@type": "Person",
        "@id": "https://restartphysio.hu/#person",
        "name": "Forrás Fernanda",
        "jobTitle": "Gyógytornász – fizioterapeuta",
        "url": "https://restartphysio.hu/bemutatkozas",
        "image": "https://restartphysio.hu/gerinc_core1.jpg",
        "worksFor": { "@id": "https://restartphysio.hu/#business" },
        "knowsAbout": [
          "Gyógytorna",
          "Fizioterápia",
          "Sportrehabilitáció",
          "Manuálterápia",
          "Gerincpanaszok kezelése"
        ]
      }
    ]
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
