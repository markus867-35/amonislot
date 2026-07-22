export default function GameCard({ title, provider, image }: { title: string, provider: string, image: string }) {
  return (
    <div className="bg-[#2d0059] p-3 rounded-xl border border-purple-800 hover:border-yellow-500 transition-all">
      <img src={image} alt={title} className="rounded-lg mb-2" />
      <h3 className="text-white font-bold text-sm">{title}</h3>
      <p className="text-purple-300 text-xs">{provider}</p>
    </div>
  );
}