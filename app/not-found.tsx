import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Az oldal nem található (404) | ReStart Physio',
  description: 'Hoppá, ez az oldal nem található. Kérjük, térjen vissza a főoldalra.',
  robots: {
    index: false,
    follow: true,
  }
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-8">
        <div>
          <h1 className="text-9xl font-extrabold text-[#004A6D] tracking-widest drop-shadow-sm">
            404
          </h1>
          <div className="bg-[#EC7007] px-2 text-sm rounded rotate-12 absolute -mt-10 ml-auto mr-auto left-0 right-0 w-fit text-white font-semibold">
            Hoppá!
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Ez az oldal nem található...
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            A keresett oldal valószínűleg megváltozott, töröltük, vagy rossz címet gépelt be.
          </p>
          
          <Link 
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-white bg-[#004A6D] hover:bg-[#003855] transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            Vissza a főoldalra
          </Link>
        </div>
        
        {/* Optional decorative background elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-5 pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full bg-[#EC7007] blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}