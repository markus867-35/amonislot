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

    // Menggunakan jembatan proxy publik agar Vercel tidak diblokir oleh situs target
    const targetUrl = 'https://on.kamuskeluaran.live';
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`;

    const response = await fetch(proxyUrl, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Gagal terhubung melalui proxy (Status: ${response.status})`);
    }

    const html = await response.text();
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
      throw new Error('Data gagal dibaca, struktur elemen HTML tidak ditemukan');
    }

    // Simpan otomatis ke Supabase
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
      message: 'Robot berhasil scraping lewat proxy dan memperbarui database!',
      data: scrapedData,
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}