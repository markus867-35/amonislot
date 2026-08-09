'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import Swal from 'sweetalert2'; // Import SweetAlert2

export default function WithdrawPage() {
  const router = useRouter();
  const [nominal, setNominal] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  // State untuk data member dari Supabase
  const [memberData, setMemberData] = useState({
    namaRekening: 'Memuat...',
    nomorRekening: 'Memuat...',
    bank: 'Memuat...',
    saldo: 0,
  });

  // Fungsi untuk menyamarkan nomor rekening (hanya menampilkan 3 digit terakhir)
  const maskAccountNumber = (accNumber: string) => {
    if (!accNumber || accNumber === 'Memuat...' || accNumber === 'Tidak tersedia') return accNumber;
    const cleaned = accNumber.trim();
    if (cleaned.length <= 3) return cleaned;
    
    const visibleDigits = cleaned.slice(-3);
    return '*******' + visibleDigits;
  };

  // Ambil username dari localStorage saat halaman dimuat
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (!storedUsername) {
      router.push('/');
    } else {
      setUsername(storedUsername);
    }
  }, [router]);

  // Ambil data rekening dan saldo dari tabel 'members' di Supabase
  useEffect(() => {
    async function fetchMemberData() {
      if (!username) return;

      try {
        const { data, error } = await supabase
          .from('members')
          .select('nama_rekening, nomor_rekening, bank_name, saldo')
          .eq('username', username)
          .single();

        if (error) throw error;

        if (data) {
          setMemberData({
            namaRekening: data.nama_rekening || '-',
            nomorRekening: data.nomor_rekening || '-',
            bank: data.bank_name || '-',
            saldo: data.saldo || 0,
          });
        }
      } catch (error) {
        console.error('Gagal mengambil data member dari Supabase:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchMemberData();
  }, [username]);

// Handle proses withdraw dengan SweetAlert2
  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();

    const numNominal = Number(nominal);
    if (!nominal || isNaN(numNominal) || numNominal <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Peringatan',
        text: 'Silahkan masukkan nominal penarikan yang valid.',
        confirmButtonColor: '#eab308',
      });
      return;
    }

    // Validasi Minimal Penarikan (Minimal Rp 50.000)
    if (numNominal < 50000) {
      Swal.fire({
        icon: 'warning',
        title: 'Minimal Penarikan',
        text: 'Minimal penarikan adalah Rp 50.000.',
        confirmButtonColor: '#eab308',
      });
      return;
    }

    if (!password) {
      Swal.fire({
        icon: 'warning',
        title: 'Peringatan',
        text: 'Silahkan masukkan password akun Anda.',
        confirmButtonColor: '#eab308',
      });
      return;
    }

    if (numNominal > memberData.saldo) {
      Swal.fire({
        icon: 'error',
        title: 'Saldo Tidak Cukup',
        text: 'Saldo Anda tidak mencukupi untuk melakukan penarikan ini.',
        confirmButtonColor: '#eab308',
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const { data: member, error: fetchError } = await supabase
        .from('members')
        .select('password, saldo, bank_name, nama_rekening, nomor_rekening')
        .eq('username', username)
        .single();

      if (fetchError || !member || member.password !== password) {
        Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'Password yang Anda masukkan salah atau akun tidak ditemukan!',
          confirmButtonColor: '#eab308',
        });
        return;
      }

      if (member.saldo < numNominal) {
        Swal.fire({
          icon: 'error',
          title: 'Saldo Tidak Cukup',
          text: 'Saldo Anda tidak mencukupi.',
          confirmButtonColor: '#eab308',
        });
        return;
      }

      const { error: insertError } = await supabase
        .from('withdrawals')
        .insert([
          {
            username: username,
            nominal: numNominal,
            bank_name: member.bank_name,
            nama_rekening: member.nama_rekening,
            nomor_rekening: member.nomor_rekening,
            status: 'PENDING',
          },
        ]);

      if (insertError) throw insertError;

      await supabase
        .from('members')
        .update({ saldo: member.saldo - numNominal })
        .eq('username', username);

      await Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: `Permintaan penarikan dana sebesar Rp. ${numNominal.toLocaleString('id-ID')} berhasil dikirim!`,
        confirmButtonColor: '#eab308',
      });
      
      setNominal('');
      setPassword('');
      setMemberData((prev) => ({ ...prev, saldo: prev.saldo - numNominal }));

    } catch (error: any) {
      console.error('Terjadi kesalahan:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Gagal memproses penarikan: ' + error.message,
        confirmButtonColor: '#eab308',
      });
    } finally {
      setIsSubmitting(false);
    }
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
            <label className="text-xs font-semibold text-gray-700">Saldo</label>
            <div className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-700 flex items-center gap-3 shadow-sm">
              <span className="text-gray-400">💳</span>
              <span>{loading ? "Memuat..." : `Rp. ${memberData.saldo.toLocaleString('id-ID')}`}</span>
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
            
<div className="pt-3 border-t border-gray-200 max-w-[250px] mx-auto space-y-2 text-[13px]">
  
  {/* Nama Rekening */}
  <div className="grid grid-cols-[120px_10px_1fr] items-start">
    <span className="text-gray-600">Nama Rekening</span>
    <span className="text-gray-600 text-center">:</span>
    <span className="font-medium text-gray-900">{memberData.namaRekening}</span>
  </div>

  {/* Nomor Rekening */}
  <div className="grid grid-cols-[120px_10px_1fr] items-start">
    <span className="text-gray-600">Nomor Rekening</span>
    <span className="text-gray-600 text-center">:</span>
    <span className="font-mono text-gray-900">{maskAccountNumber(memberData.nomorRekening)}</span>
  </div>

  {/* Bank */}
  <div className="grid grid-cols-[120px_10px_1fr] items-start">
    <span className="text-gray-600">Bank</span>
    <span className="text-gray-600 text-center">:</span>
    <span className="font-medium text-gray-900">{memberData.bank}</span>
  </div>

  {/* Nominal */}
  <div className="grid grid-cols-[120px_10px_1fr] items-start">
    <span className="text-gray-600">Nominal</span>
    <span className="text-gray-600 text-center">:</span>
    <span className="font-medium text-gray-900">{nominal ? `Rp. ${Number(nominal).toLocaleString('id-ID')}` : 'Rp. 0'}</span>
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