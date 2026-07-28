'use client';
import { useRouter } from 'next/navigation';
import FloatingWidget from '@/components/FloatingWidget';

export default function TermsPage() {
  const router = useRouter();

  return (
<div 
      className="fixed top-0 left-0 w-screen h-screen overflow-hidden z-30 p-2 sm:p-4 flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://ik.imagekit.io/j72i7hsy1/banner1.jpg')" }}
    >
      {/* Overlay gelap agar teks tetap mudah dibaca di atas background */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md z-0"></div>

      {/* Kontainer Isi Halaman */}
      <div className="relative z-10 flex flex-col grow max-h-screen gap-2 w-full max-w-xl items-center py-2">
        
        {/* Judul Atas */}
        <h1 className="py-2.5 bg-[#070b24] border border-blue-900/50 rounded-lg text-center text-blue-400 font-bold tracking-wide w-full shadow-md shrink-0">
          Syarat dan Ketentuan
        </h1>

        {/* Kontainer Utama */}
        <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-2 rounded-lg p-3 w-full shadow-2xl backdrop-blur-md border border-blue-900/40">
          
          {/* Logo */}
          <div className="flex items-center justify-center w-full shrink-0 py-2">
            <img 
              alt="logo" 
              src="https://ik.imagekit.io/j72i7hsy1/download.png?updatedAt=1784604904347" 
              className="max-h-12 object-contain"
            />
          </div>

          {/* Konten Tiptap / Syarat & Ketentuan yang bisa di-scroll */}
<div className="flex-1 min-h-0 tiptap overflow-y-auto px-2 text-white bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-lg shadow-xl [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/40">
           
  <ol className="list-decimal list-inside space-y-4 text-xs sm:text-sm">
    <li>
      <p className="inline">Pendaftaran harus menggunakan Data Rekening Bank yang BENAR atau ASLI, agar tidak terjadi hambatan pada saat melakukan Deposit atau Withdraw</p>
    </li>
    <li>
      <p className="inline">Jika ada berita DEPOSIT atau TOGEL. Maka kami berhak menolak dana deposit anda. Berita Transaksi saat pengiriman Dana ke rekening, harap dikosongkan saja.</p>
    </li>
    <li>
      <p className="inline">Kami tidak memproses Deposit Jika Bank Tujuan Deposit mengalami GANGGUAN/ OFFLINE. Deposit Anda akan kami proseskan jika Dana yang anda kirim sudah tercetak di Mutasi kami. Harap Maklum.</p>
    </li>
    <li>
      <p className="inline">Sebelum anda mengirimkan dana, Wajib cek nomor rekening kami yang tersedia di menu deposit karena nomor rekening dapat berubah sewaktu-waktu tanpa pemberitahuan. Jika pengiriman dana tidak ke nomor rekening yang tertera di form deposit, maka kami anggap HANGUS.</p>
    </li>
    <li>
      <p className="inline">Untuk proses Deposit yang lebih cepat, disarankan untuk gunakan nominal unik sewaktu melakukan transfer. contoh : 10.512 , 50.256 , 100.608</p>
    </li>
    <li>
      <p className="inline">Penipuan Deposit, Deposit Kosong yang berulang-ulang, Pembelian Curang &amp; Termasuk semua tindakan yang dinilai merugikan ataupun menguntungkan pihak pihak tertentu maka User-ID anda akan terkunci otomatis oleh sistem.</p>
    </li>
    <li>
      <p className="inline">Mohon untuk tidak memberikan bukti transfer ke pihak lain, agar dana transferan tidak di klaim oleh pihak lain. Kelalaian Anda diluar tanggung jawab pihak BO.</p>
    </li>
     <li>
      <p className="inline">Mohon untuk tidak memberikan bukti transfer ke pihak lain, agar dana transferan tidak di klaim oleh pihak lain. Kelalaian Anda diluar tanggung jawab pihak BO.</p>
    </li>
     <li>
      <p className="inline">Mohon untuk tidak memberikan bukti transfer ke pihak lain, agar dana transferan tidak di klaim oleh pihak lain. Kelalaian Anda diluar tanggung jawab pihak BO.</p>
    </li>
     <li>
      <p className="inline">Mohon untuk tidak memberikan bukti transfer ke pihak lain, agar dana transferan tidak di klaim oleh pihak lain. Kelalaian Anda diluar tanggung jawab pihak BO.</p>
    </li>
     <li>
      <p className="inline">Mohon untuk tidak memberikan bukti transfer ke pihak lain, agar dana transferan tidak di klaim oleh pihak lain. Kelalaian Anda diluar tanggung jawab pihak BO.</p>
    </li>
     <li>
      <p className="inline">Mohon untuk tidak memberikan bukti transfer ke pihak lain, agar dana transferan tidak di klaim oleh pihak lain. Kelalaian Anda diluar tanggung jawab pihak BO.</p>
    </li>

    <li>
      <p className="inline">Betting yang Normal adalah disaat pasaran betting dibuka. Semua pembelian / betting yang telah dilakukan tidak dapat dibatalkan.</p>
    </li>
    <li>
      <p className="inline">Apabila ditemukan transaksi tidak wajar khusus pasaran CAMBODIA, SYDNEY POOLS, CHINA, TAIWAN, HONGKONG POOLS, dan JEPANG maka akan dianggap TIDAK SAH dan akan diblokir permanen beserta saldo didalamnya.</p>
    </li>
    <li>
      <p className="inline">Pihak NasabahTogel tidak menerima IP Cambodia, Filipina untuk bermain permainan togel CAMBODIA, SYDNEY POOLS, CHINA, TAIWAN, HONGKONG POOLS, dan JEPANG.</p>
    </li>
    <li>
      <p className="inline">Semua Permainan safetybet / kecurangan yg mengakali sistem dengan tujuan memanipulasi Bonus, akan di berikan sanksi pemblokiran &amp; seluruh dana akan di tarik.</p>
    </li>
    <li>
      <p className="inline">Keputusan NasabahTogel adalah Mutlak dan tidak dapat di ganggu gugat.</p>
    </li>
    <li>
      <p className="inline">
        Demi kenyamanan bermain wajib DOWNLOAD{' '}
        <a 
          target="_blank" 
          rel="noopener noreferrer nofollow" 
          href="https://apknasabahtogel.com/"
          className="text-yellow-400 underline hover:text-yellow-300 font-bold"
        >
          www.ApkNasabahTogel.com
        </a>
      </p>
    </li>
  </ol>
  <p></p>
</div>
          {/* Tombol Aksi */}
          <div>
            <div className="grid grid-cols-2 gap-4 my-2">
<button 
  onClick={() => {
    // Hapus semua token login agar kembali bersih seperti awal
    localStorage.removeItem('token');
    localStorage.removeItem('member_token');
    localStorage.removeItem('supabase.auth.token');
    localStorage.removeItem('isLoggedIn');

    router.push('/');
  }}
  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 border border-playerAct bg-gray-200 text-black hover:text-white" 
  type="button"
>
  Tidak Setuju
</button>
<button 
  onClick={() => {
    // Cek apakah user sudah login (berdasarkan localStorage)
    const isLoggedIn = localStorage.getItem('isLoggedIn') || localStorage.getItem('token');
    
    if (isLoggedIn) {
      router.push('/dashboard');
    } else {
      // Jika belum login, arahkan ke halaman login atau tampilkan peringatan
      router.push('/'); 
      // Atau bisa pakai alert: alert('Silakan login terlebih dahulu!');
    }
  }}
  className="btn-shine inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-yellow-500 text-black hover:bg-yellow-400 w-full font-bold shadow-lg" 
  type="button"
>
  Setuju
</button>
            </div>
          </div>

        </div>

      </div>
      <FloatingWidget />
    </div>
    
  );
}