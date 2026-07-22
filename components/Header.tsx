'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { supabase } from '../app/lib/supabase';
import { FaUser, FaKey, FaGift, FaHeadset, FaUserPlus, FaEllipsisH, FaEye } from 'react-icons/fa';

export default function Header() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkLoginStatus = () => {
      const user = localStorage.getItem('isLoggedIn');
      setIsLoggedIn(!!user);
    };
    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);
    return () => window.removeEventListener('storage', checkLoginStatus);
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
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', data.username);
      Swal.fire('Berhasil!', 'Selamat datang kembali!', 'success');
      router.push('/dashboard');
    }
  };

  return (
<header className="bg-[#0a020f] py-4 border-b border-purple-900 sticky top-0 z-45">
      <div className="max-w-[1200px] mx-auto px-4 flex justify-between items-center">
        {/* Logo (Posisinya di tengah khusus mobile menggunakan flex justify-center, kembali normal di desktop) */}
        <div className="w-full md:w-auto flex justify-center md:block text-2xl font-bold">
           <img 
             src="https://ik.imagekit.io/j72i7hsy1/download.png" 
             alt="Logo" 
             className="w-40 md:w-90 h-auto object-contain" 
           />
        </div>

        {isLoggedIn ? (
           <div className="flex-1 flex justify-center items-center gap-6">
             <span className="text-white font-medium text-base">
               Halo, <strong className="text-yellow-500">{localStorage.getItem('username') || 'Member'}</strong>
             </span>
             <button 
               onClick={() => { 
                 localStorage.removeItem('isLoggedIn'); 
                 localStorage.removeItem('username'); 
                 setIsLoggedIn(false); 
                 router.push('/'); 
               }} 
               className="bg-red-700 hover:bg-red-800 text-white px-5 py-1.5 rounded text-sm font-bold border border-white uppercase tracking-wider transition-colors"
             >
               Logout
             </button>
           </div>
        ) : (
          /* HANYA MUNCUL DI DESKTOP (md:flex), Hilang di Mobile */
          <div className="hidden md:flex flex-col gap-1 flex-1 max-w-xl ml-auto">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <FaUser className="absolute left-3 top-3 text-gray-400" />
                <input type="text" placeholder="Username" className="w-full pl-10 pr-3 py-2.5 rounded bg-white text-sm text-black" onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="relative flex-1">
                <FaKey className="absolute left-3 top-3 text-gray-400" />
                <input type="password" placeholder="Password" className="w-full pl-10 pr-10 py-2.5 rounded bg-white text-sm text-black" onChange={(e) => setPassword(e.target.value)} />
                <FaEye className="absolute right-3 top-3 text-gray-400 cursor-pointer" />
              </div>
              <button onClick={handleLogin} className="bg-yellow-600 hover:bg-yellow-500 text-black font-bold px-6 rounded uppercase">Login</button>
            </div>
            
            <div className="flex gap-3 mt-3">
              <button onClick={() => router.push('/promosi')} className="flex-1 flex items-center justify-center gap-2 bg-transparent border border-yellow-600 text-white py-3 rounded text-xs font-bold uppercase"><FaGift /> Promosi</button>
              <button onClick={() => router.push('/hubungi')} className="flex-1 flex items-center justify-center gap-2 bg-transparent border border-yellow-600 text-white py-3 rounded text-xs font-bold uppercase"><FaHeadset /> Hubungi</button>
              <button onClick={() => router.push('/register')} className="flex-1 flex items-center justify-center gap-2 bg-transparent border border-yellow-600 text-white py-3 rounded text-xs font-bold uppercase"><FaUserPlus /> Daftar</button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-transparent border border-yellow-600 text-white py-3 rounded text-xs font-bold uppercase"><FaEllipsisH /> Lainnya</button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}