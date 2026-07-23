'use client';
import { useState } from 'react';

export default function CategoryMenu() {
  const [activeCategory, setActiveCategory] = useState("POPULER");

  const categories = [
    { name: "POPULER", icon: "https://ik.imagekit.io/j72i7hsy1/populer_sfHrAYpOq.png", id: "section-populer" },
    { name: "TOTO", icon: "https://ik.imagekit.io/j72i7hsy1/toto_txRZ9sNQ_.png", id: "section-toto" },
    { name: "SLOT", icon: "https://ik.imagekit.io/j72i7hsy1/slot1.png", id: "section-slot" },
    { name: "LIVE", icon: "https://ik.imagekit.io/j72i7hsy1/live.png", id: "section-live" },
    { name: "SPORT", icon: "https://ik.imagekit.io/j72i7hsy1/sport_3afFrP0aE.png", id: "section-sport" },
    { name: "VIRTUAL", icon: "https://ik.imagekit.io/j72i7hsy1/virtual.png", id: "section-virtual" },
    { name: "FISHING", icon: "/icons/fishing.png", id: "section-fishing" },
    { name: "CRASH", icon: "/icons/crash.png", id: "section-crash" },
  ];

  const handleClick = (cat: any) => {
    setActiveCategory(cat.name);
    
    const element = document.getElementById(cat.id);
    if (element) {
      const yOffset = -247;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes wave {
          0% { transform: rotate(0deg); }
          20% { transform: rotate(14deg); }
          40% { transform: rotate(-12deg); }
          60% { transform: rotate(10deg); }
          80% { transform: rotate(-8deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-wave-continuous {
          animation: wave 1.2s ease-in-out infinite;
          transform-origin: 70% 70%;
        }
      `}</style>

      {/* Bagian utama dengan efek blur khusus mobile */}
      <div className="sticky top-[80px] md:top-[150px] z-40 w-full bg-[#1a0033]/30 backdrop-blur-3xl md:bg-[#1a0033]/95 md:backdrop-blur-none py-1.5 md:py-4 px-2 md:px-3 border-b border-purple-800/30 md:border-purple-800 shadow-lg">
        
        {/* Container Scroll Horizontal */}
        <div className="max-w-[1200px] mx-auto flex overflow-x-auto md:overflow-visible gap-2.5 md:gap-0 scrollbar-hide items-center justify-start md:justify-between">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.name;
            
            return (
              <button 
                key={cat.name} 
                onClick={() => handleClick(cat)}
                /* 
                  min-w-[65px] h-[50px] -> Ukuran kecil khusus HP
                  md:min-w-[120px] md:h-[70px] -> Ukuran normal untuk Desktop
                */
                className={`flex flex-col items-center justify-center min-w-[70px] h-[60px] md:min-w-[130px] md:h-[90px] rounded-xl md:rounded-2xl border transition-all shrink-0 ${
                  isActive ? "animate-wave-continuous border-yellow-400 bg-[#2d0059] shadow-[0_0_10px_rgba(234,179,8,0.5)]" : "border-purple-800/80 bg-[#1e0533] hover:border-purple-500"
                }`}
              >
                {/* Ukuran Ikon: w-4 h-4 di HP, md:w-7 md:h-7 di Desktop */}
                <div className="w-4 h-4 md:w-7 md:h-7 mb-0.5 md:mb-1 flex items-center justify-center">
                  <img 
                    src={cat.icon} 
                    alt={cat.name} 
                    className="w-full h-full object-contain"
                  />
                </div>
                
                {/* Ukuran Teks: text-[9px] di HP, md:text-xs di Desktop */}
                <span className={`text-[9px] md:text-xs font-bold tracking-wider ${isActive ? "text-yellow-400" : "text-white"}`}>
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}