import { latestMangas } from "@/data/manga";
import { MangaGrid } from "@/components/shared/manga-grid";

export default function LatestPage() {
  // Sắp xếp theo ngày cập nhật mới nhất
  const sortedMangas = [...latestMangas].sort((a, b) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  return (
    <div className="container py-6 md:py-8">
      <h1 className="text-3xl font-bold mb-6">Truyện mới cập nhật</h1>
      <p className="text-muted-foreground mb-6">
        Danh sách truyện được cập nhật mới nhất trên MangaVerse.
      </p>

      <MangaGrid
        mangas={sortedMangas}
        columns={{
          sm: 2,
          md: 3,
          lg: 4,
          xl: 5
        }}
      />
    </div>
  );
}
