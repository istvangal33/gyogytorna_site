import ScrollTiles from '../components/ScrollTiles';
import WhyChooseUs from '../components/WhyChooseUs';

import Image from 'next/image';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Bal oldali szöveg */}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4 lg:mb-6">
                Professzionális
                gyógytorna
                szolgáltatások
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-6 lg:mb-8 max-w-xl">
                Egyéni terápiás tervek a mozgásfunkciók helyreállítására
                és a fájdalom csökkentésére. Modern módszerekkel, tapasztalt
                szakemberekkel.
              </p>
            </div>

            {/* Jobb oldali illusztráció */}
            <div className="relative order-first lg:order-last mt-10 lg:mt-0">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <Image 
                  src="/physio.png" 
                  alt="Modern gyógytorna rendelő" 
                  width={600}
                  height={400}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Szolgáltatásaink
            </h2>
          </div>
          <ScrollTiles/>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <WhyChooseUs />

    </>
  );
}