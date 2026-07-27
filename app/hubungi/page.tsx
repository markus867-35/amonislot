'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface KontakItem {
  id: number;
  name: string;
  link: string;
  icon?: string; // Menyimpan URL gambar atau path gambar
}

export default function HubungiPage() {
  const [kontakList, setKontakList] = useState<KontakItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Ambil data kontak dari Supabase
  const fetchKontak = async () => {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error('Gagal memuat kontak:', error);
    } else {
      setKontakList(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchKontak();

    // Realtime update: Jika admin menambah/mengubah data, halaman member otomatis terupdate
    const channel = supabase
      .channel('realtime-contacts-member')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'contacts' },
        () => {
          fetchKontak();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-white dark:bg-[#1a0525] p-10 flex items-center justify-center">
        <p className="text-gray-900 dark:text-white font-medium">Memuat layanan kontak...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-transparent md:bg-white md:dark:bg-[#1a0525] p-0 md:p-6 md:md:p-10 transition-colors duration-300">
      <div className="max-w-5xl mx-auto space-y-6">
        

        {/* Container Grid Kontak */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {kontakList.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 col-span-2 text-center py-10">
              Belum ada layanan kontak yang tersedia saat ini.
            </p>
          ) : (
            kontakList.map((item) => (
              <div 
                key={item.id} 
                className="bg-gray-50 dark:bg-[#2d0a3d] p-5 rounded-2xl flex items-center justify-between border border-gray-200 dark:border-purple-800 shadow-lg transition-colors duration-300"
              >
                
{/* Bagian Kiri: Gambar Ikon, Nama Layanan */}
<div className="flex items-center gap-4">
  <div className="w-12 h-12 bg-white dark:bg-[#1a0525] rounded-xl flex items-center justify-center overflow-hidden border border-purple-900 shadow-md">
    {item.icon ? (
      <img 
        src={item.icon} 
        alt={item.name} 
        className="w-8 h-8 object-contain" // Ukuran gambar diatur fix di w-8 h-8 agar pas di tengah
      />
    ) : (
      <span className="text-[10px] text-gray-400 text-center">No Icon</span>
    )}
  </div>
  <div>
    <h3 className="text-gray-900 dark:text-white font-bold text-base md:text-lg">
      {item.name || 'Layanan Admin'}
    </h3>
    <p className="text-gray-500 dark:text-gray-300 text-xs uppercase tracking-wider">
      Official Support 24/7
    </p>
  </div>
</div>

{/* Bagian Kanan: Tombol Hubungi dengan Efek Cahaya Berjalan */}
{/* Bagian Kanan: Tombol Hubungi dengan Efek Cahaya Berjalan dari Ujung ke Ujung */}
<a 
  href={item.link.startsWith('http') ? item.link : `https://${item.link}`}
  target="_blank"
  rel="noopener noreferrer"
  className="relative group overflow-hidden bg-gradient-to-r from-purple-900 to-indigo-900 border border-purple-500 hover:border-yellow-400 text-white px-5 py-3 rounded-xl text-xs font-bold transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(234,179,8,0.7)] text-center"
>
  {/* Efek Garis Cahaya Menyeluruh */}
  <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12"></div>
  
  <span className="relative z-10 tracking-wider">HUBUNGI KAMI</span>
</a>
                
              </div>
            ))
          )}
        </div>

      </div>
    </main>
  );
}