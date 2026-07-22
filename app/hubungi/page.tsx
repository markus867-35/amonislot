'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Tambahkan ini
import { supabase } from '../lib/supabase';
import Swal from 'sweetalert2'; // Tambahkan import di atas

export default function HubungiPage() {
  const kontak = [
    { nama: "WHATSAPP", sub: "CUSTOMER SERVICE 24/7", warna: "bg-green-500" },
    { nama: "TELEGRAM", sub: "OFFICIAL ABONGSLOT", warna: "bg-sky-500" },
    { nama: "FACEBOOK", sub: "FANSPAGE RESMI", warna: "bg-blue-600" },
    { nama: "INSTAGRAM", sub: "OFFICIAL INSTAGRAM", warna: "bg-pink-600" },
  ];

  return (
    <main className="min-h-screen bg-[#1a0525] p-10">
      {/* Container utama dengan grid 2 kolom */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {kontak.map((item) => (
          <div key={item.nama} className="bg-[#2d0a3d] p-5 rounded-2xl flex items-center justify-between border border-purple-800">
            
            {/* Bagian Kiri: Ikon, Nama, Subjudul */}
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${item.warna} rounded-xl`}></div>
              <div>
                <h3 className="text-white font-bold text-lg">{item.nama}</h3>
                <p className="text-gray-300 text-xs">{item.sub}</p>
              </div>
            </div>

            {/* Bagian Kanan: Tombol */}
            <button className="bg-[#1a0525] border border-purple-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-purple-900 transition">
              HUBUNGI KAMI
            </button>
            
          </div>
        ))}
      </div>
    </main>
  );
}