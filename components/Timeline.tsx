import React from "react";

export default function Timeline() {
  const events = [
    {
      year: "2017",
      title: "Okleveles Gyógytornász-Fizioterapeuta",
      description: "Szegedi Tudományegyetem, Egészségtudományi és Szociális Képzési Kar",
      highlight: true
    },
    {
      year: "2018",
      title: "FDM - Fascia Disztorziós Modell Terápia",
      description: "Nemzetközi FDM (Typaldos) képzés elvégzése. Kötőszöveti elváltozások, akut és krónikus fájdalmak gyors és hatékony manuális kezelése."
    },
    {
      year: "2019",
      title: "Kinesio Tape & Dinamikus Tape",
      description: "Sérülések rehabilitációját és megelőzését támogató elasztikus szalag technikák."
    },
    {
      year: "2020",
      title: "Schroth Terápia (ISST)",
      description: "Aszimmetrikus gerincproblémák, scoliosis (gerincferdülés) és tartáshibák specifikus 3D komplex fizioterápiája."
    },
    {
      year: "2021",
      title: "TMI - Állkapocsízületi Terápia",
      description: "Temporomandibuláris ízület (rágóízület) diszfunkcióinak manuális és funkcionális kezelése."
    },
    {
      year: "2022",
      title: "Köpöly Terápia (Fascia release)",
      description: "A fasciarendszer mobilizációja, sejtregeneráció és keringésfokozás kötőszöveti szinten."
    },
    {
      year: "2023",
      title: "Atlétikai Világbajnokság - Fizioterapeuta Csapattag",
      description: "Budapest 2023 – Részvétel a hivatalos mozgásszervi rehabilitációs orvosi stábban, élsportolók azonnali kezelése."
    },
    {
      year: "2024",
      title: "Flossing Terápia Oklevél",
      description: "Kompressziós és mobilizációs technikák az akut ízületi korlátozottságok feloldására."
    },
    {
      year: "2025",
      title: "ReStart Physio Megnyitása",
      description: "Győr legmodernebb egyénre szabott gyógytorna és FDM manuálterápiás magánrendelőjének elindítása.",
      highlight: true
    }
  ];

  return (
    <div className="relative py-10 px-4 md:px-0">
      {/* Vertical line passing through nodes */}
      <div className="absolute left-6 md:left-1/2 top-10 bottom-10 w-px bg-gradient-to-b from-[#004A6D]/10 via-[#004A6D]/30 to-[#004A6D]/10 -ml-px"></div>

      <div className="space-y-12">
        {events.map((event, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <div key={idx} className={`relative flex items-center ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} group`}>
              
              {/* Dot */}
              <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-white border-4 border-[#004A6D] group-hover:border-[#EC7007] transition-colors duration-300 transform -translate-x-1/2 z-10 
              shadow-[0_0_0_4px_rgba(0,74,109,0.1)] group-hover:shadow-[0_0_0_6px_rgba(236,112,7,0.2)]"></div>

              {/* Content box */}
              <div className={`ml-14 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-12 lg:pr-16 text-left md:text-right' : 'md:pl-12 lg:pl-16 text-left'}`}>
                <div className={`p-6 rounded-2xl border bg-white/60 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1
                  ${event.highlight ? 'border-[#EC7007]/30 shadow-[0_4px_20px_rgba(236,112,7,0.08)]' : 'border-gray-100 shadow-sm'}
                `}>
                  <span className={`inline-block py-1 px-3 rounded-full text-xs font-bold mb-3
                    ${event.highlight ? 'bg-[#EC7007]/10 text-[#EC7007]' : 'bg-[#004A6D]/10 text-[#004A6D]'}
                  `}>
                    {event.year}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">{event.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}