/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 80, 85, 95],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  // Telepítésenként változó azonosító — verzióeltérés elleni védelem.
  //
  // A Server Actionök azonosítója minden fordításnál új. Ha valakinél nyitva
  // marad az admin felület, és közben telepítünk, a következő kattintása egy
  // olyan azonosítót küldene, amit az új szerver már nem ismer — a felhasználó
  // pedig egy "Server Action was not found" hibaoldalt kapna, ami nem mond
  // neki semmit.
  //
  // Ezzel a kliens észreveszi, hogy a lapja régebbi a szervernél, és teljes
  // oldalfrissítést végez a hibaüzenet helyett.
  //
  // A DEPLOY_ID-t a Netlify adja fordításkor. Helyi fejlesztésnél nincs ilyen
  // változó, ilyenkor a viselkedés változatlan.
  deploymentId: process.env.DEPLOY_ID,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googletagmanager.com https://*.google-analytics.com https://challenges.cloudflare.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: https: blob:",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://stats.g.doubleclick.net https://challenges.cloudflare.com",
              "frame-src 'self' https://www.google.com https://maps.google.com https://challenges.cloudflare.com",
              "object-src 'none'",
              "base-uri 'self'",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;