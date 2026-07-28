import HeroSlider from "@/components/HeroSlider";
import MobileLogin from "@/components/MobileLogin"; 
import CategoryMenu from "@/components/CategoryMenu";
import TotoSection from "@/components/TotoSection";
import SlotGamesSection from "@/components/SlotGamesSection";
import LiveGamesSection from "@/components/LiveGamesSection";
import Suportsection from "@/components/Suportsection";
import Virtualsection from "@/components/Virtualsection";
import Fishingsection from "@/components/Fishingsection";
import Crashsection from "@/components/Crashsection";
import FooterInfo from "@/components/FooterInfo";
import PartnerSection from "@/components/PartnerSection";
import PopularSection from "@/components/PopularSection";

export default function Home() {
  return (
    <main className="w-full bg-transparent sm:bg-[#0f001a] min-h-screen pb-20">
     
      <HeroSlider />
      
     
      <MobileLogin />
      
    
      <CategoryMenu />

      <div className="p-2 md:p-6 space-y-4 md:space-y-8">
        

        <PopularSection />

         <TotoSection />

        <SlotGamesSection />

        <LiveGamesSection />

        <Suportsection />

        <Virtualsection />

        <Fishingsection />

      <Crashsection />

        <PartnerSection />
        <FooterInfo />
      </div>
    </main>
  );
}