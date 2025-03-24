import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { ChevronLeft, Bookmark, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data: Trong thực tế nên thay thế bằng dữ liệu từ API
const MANGA_DETAIL = {
  id: "one-piece",
  title: "One Piece",
  alternativeTitles: ["Vua Hải Tặc", "ワンピース"],
  description:
    "One Piece là câu chuyện về Monkey D. Luffy, một cậu bé có ước mơ trở thành Vua Hải Tặc và tìm kiếm kho báu One Piece. Luffy và băng hải tặc của mình, băng Mũ Rơm, phiêu lưu trên Grand Line, đối mặt với nhiều thử thách, kẻ thù và những cuộc phiêu lưu bất tận.",
  genres: ["Hành động", "Phiêu lưu", "Hài hước", "Siêu nhiên", "Giả tưởng"],
  author: "Eiichiro Oda",
  status: "Đang tiến hành",
  coverImage:
    "http://192.168.1.63:9000/truyenspeed/ComicBookCover/menh-luan-chi-chu-lam-ke-bien-di-giang-xuong-nhan-gian.webp",
  rating: 4.9,
  totalViews: 10500000,
  totalBookmarks: 250000,
  chapters: [
    { number: "1112", title: "Những người bạn", releaseDate: "2023-06-10" },
    {
      number: "1111",
      title: "Bí mật của Laugh Tale",
      releaseDate: "2023-06-03",
    },
    {
      number: "1110",
      title: "Trận chiến cuối cùng",
      releaseDate: "2023-05-27",
    },
    {
      number: "1109",
      title: "Hải tặc và Thủy quân lục chiến",
      releaseDate: "2023-05-20",
    },
    {
      number: "1108",
      title: "Sự trở lại của Shanks",
      releaseDate: "2023-05-13",
    },
    { number: "1107", title: "Bí mật của Roger", releaseDate: "2023-05-06" },
    { number: "1106", title: "Gear 5", releaseDate: "2023-04-29" },
    { number: "1105", title: "Sức mạnh thức tỉnh", releaseDate: "2023-04-22" },
    { number: "1104", title: "Võ thuật Haki", releaseDate: "2023-04-15" },
    {
      number: "1103",
      title: "Con đường đến Laugh Tale",
      releaseDate: "2023-04-08",
    },
  ],
};

export const generateMetadata = ({
  params,
}: {
  params: { id: string };
}): Metadata => {
  // Trong dự án thực tế, cần phải fetch dữ liệu truyện theo params.id
  return {
    title: `${MANGA_DETAIL.title} - MangaReader`,
    description: MANGA_DETAIL.description,
  };
};

export default function MangaDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // Trong thực tế, cần fetch dữ liệu truyện theo params.id
  const manga = MANGA_DETAIL;

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-sm">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Trang chủ
        </Link>
        <span className="text-muted-foreground">/</span>
        <span className="font-medium truncate">{manga.title}</span>
      </div>

      {/* Manga info section */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="md:w-1/3 lg:w-1/4">
          <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-md">
            <Image
              src={manga.coverImage}
              alt={manga.title}
              fill
              sizes="(max-width: 768px) 100vw, 300px"
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="flex-1">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link
              href="/"
              className="flex items-center gap-1 text-muted-foreground"
            >
              <ChevronLeft className="h-4 w-4" /> Quay lại
            </Link>
          </Button>

          <h1 className="text-2xl md:text-3xl font-bold mb-2">{manga.title}</h1>

          {manga.alternativeTitles.length > 0 && (
            <p className="text-muted-foreground text-sm mb-4">
              Tên khác: {manga.alternativeTitles.join(", ")}
            </p>
          )}

          <div className="flex flex-wrap gap-2 mb-4">
            {manga.genres.map((genre) => (
              <Link
                key={genre}
                href={`/genres/${genre.toLowerCase().replace(" ", "-")}`}
                className="bg-muted px-2.5 py-1 rounded-full text-xs font-medium hover:bg-primary/10"
              >
                {genre}
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div>
              <p className="text-sm text-muted-foreground">Tác giả</p>
              <p className="font-medium">{manga.author}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Trạng thái</p>
              <p className="font-medium">{manga.status}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Đánh giá</p>
              <p className="font-medium">⭐ {manga.rating}/5.0</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span>{manga.totalViews.toLocaleString()} lượt đọc</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Bookmark className="h-4 w-4 text-muted-foreground" />
              <span>{manga.totalBookmarks.toLocaleString()} đánh dấu</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <Button asChild size="lg">
              <Link href={`/manga/${manga.id}/${manga.chapters[0].number}`}>
                Đọc chương mới nhất
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              <Bookmark className="mr-2 h-4 w-4" /> Đánh dấu
            </Button>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-muted/50 rounded-lg p-4 md:p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Giới thiệu</h2>
        <p className="text-muted-foreground whitespace-pre-line">
          {manga.description}
        </p>
      </div>

      {/* Chapters */}
      <Tabs defaultValue="chapters">
        <TabsList className="mb-4">
          <TabsTrigger value="chapters">Danh sách chương</TabsTrigger>
        </TabsList>
        <TabsContent value="chapters" className="mt-0">
          <div className="bg-card rounded-lg border overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x">
              {manga.chapters.map((chapter, index) => (
                <Link
                  key={chapter.number}
                  href={`/manga/${manga.id}/${chapter.number}`}
                  className="p-4 hover:bg-accent transition-colors flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">Chapter {chapter.number}</p>
                    <p className="text-sm text-muted-foreground">
                      {chapter.title}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{chapter.releaseDate}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
