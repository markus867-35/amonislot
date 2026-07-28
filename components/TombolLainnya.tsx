'use client';
import { useState, useRef, useEffect } from 'react';
import { FaEllipsisH, FaChevronDown } from 'react-icons/fa';
import * as FaIcons from 'react-icons/fa';

interface DropdownItem {
  name: string;
  link: string;
  icon?: string;
}

export default function TombolLainnya() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const menuList: DropdownItem[] = [
    { name: 'RTP 99%', link: '#', icon: 'https://i.ibb.co/3s3gJ3G/chip.png' },
    { name: 'PREDIKSI TOGEL', link: '#', icon: 'https://i.ibb.co/3s3gJ3G/chip.png' },
    { name: 'BUKTI PEMBAYARAN', link: '#', icon: 'https://i.ibb.co/3s3gJ3G/chip.png' },
    { name: 'LINK ALTERNATIF 1', link: '#', icon: 'https://i.ibb.co/3s3gJ3G/chip.png' },
    { name: 'LINK ALTERNATIF 2', link: '#', icon: 'https://i.ibb.co/3s3gJ3G/chip.png' },
    { name: 'GRUP FACEBOOK', link: '#', icon: 'FaFacebookF' },
    { name: 'INFO JALAWIN', link: '#', icon: 'FaTelegramPlane' },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderIcon = (icon?: string) => {
    if (!icon) return <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex-shrink-0" />;

    if (icon.startsWith('http') || icon.startsWith('/')) {
      return <img src={icon} alt="icon" className="w-7 h-7 object-contain rounded-full flex-shrink-0" />;
    }

    const IconComp = (FaIcons as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[icon];
    if (IconComp) {
      return <IconComp size={18} className="text-yellow-400 flex-shrink-0" />;
    }

    return <div className="w-7 h-7 rounded-full bg-yellow-500/20 flex-shrink-0" />;
  };

  return (
    <div className="relative inline-block text-left w-full" ref={dropdownRef}>
      
      {/* Tombol Utama (TAMBAHKAN type="button" DI SINI) */}
      <button 
        type="button" 
        onClick={() => setIsOpen(!isOpen)}
        className="glossy-button relative group overflow-hidden w-full flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 border border-yellow-400 text-black py-3 rounded text-xs font-bold uppercase transition-all duration-300 shadow-[0_0_15px_rgba(234,179,8,0.4)] cursor-pointer"
      >
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12"></div>

        <span className="relative z-10 flex items-center gap-2">
          <FaEllipsisH /> Lainnya <FaChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} size={10} />
        </span>
      </button>

      {/* Kotak Dropdown Menu yang Diperlebar dan Dirapikan */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-[#1a0525] border border-yellow-600/50 rounded-xl shadow-2xl z-50 overflow-hidden">
          <div className="max-h-100 overflow-y-auto divide-y divide-purple-900/40 p-2 custom-scrollbar">
            {menuList.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-yellow-500/10 text-white transition text-xs font-bold uppercase"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                  {renderIcon(item.icon)}
                </div>
                <span className="truncate tracking-wider">{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}