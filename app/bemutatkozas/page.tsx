import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bemutatkozó | Gyógytorna - Professzionális Fizioterápia',
  description: 'Ismerje meg szakképzett gyógytornászunkat, képzettségét és több éves tapasztalatát a rehabilitáció területén.',
  openGraph: {
    title: 'Bemutatkozó | Gyógytorna - Professzionális Fizioterápia',
    description: 'Ismerje meg szakképzett gyógytornászunkat, képzettségét és több éves tapasztalatát a rehabilitáció területén.',
  },
};

export default function Bemutatkozo() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-black to-gray-900 text-white py-28 md:py-36">
        {/* Dekoratív hullámos alj */}
        <div className="absolute inset-x-0 bottom-0">
          <svg
            className="w-full h-16 md:h-24 text-gray-50"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path d="M0,96L48,106.7C96,117,192,139,288,160C384,181,480,203,576,186.7C672,171,768,117,864,117.3C960,117,1056,171,1152,186.7C1248,203,1344,181,1392,170.7L1440,160L1440,320L0,320Z"></path>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
              Bemutatkozás
            </h1>
            <p className="text-lg md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Több mint 10 éves tapasztalattal segítem pácienseimet a gyógyulás útján
            </p>
          </div>
        </div>
      </section>


      {/* About Content */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Photo and Basic Info */}
            <div className="relative group">
              <div className="relative bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-500">
                <div className="aspect-square overflow-hidden rounded-xl shadow-md">
                  <img
                    src="/girl.jpg"
                    alt="Gyógytornász"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mt-6">Dr. Példa Gyógytornász</h2>
                <p className="text-lg text-gray-900 mt-2 mb-4">Diplomás Gyógytornász, Manuálterapeuta</p>
                
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start mt-4">
                <span className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium 
                  bg-gradient-to-r from-blue-50 to-blue-100 text-black shadow-sm hover:shadow-md hover:scale-105 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3" />
                  </svg>
                  10+ év tapasztalat
                </span>

                <span className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium 
                  bg-gradient-to-r from-green-50 to-green-150 text-black shadow-sm hover:shadow-md hover:scale-105 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  Manuálterápia
                </span>

                <span className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium 
                  bg-gradient-to-r from-purple-50 to-pink-100 text-black shadow-sm hover:shadow-md hover:scale-105 transition-transform">
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

            {/* Professional Story */}
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-blue-1000 mb-8 relative">
                <span className="text-3xl font-bold text-gray-900 mt-6">
                  Szakmai Háttér
                </span>
                <span className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r text-grey-600 rounded-full"></span>
              </h3>
              <div className="prose prose-lg text-gray-900 space-y-6 max-w-none">
                <p>
                  Gyógytornászként dolgozom több mint 10 éve, és ez idő alatt számtalan páciensnek
                  segítettem visszanyerni mobilitását és életminőségét. Szakmai pályafutásomat
                  a Semmelweis Egyetem Egészségtudományi Karán kezdtem, ahol gyógytornász diplomát szereztem.
                </p>
                <p>
                  Folyamatosan képzem magam a legújabb terápiás módszerekben. Különösen érdeklődöm
                  a manuálterápia, a sportrehabilitáció és a gerincproblémák kezelése iránt.
                  Pácienseimmel mindig egyénileg foglalkozom, hiszen minden ember és minden probléma egyedi.
                </p>
                <p>
                  Meggyőződésem, hogy a gyógyulás nem csak a testi tünetek megszüntetéséről szól,
                  hanem arról is, hogy megtanítsuk pácienseinket, hogyan óvhatják meg egészségüket
                  a jövőben. Ezért minden kezelés része a prevenciós tanácsadás és az otthoni gyakorlatok.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Education and Qualifications */}
      <section className="relative py-24 bg-gradient-to-br from-blue-50 via-white to-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Fejléc */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Képzettségek & Végzettségek
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Folyamatos tanulás és szakmai fejlődés a legjobb ellátás érdekében
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            
            {/* Végzettségek */}
            <div className="relative bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-10 border border-white/40 hover:-translate-y-2 hover:shadow-2xl transition duration-500">
              <div className="flex items-center mb-8">
                <h3 className="ml-4 text-2xl font-bold text-gray-900">Végzettségek</h3>
              </div>
              
              <div className="space-y-6">
                <div className="border-l-4 border-gray-600 pl-4">
                  <h4 className="font-semibold text-gray-900">Gyógytornász Diploma</h4>
                  <p className="text-gray-600">Semmelweis Egyetem Egészségtudományi Kar</p>
                  <p className="text-sm text-gray-500">2014</p>
                </div>
                <div className="border-l-4 border-gray-600 pl-4">
                  <h4 className="font-semibold text-gray-900">Manuálterápia Specialista</h4>
                  <p className="text-gray-600">Magyar Manuálterápia Egyesület</p>
                  <p className="text-sm text-gray-500">2016</p>
                </div>
                <div className="border-l-4 border-gray-600 pl-4">
                  <h4 className="font-semibold text-gray-900">Sportrehabilitációs Tanúsítvány</h4>
                  <p className="text-gray-600">Nemzetközi Sportrehabilitációs Intézet</p>
                  <p className="text-sm text-gray-500">2018</p>
                </div>
              </div>
            </div>

            {/* Specializációk */}
            <div className="relative bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-10 border border-white/40 hover:-translate-y-2 hover:shadow-2xl transition duration-500">
              <div className="flex items-center mb-8">
                <h3 className="ml-4 text-2xl font-bold text-gray-900">Specializációk</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "McKenzie módszer (MDT)", video: "/videos/mckenzie.mp4" },
                  { title: "Trigger Point terápia", video: "/videos/triggerpoint.mp4" },
                  { title: "Funkcionális mozgásanalízis (FMS)"},
                  { title: "Gerinc stabilizáció"},
                  { title: "Légzésterápia"},
                  { title: "Szülés előtti/utáni rehabilitáció"},
                ].map((item, i) => (
                  <div
                    key={i}
                    className="relative group flex items-center h-16 border-l-4 border-gray-600 pl-4"
                  >
                    <h4 className="font-semibold text-gray-900">{item.title}</h4>

                    {/* Hover videó tooltip */}
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 w-64 h-36 rounded-xl overflow-hidden shadow-lg scale-0 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition duration-300 origin-left z-20">
                      <video
                        src={item.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>





          </div>
        </div>
      </section>

  


      {/* Philosophy and Approach */}
      <section className="py-20 relative bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-2">
          <div className="text-3xl md:text-base font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            <div className="text-center mb-6">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                Szakmai Filozófia
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { title: "Együttműködés", text: "A gyógyulás közös munka eredménye. Pácienseimmel partnerként dolgozom együtt céljaik elérése érdekében."},
                { title: "Egyéni Megközelítés", text: "Minden páciens egyedi, ezért minden kezelési terv is személyre szabott. Nincs két egyforma eset." },
                { title: "Folyamatos Tanulás", text: "A tudomány folyamatosan fejlődik. Számomra fontos, hogy mindig naprakész legyek a legújabb módszerekkel."},
              ].map((item, i) => (
                <div
                  key={i}
                  className="relative bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl 
                            p-6 sm:p-8 border border-white/40 
                            hover:-translate-y-2 hover:shadow-2xl transition duration-500 group"
                >
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-gray-600 text-center leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}