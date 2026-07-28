'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../app/lib/supabase';

export default function LiveGamesSection() {
  const [isMounted, setIsMounted] = useState(false);
  const [liveGames, setLiveGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedGameName, setSelectedGameName] = useState('');

  useEffect(() => {
    setIsMounted(true);
    async function fetchLiveGames() {
      try {
        const { data, error } = await supabase
          .from('live_games')
          .select('*')
          .order('id', { ascending: true });

        if (error) throw error;
        if (Array.isArray(data)) {
          setLiveGames(data);
        }
      } catch (err) {
        console.error('Gagal memuat live games:', err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchLiveGames();
  }, []);

  const handleCardClick = (game) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setSelectedGameName(game.name || 'Live Game');

    if (!isLoggedIn) {
      setShowModal(true);
    } else {
      window.location.href = game.game_url || '#';
    }
  };

  if (!isMounted) {
    return <div className="w-full my-6 min-h-[200px]" />;
  }

  return (
    <section id="section-live" className="w-full bg-transparent sm:bg-[#070b19] border-none sm:border sm:border-blue-900/40 rounded-none sm:rounded-2xl p-4 sm:p-6 shadow-none sm:shadow-2xl text-white my-6">
      
      {/* Header Section */}
      <div className="flex items-center gap-2 text-white font-bold text-base sm:text-lg mb-4 pb-3 border-b border-blue-900/50">
        <span className="text-blue-400 text-xl">📺</span> LIVE GAMES
      </div>

      {/* Grid Content */}
      {loading ? (
        <div className="text-center py-10 text-gray-400 text-sm">Memuat live games...</div>
      ) : liveGames.length === 0 ? (
        <div className="text-center py-10 text-gray-400 text-sm">Belum ada live games tersedia.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-1">
          {liveGames.map((game) => (
            <div
              key={game.id}
              onClick={() => handleCardClick(game)}
              className="group relative bg-[#0b1026] border-2 border-[#1e295b] hover:border-blue-400 rounded-3xl p-0 flex flex-col items-center shadow-2xl transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* Bingkai Gambar / Banner */}
              <div className="w-full h-36 sm:h-44 rounded-xl overflow-hidden relative bg-black/50 border border-blue-400/20 flex items-center justify-center">
                <img
                  src={game.image_url || '/placeholder-live.png'}
                  alt={game.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />

                {/* Tombol Overlay "MAIN SEKARANG" */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <span className="bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-xs px-4 py-2 rounded-xl shadow-lg transform translate-y-2 group-hover:translate-y-0 transition duration-300">
                    MAIN SEKARANG
                  </span>
                </div>
              </div>

              {/* Nama Game di Bawah */}
              <span className="mt-3 text-xs sm:text-sm font-bold tracking-wide text-gray-200 group-hover:text-yellow-300 transition text-center truncate w-full">
                {game.name}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Modal Peringatan Login */}
      {showModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xs sm:max-w-sm w-full text-center shadow-2xl">
            
            <p className="text-gray-700 font-medium text-sm sm:text-base leading-relaxed mb-6">
              Login terlebih dahulu untuk bermain <br />
              <span className="text-red-600 font-extrabold tracking-wide uppercase">
                {selectedGameName}
              </span>
            </p>

            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-[#eab308] hover:bg-[#ca8a04] text-black font-bold py-3 rounded-xl text-base shadow-md transition-all"
            >
              Ok
            </button>

          </div>
        </div>
      )}

    </section>
  );
}