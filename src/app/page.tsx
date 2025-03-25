import { EnhancedHeroSection } from "@/components/home/EnhancedHeroSection";
import { LatestSection } from "@/components/home/LatestSection";
import { PopularSection } from "@/components/home/PopularSection";
import { CompletedSection } from "@/components/home/CompletedSection";
import { GenreSection } from "@/components/home/GenreSection";
import { RecommendedSection } from "@/components/home/RecommendedSection";

export default function Home() {
  return (
    <main>
      <EnhancedHeroSection />
      <LatestSection />
      <PopularSection />
      <CompletedSection />
      <GenreSection />
      <RecommendedSection />
    </main>
  );
}
