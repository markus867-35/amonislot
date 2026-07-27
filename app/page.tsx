import HeroSlider from "@/components/HeroSlider";
import MobileLogin from "@/components/MobileLogin"; 
import CategoryMenu from "@/components/CategoryMenu";
import TotoSection from "@/components/TotoSection";
import ProviderCard from "@/components/ProviderCard";
import LiveCasinoCard from "@/components/LiveCasinoCard";
import SportCard from "@/components/SportCard";
import VirtualCard from "@/components/VirtualCard";
import FishingCard from "@/components/FishingCard";
import CrashCard from "@/components/CrashCard";
import FooterInfo from "@/components/FooterInfo";
import PartnerSection from "@/components/PartnerSection";
import PopularSection from "@/components/PopularSection";

export default function Home() {
  return (
    <main className="w-full bg-transparent sm:bg-[#0f001a] min-h-screen pb-20">
      {/* Bagian Slider */}
      <HeroSlider />
      
      {/* Form Login khusus Mobile (Tampil di bawah slider, hilang di desktop) */}
      <MobileLogin />
      
      {/* Menu Kategori Sticky */}
      <CategoryMenu />

      <div className="p-2 md:p-6 space-y-4 md:space-y-8">
        
        {/* Bagian Paling Populer */}
        <PopularSection />

        {/* Bagian Toto Games */}
         <TotoSection />
        {/* Bagian Slot Games */}
        <section id="section-slot" className="game-section">
          <div className="flex justify-between items-center mb-3 sm:mb-6 px-2 sm:px-0">
            <h2 className="text-white font-bold text-base sm:text-lg flex items-center gap-2">
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
        <section id="section-live" className="game-section">
          <div className="flex justify-between items-center mb-3 sm:mb-6 px-2 sm:px-0">
            <h2 className="text-white font-bold text-base sm:text-lg flex items-center gap-2">
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
          </div>
        </section>

        {/* Section Sport Games */}
        <section id="section-sport" className="game-section">
          <div className="flex justify-between items-center mb-3 sm:mb-6 px-2 sm:px-0">
            <h2 className="text-white font-bold text-base sm:text-lg flex items-center gap-2">
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
        <section id="section-virtual" className="game-section">
          <div className="flex justify-between items-center mb-3 sm:mb-6 px-2 sm:px-0">
            <h2 className="text-white font-bold text-base sm:text-lg flex items-center gap-2">
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
        <section id="section-fishing" className="game-section">
          <div className="flex justify-between items-center mb-3 sm:mb-6 px-2 sm:px-0">
            <h2 className="text-white font-bold text-base sm:text-lg flex items-center gap-2">
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
        <section id="section-crash" className="game-section">
          <div className="flex justify-between items-center mb-3 sm:mb-6 px-2 sm:px-0">
            <h2 className="text-white font-bold text-base sm:text-lg flex items-center gap-2">
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