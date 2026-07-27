'use client'; // Ubah layout menjadi client component agar bisa mendeteksi localStorage
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header"; 
import ConditionalBottomNav from "@/components/ConditionalBottomNav";
import FloatingWidget from '@/components/FloatingWidget';
import ConditionalMarquee from "@/components/ConditionalMarquee";
import LiveNotification from '@/components/LiveNotification';
import { useState, useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        {/* 
          - Mobile: bg-transparent (tanpa warna background sama sekali)
          - Desktop (md:): Bisa diberi background atau tetap transparan sesuai kebutuhan
        */}
        <div className={`w-full md:max-w-[1200px] bg-transparent md:bg-transparent md:shadow-2xl relative transition-all ${
          !isLoggedIn ? 'pb-5' : 'pb-24 md:pb-0'
        }`}>
          <Header />
          <ConditionalMarquee />


          
          <main className="bg-transparent">{children}</main>
          <LiveNotification />

          <FloatingWidget />
          <ConditionalBottomNav />
        </div>
      </body>
    </html>
  );
}