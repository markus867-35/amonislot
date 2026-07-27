'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import BottomNav from '@/components/BottomNav';             // Khusus Tamu (Mobile)
import BottomNavMember from '@/components/BottomNavMember'; // Khusus Member

export default function ConditionalBottomNav() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const checkLoginStatus = () => {
      // Cek penanda login murni dari localStorage
      const userLoggedIn = localStorage.getItem('isLoggedIn');
      const token = 
        localStorage.getItem('token') || 
        localStorage.getItem('member_token') || 
        localStorage.getItem('supabase.auth.token') ||
        localStorage.getItem('access_token') ||
        localStorage.getItem('user');

      // Jika ada penanda login atau token, berarti dia member
      if (userLoggedIn || token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();

    // Listener agar status langsung sinkron real-time
    window.addEventListener('storage', checkLoginStatus);
    window.addEventListener('loginStateChanged', checkLoginStatus);
    
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('loginStateChanged', checkLoginStatus);
    };
  }, [pathname]);

  if (!isMounted) return null;

  // Jika sudah login: Tampilkan BottomNav Member
  if (isLoggedIn) {
    return <BottomNavMember />;
  }

  // Jika belum login: Tampilkan BottomNav Tamu di halaman manapun (termasuk Promosi, Hubungi, dll)
  return <BottomNav />;
}