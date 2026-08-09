'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Swal from 'sweetalert2';

// Inisialisasi Supabase client (pastikan environment variable sudah terpasang di .env.local)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function DepositPage() {
  const [activeTab, setActiveTab] = useState<'qris' | 'transfer'>('qris');
  const [nominal, setNominal] = useState<number | ''>('');
  const [selectedBank, setSelectedBank] = useState('');
  const [bankList, setBankList] = useState<any[]>([]); // Menyimpan data bank dari tabel admin_banks
  const [promo, setPromo] = useState('');
  const [loading, setLoading] = useState(false);
  

  const [memberData, setMemberData] = useState({
    username: '',
    namaRekening: 'Memuat...',
    nomorRekening: 'Memuat...',
    bank: 'Memuat...',
  });

  // Ambil data member dan data bank admin dari Supabase saat komponen dimuat
  useEffect(() => {
    async function fetchData() {
      try {
        // 1. Ambil data member
        const { data: memberRes, error: memberErr } = await supabase
          .from('members')
          .select('nama_rekening, nomor_rekening, bank_name, username')
          .limit(1)
          .single(); 

        if (!memberErr && memberRes) {
          setMemberData({
            username: memberRes.username || '',
            namaRekening: memberRes.nama_rekening || '-',
            nomorRekening: memberRes.nomor_rekening || '-',
            bank: memberRes.bank_name || '-',
          });
        }

// 2. Ambil data bank tujuan dari tabel admin_banks (Tambahkan filter jika perlu)
      const { data: bankRes, error: bankErr } = await supabase
        .from('admin_banks')
        .select('*')
        .order('urutan', { ascending: true }); // Diurutkan berdasarkan kolom 'urutan' dari database Anda

      if (bankErr) {
        console.error('Error mengambil bank:', bankErr.message);
      } else {
        console.log('Data Bank Berhasil Dimuat:', bankRes); // Cek F12 Console untuk memastikan BNI, BRI, DANA muncul
        setBankList(bankRes || []);
      }
    } catch (err: any) {
      console.error('Error submitting deposit:', err.message);
    }
  }

    fetchData();
  }, []);

  // Cari data detail bank admin yang sedang dipilih berdasarkan bank_name
  const selectedBankData = bankList.find(
    (item) => item.bank_name === selectedBank
  );

  const quickAmounts = [
    { label: 'RP. 10 RB', value: 10000 },
    { label: 'RP. 50 RB', value: 50000 },
    { label: 'RP. 100 RB', value: 100000 },
    { label: 'RP. 200 RB', value: 200000 },
    { label: 'RP. 500 RB', value: 500000 },
    { label: 'RP. 1 JT', value: 1000000 },
  ];

  const handleDepositSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nominal || Number(nominal) < 5000) {
      alert('Minimal deposit adalah Rp. 5,000.00');
      return;
    }
    if (activeTab === 'transfer' && !selectedBank) {
      alert('Silahkan pilih bank tujuan terlebih dahulu.');
      return;
    }

    setLoading(true);

    try {
      const tujuanBank = activeTab === 'transfer' ? selectedBank : 'QRIS';

      const { error } = await supabase.from('deposits').insert([
        {
          "Nama Rekening": memberData.namaRekening,
          "username": memberData.username,
          "Nomor Rekening": memberData.nomorRekening,
          "Nama Bank": memberData.bank,
          "Nominal": String(nominal),
          "Pilih Bank": tujuanBank, 
          "Pilih Promo": promo || null,
          "Bukti Transfer": null,
        },
      ]);

      if (error) {
        throw error;
      }

     Swal.fire({
  icon: 'success',
  title: 'Berhasil!',
  text: `Permintaan deposit via ${activeTab.toUpperCase()} sebesar Rp. ${Number(nominal).toLocaleString('id-ID')} berhasil dikirim!`,
  confirmButtonText: 'OK',
  confirmButtonColor: '#facc15' // Sesuaikan warna tombol dengan tema kuning Anda
});
     
      setNominal('');
      setSelectedBank('');
      setPromo('');
    } catch (error: any) {
      console.error('Error submitting deposit:', error.message);
      alert('Terjadi kesalahan saat mengirim permintaan deposit: ' + error.message);
    } finally {
      setLoading(false);
    }
  };


  const currentUsername = localStorage.getItem('username'); 

