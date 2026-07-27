'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase';
import Swal from 'sweetalert2';
import { FaUser, FaKey, FaEye, FaEyeSlash, FaSpinner, FaCreditCard, FaTag, FaPhone } from 'react-icons/fa';

export default function RegisterPage() {
  const router = useRouter();
  
  // State untuk form registrasi
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    no_hp: '',
    bank: '',
    nama_rekening: '',
    nomor_rekening: '',
    kode_referral: ''
  });

  // State status pesan dan loading real-time
  const [usernameStatus, setUsernameStatus] = useState<{ text: string; available: boolean | null }>({ text: '', available: null });
  const [isValidatingUsername, setIsValidatingUsername] = useState(false);

  const [phoneStatus, setPhoneStatus] = useState<{ text: string; available: boolean | null }>({ text: '', available: null });
  const [isValidatingPhone, setIsValidatingPhone] = useState(false);

  const [accountStatus, setAccountStatus] = useState<{ text: string; available: boolean | null }>({ text: '', available: null });
  const [isValidatingAccount, setIsValidatingAccount] = useState(false);

  // State untuk login cepat (khusus mobile)
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // State untuk melihat password pada form registrasi
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const banks = ['BCA', 'BNI', 'BRI', 'MANDIRI', 'PERMATA', 'CIMB', 'DANA', 'OVO', 'LINK AJA', 'GOPAY', 'MAYBANK', 'BANK JAGO', 'DANAMON', 'SEABANK', 'JENIUS', 'SINARMAS', 'BANK NEO', 'BSI'];

  // Fungsi cek ketersediaan data ke database Supabase dengan efek loading
  const checkAvailability = async (field: string, value: string) => {
    if (!value.trim()) {
      if (field === 'username') { setUsernameStatus({ text: '', available: null }); setIsValidatingUsername(false); }
      if (field === 'no_hp') { setPhoneStatus({ text: '', available: null }); setIsValidatingPhone(false); }
      if (field === 'nomor_rekening') { setAccountStatus({ text: '', available: null }); setIsValidatingAccount(false); }
      return;
    }

    // Set status loading aktif
    if (field === 'username') setIsValidatingUsername(true);
    if (field === 'no_hp') setIsValidatingPhone(true);
    if (field === 'nomor_rekening') setIsValidatingAccount(true);

    const { data, error } = await supabase
      .from('members')
      .select('username')
      .eq(field, value);

    const isExists = data && data.length > 0;

    if (field === 'username') {
      setIsValidatingUsername(false);
      setUsernameStatus({
        text: isExists ? 'Username sudah ada' : 'Username tersedia',
        available: !isExists
      });
    } else if (field === 'no_hp') {
      setIsValidatingPhone(false);
      setPhoneStatus({
        text: isExists ? 'No. HP sudah terdaftar' : 'No. HP tersedia',
        available: !isExists
      });
    } else if (field === 'nomor_rekening') {
      setIsValidatingAccount(false);
      setAccountStatus({
        text: isExists ? 'Nomor rekening sudah terdaftar' : 'Nomor rekening tersedia',
        available: !isExists
      });
    }
  };

  // Fungsi proses login cepat
  const handleQuickLogin = async () => {
    if (!loginUsername || !loginPassword) {
      Swal.fire('Error', 'Username dan password wajib diisi!', 'warning');
      return;
    }

    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('username', loginUsername)
      .eq('password', loginPassword)
      .single();

    if (error || !data) {
      Swal.fire('Gagal!', 'Username atau password salah!', 'error');
    } else {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', data.username);
      window.dispatchEvent(new Event('loginStateChanged'));

      Swal.fire('Berhasil!', 'Selamat datang kembali!', 'success');
      router.push('/dashboard');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      Swal.fire('Error', 'Password tidak cocok!', 'warning');
      return;
    }

    if (usernameStatus.available === false || phoneStatus.available === false || accountStatus.available === false) {
      Swal.fire('Error', 'Periksa kembali data Anda yang sudah terdaftar!', 'error');
      return;
    }

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
        no_hp: formData.no_hp,
        bank_name: formData.bank,
        nama_rekening: formData.nama_rekening,
        nomor_rekening: formData.nomor_rekening,
        kode_referral: formData.kode_referral,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      Swal.fire({
        title: 'Berhasil!',
        text: 'Pendaftaran berhasil! Mengarahkan ke Syarat dan Ketentuan...',
        icon: 'success',
        confirmButtonText: 'Lanjut',
        allowOutsideClick: false
      }).then(() => {
        router.push('/terms');
      });
    } else {
      Swal.fire({
        title: 'Gagal!',
        text: 'Gagal daftar: ' + result.error,
        icon: 'error',
        confirmButtonText: 'Coba Lagi'
      });
    }
  };

  return (
    <main className="w-full bg-[#0f001a] min-h-screen pt-4 pb-20 flex flex-col items-center px-4 gap-4">
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

      {/* KOTAK 1: "SUDAH PUNYA AKUN?" - HANYA MUNCUL DI MOBILE */}
      <div className="bg-white w-full max-w-2xl p-6 md:p-8 rounded-lg shadow-lg flex flex-col gap-3 block md:hidden">
        <h2 className="text-center font-bold text-gray-800 text-sm md:text-base tracking-wider">
          SUDAH PUNYA AKUN?
        </h2>

        <div className="relative w-full">
          <FaUser className="absolute left-3.5 top-3.5 text-gray-400 text-sm" />
          <input 
            type="text" 
            placeholder="Username" 
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
            className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded text-sm text-black outline-none bg-white" 
          />
        </div>

        <div className="relative w-full">
          <FaKey className="absolute left-3.5 top-3.5 text-gray-400 text-sm" />
          <input 
            type={showLoginPassword ? "text" : "password"} 
            placeholder="Password" 
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded text-sm text-black outline-none bg-white" 
          />
          <div 
            onClick={() => setShowLoginPassword(!showLoginPassword)} 
            className="absolute right-3.5 top-3.5 text-gray-400 cursor-pointer text-sm"
          >
            {showLoginPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>

        <button 
          type="button" 
          onClick={handleQuickLogin}
          className="glossy-button w-full bg-[#facc15] hover:bg-yellow-500 text-black font-extrabold py-2.5 rounded uppercase tracking-wider text-sm shadow-sm relative"
        >
          <span className="relative z-10">LOGIN</span>
        </button>

        <p className="text-center text-xs text-gray-500 mt-0.5">
          Belum punya akun? Daftar di bawah ini
        </p>
      </div>

      {/* KOTAK 2: FORM REGISTRASI UTAMA */}
      <div className="bg-white w-full max-w-2xl p-6 md:p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-black">REGISTRASI</h1>
        <form onSubmit={handleRegister} className="flex flex-col gap-4 text-black">
          
         {/* Username dengan Cek Realtime, Loading & Ikon Kiri */}
          <div>
            <label className="block text-sm font-semibold">Username *</label>
            <div className="relative w-full">
              <FaUser className="absolute left-3.5 top-3.5 text-gray-400 text-sm" />
              <input 
                type="text" 
                placeholder="Username" 
                value={formData.username}
                onChange={(e) => {
                  const val = e.target.value;
                  setFormData({...formData, username: val});
                  checkAvailability('username', val);
                }} 
                className="w-full pl-10 pr-3 border p-2 rounded text-sm" 
                required 
              />
            </div>
            {isValidatingUsername && (
              <p className="text-xs mt-1 text-gray-500 flex items-center gap-1 font-semibold">
                <FaSpinner className="animate-spin text-yellow-600" /> Memeriksa username...
              </p>
            )}
            {!isValidatingUsername && usernameStatus.text && (
              <p className={`text-xs mt-1 font-semibold ${usernameStatus.available ? 'text-green-600' : 'text-red-600'}`}>
                {usernameStatus.text}
              </p>
            )}
          </div>

          {/* Password dengan Ikon Kiri & Kanan (Mata) */}
          <div>
            <label className="block text-sm font-semibold">Password *</label>
            <div className="relative w-full">
              <FaKey className="absolute left-3.5 top-3.5 text-gray-400 text-sm" />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
                className="w-full pl-10 pr-10 border p-2 rounded text-sm" 
                required 
              />
              <div 
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute right-3.5 top-3.5 text-gray-400 cursor-pointer text-sm"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          {/* Konfirmasi Password dengan Ikon Kiri & Kanan (Mata) */}
          <div>
            <label className="block text-sm font-semibold">Konfirmasi Password *</label>
            <div className="relative w-full">
              <FaKey className="absolute left-3.5 top-3.5 text-gray-400 text-sm" />
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                placeholder="Konfirmasi Password" 
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} 
                className="w-full pl-10 pr-10 border p-2 rounded text-sm" 
                required 
              />
              <div 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                className="absolute right-3.5 top-3.5 text-gray-400 cursor-pointer text-sm"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          {/* No. HP dengan Cek Realtime, Loading & Ikon Kiri */}
          <div>
            <label className="block text-sm font-semibold">No. HP *</label>
            <div className="relative w-full">
              <FaPhone className="absolute left-3.5 top-3.5 text-gray-400 text-sm" />
              <input 
                type="text" 
                placeholder="08xxxxxxxxxxx" 
                value={formData.no_hp}
                onChange={(e) => {
                  const val = e.target.value;
                  setFormData({...formData, no_hp: val});
                  checkAvailability('no_hp', val);
                }} 
                className="w-full pl-10 pr-3 border p-2 rounded text-sm" 
                required 
              />
            </div>
            {isValidatingPhone && (
              <p className="text-xs mt-1 text-gray-500 flex items-center gap-1 font-semibold">
                <FaSpinner className="animate-spin text-yellow-600" /> Memeriksa No. HP...
              </p>
            )}
            {!isValidatingPhone && phoneStatus.text && (
              <p className={`text-xs mt-1 font-semibold ${phoneStatus.available ? 'text-green-600' : 'text-red-600'}`}>
                {phoneStatus.text}
              </p>
            )}
          </div>
              
          {/* Bank */}
          <div>
            <label className="block text-sm font-semibold mb-2">Bank *</label>
            <div className="grid grid-cols-3 gap-2">
              {banks.map(bank => (
                <button key={bank} type="button" onClick={() => setFormData({...formData, bank})} className={`p-2 border rounded text-xs transition-colors ${formData.bank === bank ? 'bg-yellow-500 text-white font-bold border-yellow-500' : 'bg-gray-100 text-black hover:bg-gray-200'}`}>
                  {bank}
                </button>
              ))}
            </div>
          </div>

{/* Nama Rekening */}
          <div>
            <label className="block text-sm font-semibold">Nama Rekening *</label>
            <div className="relative w-full">
              <FaUser className="absolute left-3.5 top-3.5 text-gray-400 text-sm" />
              <input 
                type="text" 
                placeholder="Nama pemilik rekening" 
                value={formData.nama_rekening}
                onChange={(e) => setFormData({...formData, nama_rekening: e.target.value})} 
                className="w-full pl-10 pr-3 border p-2 rounded text-sm" 
                required 
              />
            </div>
          </div>

          {/* Nomor Rekening dengan Cek Realtime, Loading & Ikon Kiri */}
          <div>
            <label className="block text-sm font-semibold">Nomor Rekening *</label>
            <div className="relative w-full">
              <FaCreditCard className="absolute left-3.5 top-3.5 text-gray-400 text-sm" />
              <input 
                type="text" 
                placeholder="Nomor Rekening" 
                value={formData.nomor_rekening}
                onChange={(e) => {
                  const val = e.target.value;
                  setFormData({...formData, nomor_rekening: val});
                  checkAvailability('nomor_rekening', val);
                }} 
                className="w-full pl-10 pr-3 border p-2 rounded text-sm" 
                required 
              />
            </div>
            {isValidatingAccount && (
              <p className="text-xs mt-1 text-gray-500 flex items-center gap-1 font-semibold">
                <FaSpinner className="animate-spin text-yellow-600" /> Memeriksa nomor rekening...
              </p>
            )}
            {!isValidatingAccount && accountStatus.text && (
              <p className={`text-xs mt-1 font-semibold ${accountStatus.available ? 'text-green-600' : 'text-red-600'}`}>
                {accountStatus.text}
              </p>
            )}
          </div>

          {/* Kode Referral */}
          <div>
            <label className="block text-sm font-semibold">Kode Referral</label>
            <div className="relative w-full">
              <FaTag className="absolute left-3.5 top-3.5 text-gray-400 text-sm" />
              <input 
                type="text" 
                placeholder="Masukkan kode jika ada" 
                value={formData.kode_referral}
                onChange={(e) => setFormData({...formData, kode_referral: e.target.value})} 
                className="w-full pl-10 pr-3 border p-2 rounded text-sm" 
              />
            </div>
          </div>
          
          <button type="submit" className="glossy-button bg-yellow-500 hover:bg-yellow-600 text-white font-bold p-3 rounded mt-4 uppercase tracking-wider relative">
            <span className="relative z-10">Register</span>
          </button>
        </form>
      </div>

    </main>
  );
}