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
  const menuRef = useRef(null);

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

  // Tutup popup jika mengklik di luar area nav
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
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
        <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M112 0C49.9 0 0 49.9 0 112L0 400c0 62.1 49.9 112 112 112l288 0c62.1 0 112-49.9 112-112l0-288c0-62.1-49.9-112-112-112L112 0zM160 144a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm96 96a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM184 344a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM328 144a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm32 152a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"/>
        </svg>
      ), 
      path: "/dashboard" 
    },
    { 
      name: "PROMOSI", 
      icon: (
        <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M190.2 32.1C182.3 22.8 170.8 17.5 158.7 17.5C132.8 17.5 112 38.3 112 64C112 84.1 125 101.2 143.2 107.1L96 160L32 160C14.3 160 0 174.3 0 192L0 224C0 232.8 7.2 240 16 240L496 240C504.8 240 512 232.8 512 224L512 192C512 174.3 497.7 160 480 160L416 160L368.8 107.1C387 101.2 400 84.1 400 64C400 38.3 379.2 17.5 353.3 17.5C341.2 17.5 329.7 22.8 321.8 32.1L256 109.1L190.2 32.1zM48 288L48 464C48 490.5 69.5 512 96 512L416 512C442.5 512 464 490.5 464 464L464 288L288 288L288 416L224 416L224 288L48 288z"/>
        </svg>
      ), 
      path: "/promosi" 
    },
    { 
      name: "PROFILE", 
      icon: (
        <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/>
        </svg>
      ), 
      path: "/profile" 
    },
    { 
      name: "HUBUNGI", 
      icon: (
        <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M256 32C132.3 32 32 132.3 32 256l0 96c0 35.3 28.7 64 64 64l32 0c17.7 0 32-14.3 32-32l0-128c0-17.7-14.3-32-32-32l-32 0 0-32c0-106 86-192 192-192s192 86 192 192l0 32-32 0c-17.7 0-32 14.3-32 32l0 128c0 17.7 14.3 32 32 32l32 0c35.3 0 64-28.7 64-64l0-96C480 132.3 379.7 32 256 32zM96 352l0 32-32 0c-17.7 0-32-14.3-32-32l0-32 64 0zm384 32l0-32 64 0 0 32c0 17.7-14.3 32-32 32l-32 0 0-32z"/>
        </svg>
      ), 
      path: "/hubungi" 
    },
    { 
      name: "LAINNYA", 
      icon: (
        <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <circle cx="5" cy="12" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="19" cy="12" r="2" />
        </svg>
      ), 
      path: "/lainnya" 
    },
  ];

  const renderSubIcon = (icon) => {
    if (!icon) return <div className="w-7 h-7 rounded-full bg-yellow-500/20 flex-shrink-0" />;
    if (icon.startsWith('http') || icon.startsWith('/')) {
      return <img src={icon} alt="icon" className="w-7 h-7 object-contain rounded-full flex-shrink-0" />;
    }
    const IconComp = FaIcons[icon];
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
      <div className="pointer-events-auto w-full max-w-xl bg-[#120024]/90 backdrop-blur-md border-t border-purple-800/50 shadow-[0_-4px_20px_rgba(0,0,0,0.8)] px-4 py-3 flex items-center justify-around rounded-t-2xl">
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