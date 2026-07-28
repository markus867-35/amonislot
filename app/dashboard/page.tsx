'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Categorylogin from "@/components/Categorylogin";
import TotoSection from "@/components/TotoSection";
import SlotGamesSection from "@/components/SlotGamesSection";
import LiveGamesSection from "@/components/LiveGamesSection";
import Suportsection from "@/components/Suportsection";
import Virtualsection from "@/components/Virtualsection";
import Fishingsection from "@/components/Fishingsection";
import Crashsection from "@/components/Crashsection";
import PopularSection from "@/components/PopularSection";

export default function DashboardPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  // PERBAIKAN DI SINI: Ubah default state dari 'popular' menjadi 'populer'
  const [activeCategory, setActiveCategory] = useState('populer');
  const [currentNav, setCurrentNav] = useState("PERMAINAN");

  const [username, setUsername] = useState('USER_400');
  const [showBalance, setShowBalance] = useState(false);

  useEffect(() => {
    const isLoggedIn = 
      localStorage.getItem('isLoggedIn') || 
      localStorage.getItem('token') || 
      localStorage.getItem('member_token') || 
      localStorage.getItem('supabase.auth.token');

    if (!isLoggedIn) {
      router.push('/');
    } else {
      setIsAuthorized(true);
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }
  }, [router]);

  if (!isAuthorized) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#0a020f] text-white p-2">
      
      <Categorylogin activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

      {/* SALDO & RIWAYAT: Sekarang akan muncul otomatis saat pertama buka atau saat 'populer' diklik */}
      {activeCategory === 'populer' && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          
          {/* Kiri: Saldo */}
          <div className="bg-[#1a0525] p-6 md:p-10 rounded-xl border border-purple-900 shadow-lg">
            <p className="text-xs text-gray-400 mb-1 tracking-wider">
              SELAMAT DATANG, <span className="text-yellow-400 font-bold">{username.toUpperCase()}</span>
            </p>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-yellow-500">
                {showBalance ? "Rp. 1.500.000" : "Rp. ******"}
              </h2>
              <button 
                onClick={() => setShowBalance(!showBalance)} 
                className="text-gray-400 hover:text-white transition-colors focus:outline-none"
                title={showBalance ? "Sembunyikan Saldo" : "Lihat Saldo"}
              >
                {showBalance ? "🙈" : "👁️"}
              </button>
            </div>
            <div className="flex gap-4">
              <button className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black py-2.5 rounded-lg font-bold transition-all shadow-md">
                DEPOSIT
              </button>
              <button className="flex-1 bg-red-600 hover:bg-red-500 text-white py-2.5 rounded-lg font-bold transition-all shadow-md">
                WITHDRAW
              </button>
            </div>
          </div>

          {/* Kanan: Riwayat */}
          <div className="bg-[#1a0525] p-6 rounded-xl border border-purple-900 flex flex-col items-center justify-center text-center shadow-lg">
            <div className="text-gray-500 mb-2 text-4xl">📄</div>
            <h3 className="font-bold text-gray-300 tracking-wide">RIWAYAT PERMAINAN</h3>
            <p className="text-xs text-gray-500 mt-1">Belum ada aktivitas terbaru.</p>
          </div>

        </section>
      )}

      {/* AREA KONTEN DINAMIS BERDASARKAN MENU YANG DIKLIK */}
      <div className="p-2 md:p-6 space-y-4 md:space-y-8">
        
        {activeCategory === 'populer' && (
          <>
            <PopularSection />
            <TotoSection />
          </>
        )}

        {activeCategory === 'slot' && <SlotGamesSection />}

        {activeCategory === 'live' && <LiveGamesSection />}

        {activeCategory === 'toto' && <TotoSection />}

        {activeCategory === 'virtual' && <Virtualsection />}
        {activeCategory === 'fishing' && <Fishingsection />}
        {activeCategory === 'crash' && <Crashsection />}
        {activeCategory === 'sport' && <Suportsection />}

      </div>
    </main>
  );
} 