'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import { supabase } from '../lib/supabase';
import Swal from 'sweetalert2'; 
import { FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function PromosiPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [promosi, setPromosi] = useState<{ id: number; title: string; image: string; description: string }[]>([]);
  const [selectedPromo, setSelectedPromo] = useState<{ id: number; title: string; image: string; description: string } | null>(null);

  useEffect(() => {
    setMounted(true);
    const checkLoginStatus = () => {
      const userLoggedIn = localStorage.getItem('isLoggedIn');
      const token = 
        localStorage.getItem('token') || 
        localStorage.getItem('member_token') || 
        localStorage.getItem('supabase.auth.token') ||
        localStorage.getItem('access_token');

      if (userLoggedIn || token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);
    window.addEventListener('loginStateChanged', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('loginStateChanged', checkLoginStatus);
    };
  }, []);

  const fetchPromotions = async () => {
    const { data, error } = await supabase
      .from('promotions')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error('Gagal memuat promo:', error);
    } else {
      setPromosi(data || []);
    }
  };

  useEffect(() => {
    fetchPromotions();
    const channel = supabase
      .channel('realtime-promotions')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'promotions' },
        () => {
          fetchPromotions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (!mounted) return null;

  const handleAmbilPromo = (title: string) => {
    const token = 
      typeof window !== 'undefined' && 
      (localStorage.getItem('token') || 
       localStorage.getItem('member_token') || 
       localStorage.getItem('supabase.auth.token') ||
       localStorage.getItem('isLoggedIn'));

    if (!token) {
      Swal.fire({
        icon: 'warning',
        title: 'Harap Login Terlebih Dahulu',
        text: 'Anda harus masuk akun untuk mengambil bonus promo ini!',
        confirmButtonColor: '#eab308',
        confirmButtonText: 'Login Sekarang',
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/login');
        }
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: `Promo "${title}" berhasil diklaim. Silakan cek akun Anda.`,
        confirmButtonColor: '#eab308',
      });
      setSelectedPromo(null);
    }
  };

  return (
    <main className={`bg-transparent md:bg-[#1a0525] w-full p-0 md:p-6 transition-all min-h-screen ${
      !isLoggedIn ? 'pb-40' : 'pb-24 md:pb-20'
    }`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 max-w-6xl mx-auto">
        {promosi.length === 0 ? (
          <p className="text-white text-center col-span-2 py-10">Belum ada promo yang tersedia.</p>
        ) : (
          promosi.map((item) => (
            <div key={item.id} className="bg-[#12031a] rounded-xl p-3 md:p-4 border border-purple-900 shadow-lg flex flex-col justify-between">
              <div>
                <div className="w-full h-36 md:h-60 bg-gray-800 rounded-lg mb-3 md:mb-4 overflow-hidden">
                   <img src={item.image} alt={item.title} className="w-full h-full object-cover object-center" />
                </div>
                <h2 className="text-white font-bold text-sm md:text-lg mb-1">{item.title}</h2>
                <p className="text-gray-400 text-xs line-clamp-2 mb-3">
                  {item.description || 'Klik info lebih lanjut untuk melihat syarat & ketentuan promo.'}
                </p>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-purple-900/50">
                <div className="flex gap-2 items-center">
                    <span className="bg-yellow-600 text-black text-[9px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 rounded">PROMO AKTIF</span>
                    <span className="text-gray-400 text-[10px] md:text-xs">ABONGSLOT OFFICIAL</span>
                </div>
                <button 
                  onClick={() => setSelectedPromo(item)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-4 md:px-5 py-2 rounded text-xs md:text-sm transition cursor-pointer shadow"
                >
                  Info Lebih Lanjut
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* --- MODAL DENGAN FRAMER MOTION (BISA DI-DRAG NAIK TURUN) --- */}
      {/* --- MODAL DENGAN FRAMER MOTION & JARAK DI ATAS BOTTOM NAV --- */}
      <AnimatePresence>
        {selectedPromo && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm pb-16 md:pb-0">
            
            {/* Backdrop untuk klik luar */}
            <div 
              className="absolute inset-0" 
              onClick={() => setSelectedPromo(null)}
            ></div>

            {/* Kotak Modal Utama */}
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0.05, bottom: 0.5 }}
              onDragEnd={(e, info) => {
                if (info.offset.y > 100) {
                  setSelectedPromo(null);
                }
              }}
              className="relative bg-white text-gray-900 w-full max-w-6xl rounded-t-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] z-10 cursor-grab active:cursor-grabbing"
            >
              
              {/* Garis kecil di atas (Indikator tarik) */}
              <div className="w-full flex justify-center pt-3 pb-2 bg-white">
                <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
              </div>

              {/* Tombol Close */}
              <div className="relative px-6 pt-1 pb-1 flex justify-end">
                <button 
                  onClick={() => setSelectedPromo(null)}
                  className="absolute right-4 top-1 text-gray-400 hover:text-gray-700 p-1 rounded-full transition cursor-pointer z-20"
                >
                  <FaTimes size={18} />
                </button>
              </div>

              {/* Konten S&K */}
              <div className="px-6 md:px-8 py-2 overflow-y-auto flex-1 space-y-4 cursor-default" onPointerDown={(e) => e.stopPropagation()}>
                <h2 className="text-lg md:text-xl font-extrabold tracking-wide uppercase text-gray-900">
                  {selectedPromo.title}
                </h2>

                <div className="text-xs md:text-sm text-gray-800 whitespace-pre-line leading-relaxed pb-4">
                  {selectedPromo.description ? (
                    selectedPromo.description
                  ) : (
                    <p className="italic text-gray-500">Tidak ada syarat & ketentuan khusus yang dituliskan.</p>
                  )}
                </div>
              </div>

              {/* Footer Tombol */}
              <div className="p-4 bg-white border-t border-gray-200 flex gap-3 z-20 cursor-default" onPointerDown={(e) => e.stopPropagation()}>
                <button 
                  onClick={() => setSelectedPromo(null)}
                  className="w-1/2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg text-sm transition cursor-pointer shadow-sm text-center"
                >
                  Tutup
                </button>
                <button 
                  onClick={() => handleAmbilPromo(selectedPromo.title)}
                  className="w-1/2 bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-bold py-3 rounded-lg text-sm transition shadow-sm cursor-pointer text-center"
                >
                  Gabung Sekarang
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}