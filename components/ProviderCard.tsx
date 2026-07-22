export default function ProviderCard({ name, image }: { name: string, image: string }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-purple-800 bg-black group hover:border-yellow-500 transition-all">
      {/* Gambar Latar Belakang */}
      <img src={image} alt={name} className="w-full h-32 object-cover opacity-80" />
      
      {/* Overlay Gelap untuk teks */}
      <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black to-transparent">
        <h3 className="text-white font-bold text-sm">{name}</h3>
      </div>
      
      {/* Tombol Mainkan Sekarang */}
      <div className="absolute inset-x-0 bottom-0 bg-purple-900/90 py-2 text-center text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">
        MAINKAN SEKARANG
      </div>
    </div>
  );
}