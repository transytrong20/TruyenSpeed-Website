import Link from "next/link";
import Image from "next/image";
import { Eye, Bookmark, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Manga {
  id: string;
  title: string;
  coverImage: string;
  status: string;
  rating: number;
  totalViews: number;
  totalBookmarks: number;
  latestChapter: string;
  genres: string[];
}

interface MangaGridProps {
  mangas: Manga[];
}

export function MangaGrid({ mangas }: MangaGridProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {mangas.map((manga) => (
        <Card key={manga.id} className="group overflow-hidden">
          <Link href={`/manga/${manga.id}`}>
            <div className="aspect-[2/3] relative overflow-hidden">
              <Image
                src={manga.coverImage}
                alt={manga.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                <div className="w-full flex justify-between items-center text-white text-xs">
                  <div className="flex items-center gap-2">
                    <Eye className="h-3.5 w-3.5" />
                    <span>{formatNumber(manga.totalViews)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bookmark className="h-3.5 w-3.5" />
                    <span>{formatNumber(manga.totalBookmarks)}</span>
                  </div>
                </div>
              </div>
              <Badge
                variant="secondary"
                className="absolute top-2 left-2 bg-black/50 text-white hover:bg-black/60"
              >
                {manga.status}
              </Badge>
              <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                <span>{manga.rating.toFixed(1)}</span>
              </div>
            </div>
          </Link>
          <CardContent className="p-3">
            <Link
              href={`/manga/${manga.id}`}
              className="font-medium hover:text-primary line-clamp-2 text-sm mb-1"
            >
              {manga.title}
            </Link>
            <div className="flex flex-wrap gap-1">
              {manga.genres.slice(0, 3).map((genre) => (
                <Badge
                  key={genre}
                  variant="outline"
                  className="text-[10px] px-1 py-0"
                >
                  {genre}
                </Badge>
              ))}
              {manga.genres.length > 3 && (
                <Badge variant="outline" className="text-[10px] px-1 py-0">
                  +{manga.genres.length - 3}
                </Badge>
              )}
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Chapter {manga.latestChapter}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
