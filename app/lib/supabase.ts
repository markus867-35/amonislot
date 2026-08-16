import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Tambahkan log ini untuk mengecek di terminal
console.log("SUPABASE_URL:", supabaseUrl ? "Terbaca ✅" : "KOSONG ❌");

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL atau Anon Key belum diset di .env.local!");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);