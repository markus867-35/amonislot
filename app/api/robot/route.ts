import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import * as cheerio from 'cheerio';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const key = url.searchParams.get('key');

    const SECRET_KEY = 'AMONI123';
    if (key !== SECRET_KEY) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Key salah atau tidak valid' },
        { status: 401 }
      );
    }

    // Menggunakan fetch langsung dengan header lengkap browser desktop agar tidak mudah dicurigai bot
    const response = await fetch('https://on.kamuskeluaran.live', {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Situs menolak koneksi (HTTP Status: ${response.status})`);
    }

    const html = await response.text();
    
    // Cek apakah terhalang halaman proteksi Cloudflare
    if (html.includes('cf-browser-verification') || html.includes('Turnstile')) {
      throw new Error('Gagal: Situs target dilindungi oleh Cloudflare Turnstile');
    }

    const $ = cheerio.load(html);
    const scrapedData: any[] = [];

    $('.col').each((i, el) => {
      const name = $(el).find('.card-title').text().trim();
      const liveDrawUrl = $(el).find('a').attr('href') || '';
      const footerText = $(el).find('.card-footer p').text().trim();

      if (name) {
        scrapedData.push({
          name: name,
          result: footerText || '0000',
          live_draw_url: liveDrawUrl.startsWith('http') ? liveDrawUrl : `https://on.kamuskeluaran.live/${liveDrawUrl}`,
        });
      }
    });

    if (scrapedData.length === 0) {
      throw new Error('Data tidak ditemukan, struktur HTML mungkin berubah atau terblokir');
    }

    // Simpan ke Supabase
    for (const item of scrapedData) {
      await supabase
        .from('markets')
        .upsert({ 
          name: item.name, 
          result: item.result, 
          live_draw_url: item.live_draw_url 
        }, { onConflict: 'name' });
    }

    return NextResponse.json({
      success: true,
      message: 'Robot sukses memperbarui database!',
      data: scrapedData,
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}