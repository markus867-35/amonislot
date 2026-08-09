import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Inisialisasi Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export async function GET(request: Request) {
  try {
    // 1. Ambil parameter URL (contoh: ?key=ABONG123)
    const url = new URL(request.url);
    const key = url.searchParams.get('key');

    // 2. Validasi Kunci Rahasia
    const SECRET_KEY = 'AMONI123'; // Anda bisa menyimpannya di environment variable juga (process.env.ROBOT_KEY)
    if (key !== SECRET_KEY) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Key salah atau tidak valid' },
        { status: 401 }
      );
    }

    // 3. Logika yang ingin dijalankan saat link diakses
    // Contoh: Mengambil data markets atau melakukan sesuatu di database
    const { data, error } = await supabase
      .from('markets')
      .select('*');

    if (error) {
      throw error;
    }

    // 4. Berhasil
    return NextResponse.json({
      success: true,
      message: 'Robot berhasil mengeksekusi perintah!',
      data: data,
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}