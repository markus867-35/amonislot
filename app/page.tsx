import HeroSlider from "@/components/HeroSlider";
import MobileLogin from "@/components/MobileLogin"; 
import CategoryMenu from "@/components/CategoryMenu";
import GameCard from "@/components/GameCard";
import TotoCard from "@/components/TotoCard";
import ProviderCard from "@/components/ProviderCard";
import LiveCasinoCard from "@/components/LiveCasinoCard";
import SportCard from "@/components/SportCard";
import VirtualCard from "@/components/VirtualCard";
import FishingCard from "@/components/FishingCard";
import CrashCard from "@/components/CrashCard";
import FooterInfo from "@/components/FooterInfo";
import PartnerSection from "@/components/PartnerSection";

export default function Home() {
  return (
    <main className="w-full bg-[#0f001a] min-h-screen">
      {/* Bagian Slider */}
      <HeroSlider />
      
      {/* Form Login khusus Mobile (Tampil di bawah slider, hilang di desktop) */}
      <MobileLogin />
      
      {/* Menu Kategori Sticky */}
      <CategoryMenu />

      <div className="p-4 md:p-6 space-y-8">
        
        {/* Bagian Paling Populer */}
        <section id="section-populer" className="bg-[#1a0033]/50 p-5 rounded-2xl border border-purple-800 shadow-xl">
          <h2 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
            🔥 PALING POPULER
          </h2>
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
            <div className="flex gap-4">
              <GameCard title="WILD BANDITO" provider="PG SOFT" image="/game1.jpg" />
              <GameCard title="MAHJONG WAYS 2" provider="PG SOFT" image="/game2.jpg" />
              <GameCard title="FORTUNE OX" provider="PG SOFT" image="/game3.jpg" />
            </div>
          </div>
        </section>

        {/* Bagian Toto Games dengan Frame Border */}
        <section id="section-toto" className="bg-[#1a0033]/50 p-5 rounded-2xl border border-purple-800 shadow-xl">
          <h2 className="text-white font-bold text-lg mb-6">🎱 TOTO GAMES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <TotoCard name="SINGAPORE POOLS" date="2026-06-24" open="17:45" close="17:25" code="5950" />
            <TotoCard name="HONGKONG LOTTO" date="2026-06-13" open="23:00" close="22:30" code="3372" />
            <TotoCard name="HONGKONG LOTTO" date="2026-06-13" open="23:00" close="22:30" code="3372" />
            <TotoCard name="HONGKONG LOTTO" date="2026-06-13" open="23:00" close="22:30" code="3372" />
          </div>
        </section>

        {/* Bagian Slot Games */}
        <section id="section-slot" className="bg-[#1a0033]/50 p-5 rounded-2xl border border-purple-800 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white font-bold text-lg flex items-center gap-2">
              🎰 SLOT GAMES
            </h2>
            <input 
              type="text" 
              placeholder="Cari game..." 
              className="bg-black border border-purple-800 text-white text-xs px-3 py-1 rounded-full outline-none" 
            />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ProviderCard name="PRAGMATIC" image="/pragmatic.jpg" />
            <ProviderCard name="PG SOFT" image="/pgsoft.jpg" />
            <ProviderCard name="HABANERO" image="/habanero.jpg" />
            <ProviderCard name="JILI" image="/jili.jpg" />
          </div>
        </section>


{/* Bagian Live Casino */}
<section id="section-live" className="bg-[#1a0033]/50 p-5 rounded-2xl border border-purple-800 shadow-xl">
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-white font-bold text-lg flex items-center gap-2">
      ♠️ LIVE CASINO
    </h2>
    <input 
      type="text" 
      placeholder="Cari game..." 
      className="bg-black border border-purple-800 text-white text-xs px-3 py-1 rounded-full outline-none" 
    />
  </div>
  
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    <LiveCasinoCard name="EVOLUTION" image="/evolution.jpg" />
    <LiveCasinoCard name="PRAGMATIC LIVE" image="/pragmatic-live.jpg" />
    <LiveCasinoCard name="SEC " image="/sec.jpg" />
    <LiveCasinoCard name="ALLBET" image="/allbet.jpg" />
    {/* Tambahkan LiveCasinoCard lainnya di sini */}
  </div>
</section>


{/* Section Sport Games */}
<section id="section-sport" className="bg-[#1a0033]/50 p-5 rounded-2xl border border-purple-800 shadow-xl">
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-white font-bold text-lg flex items-center gap-2">
      ⚽ SPORT GAMES
    </h2>
    <input 
      type="text" 
      placeholder="Cari game..." 
      className="bg-black border border-purple-800 text-white text-xs px-3 py-1 rounded-full outline-none" 
    />
  </div>
  
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    <SportCard name="CMD368" image="/cmd368.jpg" />
    <SportCard name="PINNACLE" image="/pinnacle.jpg" />
    <SportCard name="SABASPORT" image="/sabasport.jpg" />
    <SportCard name="SBOBET" image="/sbobet.jpg" />
    <SportCard name="UNITED GAMING" image="/ug.jpg" />
  </div>
</section>


{/* Section Virtual Games */}
<section id="section-virtual" className="bg-[#1a0033]/50 p-5 rounded-2xl border border-purple-800 shadow-xl">
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-white font-bold text-lg flex items-center gap-2">
      🎮 VIRTUAL GAMES
    </h2>
    <input 
      type="text" 
      placeholder="Cari game..." 
      className="bg-black border border-purple-800 text-white text-xs px-3 py-1 rounded-full outline-none" 
    />
  </div>
  
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    <VirtualCard name="PRAGMATIC" image="/virtual-pragmatic.jpg" />
    <VirtualCard name="JOKER" image="/virtual-joker.jpg" />
    <VirtualCard name="PLAY'N GO" image="/virtual-playngo.jpg" />
    <VirtualCard name="HABANERO" image="/virtual-habanero.jpg" />
  </div>
</section>



{/* Section Fishing Games */}
<section id="section-fishing" className="bg-[#1a0033]/50 p-5 rounded-2xl border border-purple-800 shadow-xl">
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-white font-bold text-lg flex items-center gap-2">
      🎣 FISHING GAMES
    </h2>
    <input 
      type="text" 
      placeholder="Cari game..." 
      className="bg-black border border-purple-800 text-white text-xs px-3 py-1 rounded-full outline-none" 
    />
  </div>
  
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    <FishingCard name="CQ9 GAMING" image="/cq9.jpg" />
    <FishingCard name="FA CHAI" image="/fachai.jpg" />
    <FishingCard name="JILI" image="/jili-fish.jpg" />
    <FishingCard name="JOKER" image="/joker-fish.jpg" />
    <FishingCard name="MICROGAMING" image="/mg-fish.jpg" />
    <FishingCard name="RICH88" image="/rich88.jpg" />
    <FishingCard name="SPADEGAMING" image="/spade.jpg" />
    <FishingCard name="WM SLOT" image="/wm-fish.jpg" />
  </div>
</section>


{/* Section Crash Games */}
<section id="section-crash" className="bg-[#1a0033]/50 p-5 rounded-2xl border border-purple-800 shadow-xl">
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-white font-bold text-lg flex items-center gap-2">
      🚀 CRASH GAMES
    </h2>
    <input 
      type="text" 
      placeholder="Cari game..." 
      className="bg-black border border-purple-800 text-white text-xs px-3 py-1 rounded-full outline-none" 
    />
  </div>
  
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    <CrashCard name="AVIATOR" image="/aviator.jpg" />
    <CrashCard name="DRAGOON SOFT" image="/dragoon.jpg" />
    <CrashCard name="IN OUT" image="/inout.jpg" />
    <CrashCard name="JOKER" image="/joker-crash.jpg" />
    <CrashCard name="MICROGAMING" image="/mg-crash.jpg" />
    <CrashCard name="SMART SOFT" image="/smartsoft.jpg" />
    <CrashCard name="SPADEGAMING" image="/spade-crash.jpg" />
    <CrashCard name="PRAGMATIC" image="/pragmatic-crash.jpg" />
  </div>
</section>
<PartnerSection />
<FooterInfo />
      </div>
    </main>
  );
}