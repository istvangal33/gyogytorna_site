'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function GoogleAnalytics({ GA_MEASUREMENT_ID }: { GA_MEASUREMENT_ID: string }) {
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    const cookieConsent = Cookies.get('cookieConsent');
    setConsent(cookieConsent === 'true');
  }, []);

  // Csak akkor renderelünk, ha van beleegyezés
  if (!consent) return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
