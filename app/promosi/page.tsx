'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Tambahkan ini
import { supabase } from '../lib/supabase';
import Swal from 'sweetalert2'; // Tambahkan import di atas

export default function PromosiPage() {
  const promosi = [
    { title: "GARANSI KEKALAHAN 100%", image: "/promo1.jpg" },
    { title: "BONUS DOWNDLOAD APK", image: "/promo2.jpg" },
    { title: "BONUS HARIAN ALL GAME 5", image: "/promo3.jpg" },
    { title: "BONUS HARIAN TOGEL 5%", image: "/promo4.jpg" },
  ];

  return (
    <main className="min-h-screen bg-[#1a0525] p-6 md:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {promosi.map((item, index) => (
          <div key={index} className="bg-[#12031a] rounded-xl p-4 border border-purple-900 shadow-lg">
            {/* Gambar Promo */}
            <div className="w-full h-60 bg-gray-800 rounded-lg mb-4 overflow-hidden">
               {/* Ganti src dengan link gambar asli Anda */}
               <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            </div>

            {/* Informasi Promo */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-white font-bold text-lg">{item.title}</h2>
                <div className="flex gap-2 items-center mt-1">
                    <span className="bg-yellow-600 text-black text-[10px] font-bold px-2 py-0.5 rounded">PROMO AKTIF</span>
                    <span className="text-gray-400 text-xs">ABONGSLOT OFFICIAL</span>
                </div>
              </div>
              
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-2 rounded text-sm transition">
                AMBIL PROMO
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}