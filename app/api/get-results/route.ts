import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 1. Ambil halaman HTML dari situs target
    const response = await fetch('https://on.kamuskeluaran', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      cache: 'no-store', // Pastikan data selalu fresh
    });

    const html = await response.text();

    // 2. Lakukan parsing / ekstrak data dari HTML tersebut
    // (Contoh sederhana: Mengembalikan status sukses agar bisa diatur di frontend)
    // Jika Anda ingin mengambil angka spesifik, struktur parsing HTML disesuaikan dengan elemen situs target.
    
    // Sebagai contoh format data yang dikembalikan ke frontend:
    const scrapedData = [
      { name: "TURKI", result: "6216", liveDrawUrl: "https://turkipools.net/" },
      { name: "MAROKO", result: "6075", liveDrawUrl: "https://marokopools.com/" },
    ];

    return NextResponse.json({ success: true, data: scrapedData });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Gagal mengambil data dari situs luar' }, { status: 500 });
  }
}