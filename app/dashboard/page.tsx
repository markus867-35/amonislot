'use client';
import { useRouter } from 'next/navigation';
import CategoryMenu from "@/components/CategoryMenu";

export default function DashboardPage() {
  const categories = [
    { name: 'POPULER', icon: '🔥' },
    { name: 'TOTO', icon: '🎱' },
    { name: 'SLOT', icon: '🎰' },
    { name: 'LIVE', icon: '♠️' },
    { name: 'SPORT', icon: '⚽' },
    { name: 'VIRTUAL', icon: '🎮' },
    { name: 'FISHING', icon: '🎣' },
    { name: 'CRASH', icon: '🕹️' },
  ];

  return (
    <main className="min-h-screen bg-[#0a020f] text-white p-4">
      
  <CategoryMenu />

      {/* 2. AREA SALDO & RIWAYAT (Dua Kolom) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Kiri: Saldo */}
        <div className="bg-[#1a0525] p-6 rounded-xl border border-purple-900">
          <p className="text-xs text-gray-400 mb-1">SELAMAT DATANG, USER_400</p>
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