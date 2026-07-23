'use client';
import { usePathname } from 'next/navigation';

export default function Marquee() {
  const pathname = usePathname();

  // Jika URL saat ini adalah /promosi atau /hubungi, jangan tampilkan Marquee
  if (pathname === '/promosi' || pathname === '/hubungi') {
    return null; 
  }

  return (
    // py-3 untuk ukuran di HP, md:py-5 untuk ukuran di Desktop/Komputer
    <div className="w-full bg-[#5b32e6] py-0 md:py-5 px-4 overflow-hidden border-b border-purple-500 flex items-center shadow-inner">
      {/* Bagian Label "INFO:" dengan ikon yang ukurannya diperbesar */}
      <div className="flex items-center gap-2 shrink-0 z-10 font-bold text-white text-sm">
        <span className="text-xl">📢</span>
      </div>

      {/* Bagian teks pesan yang berjalan ke samping */}
      <div className="overflow-hidden w-full relative">
        <div className="text-white text-sm md:text-base font-medium whitespace-nowrap animate-marquee">
          MATI SENSASI JP PAUS DI GAME MAHJONG WAYS 2 & GATES OF OLYMPUS 1000! 💰 PROSES DEPOSIT & WITHDRAWAL KILAT KURANG DARI 2 MENIT!
        </div>
      </div>
    </div>
  );
}