useEffect(() => {
  async function fetchLogedInMember() {
    if (!currentUsername) return;

    // Ambil data spesifik milik user yang sedang login
    const { data: memberRes, error } = await supabase
      .from('members')
      .select('nama_rekening, nomor_rekening, bank_name, username')
      .eq('username', currentUsername) // <-- Wajib di-filter berdasarkan user yang login
      .single(); 

    if (!error && memberRes) {
      setMemberData({
        username: memberRes.username,
        namaRekening: memberRes.nama_rekening || '-',
        nomorRekening: memberRes.nomor_rekening || '-',
        bank: memberRes.bank_name || '-',
      });
    }
  }

  fetchLogedInMember();
}, [currentUsername]);

  return (
    <div className="bg-[#0a020f] text-gray-900 pt-2 pb-24 px-4 flex justify-center items-start min-h-screen">
      <div className="flex flex-col items-center gap-3 p-5 md:p-6 rounded-2xl bg-white w-full lg:max-w-xl shadow-xl">
        
        {/* Judul Halaman */}
        <h2 className="text-center font-extrabold text-base md:text-lg tracking-wider mb-1 text-gray-900 uppercase">
          DEPOSIT
        </h2>

        {/* Tab Pilihan Metode (QRIS & TRANSFER) */}
        <div className="grid grid-cols-2 gap-3 w-full mb-1">
          {/* Tab QRIS */}
          <button
            type="button"
            onClick={() => setActiveTab('qris')}
            className={`border-2 rounded-xl p-3 flex flex-col items-center justify-center transition-all shadow-sm ${
              activeTab === 'qris'
                ? 'bg-yellow-100/90 border-yellow-400'
                : 'bg-white border-gray-200 opacity-60 hover:opacity-100'
            }`}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="28" 
              height="28" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="lucide lucide-qr-code mb-1 text-black"
            >
              <rect width="5" height="5" x="3" y="3" rx="1"></rect>
              <rect width="5" height="5" x="16" y="3" rx="1"></rect>
              <rect width="5" height="5" x="3" y="16" rx="1"></rect>
              <path d="M21 16h-3a2 2 0 0 0-2 2v3"></path>
              <path d="M21 21v.01"></path>
              <path d="M12 7v3a2 2 0 0 1-2 2H7"></path>
              <path d="M3 12h.01"></path>
              <path d="M12 3h.01"></path>
              <path d="M12 16v.01"></path>
              <path d="M16 12h1"></path>
              <path d="M21 12v.01"></path>
              <path d="M12 21v-1"></path>
            </svg>
            <span className="text-[10px] font-extrabold tracking-wider text-black">QRIS</span>
          </button>

          {/* Tab TRANSFER */}
          <button
            type="button"
            onClick={() => setActiveTab('transfer')}
            className={`border-2 rounded-xl p-3 flex flex-col items-center justify-center transition-all shadow-sm ${
              activeTab === 'transfer'
                ? 'bg-yellow-100/90 border-yellow-400'
                : 'bg-white border-gray-200 opacity-60 hover:opacity-100'
            }`}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="28" 
              height="28" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="lucide lucide-landmark mb-1 text-black"
            >
              <line x1="3" x2="21" y1="22" y2="22"></line>
              <line x1="6" x2="6" y1="18" y2="11"></line>
              <line x1="10" x2="10" y1="18" y2="11"></line>
              <line x1="14" x2="14" y1="18" y2="11"></line>
              <line x1="18" x2="18" y1="18" y2="11"></line>
              <polygon points="12 2 20 7 4 7"></polygon>
            </svg>
            <span className="text-[10px] font-extrabold tracking-wider text-black">TRANSFER</span>
          </button>
        </div>

        {/* Kotak Informasi Biru */}
        <div className="w-full bg-blue-600 border border-blue-500 rounded-xl p-3.5 mb-1 flex gap-3 items-start text-xs text-white shadow-sm">
          <span className="text-white shrink-0 text-base">ℹ️</span>
          <p className="leading-relaxed">
            {activeTab === 'qris'
              ? 'Minimal deposit adalah Rp. 5,000.00.'
              : 'Minimal deposit adalah Rp. 5,000.00 dan biasakan periksa rekening deposit aktif sebelum melakukan transfer dana.'}
          </p>
        </div>

        <form onSubmit={handleDepositSubmit} className="w-full space-y-4">
          
          {/* TAMPILAN KONTEN KHUSUS TAB QRIS */}
          {activeTab === 'qris' && (
            <>
              {/* Gambar / Logo QRIS */}
              <div className="flex justify-center my-2">
                <div className="border border-gray-200 rounded-2xl p-0 bg-gray-50 w-full flex justify-center items-center shadow-inner">
                  <img 
                    src="https://ik.imagekit.io/j72i7hsy1/qrisamonislot.png" 
                    alt="QRIS Amoni Slot" 
                    className="max-h-48 w-auto object-contain rounded-xl"
                  />
                </div>
              </div>

              {/* Input Jumlah Deposit */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Jumlah Deposit</label>
                <div className="relative">
                  <input
                    type="text"
                    value={nominal ? `Rp. ${Number(nominal).toLocaleString('id-ID')}` : ''}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/\D/g, '');
                      setNominal(rawValue === '' ? '' : Number(rawValue));
                    }}
                    placeholder="Rp. 0"
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 font-semibold shadow-sm focus:outline-none focus:border-yellow-500"
                  />
                </div>
              </div>

              {/* Tombol Nominal Cepat (Grid 3x2) dengan Efek Kilau */}
              <div className="grid grid-cols-3 gap-2.5 pt-1">
                {quickAmounts.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setNominal(item.value)}
                    className="relative overflow-hidden bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl shadow transition-all active:scale-95 border border-blue-500 group"
                  >
                    <span className="absolute inset-0 -translate-x-full group-hover:animate-none bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shine pointer-events-none" />
                    <span className="relative z-10">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Pilih Promo */}
              <div className="space-y-1 pt-1">
                <label className="text-xs font-semibold text-gray-700">Pilih Promo</label>
                <div className="relative flex items-center">
                  <select
                    value={promo}
                    onChange={(e) => setPromo(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-700 appearance-none focus:outline-none focus:border-yellow-500 shadow-sm"
                  >
                    <option value="">Pilih Promo</option>
                    <option value="bonus_new_member">Bonus New Member 100%</option>
                    <option value="bonus_harian">Bonus Harian 10%</option>
                  </select>
                  <span className="absolute right-4 text-gray-400 pointer-events-none"> › </span>
                </div>
              </div>

              {/* Tombol Kirim QRIS */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-3 bg-yellow-200 hover:bg-yellow-300 text-black font-extrabold py-3.5 rounded-xl text-sm tracking-wider transition-all shadow-md active:scale-95 border border-yellow-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="lucide lucide-scan-qr-code"
                >
                  <path d="M17 12v4a1 1 0 0 1-1 1h-4"></path>
                  <path d="M17 3h2a2 2 0 0 1 2 2v2"></path>
                  <path d="M17 8V7"></path>
                  <path d="M21 17v2a2 2 0 0 1-2 2h-2"></path>
                  <path d="M3 7V5a2 2 0 0 1 2-2h2"></path>
                  <path d="M7 17h.01"></path>
                  <path d="M7 21H5a2 2 0 0 1-2-2v-2"></path>
                  <rect x="7" y="7" width="5" height="5" rx="1"></rect>
                </svg> 
                {loading ? 'MEMPROSES...' : 'DEPOSIT'}
              </button>

              {/* Riwayat Deposit QRIS */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="text-xs font-semibold text-gray-600 mb-3">Riwayat Deposit QRIS</p>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center text-gray-400">
                  <span className="text-2xl mb-1">📄</span>
                  <span className="text-xs">Belum ada transaksi</span>
                </div>
              </div>
            </>
          )}

{activeTab === 'transfer' && (
            <>
              {/* Nama Rekening Member */}
              <div className="grid grid-cols-[110px_1fr] items-center gap-3">
                <label className="text-xs font-semibold text-gray-700">Nama Rekening</label>
                <div className="bg-gray-100 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-600">
                  <span>{memberData.namaRekening}</span>
                </div>
              </div>

              {/* Nomor Rekening Member */}
              <div className="grid grid-cols-[110px_1fr] items-center gap-3">
                <label className="text-xs font-semibold text-gray-700">Nomor Rekening</label>
                <div className="bg-gray-100 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-600 font-mono">
                  <span>{memberData.nomorRekening}</span>
                </div>
              </div>

              {/* Nama Bank Member */}
              <div className="grid grid-cols-[110px_1fr] items-center gap-3">
                <label className="text-xs font-semibold text-gray-700">Nama Bank</label>
                <div className="bg-gray-100 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-600">
                  <span>{memberData.bank}</span>
                </div>
              </div>

              <hr className="border-gray-100 my-2" />


  <div className="grid grid-cols-[110px_1fr] items-center gap-3">
    <label className="text-xs font-semibold text-gray-700">Pilih Bank</label>
    <div className="relative">
      <select
        value={selectedBank}
        onChange={(e) => setSelectedBank(e.target.value)}
        className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-700 appearance-none focus:outline-none focus:border-yellow-500 shadow-sm"
      >
        <option value="">Pilih Bank</option>
        {bankList.map((item) => (
          <option key={item.id} value={item.bank_name}>
            {item.bank_name} - {item.account_number}
          </option>
        ))}
      </select>
      <span className="absolute right-4 top-3 text-gray-400 pointer-events-none text-xs">▼</span>
    </div>
  </div>
              {/* Nominal */}
              <div className="grid grid-cols-[110px_1fr] items-center gap-3">
                <label className="text-xs font-semibold text-gray-700">Nominal</label>
                <input
                  type="text"
                  placeholder="Rp. 0"
                  value={nominal ? Number(nominal).toLocaleString('id-ID') : ''}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/\D/g, '');
                    setNominal(rawValue === '' ? '' : Number(rawValue));
                  }}
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-yellow-500 shadow-sm"
                />
              </div>

              {/* Pilih Promo */}
              <div className="grid grid-cols-[110px_1fr] items-center gap-3">
                <label className="text-xs font-semibold text-gray-700">Pilih Promo</label>
                <div className="relative flex items-center w-full">
                  <select
                    value={promo}
                    onChange={(e) => setPromo(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-700 appearance-none focus:outline-none focus:border-yellow-500 shadow-sm"
                  >
                    <option value="">Pilih Promo</option>
                    <option value="bonus_new_member">Bonus New Member 100%</option>
                    <option value="bonus_harian">Bonus Harian 10%</option>
                  </select>
                  <span className="absolute right-4 text-gray-400 pointer-events-none"> › </span>
                </div>
              </div>
{selectedBank && (() => {
  const selectedBankData = bankList.find((item) => item.bank_name === selectedBank);
  return selectedBankData ? (
    <div className="mt-4 border border-gray-200 rounded-3xl p-10 bg-white shadow-sm space-y-3">
      <div className="text-center">
        <p className="text-[15px] font-bold text-gray-900">Deposit Bank</p>
        <p className="text-[15px] text-gray-500 mt-0.5">
          Batas maksimal deposit senilai Rp. 10,000,000.00, perhatikan nominal transaksi dan nomor rekening tujuan deposit
        </p>
      </div>

{/* Rata tengah secara responsif di semua ukuran layar */}
      <div className="flex justify-center pt-2 pb-2 w-full">
        <div className="grid grid-cols-[110px_15px_1fr] sm:grid-cols-[160px_15px_1fr] gap-y-2 text-xs sm:text-[15px] text-gray-700 w-full max-w-[420px]">
          
          <span className="font-medium text-left">Nama Rekening</span>
          <span className="text-center">:</span>
          <span className="text-left font-semibold break-words">{selectedBankData.account_name}</span>
          
          <span className="font-medium text-left">Nomor Rekening</span>
          <span className="text-center">:</span>
          <span className="text-left font-mono font-semibold break-all">{selectedBankData.account_number}</span>
          
          <span className="font-medium text-left">Bank</span>
          <span className="text-center">:</span>
          <span className="text-left font-semibold">{selectedBankData.bank_name}</span>
          
          <span className="font-medium text-left">Nominal</span>
          <span className="text-center">:</span>
          <span className="text-left font-semibold">{nominal ? Number(nominal).toLocaleString('id-ID') : '0'}</span>
          
        </div>
      </div>

      {/* Tombol Copy */}
      <button
        type="button"
        onClick={() => {
          navigator.clipboard.writeText(selectedBankData.account_number);
          alert('Nomor rekening berhasil disalin!');
        }}
        className="w-full bg-black text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow active:scale-95 mt-2"
      >
        Copy Nomor Rekening
      </button>

      {/* Tombol Upload Bukti (Opsional / Dummy) */}
      <button
        type="button"
        onClick={() => alert('Fitur upload bukti transfer')}
        className="w-full bg-white border border-gray-300 text-gray-700 font-bold text-xs py-2.5 rounded-xl transition-all shadow-sm active:scale-95"
      >
        Upload Bukti Transfer
      </button>
    </div>
  ) : null;
})()}

{/* Tombol Kirim */}
<button
  type="submit"
  disabled={loading}
  className="w-full mt-4 bg-yellow-200 hover:bg-yellow-300 text-black font-extrabold py-3.5 rounded-xl text-sm tracking-wider transition-all shadow-md active:scale-95 border border-yellow-300 disabled:opacity-50"
>
  {loading ? 'MEMPROSES...' : 'KIRIM'}
</button>
            </>
          )}

        </form>
      </div>
    </div>
  );
}