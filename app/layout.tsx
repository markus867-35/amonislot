'use client'; 
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header"; 
import ConditionalBottomNav from "@/components/ConditionalBottomNav";
import FloatingWidget from '@/components/FloatingWidget';
import ConditionalMarquee from "@/components/ConditionalMarquee";
import LiveNotification from '@/components/LiveNotification';
import { useState, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname(); 
  
  // Menambahkan '/versiwap' ke dalam pengecekan halaman khusus
  const isSpecialPage = pathname === '/terms' || pathname === '/prediksi' || pathname === '/versiwap';

  useEffect(() => {
    const checkLogin = () => {
      const token = 
        localStorage.getItem('token') || 
        localStorage.getItem('member_token') || 
        localStorage.getItem('supabase.auth.token') ||
        localStorage.getItem('isLoggedIn');
      setIsLoggedIn(!!token);
    };

    checkLogin();
    window.addEventListener('storage', checkLogin);
    window.addEventListener('loginStateChanged', checkLogin);
    return () => {
      window.removeEventListener('storage', checkLogin);
      window.removeEventListener('loginStateChanged', checkLogin);
    };
  }, []);

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-transparent`}>
      <body className="min-h-full flex flex-col items-center bg-[#0f001a]"> 
        
        <div className={`w-full md:max-w-[1200px] bg-transparent md:bg-transparent md:shadow-2xl relative transition-all ${
          !isLoggedIn || isSpecialPage ? 'pb-5' : 'pb-24 md:pb-0'
        }`}>
          
          {/* Header & Marquee disembunyikan total jika sedang di halaman khusus */}
          {!isSpecialPage && (
            <>
              <Header />
              <ConditionalMarquee />
            </>
          )}

          {/* Konten Halaman Aktif */}
          <main className="bg-transparent">{children}</main>

          {/* Notifikasi, Floating Widget, dan Navigasi Bawah disembunyikan total jika di halaman khusus */}
          {!isSpecialPage && (
            <>
              <LiveNotification />
              <FloatingWidget />
              <ConditionalBottomNav />
            </>
          )}

        </div>
      </body>
    </html>
  );
}