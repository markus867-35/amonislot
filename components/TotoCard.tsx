export default function TotoCard({ name, date, open, close, code }: any) {
  return (
    <div className="bg-[#1a0033] p-4 rounded-xl border border-purple-800">
      <h3 className="text-white font-bold mb-2">{name}</h3>
      <p className="text-gray-400 text-xs">Jam Buka: {open} | Tutup: {close}</p>
      <div className="bg-indigo-900 text-white font-bold text-center py-2 my-3 rounded">
        {code}
      </div>
      <button className="w-full bg-red-900 text-white py-1 rounded text-sm font-bold">Main</button>
    </div>
  );
}