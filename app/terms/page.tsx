'use client'; // Wajib ditambahkan di baris pertama
import { useRouter } from 'next/navigation';
export default function TermsPage() {
  const router = useRouter(); // Inisialisasi router

  const terms = [
    "Pendaftaran harus menggunakan Data Rekening Bank yang BENAR atau ASLI, agar tidak terjadi hambatan pada saat melakukan Deposit atau Withdraw.",
    "Jika ada berita DEPOSIT atau TOGEL. Maka kami berhak menolak dana deposit anda. Berita Transaksi saat pengiriman Dana ke rekening, harap dikosongkan saja.",
    "Untuk menjaga keamanan transaksi, setiap deposit melalui mesin EDC akan melalui proses verifikasi dan dapat ditahan sementara hingga 1x24 jam sebelum diproses sepenuhnya.",
    "Kami tidak memproses Deposit Jika Bank Tujuan Deposit mengalami GANGGUAN/ OFFLINE. Deposit Anda akan kami proseskan jika Dana yang anda kirim sudah tercetak di Mutasi kami.",
    "Sebelum anda mengirimkan dana, Wajib cek nomor rekening kami yang tersedia di menu deposit karena nomor rekening dapat berubah sewaktu-waktu tanpa pemberitahuan. Jika pengiriman dana tidak ke nomor rekening yang tertera di form deposit, maka kami anggap HANGUS.",
    "Khusus Deposit, JALAWIN Tidak Membenarkan Atas Meminta Rekening Tujuan Deposit Melalui Medsos Ataupun Kontak Official Resmi Selain Yang Tertera Di Situs B.O Kami !",
    "Jika Melakukan Deposit Sangat Tidak Di Anjurkan Memasukkan Berita Deposit, Seperti Contoh : SLOT, DEPOSIT, ISI DOA Dan Lain-Lainnya. Jika Mengisi Berita Sebagai Berikut (Maka Saldo Di Anggap Donasi)"
  ];

  return (
    <div className="min-h-screen bg-black flex justify-center items-center p-4">
      <div className="bg-black/80 border border-yellow-600 rounded-xl p-6 max-w-2xl text-white shadow-2xl">
        {/* Header Logo */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold mb-2">Syarat dan Ketentuan</h2>
          <div className="text-4xl font-black text-yellow-500 italic">JalaWin</div>
        </div>

        {/* List Syarat */}
        <ol className="list-decimal list-outside ml-4 space-y-4 text-sm md:text-base">
          {terms.map((term, index) => (
            <li key={index} className="pl-2 leading-relaxed font-medium">
              {term}
            </li>
          ))}
        </ol>

        {/* Buttons */}
<div className="flex gap-4 mt-8">
      {/* Tombol Tidak Setuju - Kembali ke halaman utama */}
      <button 
        onClick={() => router.push('/')} 
        className="flex-1 bg-gray-200 text-black py-3 rounded font-bold hover:bg-gray-300 transition"
      >
        Tidak Setuju
      </button>

      {/* Tombol Setuju - Lanjut ke dashboard */}
      <button 
        onClick={() => router.push('/dashboard')} 
        className="flex-1 bg-yellow-500 text-black py-3 rounded font-bold hover:bg-yellow-600 transition"
      >
        Setuju
      </button>
    </div>
      </div>
    </div>
  );
}