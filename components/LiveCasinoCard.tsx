// components/LiveCasinoCard.tsx
export default function LiveCasinoCard({ name, image }: { name: string, image: string }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-purple-800 bg-[#0f001a] group hover:border-blue-500 transition-all">
      {/* Gambar Dealer/Game */}
      <img src={image} alt={name} className="w-full h-40 object-cover" />
      
      {/* Badge "MAIN" atau Info Tambahan */}
      <div className="absolute top-2 left-2 bg-black/60 px-2 py-1 rounded text-[10px] text-white font-bold border border-white/20">
        LIVE
      </div>

      {/* Area Nama Provider */}
      <div className="p-3 bg-gradient-to-b from-[#1a0033] to-[#0f001a]">
        <h3 className="text-white font-bold text-sm">{name}</h3>
      </div>
      
      {/* Tombol Mainkan */}
      <div className="absolute inset-x-0 bottom-0 bg-blue-900/90 py-2 text-center text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">
        MAIN SEKARANG
      </div>
    </div>
  );
}