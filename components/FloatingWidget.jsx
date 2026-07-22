'use client';
import { FaWhatsapp, FaComments, FaTelegramPlane, FaCrown } from 'react-icons/fa';

const menuItems = [
  { id: 1, text: 'RTP SLOT', icon: FaCrown, color: 'bg-red-600' },
  { id: 2, text: 'TELEGRAM', icon: FaTelegramPlane, color: 'bg-sky-500' },
  { id: 3, text: 'LIVE CHAT', icon: FaComments, color: 'bg-emerald-500' },
  { id: 4, text: 'WHATSAPP', icon: FaWhatsapp, color: 'bg-green-600' },
];

export default function FloatingMenu() {
  return (
    <div className="fixed right-3 bottom-20 md:left-0 md:right-auto md:top-1/2 md:-translate-y-1/2 md:bottom-auto z-50 flex flex-col gap-3 py-4">
      {menuItems.slice(0, 3).map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            /* 
              - md:-left-7: Menggeser sedikit ke kiri agar bagian lengkung ikon keluar menempel di tepi layar.
              - md:rounded-r-full: Membuat sisi kanannya melengkung sempurna.
            */
            className="group relative -left-0 md:-left-5 md:hover:left-0 flex flex-row-reverse items-center justify-center md:justify-end bg-[#1a0b2e] border-2 border-yellow-500 rounded-full md:rounded-l-lg md:rounded-r-full shadow-lg cursor-pointer overflow-hidden w-14 md:w-22 md:hover:w-48 transition-all duration-300 ease-out h-14"
          >
            {/* Bagian Ikon */}
            <div className={`flex items-center justify-center shrink-0 w-16 h-14 rounded-full ${item.color} border-2 border-yellow-400 md:group-hover:scale-105 transition-transform md:ml-1`}>
              <Icon className="w-7 h-7 text-white" />
            </div>

            {/* Bagian Teks */}
            <div className="hidden md:flex items-center pl-4 whitespace-nowrap overflow-hidden w-0 md:group-hover:w-32 transition-all duration-300 ease-out opacity-0 md:group-hover:opacity-100">
              <span className="text-yellow-300 font-bold text-sm tracking-wider">
                {item.text}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}