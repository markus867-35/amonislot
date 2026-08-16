'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../app/lib/supabase';

export default function TotoSection() {
  const [isMounted, setIsMounted] = useState(false);
  const [totoList, setTotoList] = useState([]);
  const [resultsMap, setResultsMap] = useState({}); // State untuk menyimpan data result per pasaran
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Fungsi untuk mengambil data result dari tabel 'togel_result'
const fetchResults = async () => {
    try {
      const { data, error } = await supabase
        .from('togel_results')
        .select('*');

      if (error) throw error;
      
      if (Array.isArray(data)) {
        const map = {};
        data.forEach((item) => {
          // Mencocokkan key berdasarkan kolom 'pasaran' di tabel togel_results
          map[item.pasaran] = item; 
        });
        setResultsMap(map);
      }
    } catch (err) {
      console.error('Gagal memuat togel result:', err.message);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    
    async function fetchTotoAndResults() {
      try {
        // 1. Ambil data utama dari toto_games
        const { data: totoData, error: totoError } = await supabase
          .from('toto_games')
          .select('*')
          .order('id', { ascending: true });

        if (totoError) throw totoError;
        if (Array.isArray(totoData)) setTotoList(totoData);

        // 2. Ambil data result dari tabel kedua (togel_result)
        await fetchResults();

      } catch (err) {
        console.error('Gagal memuat data:', err.message);
      } finally {
        setLoading(false);
      }
    }

    // Panggil fetch data awal
    fetchTotoAndResults();

    // SETUP REALTIME SUPABASE UNTUK TOTO GAMES
    const channelToto = supabase
      .channel('realtime-toto-games')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'toto_games' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setTotoList((prev) => [...prev, payload.new].sort((a, b) => a.id - b.id));
          } else if (payload.eventType === 'UPDATE') {
            setTotoList((prev) =>
              prev.map((item) => (item.id === payload.new.id ? payload.new : item))
            );
          } else if (payload.eventType === 'DELETE') {
            setTotoList((prev) => prev.filter((item) => item.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    // SETUP REALTIME SUPABASE UNTUK TOGEL RESULT (Opsional agar result ikut live update)
    const channelResult = supabase
      .channel('realtime-togel-result')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'togel_result' },
        () => {
          fetchResults(); // Refresh data result otomatis jika ada perubahan
        }
      )
      .subscribe();

    // Cleanup subscription saat komponen di-unmount
    return () => {
      supabase.removeChannel(channelToto);
      supabase.removeChannel(channelResult);
    };
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
       <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredToto.map((toto) => {
            // Ambil data result berdasarkan nama pasaran
            const gameResult = resultsMap[toto.name] || {};
            // Mengambil nilai dari kolom 'result' sesuai struktur tabel database Anda
            const displayResult = gameResult.result || '****';

            return (
              <div
                key={toto.id}
                className="border bg-black border-purple-900/40 rounded-2xl p-5 shadow-xl hover:border-blue-400 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden group flex flex-col items-center text-center"
              >
                {/* Background Gambar dengan Efek Zoom Halus saat di-hover */}
<div className="absolute inset-0 overflow-hidden pointer-events-none">
  {/* Background untuk Mobile (Layar HP) */}
  <div
    className="absolute inset-0 bg-no-repeat transition-all duration-500 group-hover:scale-110 group-hover:brightness-125 md:hidden"
    style={{
      backgroundImage: toto.bg_image ? `url('${toto.bg_image}')` : 'none',
      backgroundSize: '150% auto',        /* Sesuaikan ukuran untuk HP di sini */
      backgroundPosition: 'center -20px',  /* Sesuaikan posisi untuk HP di sini */
    }}
  ></div>

  {/* Background untuk Desktop (Layar Komputer) */}
<div
  className="absolute inset-0 bg-no-repeat transition-all duration-500 group-hover:scale-110 group-hover:brightness-125 group-hover:contrast-110 hidden md:block"
  style={{
    backgroundImage: toto.bg_image ? `url('${toto.bg_image}')` : 'none',
    backgroundSize: '110% auto',        /* Sesuaikan ukuran untuk Desktop di sini */
    backgroundPosition: 'center -25px',  /* Sesuaikan posisi untuk Desktop di sini */
  }}
></div>
</div>
                {/* Overlay Gelap Transparan */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0e041d]/60 via-[#0b0216]/50 to-[#07010f]/70 pointer-events-none"></div>

                {/* Konten Utama Kartu */}
                <div className="relative z-10 w-full flex flex-col items-center">
                  {/* Nama Pasaran */}
                  <h3 className="text-white font-extrabold text-sm sm:text-base tracking-wider mb-3 -mt-3 uppercase animate-shine relative overflow-hidden inline-block px-5 py-0 rounded-lg bg-purple-950/40 border border-purple-800/50">
                    <span className="relative z-10">{toto.name}</span>
                  </h3>

                  {/* Logo / Ikon Pasaran */}
                  <div className="w-16 h-16 mb-3 flex items-center justify-center relative">
         

                  </div>

                  {/* Tanggal */}
                  <div className="mb-4">
                    <p className="text-gray-300 text-xs font-medium tracking-wide">
                      {toto.date || '26-Jul-2026'}
                    </p>
                  </div>

                  {/* Kotak Kuning Menampilkan Result dari kolom 'result' tabel togel_results */}
                  <div className="w-full bg-yellow-400 mt-10 text-black font-extrabold py-1 rounded-xl text-sm sm:text-base tracking-widest mb-2 shadow-[0_0_12px_rgba(234,179,8,0.3)] animate-shine text-center font-mono">
                    {displayResult}
                  </div>

<a
  href={`/toto/riwayat/${encodeURIComponent(toto.name.toLowerCase().replace(/\s+/g, '-'))}`}
  className="w-full bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 text-white font-bold py-1 rounded-xl text-xs sm:text-sm tracking-wider mb-2 transition-all shadow-md flex items-center justify-center"
>
  RIWAYAT
</a>

                  {/* Tombol Main */}
                  <a
                    href={toto.game_url || '#'}
                    className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold py-1 rounded-xl text-xs sm:text-sm tracking-wider transition-all shadow-md flex items-center justify-center animate-shine"
                  >
                    MAIN
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}