import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // MENGGUNAKAN ENVIRONMENT VARIABLE (AMAN DARI GITHUB)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Cari user berdasarkan username
    const { data: member, error } = await supabase
      .from('members')
      .select('*')
      .eq('username', username)
      .eq('password', password) // Catatan: Sebaiknya gunakan hashing password di masa depan
      .single();

    if (error || !member) {
      return NextResponse.json({ error: "Username atau password salah" }, { status: 401 });
    }

    return NextResponse.json({ success: true, member });
  } catch (err: any) {
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}