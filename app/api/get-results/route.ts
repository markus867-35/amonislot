import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET() {
  try {
    // 1. Ambil halaman HTML dari situs target
    const response = await fetch('https://on.kamuskeluaran', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Gagal terhubung ke situs target');
    }

    const html = await response.text();

    // 2. Load HTML menggunakan Cheerio untuk membaca elemennya
    const $ = cheerio.load(html);
    const scrapedData: any[] = [];

    // Sesuaikan selector CSS ini dengan struktur HTML asli dari situs 'on.kamuskeluaran'
    // Contoh berdasarkan elemen card yang Anda berikan sebelumnya:
    $('.col').each((i, el) => {
      const name = $(el).find('.card-title').text().trim();
      const liveDrawUrl = $(el).find('a').attr('href') || '';
      
      // Ambil teks dari footer (tanggal dan result)
      const footerText = $(el).find('.card-footer').text().trim();
      // Anda bisa memecah string footerText jika ingin memisahkan tanggal dan result angka

      if (name) {
        scrapedData.push({
          name: name,
          result: footerText || '0000',
          liveDrawUrl: liveDrawUrl.startsWith('http') ? liveDrawUrl : `https://on.kamuskeluaran/${liveDrawUrl}`,
        });
      }
    });

    // Jika struktur otomatis di atas belum mendeteksi elemen karena kelas CSS berbeda, 
    // Anda bisa menyesuaikan selector $(el) sesuai klik kanan -> Inspect Element pada situs tersebut.

    return NextResponse.json({ success: true, data: scrapedData });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Gagal melakukan scraping data' }, { status: 500 });
  }
}