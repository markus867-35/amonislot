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

  const handleClick = (cat) => {
    setActiveCategory(cat.name);
    
    // Fungsi untuk melakukan scroll otomatis ke section tujuan
    const element = document.getElementById(cat.id);
    if (element) {
      const yOffset = -247; // Jarak aman agar tidak tertutup header & sticky menu
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

      <div className="sticky top-[80px] md:top-[150px] z-40 w-full bg-[#1a0033]/95 backdrop-blur-md py-3 px-3 border-b border-purple-800">
        {/* Container Scroll Horizontal */}
        <div className="max-w-[1200px] mx-auto flex overflow-x-auto md:overflow-visible gap-6 md:gap-0 scrollbar-hide items-center justify-start md:justify-between">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.name;
            
            return (
              <button 
                key={cat.name} 
                onClick={() => handleClick(cat)}
                className={`flex flex-col items-center justify-center min-w-[75px] h-[70px] md:min-w-[120px] rounded-2xl border transition-all shrink-0 ${
                  isActive ? "animate-wave-continuous border-yellow-400 bg-[#2d0059] shadow-[0_0_10px_rgba(234,179,8,0.5)]" : "border-purple-800/80 bg-[#1e0533] hover:border-purple-500"
                }`}
              >
                <div className="w-6 h-6 md:w-7 md:h-7 mb-1 flex items-center justify-center">
                  <img 
                    src={cat.icon} 
                    alt={cat.name} 
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className={`text-[10px] md:text-xs font-bold tracking-wider ${isActive ? "text-yellow-400" : "text-white"}`}>
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