import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // pl. Vercel buildnél engedjük át az ESLint hibákat
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Külső képdomainek engedélyezése a <Image> komponenshez
  images: {
    remotePatterns: [
      // GitHub raw fájlok (repo-ból származó képek)
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/**",
      },
      // GitHub issue/PR feltöltött képek
      {
        protocol: "https",
        hostname: "user-images.githubusercontent.com",
        pathname: "/**",
      },
      // Adj hozzá bármi mást, amit használsz:
      // { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      // { protocol: "https", hostname: "cdn.example.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;