'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../app/lib/supabase';

export default function TotoSection() {
  const [isMounted, setIsMounted] = useState(false);
  const [totoList, setTotoList] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    async function fetchToto() {
      try {
        const { data, error } = await supabase
          .from('toto_games')
          .select('*')
          .order('id', { ascending: true });

        if (error) throw error;
        if (Array.isArray(data)) setTotoList(data);
      } catch (err) {
        console.error('Gagal memuat toto games:', err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchToto();
  }, []);

  // Mencegah error hydration saat render awal di server
  if (!isMounted) {
    return <div className="w-full my-6 min-h-[150px]" />;
  }

  const filteredToto = totoList.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="section-toto" className="w-full my-6 px-2 sm:px-0 bg-transparent md:bg-[#0b0e1b] text-black md:text-white">
      {/* Header & Search Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-white font-bold text-base sm:text-lg flex items-center gap-2 tracking-wide">
          <span className="text-blue-500">🎱</span> TOTO GAMES
        </h2>

        <div className="relative w-full sm:w-72">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            🔍
          </span>
          <input
            type="text"
            placeholder="Cari Pasaran..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-black border border-purple-900/60 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors shadow-inner"
          />
        </div>
      </div>

      {/* Grid Kartu Toto */}
      {loading ? (
        <div className="text-center py-8 text-gray-400 text-xs">Memuat pasaran toto...</div>
      ) : filteredToto.length === 0 ? (
        <div className="text-center py-8 text-gray-400 text-xs">Pasaran toto tidak ditemukan.</div>
      ) : (
       <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredToto.map((toto) => (
            <div
              key={toto.id}
              className="border bg-black border-purple-900/40 rounded-2xl p-4 shadow-xl hover:border-blue-400  hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden group flex flex-col items-center text-center"
            >
              {/* Background Gambar dengan Efek Zoom Halus saat di-hover */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: toto.bg_image ? `url('${toto.bg_image}')` : 'none',
                }}
              ></div>

              {/* Overlay Gelap Transparan (Dibuat pas agar gambar latar belakang tetap kelihatan jelas) */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#0e041d]/60 via-[#0b0216]/50 to-[#07010f]/70 pointer-events-none"></div>

              {/* Konten Utama Kartu */}
              <div className="relative z-10 w-full flex flex-col items-center">
                {/* Nama Pasaran */}
<h3 className="text-white font-extrabold text-sm sm:text-base tracking-wider mb-3 uppercase animate-shine relative overflow-hidden inline-block px-3 py-1 rounded-lg bg-purple-950/40 border border-purple-800/50">
  <span className="relative z-10">{toto.name}</span>
</h3>

                {/* Logo / Ikon Pasaran */}
                <div className="w-16 h-16 mb-3 flex items-center justify-center relative">
                  {toto.icon ? (
                    <img 
                      src={toto.icon} 
                      alt={toto.name} 
                      className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" 
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center text-lg shadow-inner">
                      🎱
                    </div>
                  )}
                </div>

                {/* Tanggal & Countdown / Jam */}
                <div className="mb-4 space-y-0.5">
                  <p className="text-gray-300 text-xs font-medium tracking-wide">
                    {toto.date || '26-Jul-2026'}
                  </p>
                  <p className="text-gray-400 text-[11px] font-mono tracking-widest">
                    {toto.close || '00:00:00'}
                  </p>
                  <p className="text-gray-400 text-[11px] font-mono tracking-widest">
                    {toto.open || '00:00:00'}
                  </p>
                </div>

                {/* Tombol / Badge Kode Kuning (Dengan Efek Kilau Berjalan) */}
                <div className="w-full bg-yellow-400 text-black font-extrabold py-2 rounded-xl text-sm sm:text-base tracking-widest mb-2 shadow-[0_0_12px_rgba(234,179,8,0.3)] animate-shine text-center">
                  {toto.code || toto.result}
                </div>

                {/* Tombol Riwayat (Dengan Efek Kilau Berjalan) */}
                <a
                  href={`/toto/riwayat/${toto.id}`}
                  className="w-full bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 text-white font-bold py-2 rounded-xl text-xs sm:text-sm tracking-wider mb-2 transition-all shadow-md flex items-center justify-center animate-shine"
                >
                  RIWAYAT
                </a>

                {/* Tombol Main (Dengan Efek Kilau Berjalan) */}
                <a
                  href={toto.game_url || '#'}
                  className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold py-2 rounded-xl text-xs sm:text-sm tracking-wider transition-all shadow-md flex items-center justify-center animate-shine"
                >
                  MAIN
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}