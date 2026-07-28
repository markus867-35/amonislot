'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function FishingGamesSection() {
  const [fishingGames, setFishingGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFishingGames();
  }, []);

  const fetchFishingGames = async () => {
    try {
      setLoading(true);
      // Mengambil data provider fishing dari database (sesuaikan nama tabel Anda)
      const { data, error } = await supabase
        .from('fishing_games')
        .select('*')
        .ilike('category', 'FISHING')
        .order('id', { ascending: true });

      if (error) throw error;
      if (data) setFishingGames(data);
    } catch (error) {
      console.error('Gagal memuat fishing games:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id= "section-fishing" className="w-full my-6 px-2 sm:px-0 bg-transparent md:bg-[#0b0e1b] text-black md:text-white">
      
      {/* CONTAINER UTAMA: Background transparan di mobile, ada background/border di desktop */}
      <div className="w-full max-w-7xl mx-auto rounded-3xl bg-transparent md:bg-[#070b19] md:border md:border-cyan-950/85 md:shadow-2xl md:p-6 lg:p-8">
        
        {/* HEADER TITLE */}
        <div className="flex items-center gap-2 mb-6 border-b border-cyan-900/40 pb-4">
          <span className="text-cyan-400 text-xl">🎣</span>
          <h2 className="text-white font-black text-base sm:text-lg tracking-wider uppercase">
            FISHING GAMES
          </h2>
        </div>

        {/* GRID CARD GAMES */}
        {loading ? (
          <div className="text-center py-10 text-gray-400 text-sm">Memuat game fishing...</div>
        ) : fishingGames.length === 0 ? (
          <div className="text-center py-10 text-gray-400 text-sm">Belum ada game fishing tersedia.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {fishingGames.map((game) => (
              <div 
                key={game.id} 
                className="group relative bg-[#0b1026] border-2 border-[#1e295b] hover:border-blue-400 rounded-3xl p-0 flex flex-col items-center shadow-2xl transition-all duration-300 hover:-translate-y-1.5"
                onClick={() => {
                  if (game.play_url) window.location.href = game.play_url;
                }}
              >
                {/* FRAME ORNAMEN GAME CARD (RESPONSIF & ELEGAN) */}
                <div className="w-full relative rounded-2xl overflow-hidden shadow-lg border border-cyan-500/30 bg-gradient-to-b from-[#101736] to-[#060919] p-2 sm:p-3 flex flex-col items-center">
                  
                  {/* GAMBAR BANNER / ASSET */}
                  <div className="w-full h-28 sm:h-36 rounded-xl overflow-hidden bg-black/40 shadow-inner flex items-center justify-center mb-2">
                    <img 
                      src={game.image_url} 
                      alt={game.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
                    />
                  </div>

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <span className="bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-xs px-4 py-2 rounded-xl shadow-lg transform translate-y-2 group-hover:translate-y-0 transition duration-300">
                    MAIN SEKARANG
                  </span>
                </div>
              

                  {/* NAMA PROVIDER / GAME DI BAWAH TOMBOL */}
                  <div className="mt-2 text-center">
                    <span className="text-xs sm:text-sm font-bold tracking-wide text-gray-300 group-hover:text-cyan-400 transition">
                      {game.name}
                    </span>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}