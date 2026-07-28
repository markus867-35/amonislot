'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function VirtualGamesSection() {
  const [virtualList, setVirtualList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVirtualGames();
  }, []);

  const fetchVirtualGames = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('virtual_games')
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;
      if (data) setVirtualList(data);
    } catch (error) {
      console.error('Gagal memuat virtual games:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePlay = (game) => {
    if (game.play_url) {
      window.open(game.play_url, '_blank');
    } else {
      alert(`Mengarahkan ke permainan ${game.name}...`);
    }
  };

  return (
    <section 
      id="section-virtual" 
      className="w-full bg-transparent sm:bg-[#070b19] border-none sm:border sm:border-blue-900/60 rounded-none sm:rounded-2xl p-4 sm:p-8 shadow-none sm:shadow-2xl text-white my-6"
    >
      
      {/* HEADER SECTION */}
      <div className="flex items-center gap-2 mb-6 border-b border-blue-900/40 pb-4">
        <span className="text-xl">🖥️</span>
        <h2 className="text-base sm:text-lg font-black tracking-wider uppercase text-white">
          VIRTUAL GAMES
        </h2>
      </div>

      {/* GRID KARTU VIRTUAL */}
      {loading ? (
        <div className="text-center py-10 text-gray-400 text-sm">Memuat data virtual games...</div>
      ) : virtualList.length === 0 ? (
        <div className="text-center py-10 text-gray-400 text-sm">Belum ada provider virtual terdaftar.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {virtualList.map((game) => (
            <div 
              key={game.id}
              className="group relative bg-[#0b1026] border-2 border-[#1e295b] hover:border-blue-400 rounded-3xl p-0 flex flex-col items-center shadow-2xl transition-all duration-300 hover:-translate-y-1.5"
            >


              {/* KONTAINER GAMBAR DENGAN TOMBOL OVERLAY */}
              <div className="w-full h-44 sm:h-48 rounded-2xl overflow-hidden border border-blue-500/30 bg-black/60 relative shadow-inner mb-3 flex items-center justify-center">
                <img 
                  src={game.image_url} 
                  alt={game.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <span className="bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-xs px-4 py-2 rounded-xl shadow-lg transform translate-y-2 group-hover:translate-y-0 transition duration-300">
                    MAIN SEKARANG
                  </span>
                </div>
              </div>

              {/* NAMA PROVIDER DIBAWAH KARTU */}
              <span className="text-xs sm:text-sm font-black tracking-wide text-gray-300 uppercase mt-1">
                {game.name}
              </span>
            </div>
          ))}
        </div>
      )}

    </section>
  );
}