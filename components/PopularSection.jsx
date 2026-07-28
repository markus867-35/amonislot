'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../app/lib/supabase';

// Komponen GameCard
function GameCard({ title, provider, image, gameUrl, onLoginRequired }) {
  const handlePlayClick = (e) => {
    e.preventDefault();
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; 

    if (!isLoggedIn) {
      onLoginRequired();
    } else {
      window.location.href = gameUrl || '#';
    }
  };

  return (
    <div 
      onClick={handlePlayClick}
      className="flex-shrink-0 w-36 sm:w-44 bg-[#111c38] border border-blue-500/40 rounded-3xl p-1 shadow-lg hover:border-blue-400 transition-all duration-300 group cursor-pointer relative"
    >
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-black/40 border border-blue-400/30">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />

        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="bg-yellow-400 text-black font-bold text-xs sm:text-sm px-4 py-2 rounded-xl shadow-[0_0_15px_rgba(234,179,8,0.6)] transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            MAIN 🎮
          </span>
        </div>
      </div>
      
      <div className="mt-2.5 px-1">
        <h3 className="text-white font-bold text-xs sm:text-sm truncate tracking-wide">
          {title}
        </h3>
        <p className="text-gray-400 text-[10px] sm:text-xs uppercase tracking-wider mt-0.5">
          {provider}
        </p>
      </div>
    </div>
  );
}

export default function PopularSection() {
  const [isMounted, setIsMounted] = useState(false);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedGameName, setSelectedGameName] = useState('');

  useEffect(() => {
    setIsMounted(true);
    async function fetchGamesFromSupabase() {
      try {
        const { data, error } = await supabase
          .from('popular_games')
          .select('*')
          .order('id', { ascending: true });

        if (error) throw error;
        if (Array.isArray(data)) {
          setGames(data);
        }
      } catch (error) {
        console.error("Gagal memuat data game populer:", error.message);
        setGames([]);
      } finally {
        setLoading(false);
      }
    }

    fetchGamesFromSupabase();
  }, []);

  // Mencegah perbedaan render server & client (Hydration Error)
  if (!isMounted) {
    return <div className="w-full my-6 min-h-[150px]" />;
  }

  return (
    <>
      <section id="section-populer" className="bg-transparent sm:bg-[#0b0e1b]/90 border-none sm:border sm:border-blue-900/50 p-2 sm:p-5 rounded-2xl shadow-none sm:shadow-2xl backdrop-blur-none sm:backdrop-blur-md">
        <h2 className="text-white font-bold text-base sm:text-lg mb-4 flex items-center gap-2 tracking-wide px-2 sm:px-0">
          <span className="text-orange-500">🔥</span> PALING POPULER
        </h2>

        <div className="bg-transparent flex overflow-x-auto gap-3 sm:gap-4 pb-2 scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-transparent">
          {loading ? (
            <div className="text-gray-400 text-xs py-4 px-2">Memuat data game...</div>
          ) : games.length === 0 ? (
            <div className="text-gray-400 text-xs py-4 px-2">Belum ada game populer.</div>
          ) : (
            games.map((game) => (
              <GameCard 
                key={game.id || game.title} 
                title={game.title} 
                provider={game.provider} 
                image={game.image} 
                gameUrl={game.game_url} 
                onLoginRequired={() => {
                  setSelectedGameName(game.title);
                  setShowModal(true);
                }} 
              />
            ))
          )}
        </div>
      </section>




{showModal && (
  <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn">
    <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xs sm:max-w-sm w-full text-center shadow-2xl">
      
      {/* Teks Pesan */}
      <p className="text-gray-700 font-medium text-sm sm:text-base leading-relaxed mb-6">
        Login terlebih dahulu untuk bermain <br />
        <span className="text-red-600 font-extrabold tracking-wide uppercase">
          {selectedGameName || 'GAME'}
        </span>
      </p>

      {/* Tombol Ok */}
      <button 
        onClick={() => setShowModal(false)}
        className="w-full bg-[#eab308] hover:bg-[#ca8a04] text-black font-bold py-3 rounded-xl text-base shadow-md transition-all"
      >
        Ok
      </button>

    </div>
  </div>
)}
    </>
  );
}