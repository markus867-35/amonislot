import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import * as cheerio from 'cheerio';

// Inisialisasi Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export async function GET(request: Request) {
  try {
    // 1. Ambil parameter URL (contoh: ?key=AMONI123)
    const url = new URL(request.url);
    const key = url.searchParams.get('key');

    // 2. Validasi Kunci Rahasia
    const SECRET_KEY = 'AMONI123';
    if (key !== SECRET_KEY) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Key salah atau tidak valid' },
        { status: 401 }
      );
    }

    // 3. Logika Robot: Scraping data dari situs luar
    const response = await fetch('https://on.kamuskeluaran', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Gagal terhubung ke situs target luar');
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const scrapedData: any[] = [];

    $('.col').each((i, el) => {
      const name = $(el).find('.card-title').text().trim();
      const liveDrawUrl = $(el).find('a').attr('href') || '';
      const footerText = $(el).find('.card-footer').text().trim();

      if (name) {
        scrapedData.push({
          name: name,
          result: footerText || '0000',
          live_draw_url: liveDrawUrl.startsWith('http') ? liveDrawUrl : `https://on.kamuskeluaran/${liveDrawUrl}`,
        });
      }
    });

    // 4. (Opsional) Simpan atau perbarui data ke Supabase secara otomatis
    // Jika Anda ingin datanya langsung masuk ke tabel 'markets':
    for (const item of scrapedData) {
      await supabase
        .from('markets')
        .upsert({ name: item.name, result: item.result, live_draw_url: item.live_draw_url }, { onConflict: 'name' });
    }

    // 5. Respon Berhasil
    return NextResponse.json({
      success: true,
      message: 'Robot berhasil melakukan scraping dan memperbarui database!',
      data: scrapedData,
    });

   } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}