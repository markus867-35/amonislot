'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import TombolLainnya from '@/components/TombolLainnya';
import { supabase } from '../app/lib/supabase';
import { FaUser, FaKey, FaGift, FaHeadset, FaUserPlus, FaEllipsisH, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Header() {
  const router = useRouter();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const checkLoginStatus = () => {
      // Cek semua kemungkinan kunci login agar sinkron dengan sistem lain
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

    // Event listener agar header otomatis tahu saat ada perubahan di localStorage
    window.addEventListener('storage', checkLoginStatus);
    
    // Custom event tambahan jika login terjadi di halaman yang sama tanpa refresh
    window.addEventListener('loginStateChanged', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('loginStateChanged', checkLoginStatus);
    };
  }, []);

  if (!mounted) return null; 

  const handleLogin = async () => {
    if (!username || !password) {
      Swal.fire('Error', 'Username dan password wajib diisi!', 'warning');
      return;
    }

    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('username', username)
      .eq('password', password)
      .single();

    if (error || !data) {
      Swal.fire('Gagal!', 'Username atau password salah!', 'error');
    } else {
      // Set semua jenis penanda login agar sinkron
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', data.username);
      
      setIsLoggedIn(true);
      
      // Beritahu komponen lain bahwa status login telah berubah
      window.dispatchEvent(new Event('loginStateChanged'));

      Swal.fire('Berhasil!', 'Selamat datang kembali!', 'success');
      router.push('/terms');
    }
  };

  return (
    <header className="bg-[#0a020f] py-5 border-b border-purple-900 sticky top-0 z-45">
      <div className="max-w-[1200px] mx-auto px-4 flex justify-between items-center relative">
        
        {/* 1. PENYEIMBANG KIRI: Hanya muncul di desktop saat sudah login agar logo persis di tengah */}
        {isLoggedIn && <div className="hidden md:block flex-1" />}

        {/* Logo */}
        <div className={` animate-shine w-full md:w-auto flex justify-center text-2xl font-bold ${isLoggedIn ? 'md:flex-1 md:justify-center' : ''}`}>
           <img 
             src="https://ik.imagekit.io/j72i7hsy1/download.png" 
             alt="Logo" 
             className="w-40 md:w-90 h-auto object-contain" 
           />
        </div>

        {/* KONDISI: Jika sudah login, tampilkan tombol logout (Hanya di Desktop, ditarik ke kanan) */}
        {isLoggedIn ? (
          <div className="hidden md:flex flex-1 justify-end items-center gap-6">

          </div>
        ) : (
          /* KONDISI: Form dibungkus dari paling luar area input login */
          <form 
            onSubmit={(e) => {
              e.preventDefault(); 
              handleLogin();      
            }} 
            className="hidden md:flex flex-col gap-1 flex-1 max-w-xl ml-auto"
          >
            <div className="flex gap-2">
              <div className="relative flex-1">
                <FaUser className="absolute left-3 top-3 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Username" 
                  className="w-full pl-10 pr-3 py-2.5 rounded bg-white text-sm text-black outline-none" 
                  onChange={(e) => setUsername(e.target.value)} 
                />
              </div>
              <div className="relative flex-1">
                <FaKey className="absolute left-3 top-3 text-gray-400" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Password" 
                  className="w-full pl-10 pr-10 py-2.5 rounded bg-white text-sm text-black outline-none" 
                  onChange={(e) => setPassword(e.target.value)} 
                />
                <div 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>

              {/* Tombol Login (Submit) */}
              <button 
                type="submit" 
                className="animate-shine bg-yellow-600 hover:bg-yellow-500 text-black font-bold px-6 py-2 rounded uppercase"
              >
                <span className="relative z-10">Login</span>
              </button>
            </div>
            
            <div className="flex gap-3 mt-3">
              <button 
                type="button"
                onClick={() => router.push('/promosi')} 
                className="animate-shine flex-1 flex items-center justify-center gap-2 bg-transparent border border-yellow-600 text-white py-3 rounded text-xs font-bold uppercase"
              >
                <span className="relative z-10 flex items-center gap-2"><FaGift /> Promosi</span>
              </button>
              <button 
                type="button"
                onClick={() => router.push('/hubungi')} 
                className="animate-shine flex-1 flex items-center justify-center gap-2 bg-transparent border border-yellow-600 text-white py-3 rounded text-xs font-bold uppercase"
              >
                <span className="relative z-10 flex items-center gap-2"><FaHeadset /> Hubungi</span>
              </button>
              <button 
                type="button"
                onClick={() => router.push('/register')} 
                className="animate-shine flex-1 flex items-center justify-center gap-2 bg-transparent border border-yellow-600 text-white py-3 rounded text-xs font-bold uppercase"
              >
                <span className="relative z-10 flex items-center gap-2"><FaUserPlus /> Daftar</span>
              </button>
              <div className="flex-1">
                <TombolLainnya />
              </div>
            </div>
          </form>
        )}

      </div>
    </header>
  );
} 