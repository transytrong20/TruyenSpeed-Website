import { popularMangas, latestMangas, genres } from "@/data/manga";
import { FeaturedManga } from "@/components/home/featured-manga";
import { GenresSection } from "@/components/home/genres-section";
import { LatestUpdates } from "@/components/home/latest-updates";
import { PopularManga } from "@/components/home/popular-manga";
import { TrendingManga } from "@/components/home/trending-manga";
import { CompletedManga } from "@/components/home/completed-manga";
import { WeeklyTopManga } from "@/components/home/weekly-top-manga";
import { GenreHighlight } from "@/components/home/genre-highlight";
import { Separator } from "@/components/ui/separator";

export default function HomePage() {
  const featuredMangas = popularMangas.slice(0, 5);

  // Lọc ra các truyện đã hoàn thành
  const completedMangas = popularMangas.filter(manga => manga.status === "Đã hoàn thành");

  // Các truyện trending (giả định là các truyện có rating cao nhất)
  const trendingMangas = [...popularMangas].sort((a, b) => b.rating - a.rating).slice(0, 4);

  // Lấy ra một thể loại ngẫu nhiên để highlight
  const randomGenreIndex = Math.floor(Math.random() * (genres.length - 1)) + 1; // Bỏ qua "Tất cả"
  const highlightGenre = genres[randomGenreIndex];

  // Lọc truyện theo thể loại được highlight
  const genreMangas = popularMangas
    .filter(manga => manga.genres.includes(highlightGenre))
    .slice(0, 4);

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8">
      {/* Banner chính - Giới hạn chiều cao tối đa */}
      <div className="max-h-[600px] overflow-hidden">
        <FeaturedManga mangas={featuredMangas} />
      </div>

      <div className="mt-10">
        {/* Phần thể loại - Đặt chiều cao cố định cho container */}
        <div className="mb-8">
          <GenresSection />
        </div>

        <Separator className="my-8" />

        {/* Layout 2 cột cho section đầu tiên - Thêm aspect-ratio và min-height */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2">
            <TrendingManga mangas={trendingMangas} />
          </div>
          <div className="lg:col-span-1 min-h-[400px]">
            <WeeklyTopManga />
          </div>
        </div>

        {/* Truyện mới cập nhật - Giới hạn số lượng item hiển thị */}
        <div className="mb-10">
          <LatestUpdates mangas={latestMangas.slice(0, 4)} />
        </div>

        <Separator className="my-8" />

        {/* Highlight thể loại ngẫu nhiên */}
        <div className="mb-10">
          <GenreHighlight
            genre={highlightGenre}
            mangas={genreMangas}
          />
        </div>

        {/* Layout 2 cột cho section thứ hai - Cân đối tỷ lệ cột */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10 mt-10">
          <div className="lg:col-span-7">
            <PopularManga mangas={popularMangas.slice(0, 6)} />
          </div>
          <div className="lg:col-span-5">
            <CompletedManga mangas={completedMangas.slice(0, 3)} />
          </div>
        </div>
      </div>
    </div>
  );
}
