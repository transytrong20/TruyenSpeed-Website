import { EnhancedHeroSection } from "@/components/home/EnhancedHeroSection";
import { LatestSection } from "@/components/home/LatestSection";
import { PopularSection } from "@/components/home/PopularSection";
import { GenresSection } from "@/components/home/GenresSection";

export default function Home() {
  return (
    <div className="flex flex-col space-y-0">
      <EnhancedHeroSection />
      <LatestSection />
      <PopularSection />
      <GenresSection />
    </div>
  );
}
