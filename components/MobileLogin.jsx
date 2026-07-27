'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { supabase } from '../app/lib/supabase';
import { FaUser, FaKey, FaEye } from 'react-icons/fa';

export default function MobileLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', data.username);
      Swal.fire('Berhasil!', 'Selamat datang kembali!', 'success');
      router.push('/dashboard');
    }
  };

return (
    <div className="block md:hidden bg-[#0a020f] p-4 border-b border-purple-900">
      <style jsx>{`
        @keyframes shineMove {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(25deg);
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(25deg);
          }
        }

        .glossy-button {
          position: relative;
          overflow: hidden;
        }

        .glossy-button::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            135deg,
            transparent 0%,
            transparent 48%,
            rgba(255, 255, 255, 0.25) 50%,
            transparent 52%,
            transparent 100%
          );
          pointer-events: none;
          animation: shineMove 4s ease-in-out infinite;
        }
      `}</style>

      <div className="flex flex-col gap-3 max-w-xl mx-auto">
        {/* Input Username */}
        <div className="relative w-full">
          <FaUser className="absolute left-3 top-3.5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Username" 
            className="w-full pl-10 pr-3 py-3 rounded bg-white text-sm text-black outline-none" 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>
        
        {/* Input Password & Toggle Mata */}
        <div className="relative w-full">
          <FaKey className="absolute left-3 top-3.5 text-gray-400" />
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Password" 
            className="w-full pl-10 pr-10 py-3 rounded bg-white text-sm text-black outline-none" 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <div 
            onClick={() => setShowPassword(!showPassword)} 
            className="absolute right-3 top-3.5 text-gray-400 cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>

        {/* Tombol Login dengan Efek Kilau */}
        <button 
          onClick={handleLogin} 
          className="glossy-button w-full bg-[#d4af37] hover:bg-yellow-500 text-black font-extrabold py-3 rounded uppercase tracking-wider text-sm shadow-md relative"
        >
          <span className="relative z-10">Login</span>
        </button>

        {/* Tombol Daftar dengan Efek Kilau */}
        <button 
          onClick={() => router.push('/register')} 
          className="glossy-button w-full bg-[#1c0b2b] hover:bg-[#28103d] text-white border border-purple-500 font-bold py-3 rounded uppercase tracking-wider text-sm shadow-md relative"
        >
          <span className="relative z-10">Daftar</span>
        </button>
      </div>
    </div>
  );
}