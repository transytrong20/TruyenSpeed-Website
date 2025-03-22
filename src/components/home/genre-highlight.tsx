import { Manga } from "@/data/manga";
import { SectionHeader } from "@/components/shared/section-header";
import { MangaCard } from "@/components/shared/manga-card";
import { cn } from "@/lib/utils";
import { Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface GenreHighlightProps {
  genre: string;
  mangas: Manga[];
}

export function GenreHighlight({ genre, mangas }: GenreHighlightProps) {
  if (mangas.length === 0) return null;

  // Chọn màu gradient dựa trên thể loại
  const getGradient = () => {
    const gradients = {
      "Hành động": "from-red-500 to-orange-500",
      "Phiêu lưu": "from-blue-500 to-sky-500",
      "Hài hước": "from-yellow-500 to-amber-500",
      "Kinh dị": "from-purple-500 to-indigo-500",
      "Lãng mạn": "from-pink-500 to-rose-500",
      "Siêu nhiên": "from-violet-500 to-fuchsia-500",
      "Võ thuật": "from-amber-500 to-yellow-500",
      "Phép thuật": "from-emerald-500 to-teal-500",
      "Thể thao": "from-sky-500 to-cyan-500",
      "Shounen": "from-orange-500 to-red-500",
      "Shoujo": "from-pink-500 to-purple-500",
      "Sci-fi": "from-cyan-500 to-blue-500",
      default: "from-indigo-500 to-sky-500",
    };

    return gradients[genre as keyof typeof gradients] || gradients.default;
  };

  return (
    <div className="mb-10 relative">
      <div className={cn(
        "absolute inset-0 rounded-lg bg-gradient-to-r opacity-10",
        getGradient()
      )} />

      <div className="relative p-6 rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">{genre}</h2>
          </div>

          <Button asChild variant="outline" size="sm">
            <Link href={`/genres/${genre.toLowerCase().replace(/\s+/g, "-")}`}>
              Xem tất cả
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mangas.map((manga) => (
            <MangaCard
              key={manga.id}
              id={manga.id}
              title={manga.title}
              cover={manga.cover}
              rating={manga.rating}
              views={manga.views}
              status={manga.status}
              isCompact
            />
          ))}
        </div>
      </div>
    </div>
  );
}
