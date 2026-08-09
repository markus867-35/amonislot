'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { supabase } from '../lib/supabase';

export default function WapPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // State untuk menampung pasaran
  const [markets, setMarkets] = useState([
    { name: "TURKI", result: "Memuat...", liveDrawUrl: "https://turkipools.net/" },
    { name: "MAROKO", result: "Memuat...", liveDrawUrl: "https://marokopools.com/" },
  ]);

  // Fungsi untuk mengambil data dari API Internal Next.js
  useEffect(() => {
    const fetchLiveResults = async () => {
      try {
        const res = await fetch('/api/get-results');
        const json = await res.json();
        if (json.success && json.data) {
          setMarkets(json.data);
        }
      } catch (err) {
        console.error("Gagal sinkronisasi data:", err);
      }
    };

    fetchLiveResults();
    
    // Opsional: Update otomatis setiap 1 menit (60000 ms)
    const interval = setInterval(fetchLiveResults, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      Swal.fire('Error', 'Username dan password wajib diisi!', 'warning');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single();

      if (error || !data) {
        Swal.fire('Gagal!', 'Username atau password salah!', 'error');
      } else {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', data.username);
        Swal.fire('Berhasil!', 'Selamat datang kembali!', 'success');
        router.push('/dashboard');
      }
    } catch (err) {
      Swal.fire('Error', 'Terjadi kesalahan pada sistem.', 'error');
    }
  };

  const filteredMarkets = markets.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-transparent text-white flex flex-col items-center pb-12 select-none font-sans">
      <div className="w-full max-w-md mx-auto p-3 space-y-3">
        
        {/* Header Logo */}
        <div className="bg-[#0b1354] border border-blue-900 rounded-lg p-3 flex items-center justify-center shadow-md">
          <img 
            src="https://ik.imagekit.io/j72i7hsy1/download.png?updatedAt=1784604904347" 
            alt="Amonislot Logo" 
            className="h-10 w-auto object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          />
        </div>

        {/* Tombol Kontak */}
        <div className="grid grid-cols-2 gap-2">
          <a href="#livechat" className="flex items-center justify-center space-x-2 bg-[#0b1354] hover:bg-[#121c70] border border-blue-800 py-2.5 rounded text-xs font-bold text-amber-300 shadow transition">
            <span>💬</span><span>Livechat</span>
          </a>
          <a href="#telegram" className="flex items-center justify-center space-x-2 bg-[#0b1354] hover:bg-[#121c70] border border-blue-800 py-2.5 rounded text-xs font-bold text-amber-300 shadow transition">
            <span>✈️</span><span>Telegram</span>
          </a>
        </div>
        <div className="grid grid-cols-1">
          <a href="#whatsapp" className="flex items-center justify-center space-x-2 bg-[#0b1354] hover:bg-[#121c70] border border-blue-800 py-2.5 rounded text-xs font-bold text-amber-300 shadow transition">
            <span>🟢</span><span>Whatsapp</span>
          </a>
        </div>

        {/* Form Login */}
        <form onSubmit={handleLogin} className="space-y-2 pt-1">
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-white text-black placeholder-gray-400 text-xs px-3 py-2.5 rounded outline-none shadow-inner"
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white text-black placeholder-gray-400 text-xs px-3 py-2.5 rounded outline-none shadow-inner"
          />
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button type="submit" className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 rounded text-xs shadow cursor-pointer transition">
              Login
            </button>
            <button type="button" onClick={() => router.push('/register')} className="bg-[#0b1354] hover:bg-[#121c70] border border-blue-700 text-amber-300 font-bold py-2 rounded text-xs shadow cursor-pointer transition">
              Daftar
            </button>
          </div>
        </form>

        {/* Menu Beranda */}
        <Link href="/" className="block bg-[#0b1354] hover:bg-[#121c70] border border-blue-800 text-center py-2 rounded text-amber-400 font-bold text-sm shadow transition cursor-pointer">
          Beranda
        </Link>

        {/* Kolom Pencarian */}
        <div>
          <input
            type="text"
            placeholder="Cari pasar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white text-black placeholder-gray-400 text-xs px-3 py-2 rounded outline-none shadow-inner"
          />
        </div>

        {/* List Pasaran Togel Card */}
        <div className="space-y-3 pt-1">
          {filteredMarkets.length > 0 ? (
            filteredMarkets.map((market, index) => (
              <div key={index} className="bg-[#080e3b] border border-blue-900 rounded-lg p-3 text-center space-y-2 shadow-md">
                <h3 className="text-amber-400 font-black text-sm tracking-widest">{market.name}</h3>
                
                {/* Hasil / Result */}
                <div className="inline-block bg-blue-600 border border-blue-400 text-white font-black text-sm px-6 py-1 rounded shadow">
                  {market.result}
                </div>

                <div className="pt-1">
                  <a
                    href={market.liveDrawUrl}
                    className="block w-full bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold py-2 rounded text-xs shadow transition cursor-pointer text-center"
                  >
                    Live Draw
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-xs text-amber-200 py-4">Pasaran tidak ditemukan.</p>
          )}
        </div>

      </div>
    </div>
  );
}