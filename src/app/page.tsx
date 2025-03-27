import { EnhancedHeroSection } from "@/components/home/EnhancedHeroSection";
import { LatestSection } from "@/components/home/LatestSection";
import { PopularSection } from "@/components/home/PopularSection";
import { HotMangaSection } from "@/components/home/HotMangaSection";
import { GenreSection } from "@/components/home/GenreSection";
import { RecommendedSection } from "@/components/home/RecommendedSection";

export default function Home() {
  return (
    <main>
      <EnhancedHeroSection />
      <LatestSection />
      <PopularSection />
      <HotMangaSection />
      <GenreSection />
      <RecommendedSection />
    </main>
  );
}
