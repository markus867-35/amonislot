'use client';

const menuItems = [
  { 
    id: 3, 
    text: 'LIVE CHAT', 
    icon: 'https://i.postimg.cc/MK6JrYcC/speech-bubble.gif', 
    color: 'bg-emerald-500',
    link: 'https://v.kirim.email/livechat', // <-- Masukkan URL Live Chat di sini
    showMobile: true 
  },
  { 
    id: 4, 
    text: 'WHATSAPP', 
    icon: 'https://img-mgscorp.kangpermen13.workers.dev/whatsapp-converter.webp', 
    
    link: 'https://wa.me/nomorwhatsappanda', // <-- Masukkan URL WhatsApp di sini
    showMobile: true 
  },
  { 
    id: 1, 
    text: 'RTP SLOT', 
    icon: 'https://iili.io/3m6tiXf.gif', 
    color: 'bg-red-600',
    link: '/rtp', // <-- Masukkan URL halaman RTP di sini (bisa link internal/eksternal)
    showMobile: true 
  },
  { 
    id: 2, 
    text: 'TELEGRAM', 
    icon: 'https://img-mgscorp.kangpermen13.workers.dev/telegram-converter.webp', 
    
    link: 'https://t.me/namagruptelegram', // <-- Masukkan URL Telegram di sini
    showMobile: false 
  },
];

export default function FloatingMenu() {
  return (
    <div className="fixed right-3 bottom-20 md:left-0 md:right-auto md:top-1/3 md:-translate-y-1/2 md:bottom-auto z-50 flex flex-col gap-3 py-4">
      {menuItems.map((item) => {
        return (
          <a
            key={item.id}
            href={item.link}
            target={item.link.startsWith('http') ? '_blank' : '_self'}
            rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
            className={`group relative -left-0 md:-left-5 md:hover:left-0 flex flex-row-reverse items-center justify-center md:justify-end bg-[#1a0b2e] border-2 border-yellow-500 rounded-full md:rounded-l-lg md:rounded-r-full shadow-lg cursor-pointer overflow-hidden w-14 md:w-22 md:hover:w-48 transition-all duration-300 ease-out h-14 ${
              item.showMobile ? 'flex' : 'hidden md:flex'
            }`}
          >
            {/* Bagian Gambar / GIF (Ukuran tetap utuh sesuai request) */}
            <div className={`flex items-center justify-center shrink-0 w-16 h-14 rounded-full ${item.color} border-2 border-yellow-400 md:group-hover:scale-105 transition-transform md:ml-1 overflow-hidden`}>
              <img 
                src={item.icon} 
                alt={item.text} 
                className="w-15 h-15 object-contain drop-shadow" 
              />
            </div>

            {/* Bagian Teks */}
            <div className="hidden md:flex items-center pl-4 whitespace-nowrap overflow-hidden w-0 md:group-hover:w-32 transition-all duration-300 ease-out opacity-0 md:group-hover:opacity-100">
              <span className="text-yellow-300 font-bold text-sm tracking-wider">
                {item.text}
              </span>
            </div>
          </a>
        );
      })}
    </div>
  );
}