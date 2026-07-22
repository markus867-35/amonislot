'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Tambahkan ini
import { supabase } from '../lib/supabase';
import Swal from 'sweetalert2'; // Tambahkan import di atas

export default function RegisterPage() {
  const router = useRouter(); // Inisialisasi router
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

  const banks = ['BCA', 'BNI', 'BRI', 'MANDIRI', 'PERMATA', 'CIMB', 'DANA', 'OVO', 'LINK AJA', 'GOPAY', 'MAYBANK', 'BANK JAGO', 'DANAMON', 'SEABANK', 'JENIUS', 'SINARMAS', 'BANK NEO', 'BSI'];

const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Password tidak cocok!');
      return;
    }

    // Panggil API kita (menggunakan cara yang kita buat sebelumnya)
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
    allowOutsideClick: false // Mencegah user klik di luar untuk menutup
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
    <main className="w-full bg-[#0f001a] min-h-screen pt-0 flex justify-center px-4">
      <div className="bg-white w-full max-w-2xl p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-black">REGISTRASI</h1>
<form onSubmit={handleRegister} className="flex flex-col gap-4 text-black">
  
  {/* Username */}
  <div>
    <label className="block text-sm font-semibold">Username *</label>
    <input type="text" placeholder="Username" onChange={(e) => setFormData({...formData, username: e.target.value})} className="w-full border p-2 rounded" required />
  </div>

  {/* Password */}
  <div>
    <label className="block text-sm font-semibold">Password *</label>
    <input type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full border p-2 rounded" required />
  </div>

  {/* Konfirmasi Password */}
  <div>
    <label className="block text-sm font-semibold">Konfirmasi Password *</label>
    <input type="password" placeholder="Konfirmasi Password" onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} className="w-full border p-2 rounded" required />
  </div>

  {/* No. HP */}
  <div>
    <label className="block text-sm font-semibold">No. HP *</label>
    <input type="text" placeholder="08xxxxxxxxxxx" onChange={(e) => setFormData({...formData, no_hp: e.target.value})} className="w-full border p-2 rounded" required />
  </div>
          
  {/* Bank (sudah ada labelnya) */}
  <div>
    <label className="block text-sm font-semibold mb-2">Bank *</label>
    <div className="grid grid-cols-3 gap-2">
      {banks.map(bank => (
        <button key={bank} type="button" onClick={() => setFormData({...formData, bank})} className={`p-2 border rounded text-xs ${formData.bank === bank ? 'bg-yellow-500 text-white' : 'bg-gray-100'}`}>
          {bank}
        </button>
      ))}
    </div>
  </div>

  {/* Nama Rekening */}
  <div>
    <label className="block text-sm font-semibold">Nama Rekening *</label>
    <input type="text" placeholder="Nama pemilik rekening" onChange={(e) => setFormData({...formData, nama_rekening: e.target.value})} className="w-full border p-2 rounded" required />
  </div>

  {/* Nomor Rekening */}
  <div>
    <label className="block text-sm font-semibold">Nomor Rekening *</label>
    <input type="text" placeholder="Nomor Rekening" onChange={(e) => setFormData({...formData, nomor_rekening: e.target.value})} className="w-full border p-2 rounded" required />
  </div>

  {/* Kode Referral */}
  <div>
    <label className="block text-sm font-semibold">Kode Referral</label>
    <input type="text" placeholder="Masukkan kode jika ada" onChange={(e) => setFormData({...formData, kode_referral: e.target.value})} className="w-full border p-2 rounded" />
  </div>
  
  <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold p-3 rounded mt-4">
    Register
  </button>
</form>
      </div>
    </main>
  );
}