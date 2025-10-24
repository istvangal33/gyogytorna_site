import type { Metadata } from 'next';
import Image from 'next/image';

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
      <section className="relative bg-gradient-to-br from-[#004A6D]/5 via-white to-[#EC7007]/5 py-20 md:py-28 overflow-hidden">
        {/* Dekoratív hullámos alj */}
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
              Bemutatkozás
            </h1>
            <p className="text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Közel 10 éves szakmai tapasztalattal segítem pácienseimet a gyógyulás útján
            </p>
          </div>
        </div>
      </section>


      {/* About Content */}
      <section className="py-24 bg-gradient-to-br from-white via-white to-blue-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Photo and Basic Info */}
            <div className="relative group">
              <div className="relative bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-500">
                <div className="aspect-square overflow-hidden ">
                  <Image 
                    src="/girl.jpg"   // vagy külső URL: "https://domain.com/example.jpg"
                    alt="Leírás a képről"
                    width={550}                 // pixelben, kötelező!
                    height={300}                // pixelben, kötelező!
                    priority                    // (opcionális, ha fontos a gyors betöltés)
                    quality={80}                // (opcionális, képek minősége 1-100)
                    style={{ borderRadius: '50%', objectFit: 'cover' }} // (opcionális, stílus)
                    />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mt-6 text-center">Forrás Fernanda</h2>
                <p className="text-lg text-gray-900 mt-2 mb-4 text-center">Gyógytornász -fizikoterapeuta</p>
                
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start mt-4">
              </div>


              </div>
              {/* Dekoratív háttér kör */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-200 rounded-full opacity-20 blur-2xl"></div>
            </div>

            {/* Professional Story */}
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-blue-1000 mb-8 relative text-center">
                <span className="text-3xl font-bold text-gray-900 mt-6 ">
                  Bemutatkozás
                </span>
                <span className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r text-grey-600 rounded-full"></span>
              </h3>
              <div className="prose prose-lg text-gray-900 space-y-6 max-w-none">
                <p>
                  Forrás Fernanda vagyok, okleveles gyógytornász-fizioterapeuta, a ReStart Physio alapítója és tulajdonosa. Diplomámat 2017-ben szereztem meg a Szegedi Tudományegyetem Egészségtudományi és Szociális Képzési Karán gyógytornász-fizioterapeuta szakon.
                </p>
                <p>
                  Az elmúlt évek döntő részében élsportolók körében tevékenykedtem. Tapasztalatot szereztem a sportban elszenvedett sérülések rehabilitációs kezelésében. Két évig a Mosonmagyaróvári Kézilabda Club gyógytornászaként, ezt követően négy évig a Győri ETO FC labdarúgócsapatának szakembereként. Ezen sportok mellett foglalkoztam egyéb sportágakban versenyzőkkel is, mint a Magyar Evezős Szövetség válogatott, illetve a Győri Atlétikai Club evezős szakosztályának sportolóival, továbbá kosárlabdázókkal, atlétákkal és úszókkal is. 2023-ban tagja voltam a Magyarországon megrendezett Atlétikai Világbajnokság fizioterapeuta csapatának.
                </p>
                <p>
                  2024-től léptem át a magánszektorba, ahol azóta is számos mozgásszervi betegséggel hozzám forduló pácienst segítek vissza a mindennapi fájdalommentes élethez. Terápiás eljárásaim alatt kombináltan manuális technikákkal és korrektív gyakorlatokkal is segítem pácienseimet. Munkában főként a precizitásra törekszem, a feladatok megfelelő elsajátításának segítésében, bemutatásában, korrekciójában. Fontosnak tartom a pácienseim motiváltságának fenntartását, hiszen ez alapvető részét képezi a rehabilitáció folyamatának. Hitvallásom, hogy megfelelő együttműködés és kölcsönös bizalom által sikereket tudunk közösen elérni, és számomra ez a legfontosabb feladat: támaszt nyújtani a célok elérésében.
                </p>
                <h3 className="text-2xl font-semibold text-center mb-4">Szakterületeim</h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Sportrehabilitáció: Térdműtétek, speciálisan: ACL -elülső keresztszalag szakadást követő műtét utáni rehabilitáció, bokasérülés/műtét utáni rehabilitáció</li>
                  <li>Porckorongsérv konzervatív kezelése</li>
                  <li>SI ízületi panaszok kezelése</li>
                  <li>Állkapocs ízületi terápia</li>
                  <li>Izomsérülések és ízületi fájdalmak kezelése</li>
                  <li>Gerincferdülés(Scoliosis) konzervatív kezelése</li>
                </ul>
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