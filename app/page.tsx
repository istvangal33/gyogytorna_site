import WhyChooseUs from '../components/WhyChooseUs';

import Image from 'next/image';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden min-h-[600px] sm:min-h-[700px] w-full">
        {/* Háttérkép - teljes szélesség, kitöltés vágással */}
        <div className="absolute inset-0 w-full h-full -z-10">
          <Image
            src="/rendelo4.jpeg"
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
            // NINCS extra style!
          />
        </div>

        {/* Halvány fehér overlay a szöveg olvashatóságához */}
        <div className="absolute inset-0 bg-white/60 -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full">
            {/* Bal oldali szöveg */}
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#004a6d] leading-tight mb-4 lg:mb-6">
                Ahol a <span className="text-[#EC7007]">mozgás</span> újraindul.
              </h1>
            </div>
            {/* Jobb oldali illusztráció */}
            <div className="relative order-first lg:order-last">
              <Image 
                src="/logo.png" 
                alt="ReStart Physio" 
                width={500}
                height={350}
                className="w-full max-w-md mx-auto lg:max-w-none h-auto drop-shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-[#00121a] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* LEFT: Photo + basic info */}
            <div className="flex flex-col items-center w-full">
              <div className="relative w-full max-w-3xl h-[240px] sm:h-[320px] lg:h-[420px] overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src="/mainpicture.jpg"
                  alt="Forrás Fernanda - Gyógytornász fizikoterapeuta"
                  fill
                  className="object-cover object-center"
                  priority
                  quality={90}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 900px"
                />
              </div>

              {/* Eddig a név/cím csak nagy kijelzőn volt balra, ezután mindig középen */}
              <div className="w-full flex flex-col items-center justify-center mt-6 mb-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#00254d] text-center">
                  Forrás Fernanda
                </h2>
                <p className="text-base text-[#00254d] mt-2 mb-4 text-center">
                  Gyógytornász - fizikoterapeuta
                </p>
              </div>

              <div className="flex flex-wrap gap-3 justify-center mt-4">
                <span className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-[#FFD7A3] to-[#EC7007] text-black shadow-sm transform transition hover:scale-105">
                  Manuálterápia
                </span>
                <span className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-[#FFD7A3] to-[#EC7007] text-black shadow-sm transform transition hover:scale-105">
                  Közel 10 év szakmai tapasztalat
                </span>
                <span className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-[#FFD7A3] to-[#EC7007] text-black shadow-sm transform transition hover:scale-105">
                  Sportrehabilitáció
                </span>
              </div>
            </div>

            {/* RIGHT: professional story */}
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-[#00254d] mb-8 text-center lg:text-left">
                Szakmai Háttér
              </h3>
              <div className="prose prose-lg text-[#00254d] space-y-6 max-w-none">
                <p className="[text-align:justify] indent-8">
                  Diplomámat 2017-ben szereztem a Szegedi Tudományegyetemen, majd ezt követően költöztem és kezdtem el Győrben dolgozni. Az elmúlt évek döntő részében élsportolókkal dolgoztam együtt, kezdetben kézilabdázókkal majd ezt követően a Győri ETO FC gyógytornászaként négy évig labdarúgókkal. Ezek alatt az évek alatt lehetőségem nyílt evezős sportolókkal, kosárlabdázókkal és atlétákkal is együtt dolgozni, így komplex rálátást és szemléletet kaptam különböző sportok rehabilitációjáról. 2024-től léptem át a magánszektorba, ahol számos mozgásszervi betegséggel hozzám forduló pácienst segíthettem vissza a mindennapi fájdalommentes életéhez.
                </p>
                <h4 className="text-2xl font-semibold text-center lg:text-left">Szakterületeim</h4>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Sportrehabilitáció / műtétek utáni rehabilitáció</li>
                  <li>Manuális fascia kezelések</li>
                  <li>Állkapocs ízületi panaszok kezelése</li>
                  <li>Porckorongsérv és egyéb gerinc panaszok kezelése</li>
                  <li>Gerincferdülés</li>
                  <li>Ízületi és mozgásszervi panaszok kezelése</li>
                </ul>
                <p className="[text-align:justify] indent-8">
                  Az elmúlt évek tapasztalatait szeretném arra használni, hogy minél hatékonyabban tudjam segíteni a hozzám fordulókat, motivációt nyújtsak a rehabilitáció folyamatában és hozzásegítsem a pácienseimet a közösen kitűzött célok eléréséhez!
                </p>
              </div>
            </div>
          </div>
          {/* dekoratív háttér-kör (opcionális) */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-200 rounded-full opacity-20 blur-2xl pointer-events-none" />
        </div>
      </section>


      {/* Why Choose Us Section */}
      <WhyChooseUs />

    </>
  );
}