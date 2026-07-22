// components/PartnerSection.tsx
export default function PartnerSection() {
  const partners = ["Mandiri", "Dana", "Ovo", "Gopay", "BSI", "BCA", "BNI"];

  return (
    <section className="bg-[#1a0033]/50 p-6 rounded-2xl border border-purple-800 shadow-xl mt-8">
      <h3 className="text-purple-400 text-xs font-bold mb-4 uppercase tracking-widest text-center">
        Partner Resmi
      </h3>
      <div className="flex flex-wrap justify-center gap-4">
        {partners.map((partner) => (
          <div key={partner} className="bg-white/10 px-4 py-2 rounded border border-purple-700 text-white text-xs font-bold">
            {partner.toUpperCase()}
          </div>
        ))}
      </div>
    </section>
  );
}