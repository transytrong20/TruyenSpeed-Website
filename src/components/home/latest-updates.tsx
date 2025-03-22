import Link from "next/link";
import Image from "next/image";
import { Clock, Eye, ChevronRight } from "lucide-react";
import { formatChapterDate } from "@/lib/utils";
import { formatNumber } from "@/lib/format";
import { Manga } from "@/data/manga";
import { SectionHeader } from "@/components/shared/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface LatestUpdatesProps {
  mangas: Manga[];
}

export function LatestUpdates({ mangas }: LatestUpdatesProps) {
  return (
    <div>
      <SectionHeader
        title="Mới cập nhật"
        href="/latest"
        className="mb-5"
      />

      <div className="bg-card border rounded-lg p-4 sm:p-5">
        <div className="grid grid-cols-1 divide-y">
          {mangas.map((manga) => {
            // Định nghĩa lại chiều cao cố định cho mỗi hàng
            return (
              <div key={manga.slug} className="py-4 first:pt-1 last:pb-1">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Thumbnail với kích thước cố định */}
                  <Link
                    href={`/${manga.slug}`}
                    className="sm:w-[100px] md:w-[120px] flex-shrink-0 relative overflow-hidden rounded-md group"
                  >
                    <div className="aspect-[3/4] w-full relative">
                      <Image
                        src={manga.cover}
                        alt={manga.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 100px, 120px"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
                    </div>
                    <Badge variant="secondary" className="absolute top-2 right-2 text-xs font-medium whitespace-nowrap">
                      {manga.chapters.length} ch
                    </Badge>
                  </Link>

                  {/* Info - Đặt chiều cao cố định và căn chỉnh font size */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <Link
                          href={`/manga/${manga.id}`}
                          className="text-base md:text-lg font-semibold hover:text-primary transition-colors line-clamp-1"
                        >
                          {manga.title}
                        </Link>

                        <div className="text-xs text-muted-foreground flex items-center gap-2 flex-shrink-0 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{formatChapterDate(manga.updatedAt)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{formatNumber(manga.views)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Genres - Giới hạn hiển thị */}
                      <div className="mb-2 flex flex-wrap gap-1">
                        {manga.genres.slice(0, 2).map((genre) => (
                          <Badge key={genre} variant="outline" className="text-xs font-normal">
                            {genre}
                          </Badge>
                        ))}
                        {manga.genres.length > 2 && (
                          <span className="text-xs text-muted-foreground">+{manga.genres.length - 2}</span>
                        )}
                      </div>
                    </div>

                    {/* Last chapters - Điều chỉnh spacing và cân bằng kích thước */}
                    <div className="mt-auto flex flex-wrap sm:flex-nowrap sm:items-center gap-2">
                      <div className="flex flex-wrap gap-1.5">
                        {manga.chapters.slice(-3).reverse().map((chapter) => (
                          <Link
                            key={chapter.slug}
                            href={`/${manga.slug}/read/${chapter.id}`}
                            className="inline-flex items-center px-2 py-1 bg-accent/50 hover:bg-accent rounded-full text-xs transition-colors whitespace-nowrap"
                          >
                            Ch. {chapter.number}
                          </Link>
                        ))}
                      </div>

                      <Button asChild variant="ghost" size="sm" className="ml-auto p-0 h-7 px-2">
                        <Link href={`/manga/${manga.id}`} className="flex items-center text-xs">
                          Chi tiết <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
