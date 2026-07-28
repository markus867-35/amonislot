'use client';
import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { FaChevronUp } from 'react-icons/fa';
import * as FaIcons from 'react-icons/fa';

export default function BottomNavMember() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isLainnyaOpen, setIsLainnyaOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Daftar menu untuk popup "LAINNYA" versi member
  const subMenuList = [
    { name: 'RTP 99%', link: '#', icon: 'https://i.ibb.co/3s3gJ3G/chip.png' },
    { name: 'PREDIKSI TOGEL', link: '#', icon: 'https://i.ibb.co/3s3gJ3G/chip.png' },
    { name: 'BUKTI PEMBAYARAN', link: '#', icon: 'https://i.ibb.co/3s3gJ3G/chip.png' },
    { name: 'LINK ALTERNATIF 1', link: '#', icon: 'https://i.ibb.co/3s3gJ3G/chip.png' },
    { name: 'LINK ALTERNATIF 2', link: '#', icon: 'https://i.ibb.co/3s3gJ3G/chip.png' },
    { name: 'GRUP FACEBOOK', link: '#', icon: 'FaFacebookF' },
    { name: 'INFO JALAWIN', link: '#', icon: 'FaTelegramPlane' },
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Tutup popup jika mengklik di luar area nav (Sudah ditambahkan tipe MouseEvent)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsLainnyaOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isMounted) return null;

const navItems = [
    { 
      name: "PERMAINAN", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-dices w-10 h-7">
          <rect width="12" height="12" x="2" y="10" rx="2" ry="2"></rect>
          <path d="m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6"></path>
          <path d="M6 18h.01"></path>
          <path d="M10 14h.01"></path>
          <path d="M15 6h.01"></path>
          <path d="M18 9h.01"></path>
        </svg>
      ), 
      path: "/dashboard" 
    },
    { 
     name: "PROMOSI", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-gift w-10 h-7">
          <rect x="3" y="8" width="18" height="4" rx="1"></rect>
          <path d="M12 8v13"></path>
          <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"></path>
          <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"></path>
        </svg>
      ), 
      path: "/promosi" 
    },
    { 
      name: "PROFILE", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-user w-10 h-7">
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="10" r="3"></circle>
          <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path>
        </svg>
      ), 
      path: "/dashboard/profile" 
    },
    { 
      name: "HUBUNGI", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-headset w-10 h-7">
          <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z"></path>
          <path d="M21 16v2a4 4 0 0 1-4 4h-5"></path>
        </svg>
      ), 
      path: "/hubungi" 
    },
    { 
      name: "LAINNYA", 
      icon: (
        <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24 w-10 h-7">
          <circle cx="5" cy="12" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="19" cy="12" r="2" />
        </svg>
      ), 
      path: "/lainnya" 
    },
  ];

  const renderSubIcon = (icon: string) => {
    if (!icon) return <div className="w-7 h-7 rounded-full bg-yellow-500/20 flex-shrink-0" />;
    if (icon.startsWith('http') || icon.startsWith('/')) {
      return <img src={icon} alt="icon" className="w-7 h-7 object-contain rounded-full flex-shrink-0" />;
    }
    const IconComp = (FaIcons as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[icon];
    if (IconComp) {
      return <IconComp size={16} className="text-yellow-400 flex-shrink-0" />;
    }
    return <div className="w-7 h-7 rounded-full bg-yellow-500/20 flex-shrink-0" />;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none" ref={menuRef}>
      
      {/* POPUP MENU LAINNYA KE ATAS TANPA SCROLL BAR */}
      {isLainnyaOpen && (
        <div className="absolute bottom-full left-4 right-4 mb-3 max-w-xl mx-auto bg-[#1a0525] border border-yellow-600/50 rounded-xl shadow-2xl overflow-hidden pointer-events-auto animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="divide-y divide-purple-900/40 p-2">
            {subMenuList.map((subItem, idx) => (
              <a
                key={idx}
                href={subItem.link}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-yellow-500/10 text-white transition text-xs font-bold uppercase"
                onClick={() => setIsLainnyaOpen(false)}
              >
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                  {renderSubIcon(subItem.icon)}
                </div>
                <span className="truncate tracking-wider">{subItem.name}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* NAVBAR BAWAH MEMBER */}
      <div className="pointer-events-auto w-full max-w-xl bg-transparent backdrop-blur-md border-t border-purple-800/50 shadow-[0_-4px_20px_rgba(0,0,0,0.8)] px-1 py-5 flex items-center justify-around rounded-t-2xl">
        {navItems.map((item) => {
          const isActive = pathname === item.path;

          if (item.name === "LAINNYA") {
            return (
              <button
                key={item.name}
                onClick={() => setIsLainnyaOpen(!isLainnyaOpen)}
                className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all ${
                  isLainnyaOpen
                    ? "bg-yellow-400 text-black font-bold shadow-[0_0_12px_rgba(234,179,8,0.6)] scale-105"
                    : "text-white hover:text-yellow-400"
                }`}
              >
                <span className="mb-0.5 flex items-center justify-center">{item.icon}</span>
                <span className="text-[10px] tracking-wider font-semibold flex items-center gap-0.5">
                  {item.name} <FaChevronUp size={7} className={`transition-transform duration-300 ${isLainnyaOpen ? 'rotate-180' : ''}`} />
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.name}
              onClick={() => {
                setIsLainnyaOpen(false);
                router.push(item.path);
              }}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all ${
                isActive
                  ? "bg-yellow-400 text-black font-bold shadow-[0_0_12px_rgba(234,179,8,0.6)] scale-105"
                  : "text-white hover:text-yellow-400"
              }`}
            >
              <span className="mb-0.5 flex items-center justify-center">{item.icon}</span>
              <span className="text-[10px] tracking-wider font-semibold">{item.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
} 