'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Inisialisasi Supabase Client (Pastikan environment variable sudah diset di .env.local)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function SlotGamesSection() {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Ambil data dari Supabase saat komponen dimuat
  useEffect(() => {
    fetchSlotGames();
  }, []);

  const fetchSlotGames = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('slot_games')
        .select('*');

      if (error) throw error;
      if (data) setGames(data);
    } catch (error) {
      console.error('Gagal mengambil data slot:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter game berdasarkan input pencarian
  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
   <section id="section-slot" className="w-full bg-transparent md:bg-[#0b0e1b] p-4 sm:p-6 rounded-2xl shadow-2xl text-white">
      
      {/* HEADER & SEARCH BAR */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        
        {/* Judul Section */}
        <div className="flex items-center gap-2 text-yellow-400 font-extrabold text-lg sm:text-xl tracking-wider">
          <span className="text-2xl">🎰</span> SLOT GAMES
        </div>

        {/* Input Pencarian */}
        <div className="relative w-full sm:w-72">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400"></span>
          <input
            type="text"
            placeholder="Cari game..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black border border-purple-900/60 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors shadow-inner"
          />
          <span className="absolute right-3 top-2.5 text-gray-400 text-sm">🔍</span>
        </div>

      </div>

      {/* KONTEN GRID GAMES */}
      {loading ? (
        <div className="text-center py-10 text-gray-400 font-medium">Memuat data game...</div>
      ) : filteredGames.length === 0 ? (
        <div className="text-center py-10 text-gray-400 font-medium">Game tidak ditemukan.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-1">
          {filteredGames.map((game) => (
            <div 
              key={game.id} 
              /* Diubah agar background dan border transparan di mobile, lalu muncul saat di desktop (sm:) */
              className="group relative bg-[#0b1026] border-2 border-[#1e295b] hover:border-blue-400 rounded-3xl p-0 flex flex-col items-center shadow-2xl transition-all duration-300 hover:-translate-y-1.5"
            >
              
              {/* Bingkai Gambar / Banner Game */}
              <div className="w-full h-36 sm:h-40 rounded-xl overflow-hidden relative border border-blue-400/30 bg-black/40 flex items-center justify-center">
                <img 
                  src={game.image_url || '/placeholder-slot.png'} 
                  alt={game.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                
                {/* Tombol Overlay "Main Sekarang" ala Frame */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <a 
                    href={game.play_url || '#'}
                    className="bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-xs px-4 py-2 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition duration-300"
                  >
                    MAIN SEKARANG
                  </a>
                </div>
              </div>

              {/* Nama Provider / Game di Bawah */}
              <span className="mt-3 text-xs sm:text-sm font-bold tracking-wide text-gray-200 group-hover:text-yellow-300 transition text-center truncate w-full">
                {game.name}
              </span>

            </div>
          ))}
        </div>
      )}

    </section>
  );
}