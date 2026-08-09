'use client';
import { useState, useEffect } from 'react';

const mockMatches = [
  {
    league: 'Bundesliga',
    date: '29-08-2026',
    time: '20:30:00',
    score: '- : -',
    homeTeam: 'RB Leipzig',
    awayTeam: "B. M'gladbach",
    homeLogo: '',
    awayLogo: '',
    selengkapnyaUrl: '#',
    nontonUrl: '#',
    bettingUrl: '#',
  },
  {
    league: 'Premier League',
    date: '30-08-2026',
    time: '22:00:00',
    score: '1 : 2',
    homeTeam: 'Arsenal',
    awayTeam: 'Chelsea',
    homeLogo: '',
    awayLogo: '',
    selengkapnyaUrl: '#',
    nontonUrl: '#',
    bettingUrl: '#',
  },
    {
    league: 'LaLiga',
    date: '30-08-2026',
    time: '22:00:00',
    score: '1 : 2',
    homeTeam: 'Arsenal',
    awayTeam: 'Chelsea',
    homeLogo: '',
    awayLogo: '',
    selengkapnyaUrl: '#',
    nontonUrl: '#',
    bettingUrl: '#',
  },
];

const mockNotifications = [
  { username: 'qi****wz', amount: '6.725.000' },
  { username: 'jo****88', amount: '12.500.000' },
  { username: 'an****99', amount: '3.400.000' },
];

