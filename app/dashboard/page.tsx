'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CategoryMenu from "@/components/CategoryMenu";

export default function DashboardPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // 1. Cek apakah user benar-benar sudah login berdasarkan token / status login
    const isLoggedIn = 
      localStorage.getItem('isLoggedIn') || 
      localStorage.getItem('token') || 
      localStorage.getItem('member_token') || 
      localStorage.getItem('supabase.auth.token');

    if (!isLoggedIn) {
      // Jika belum login, tendang balik ke beranda ("/")
      router.push('/');
    } else {
      // Jika sudah login, izinkan render halaman dashboard
      setIsAuthorized(true);
    }
  }, [router]);

  // Selama pengecekan atau jika belum ter-authorize, jangan tampilkan apa-apa untuk mencegah kedipan konten
  if (!isAuthorized) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#0a020f] text-white p-4">
      
      <CategoryMenu />

      {/* 2. AREA SALDO & RIWAYAT (Dua Kolom) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Kiri: Saldo */}
        <div className="bg-[#1a0525] p-6 rounded-xl border border-purple-900">
          <p className="text-xs text-gray-400 mb-1">
            SELAMAT DATANG, {localStorage.getItem('username')?.toUpperCase() || 'USER_400'}
          </p>
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-3xl font-bold text-yellow-500">Rp. ******</h2>
            <button className="text-gray-400">👁️</button>
          </div>
          <div className="flex gap-4">
            <button className="flex-1 bg-yellow-500 text-black py-2 rounded font-bold">DEPOSIT</button>
            <button className="flex-1 bg-red-600 text-white py-2 rounded font-bold">WITHDRAW</button>
          </div>
        </div>

        {/* Kanan: Riwayat */}
        <div className="bg-[#1a0525] p-6 rounded-xl border border-purple-900 flex flex-col items-center justify-center text-center">
          <div className="text-gray-500 mb-2 text-4xl">📄</div>
          <h3 className="font-bold text-gray-300">RIWAYAT PERMAINAN</h3>
          <p className="text-xs text-gray-500">Belum ada aktivitas terbaru.</p>
        </div>

      </section>
    </main>
  );
}