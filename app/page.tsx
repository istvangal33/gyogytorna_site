import WhyChooseUs from '../components/WhyChooseUs';

import Image from 'next/image';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden">
        {/* Háttérkép a szekció mögött */}
        <Image
          src="/1.png"          
          alt=""                      
          fill                        
          priority
          className="object-cover object-center -z-10"
        />

        {/* Opcionális fehér overlay, állítható átlátszósággal */}
        <div className="absolute inset-0 bg-white/75 -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* Bal oldali szöveg */}
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#004a6d] leading-tight mb-4 lg:mb-6">
                Ahol a <span className="text-[#EC7007]">mozgás</span> újraindul.
              </h1>
            </div>

            {/* Jobb oldali illusztráció */}
            <div className="relative order-first lg:order-last mt-10 lg:mt-0">
              {/* Ha nem kell keret/doboz, a wrapper el is hagyható */}
              <Image 
                src="/logo.png" 
                alt="ReStart Physio" 
                width={600}
                height={400}
                className="w-full h-auto drop-shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
                priority
              />
            </div>

          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-[#00121a] relative overflow-hidden">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative">

      {/* Photo with Diagonal Clip */}
      <div className="relative group">
        <div className="relative transition-all duration-500">
          {/* Diagonális vágású kép wrapper */}
          <div 
            className="relative w-full h-[500px] overflow-hidden"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)',
            }}
          >
            <Image 
              src="/main.jpg"   
              alt="Forrás Fernanda - Gyógytornász fizikoterapeuta"
              fill
              className="object-cover"
              style={{ objectPosition: '50% 30%' }}
              priority
              quality={85}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Subtle overlay az egyenletesebb átmenetért */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#00121a]/10"></div>
          </div>
          
          <h2 className="text-3xl font-bold text-[#00254d] mt-6 text-center">
            Forrás Fernanda
          </h2>
          <p className="text-lg text-[#00254d] mt-2 mb-4 text-center">
            Gyógytornász - fizikoterapeuta
          </p>
          
          <div className="flex flex-wrap gap-3 justify-center mt-4">
            <span className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-[#FFD7A3] to-[#EC7007] text-black shadow-sm hover:shadow-[0_8px_32px_0_rgba(236,112,7,0.15)] hover:scale-105 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3" />
              </svg>
              10+ év tapasztalat
            </span>

            <span className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-[#FFD7A3] to-[#EC7007] text-black shadow-sm hover:shadow-[0_8px_32px_0_rgba(236,112,7,0.15)] hover:scale-105 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              Manuálterápia
            </span>

            <span className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-[#FFD7A3] to-[#EC7007] text-black shadow-sm hover:shadow-[0_8px_32px_0_rgba(236,112,7,0.15)] hover:scale-105 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2" />
              </svg>
              Sportrehabilitáció
            </span>
          </div>
        </div>
        
        {/* Dekoratív háttér kör */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-200 rounded-full opacity-20 blur-2xl"></div>
      </div>

      {/* Professional Story - Eredeti szövegekkel */}
      <div>
        <h3 className="text-3xl md:text-4xl font-bold text-blue-1000 mb-8 relative text-center">
          <span className="text-3xl font-bold text-[#00254d] mt-6">
            Szakmai Háttér
          </span>
          <span className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r text-grey-600 rounded-full"></span>
        </h3>
        <div className="prose prose-lg text-[#00254d] space-y-6 max-w-none">
          <p className='text-justify indent-12'>
            Diplomámat 2017-ben szereztem a Szegedi Tudományegyetemen, majd ezt követően költöztem és kezdtem el Győrben dolgozni. 
Az elmúlt évek döntő részében élsportolókkal dolgoztam együtt, kezdetben kézilabdázókkal majd ezt követően a Győri ETO FC gyógytornászaként négy évig labdarúgókkal. Ezek alatt az évek alatt lehetőségem nyílt evezős sportolókkal, kosárlabdázókkal és atlétákkal is együtt dolgozni, így komplex rálátást és szemléletet kaptam különböző sportok rehabilitációjáról. 2024-től léptem át a magánszektorba, ahol számos mozgásszervi betegséggel hozzám forduló pácienst segíthettem vissza a mindennapi fájdalommentes életéhez.
          </p>
          <h3 className="text-2xl font-semibold text-center mb-4">Szakterületeim</h3>
          <ul className="space-y-2 list-disc list-inside">
            <li>Sportrehabilitáció/ műtétek utáni rehabilitáció</li>
            <li>Manuális fascia kezelések</li>
            <li>Állkapocs ízületi panaszok kezelése</li>
            <li>Porckorongsérv és egyéb gerinc panaszok kezelése</li>
            <li>Gerincferdülés</li>
            <li>Ízületi és mozgásszervi panaszok kezelése</li>
          </ul>
          <p className='text-justify indent-12'>
            Az elmúlt évek tapasztalatait szeretném arra használni, hogy minél hatékonyabban tudjam segíteni a hozzám fordulókat, motivációt nyújtsak a rehabilitáció folyamatában és hozzásegítsem a pácienseimet a közösen kitűzött célok eléréséhez!
          </p>
        </div>
      </div>
    </div>
  </div>
</section>



      {/* Why Choose Us Section */}
      <WhyChooseUs />

    </>
  );
}