export default function LiveNotification() {
  const [notifIndex, setNotifIndex] = useState(0);
  const [isVisibleNotif, setIsVisibleNotif] = useState(true);

  const [matchIndex, setMatchIndex] = useState(0);
  const [showMatchWidget, setShowMatchWidget] = useState(true);
  
  const [slideAnimation, setSlideAnimation] = useState('translate-x-0');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const notifInterval = setInterval(() => {
      setIsVisibleNotif(false);
      setTimeout(() => {
        setNotifIndex((prev) => (prev + 1) % mockNotifications.length);
        setIsVisibleNotif(true);
      }, 500);
    }, 4000);

    return () => clearInterval(notifInterval);
  }, []);

  const currentMatch = mockMatches[matchIndex];

  // Klik Kanan (>): Konten lama didorong ke kanan, konten baru masuk dari kiri
  const handleNextMatch = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    // 1. Geser ke kanan (keluar)
    setSlideAnimation('translate-x-full');

    setTimeout(() => {
      // 2. Ganti data
      setMatchIndex((prev) => (prev + 1) % mockMatches.length);
      // 3. Posisikan instan di kiri (tanpa animasi)
      setSlideAnimation('-translate-x-full transition-none');

      setTimeout(() => {
        // 4. Dorong masuk ke tengah dari kiri secara mulus
        setSlideAnimation('translate-x-0 transition-transform  ease-in-out');
        setIsTransitioning(false);
      }, 50);
    }, 100);
  };

  // Klik Kiri (<): Konten lama didorong ke kiri, konten baru masuk dari kanan
  const handlePrevMatch = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    // 1. Geser ke kiri (keluar)
    setSlideAnimation('-translate-x-full');

    setTimeout(() => {
      // 2. Ganti data
      setMatchIndex((prev) => (prev - 1 + mockMatches.length) % mockMatches.length);
      // 3. Posisikan instan di kanan (tanpa animasi)
      setSlideAnimation('translate-x-full transition-none');

      setTimeout(() => {
        // 4. Dorong masuk ke tengah dari kanan secara mulus
        setSlideAnimation('translate-x-0 transition-transform  ease-in-out');
        setIsTransitioning(false);
      }, 50);
    }, 100);
  };

  const currentNotif = mockNotifications[notifIndex];

  return (
    <div className="fixed bottom-20 left-4 z-[9999] flex flex-col gap-3 pointer-events-auto">
                  <style jsx>{`
        @keyframes shineMove {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(25deg);
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(25deg);
          }
        }

        .animate-shine {
          position: relative;
          overflow: hidden;
        }

        .animate-shine::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            135deg,
            transparent 0%,
            transparent 48%,
            rgba(255, 255, 255, 0.25) 50%,
            transparent 52%,
            transparent 100%
          );
          pointer-events: none;
          animation: shineMove 4s ease-in-out infinite;
        }
      `}</style>
      
      {/* 1. WIDGET PERTANDINGAN */}
      {showMatchWidget && (
        <div className="w-80 sm:w-96 bg-[#0b0e2d] border-2 border-blue-500 rounded-2xl shadow-[0_0_25px_rgba(59,130,246,0.6)] overflow-hidden relative">
          
          {/* Tombol Close (X) */}
          <button 
            onClick={() => setShowMatchWidget(false)}
            className="absolute top-2.5 right-2.5 w-6 h-6 bg-blue-600 hover:bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold transition shadow z-20"
          >
            ✕
          </button>

          {/* WRAPPER SLIDER */}
          <div className="overflow-hidden w-full">
            
            {/* KONTEN YANG BERGESER */}
            <div className={`transform transition-transform duration-300 ease-in-out ${slideAnimation}`}>
              
              {/* Header Liga */}
              <div className=" animate-shine bg-[#0b0e2d] text-white text-center font-extrabold text-base py-2.5 border-b border-blue-900 tracking-wider">
                {currentMatch.league}
              </div>

              {/* Konten Pertandingan & Tombol Navigasi */}
              <div className="relative p-4 flex items-center justify-between text-white">
                
                {/* Tombol Panah Kiri */}
                <button 
                  onClick={handlePrevMatch}
                  className="text-blue-400 hover:text-white font-bold text-xl px-2 transition z-10"
                >
                  ⟨
                </button>

                {/* Info Tim & Jadwal */}
                <div className="flex-1 flex justify-around items-center text-center">
                  
                  {/* Tim Home */}
                  <div className="flex flex-col items-center w-24">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-1.5 overflow-hidden border border-blue-400/30">
                      <span className="text-base">⚽</span>
                    </div>
                    <span className=" text-xs sm:text-sm font-bold truncate w-full">{currentMatch.homeTeam}</span>
                  </div>

                  {/* Tanggal, Jam & Skor */}
                  <div className="flex flex-col items-center px-1">
                    <span className="text-xs text-gray-300 font-medium">{currentMatch.date}</span>
                    <span className="text-xs text-gray-300 font-mono">{currentMatch.time}</span>
                    <span className="text-sm sm:text-base font-extrabold text-yellow-400 mt-1">{currentMatch.score}</span>
                  </div>

                  {/* Tim Away */}
                  <div className="flex flex-col items-center w-24">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-1.5 overflow-hidden border border-blue-400/30">
                      <span className="text-base">⚽</span>
                    </div>
                    <span className="text-xs sm:text-sm font-bold truncate w-full">{currentMatch.awayTeam}</span>
                  </div>

                </div>

                {/* Tombol Panah Kanan */}
                <button 
                  onClick={handleNextMatch}
                  className="text-blue-400 hover:text-white font-bold text-xl px-2 transition z-10"
                >
                  ⟩
                </button>
              </div>

              {/* Menu Tombol Bawah */}
              <div className="flex flex-col border-t border-blue-900/60 text-xs sm:text-sm font-extrabold">
                <a href={currentMatch.selengkapnyaUrl} className="animate-shine  bg-yellow-300 hover:bg-yellow-400 text-black py-2 text-center border-b border-blue-900/40 transition">
                  Selengkapnya
                </a>
                <a href={currentMatch.nontonUrl} className=" animate-shine bg-yellow-300 hover:bg-yellow-400 text-black py-2 text-center border-b border-blue-900/40 transition">
                  Nonton Live
                </a>
                <a href={currentMatch.bettingUrl} className="animate-shine bg-yellow-300 hover:bg-yellow-400 text-black py-2 text-center transition">
                  Betting
                </a>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* 2. LIVE NOTIFICATION WD */}
      <div
        className={`transition-all duration-500 transform ${
          isVisibleNotif ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
        }`}
      >
        <div className="flex items-center gap-3 bg-gradient-to-r from-red-950 via-red-900 to-red-950 border border-yellow-400/80 rounded-full py-2 px-4 shadow-[0_0_15px_rgba(220,38,38,0.5)] backdrop-blur-md">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-yellow-600 to-yellow-300 flex items-center justify-center shadow-inner border border-yellow-200 flex-shrink-0">
            <span className="text-xs">🎰</span>
          </div>

          <div className="text-white text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap">
            <span className="text-yellow-300 font-bold">{currentNotif.username}</span> Berhasil WD{' '}
            <span className="text-yellow-400 font-bold">Rp {currentNotif.amount}</span>
          </div>
        </div>
      </div>

    </div>
  );
}