'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const [username, setUsername] = useState('aurel123');
  const [rekInfo, setRekInfo] = useState('********3894 | DANA');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [balance, setBalance] = useState('0.00');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [copied, setCopied] = useState(false);

  const referralLink = `https://amonislot-xi.vercel.app/register?referral=${username}`;

  useEffect(() => {
    // Ambil data user dari localStorage jika ada
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  const handleRefreshBalance = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Simulasi update saldo
      setBalance('1.500.000');
      setIsRefreshing(false);
    }, 1000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

const handleLogout = () => {
    // 1. Hapus semua data sesi di localStorage
    localStorage.clear(); 
    
    // 2. Ubah state lokal menjadi false agar tombol langsung hilang
    setIsLoggedIn(false); 
    
    // 3. Kabari komponen lain (seperti header) bahwa status login telah berubah
    window.dispatchEvent(new Event('loginStateChanged'));
    
    // 4. Pindahkan halaman kembali ke home/login
    router.push('/');
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      const userLoggedIn = localStorage.getItem('isLoggedIn');
      const token = localStorage.getItem('token') || localStorage.getItem('member_token');
      
      if (userLoggedIn || token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();

    // Dengar perubahan status login
    window.addEventListener('storage', checkLoginStatus);
    window.addEventListener('loginStateChanged', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('loginStateChanged', checkLoginStatus);
    };
  }, []);

  return (
    <main className="min-h-screen md:bg-[#070b19] text-white p-3 md:p-6 flex justify-center">
      <div className="w-full max-w-[1200px] space-y-4">
        
{/* 1. HEADER PROFIL (Posisi di Tengah) */}
        <div className="bg-[#0b1329] border border-blue-900/40 rounded-2xl p-5 md:p-6 flex items-center justify-center gap-4 shadow-xl">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center font-black text-xl md:text-2xl shadow-inner border-2 border-white/20 shrink-0">
            {username.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h1 className="text-base md:text-xl font-bold tracking-wide flex items-center gap-2">
              Welcome, <span className="text-white">{username}</span>
            </h1>
            <p className="text-xs md:text-sm text-gray-400 mt-0.5">
              Rekening: <span className="text-gray-300 font-mono">{rekInfo}</span>
            </p>
          </div>
        </div>

        {/* 2. TOMBOL AKSI CEPAT (DOMPET, DEPOSIT, WITHDRAW, LOGOUT) */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
          
          {/* Dompet */}
          <div className="bg-gradient-to-b from-blue-700 to-blue-900 border border-blue-500/50 rounded-xl p-3 flex flex-col justify-between shadow-lg relative overflow-hidden">
            <div className="flex justify-between items-center text-xs text-blue-200">
              <span>Dompet</span>
              <button 
                onClick={handleRefreshBalance} 
                className={`transition-transform ${isRefreshing ? 'animate-spin' : 'hover:scale-110'}`}
                title="Refresh Saldo"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-refresh-cw block hover:text-playerTextAct">
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                  <path d="M21 3v5h-5"></path>
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                  <path d="M8 16H3v5"></path>
                </svg>
              </button>
            </div>
            <div className="text-lg md:text-xl font-black text-white mt-2 tracking-wide">
              {balance}
            </div>
          </div>

          {/* Deposit */}
          <button 
            onClick={() => router.push('/deposit')} 
            className="bg-gradient-to-b from-yellow-200 to-yellow-400 hover:from-yellow-300 hover:to-yellow-500 text-black font-extrabold rounded-xl p-2.5 md:p-3 flex flex-col md:flex-col items-center justify-center gap-0.5 md:gap-1 shadow-lg transition-transform active:scale-95 border border-yellow-100 h-20 md:h-24"
          >
            {/* Ikon SVG Deposit */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 -960 960 960" 
              className="w-6 h-6 md:w-7 md:h-7 fill-current"
            >
              <path d="M560-440q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM280-320q-33 0-56.5-23.5T200-400v-320q0-33 23.5-56.5T280-800h560q33 0 56.5 23.5T920-720v320q0 33-23.5 56.5T840-320H280Zm80-80h400q0-33 23.5-56.5T840-480v-160q-33 0-56.5-23.5T760-720H360q0 33-23.5 56.5T280-640v160q33 0 56.5 23.5T360-400Zm440 240H120q-33 0-56.5-23.5T40-240v-440h80v440h680v80ZM280-400v-320 320Z" />
            </svg>
            
            <span className="text-xs md:text-sm tracking-wide">Deposit</span>
          </button>

         {/* Withdraw */}
          <button 
            onClick={() => router.push('/dashboard/wd')} 
            className="bg-gradient-to-b from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white font-extrabold rounded-xl p-2.5 md:p-3 flex flex-col md:flex-col items-center justify-center gap-0.5 md:gap-1 shadow-lg transition-transform active:scale-95 border border-blue-400/40 h-20 md:h-24"
          >
            {/* Ikon SVG Withdraw */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 -960 960 960" 
              className="w-6 h-6 md:w-7 md:h-7 fill-current"
            >
              <path d="M440-280h80v-40h40q17 0 28.5-11.5T600-360v-120q0-17-11.5-28.5T560-520H440v-40h160v-80h-80v-40h-80v40h-40q-17 0-28.5 11.5T360-600v120q0 17 11.5 28.5T400-440h120v40H360v80h80v40ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-480H160v480Zm0 0v-480 480Z" />
            </svg>

            <span className="text-xs md:text-sm tracking-wide">Withdraw</span>
          </button>

{/* Logout (Hanya tampil di Desktop saat user sudah login) */}
{isLoggedIn && (
  <button 
    onClick={handleLogout} 
    className="hidden md:flex bg-gradient-to-b from-yellow-200 to-yellow-400 hover:from-yellow-300 hover:to-yellow-500 text-black font-extrabold rounded-xl p-2.5 md:p-3 flex-col md:flex-col items-center justify-center gap-0.5 md:gap-1 shadow-lg transition-transform active:scale-95 border border-yellow-100 h-20 md:h-24"
  >
    {/* Ikon SVG Log Out */}
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className="lucide lucide-log-out w-6 h-6 md:w-7 md:h-7"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
      <polyline points="16 17 21 12 16 7"></polyline>
      <line x1="21" x2="9" y1="12" y2="12"></line>
    </svg>

    <span className="text-xs md:text-sm tracking-wide">LOGOUT</span>
  </button>
)}      

        </div>

        {/* 3. LINK REFERRAL */}
        <div className="md:bg-[#0b1329] border border-blue-900/40 rounded-2xl p-4 md:p-5 grid grid-cols-1 md:grid-cols-2 gap-4 items-center shadow-xl">
          <div>
            <p className="text-xs text-blue-400 font-semibold mb-1.5">Link Referral</p>
            <div className="flex items-center bg-[#070b19] border border-blue-900 rounded-lg overflow-hidden px-3 py-1.5">
              <input 
                type="text" 
                readOnly 
                value={referralLink} 
                className="bg-transparent text-xs text-gray-300 w-full outline-none truncate font-mono"
              />
              <button 
                onClick={handleCopyLink}
                className="ml-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-xs px-3 py-1 rounded transition"
              >
                {copied ? 'DISALIN!' : 'SALIN'}
              </button>
            </div>
          </div>

          <div className="flex justify-between md:justify-end items-center bg-[#070b19]/60 border border-white/5 rounded-xl p-3 cursor-pointer hover:bg-[#070b19] transition">
            <span className="text-sm font-semibold text-gray-200">Daftar Referral</span>
            <span className="text-gray-400 text-lg">➔</span>
          </div>
        </div>

{/* 4. MENU RIWAYAT & PENGATURAN (GRID 2 KOLOM) */}
        <div className="md:bg-[#0b1329] border border-blue-900/40 rounded-2xl p-4 md:p-6 shadow-xl space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            
            {[
              { label: 'Riwayat Saldo', path: '/history/balance' },
              { label: 'Riwayat Deposit', path: '/history/deposit' },
              { label: 'Riwayat Withdraw', path: '/history/withdraw' },
              { label: 'Riwayat Bet Togel', path: '/history/bet-togel' },
              { label: 'Riwayat Keluaran', path: '/history/result' },
              { label: 'Ganti Password', path: '/settings/password' },
              { label: 'Memo', path: '/memo' },
            ].map((menu, idx) => (
              <div 
                key={idx}
                onClick={() => router.push(menu.path)}
                className="bg-[#070b19] hover:bg-blue-950/40 border border-blue-950 hover:border-blue-800/60 rounded-xl p-3.5 flex items-center justify-between cursor-pointer transition-all shadow-sm group relative overflow-hidden"
              >
                {/* Efek Kilau Menyapu Penuh */}
                <div className="absolute inset-0 -translate-x-full animate-[shimmerFull_2.5s_infinite] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none w-full"></div>

                <span className="text-xs md:text-sm font-semibold text-gray-300 group-hover:text-white transition relative z-10">
                  {menu.label}
                </span>
                <span className="text-gray-500 group-hover:text-blue-400 transition text-sm relative z-10">➔</span>
              </div>
            ))}

          </div>

        {/* TOMBOL LOGOUT KHUSUS MOBILE DENGAN EFEK KILAU MENYAPU PENUH */}
          <button 
            onClick={handleLogout}
            className="md:hidden w-full bg-gradient-to-b from-yellow-200 to-yellow-400 hover:from-yellow-300 hover:to-yellow-500 text-black font-extrabold rounded-xl p-3.5 flex items-center justify-center gap-2 shadow-lg transition-all border border-yellow-100 relative overflow-hidden"
          >
            {/* Lapisan Efek Kilau Menyapu Penuh */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmerFull_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none w-full"></div>

            {/* Ikon SVG Log Out */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="22" 
              height="22" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="lucide lucide-log-out relative z-10"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" x2="9" y1="12" y2="12"></line>
            </svg>

            <span className="text-xs md:text-sm tracking-wide relative z-10">LOGOUT</span>
          </button>
          
        </div>

      </div>
    </main>
  );
}