'use client';
import { useState } from 'react';

export default function WithdrawPage() {
  const [nominal, setNominal] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Data member terdaftar
  const memberData = {
    namaRekening: 'Muhamad Bayu pratama',
    nomorRekening: '********3894',
    bank: 'DANA',
  };

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nominal) {
      alert('Silahkan masukkan nominal penarikan terlebih dahulu.');
      return;
    }
    if (!password) {
      alert('Silahkan masukkan password akun Anda.');
      return;
    }
    alert(`Permintaan penarikan dana sebesar Rp. ${nominal} berhasil dikirim!`);
  };

  return (
    <div className="min-h-screen bg-[#0a020f] text-gray-900 py-6 px-4 flex justify-center items-start">
      <div className="flex flex-col items-center gap-3 p-5 md:p-6 rounded-2xl bg-white mb-20 w-full lg:max-w-xl shadow-xl">
        
        {/* Judul Halaman */}
        <h2 className="text-center font-extrabold text-base md:text-lg tracking-wider mb-2 text-gray-900 uppercase">
          WITHDRAW
        </h2>

        {/* Tab / Pilihan Metode (TRANSFER) */}
        <div className="w-full mb-1">
          <div className="bg-yellow-100/90 border-2 border-yellow-400 rounded-xl p-3 w-28 flex flex-col items-center justify-center shadow-md cursor-pointer">
            <span className="text-xl mb-1">🏛️</span>
            <span className="text-[10px] font-extrabold tracking-wider text-black">TRANSFER</span>
          </div>
        </div>

        {/* Kotak Informasi / Peringatan Biru */}
        <div className="w-full bg-blue-600 border border-blue-500 rounded-xl p-3.5 mb-2 flex gap-3 items-start text-xs text-white shadow-sm">
          <span className="text-white shrink-0 text-base">ℹ️</span>
          <p className="leading-relaxed">
            Minimal withdraw adalah Rp. 50,000.00 dan biasakan periksa rekening aktif sebelum melakukan penarikan dana.
          </p>
        </div>

        <form onSubmit={handleWithdraw} className="w-full space-y-4">
          
          {/* Saldo (Read-only / Disable) */}
          <div className="grid grid-cols-[100px_1fr] items-center gap-3">
            <label className="text-xs font-semibold text-black-700">Saldo</label>
            <div className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-700 flex items-center gap-3 shadow-sm">
              <span className="text-black-400">💳</span>
              <span>0.00</span>
            </div>
          </div>

          {/* Nominal Penarikan */}
          <div className="grid grid-cols-[100px_1fr] items-center gap-3">
            <label className="text-xs font-semibold text-black-700">Nominal</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Rp. 0"
                value={nominal}
                onChange={(e) => setNominal(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-black-900 placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors shadow-sm"
              />
            </div>
          </div>

          {/* Password Akun */}
          <div className="grid grid-cols-[100px_1fr] items-center gap-3">
            <label className="text-xs font-semibold text-gray-700">Password</label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-black-400">🔑</span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-xl pl-11 pr-10 py-2.5 text-sm text-black-900 placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-black-400 hover:text-gray-700 focus:outline-none text-sm"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          {/* Kotak Ringkasan Rekening Member */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 mt-4 space-y-3 shadow-sm text-gray-800">
            <h3 className="text-center font-bold text-xs text-gray-800 tracking-wider mb-2">
              Rekening Member
            </h3>
            <p className="text-[12px] text-black-500 text-center leading-relaxed px-2">
              Batas maksimal withdraw senilai Rp. 49,000,000.00, perhatikan nominal transaksi dan nomor rekening tujuan penarikan
            </p>
            
            <div className="pt-3 border-t border-black-200 max-w-[340px] mx-auto space-y-2 text-[13px]">
              <div className="grid grid-cols-[130px_1fr] items-start">
                <span className="text-black-600">Nama Rekening</span>
                <span className="font-medium text-black-900">: {memberData.namaRekening}</span>
              </div>
              <div className="grid grid-cols-[130px_1fr] items-start">
                <span className="text-black-600">Nomor Rekening</span>
                <span className="font-mono text-black-900">: {memberData.nomorRekening}</span>
              </div>
              <div className="grid grid-cols-[130px_1fr] items-start">
                <span className="text-black-600">Bank</span>
                <span className="font-medium text-black-900">: {memberData.bank}</span>
              </div>
              <div className="grid grid-cols-[130px_1fr] items-start">
                <span className="text-black-600">Nominal</span>
                <span className="font-medium text-black-900">: {nominal ? `Rp. ${nominal}` : '0'}</span>
              </div>
            </div>
          </div>

          {/* Tombol Kirim / Submit */}
          <button
            type="submit"
            className="w-full mt-4 bg-yellow-200 hover:bg-yellow-300 text-black font-extrabold py-3.5 rounded-xl text-sm tracking-wider transition-all shadow-md active:scale-95 border border-yellow-300"
          >
            KIRIM
          </button>

        </form>
      </div>
    </div>
  );
}