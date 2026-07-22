'use client';

import { usePathname } from 'next/navigation';
import Marquee from "./Marquee"; 

export default function ConditionalMarquee() {
  const pathname = usePathname();

  // Jika sedang di halaman /register, Marquee tidak ditampilkan (null)
  if (pathname === '/register') {
    return null;
  }

  // Jika bukan di halaman /register, tampilkan Marquee
  return <Marquee />;
}