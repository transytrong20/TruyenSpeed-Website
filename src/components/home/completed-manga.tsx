import { Manga } from "@/data/manga";
import { SectionHeader } from "@/components/shared/section-header";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CompletedMangaProps {
  mangas: Manga[];
}

export function CompletedManga({ mangas }: CompletedMangaProps) {
  // Sắp xếp theo số lượng chương (giả định là truyện hoàn thành với nhiều chương nhất)
  const sortedMangas = [...mangas].sort((a, b) => b.chapters.length - a.chapters.length);

  return (
    <div className="mb-10">
      <SectionHeader
        title="Truyện đã hoàn thành"
        href="/completed"
        className="mb-6"
      />

      <div className="grid grid-cols-1 gap-4">
        {sortedMangas.map((manga, index) => (
          <Link
            key={manga.slug}
            href={`/${manga.slug}`}
            className="group"
          >
            <div className={cn(
              "flex gap-4 p-3 rounded-lg transition-colors",
              "hover:bg-accent/30"
            )}>
              <div className="relative h-24 w-16 flex-shrink-0 overflow-hidden rounded-md">
                <Image
                  src={manga.cover}
                  alt={manga.title}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 py-1 px-2 text-[10px] text-center text-white">
                  {manga.chapters.length} chương
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-1">
                    {manga.title}
                  </h3>
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800"
                  >
                    <CheckCircle className="h-3 w-3" />
                    <span>Hoàn thành</span>
                  </Badge>
                </div>

                <div className="mt-1 flex flex-wrap gap-1">
                  {manga.genres.slice(0, 3).map(genre => (
                    <Badge key={genre} variant="secondary" className="text-xs font-normal">
                      {genre}
                    </Badge>
                  ))}
                  {manga.genres.length > 3 && (
                    <span className="text-xs text-muted-foreground">+{manga.genres.length - 3}</span>
                  )}
                </div>

                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {manga.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
