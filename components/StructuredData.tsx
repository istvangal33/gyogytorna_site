// components/StructuredData.tsx
export default function StructuredData() {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MedicalBusiness"],
    "name": "ReStart Physio",
    "description": "Szakszerű gyógytorna és fizioterápia Győrben. Manuálterápia, sportrehabilitáció, gerincstabilizáció és mozgásszervi kezelések Forrás Fernanda vezetésével.",
    "url": "https://restartphysio.hu",
    "image": "https://restartphysio.hu/gerinc_core1.jpg",
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
    "priceRange": "$$",
    "paymentAccepted": ["Cash", "Credit Card"],
    "currenciesAccepted": "HUF",
    "hasMap": "https://www.google.com/maps?ll=47.65947,17.659989&z=16&t=m&hl=hu&gl=HU&mapclient=embed&q=M%C3%A1t%C3%A9+M%C3%A1ria+u.+4b+Gy%C5%91r+9028",
    "sameAs": [
      "https://www.facebook.com/Restartphysiogyor/",
      "https://www.instagram.com/restartphysiogyor/",
      "https://www.google.com/maps?ll=47.65947,17.659989&z=16&t=m&hl=hu&gl=HU&mapclient=embed&q=M%C3%A1t%C3%A9+M%C3%A1ria+u.+4b+Gy%C5%91r+9028"
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
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(businessSchema)
      }}
    />
  );
}
