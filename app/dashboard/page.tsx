'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase';// Pastikan path ini sesuai dengan helper supabase Anda
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
  
  const [activeCategory, setActiveCategory] = useState('populer');
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

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

// Fetch saldo langsung dari tabel 'members' kolom 'saldo' di Supabase
  const fetchBalance = async (currentUsername: string) => {
    if (!currentUsername || currentUsername === 'USER_400') return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('members') // Menggunakan tabel 'members'
        .select('saldo') // Menggunakan kolom 'saldo'
        .eq('username', currentUsername)
        .single();

      if (error) throw error;

      if (data) {
        setBalance(data.saldo);
      }
    } catch (error) {
      console.error('Gagal mengambil saldo dari Supabase:', error);
      setBalance(0);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (isAuthorized && username) {
      fetchBalance(username);
    }
  }, [isAuthorized, username]);

  // Handler tombol refresh saldo
  const handleRefreshBalance = async () => {
    setIsRefreshing(true);
    await fetchBalance(username);
  };

  if (!isAuthorized) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#0a020f] text-white p-2">
      
      <Categorylogin activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

      {/* SALDO & RIWAYAT */}
      {activeCategory === 'populer' && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          
{/* Kiri: Saldo */}
          <div className="bg-[#1a0525] p-6 md:p-10 rounded-xl border border-purple-900 shadow-lg">
            <p className="text-xs text-gray-400 mb-1 tracking-wider">
              SELAMAT DATANG, <span className="text-yellow-400 font-bold">{username.toUpperCase()}</span>
            </p>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-yellow-500">
                {loading ? (
                  "Loading..."
                ) : showBalance ? (
                  `Rp. ${balance !== null ? balance.toLocaleString('id-ID') : '0'}`
                ) : (
                  "Rp. ******"
                )}
              </h2>
              <button 
                onClick={() => setShowBalance(!showBalance)} 
                className="text-gray-400 hover:text-white transition-colors focus:outline-none p-1"
                title={showBalance ? "Sembunyikan Saldo" : "Lihat Saldo"}
              >
                {showBalance ? (
                  // Ikon Mata Terbuka (Tampil Saldo)
                  <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor" className="w-5 h-5">
                    <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"></path>
                  </svg>
                ) : (
                  // Ikon Mata Dicoret / Sembunyi (Sembunyikan Saldo)
                  <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor" className="w-5 h-5 opacity-60">
                    <path d="m793-120-44-44-67-67-85-85q-42 21-87 32t-90 11q-146 0-266-81.5T40-500q24-60 60-108.5T174-682L107-749l51-51 635 635-50 45ZM79-793l57 57q38-27 80-46.5T300-820q146 0 266 81.5T920-500q-36 91-99 162.5T677-217l-56-56q45-42 77-94.5T756-500q-54-137-174-218.5T300-800q-38 0-75 6t-73 17Zm401 393-84-84q10-15 25.5-23.5T480-520q20 0 35 7.5t24 20.5l-78 78Zm160 160-84-84q18-18 29-43t11-53q0-50-35-85t-85-35q-28 0-53 11t-43 29l-84-84q35-35 79-53t93-18q83 0 141.5 58.5T800-500q0 45-18 89t-53 79Z"></path>
                  </svg>
                )}
              </button>
            </div>
            <div className="flex gap-4">
              <Link href="/dashboard/deposit" className="flex-1">
                <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-2.5 rounded-lg font-bold transition-all shadow-md">
                  DEPOSIT
                </button>
              </Link>
              <Link href="/dashboard/wd" className="flex-1">
                <button className="w-full bg-red-600 hover:bg-red-500 text-white py-2.5 rounded-lg font-bold transition-all shadow-md">
                  WITHDRAW
                </button>
              </Link>
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