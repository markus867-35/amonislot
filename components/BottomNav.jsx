'use client';
import { usePathname, useRouter } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: "BERANDA", icon: "🏠", path: "/" },
    { name: "PROMOSI", icon: "🎁", path: "/promosi" },
    { name: "HUBUNGI", icon: "🎧", path: "/hubungi" },
    { name: "LAINNYA", icon: "⋯", path: "/lainnya" },
  ];

  return (
    // Menggunakan fixed bottom-0 left-0 right-0 agar melebar penuh dari kiri ke kanan
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-[#120024]/85 backdrop-blur-md border-t border-purple-800/50 shadow-[0_-4px_20px_rgba(0,0,0,0.8)] px-4 py-2.5 flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <button
              key={item.name}
              onClick={() => router.push(item.path)}
              className={`flex flex-col items-center justify-center py-1 px-4 rounded-xl transition-all ${
                isActive
                  ? "bg-yellow-400 text-black font-bold shadow-[0_0_12px_rgba(234,179,8,0.6)] scale-105"
                  : "text-white hover:text-yellow-400"
              }`}
            >
              <span className="text-xl mb-0.5">{item.icon}</span>
              <span className="text-[10px] tracking-wider">{item.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}