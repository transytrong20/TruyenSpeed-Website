import { Manga } from "@/data/manga";
import { MangaGrid } from "@/components/shared/manga-grid";
import { SectionHeader } from "@/components/shared/section-header";

interface PopularMangaProps {
  mangas: Manga[];
}

export function PopularManga({ mangas }: PopularMangaProps) {
  return (
    <div className="mb-10">
      <SectionHeader
        title="Phổ biến"
        href="/ranking"
        className="mb-6"
      />
      <MangaGrid mangas={mangas} />
    </div>
  );
}
