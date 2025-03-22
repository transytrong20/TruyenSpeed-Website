import { Manga } from "@/data/manga";
import { SectionHeader } from "@/components/shared/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Star, TrendingUp, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { formatNumber } from "@/lib/format";

interface TrendingMangaProps {
  mangas: Manga[];
}

export function TrendingManga({ mangas }: TrendingMangaProps) {
  return (
    <div>
      <SectionHeader
        title="Xu hướng"
        href="/trending"
        className="mb-4"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mangas.map((manga, index) => (
          <Link
            key={manga.slug}
            href={`/${manga.slug}`}
            className="group"
          >
            <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
              <div className="relative">
                {/* Chiều cao cố định cho ảnh */}
                <div className="relative h-[160px] w-full overflow-hidden">
                  <Image
                    src={manga.cover}
                    alt={manga.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>

                <div className="absolute top-2 left-2 flex items-center gap-1 bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs">
                  <TrendingUp className="h-3 w-3" />
                  <span>#{index + 1}</span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="text-white text-sm font-bold line-clamp-1 group-hover:text-primary-foreground transition-colors">
                    {manga.title}
                  </h3>

                  <div className="flex items-center justify-between text-white/80 text-xs mt-1">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{manga.rating.toFixed(1)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{formatNumber(manga.views)}</span>
                      </div>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 bg-background/30 rounded-sm">{manga.status}</span>
                  </div>
                </div>
              </div>

              <CardContent className="p-3 h-[60px] flex items-center">
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {manga.description.length > 100
                    ? manga.description.substring(0, 100) + "..."
                    : manga.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
