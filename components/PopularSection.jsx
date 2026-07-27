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
      className="flex-shrink-0 w-36 sm:w-44 bg-[#111c38] border border-blue-500/40 rounded-2xl p-2.5 shadow-lg hover:border-yellow-400 transition-all duration-300 group cursor-pointer relative"
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
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchGamesFromSupabase() {
      try {
        // Diubah menjadi ascending: true agar berurutan normal (1, 2, 3...)
        const { data, error } = await supabase
          .from('popular_games')
          .select('*')
          .order('id', { ascending: true });

        if (error) throw error;

        console.log("Data sukses ditarik langsung dari Supabase:", data);
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

  return (
    <>
      <section id="section-populer" className="bg-transparent sm:bg-[#0b0e1b]/90 border-none sm:border sm:border-blue-900/50 p-2 sm:p-5 rounded-2xl shadow-none sm:shadow-2xl backdrop-blur-none sm:backdrop-blur-md">
        <h2 className="text-white font-bold text-base sm:text-lg mb-4 flex items-center gap-2 tracking-wide px-2 sm:px-0">
          <span className="text-orange-500">🔥</span> PALING POPULER
        </h2>

        <div className="flex overflow-x-auto gap-3 sm:gap-4 pb-2 scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-transparent">
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
                onLoginRequired={() => setShowModal(true)} 
              />
            ))
          )}
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
          <div className="bg-[#1a0033] border border-purple-600/60 rounded-2xl p-6 max-w-sm w-full text-center shadow-[0_0_40px_rgba(168,85,247,0.5)]">
            <div className="w-12 h-12 bg-yellow-400/20 text-yellow-400 rounded-full flex items-center justify-center mx-auto mb-3 text-xl border border-yellow-400/40">
              🔒
            </div>

            <h3 className="text-white font-bold text-lg mb-1">Akses Dibatasi</h3>
            <p className="text-gray-300 text-xs mb-6 leading-relaxed">
              Silahkan login terlebih dahulu untuk mulai memainkan game seru ini!
            </p>

            <div className="flex gap-3">
              <button 
                onClick={() => setShowModal(false)}
                className="flex-1 bg-transparent border border-purple-800 text-gray-300 hover:text-white hover:border-purple-600 font-semibold py-2.5 rounded-xl text-xs transition"
              >
                Tutup
              </button>
              <a 
                href="/login" 
                className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2.5 rounded-xl text-xs transition shadow-[0_0_15px_rgba(234,179,8,0.4)] flex items-center justify-center"
              >
                Login Sekarang
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}