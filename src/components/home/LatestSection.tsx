"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Manga } from "@/types/manga";
import { formatDate } from "@/utils/dateUtils";

export function LatestSection() {
  const [latestManga, setLatestManga] = useState<Manga[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch dữ liệu từ API khi component được mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const url = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await fetch(`${url}comic/truyen-moi`);
        const data: Manga[] = await response.json();
        setLatestManga(data);
      } catch (error) {
        console.error("Error fetching manga data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="py-6">
      <div className="container">
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">Mới cập nhật</h2>
            <p className="text-sm text-muted-foreground">
              Những chương mới nhất vừa được cập nhật
            </p>
          </div>
          <Button variant="outline" size="sm" asChild className="gap-1">
            <Link href="/latest">
              Xem tất cả
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isLoading
            ? // Skeleton loaders
              Array(6)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex gap-3 p-2 rounded-lg">
                    {/* Image skeleton */}
                    <div className="relative aspect-[3/4] w-16 md:w-20 shrink-0 overflow-hidden rounded-md bg-muted">
                      <div className="absolute inset-0 bg-skeleton-gradient animate-shimmer" />
                    </div>

                    <div className="flex-1 min-w-0 py-1 space-y-2">
                      {/* Title skeleton */}
                      <div className="h-5 w-3/4 bg-muted-foreground/20 rounded animate-pulse" />

                      {/* Info skeleton */}
                      <div className="flex flex-wrap gap-x-3 gap-y-1">
                        <div className="h-4 w-20 bg-muted-foreground/20 rounded animate-pulse" />
                        <div className="h-4 w-24 bg-muted-foreground/20 rounded animate-pulse" />
                        <div className="h-4 w-28 bg-muted-foreground/20 rounded animate-pulse" />
                      </div>

                      {/* Tags skeleton */}
                      <div className="flex flex-wrap gap-1">
                        {Array(3)
                          .fill(0)
                          .map((_, j) => (
                            <div
                              key={j}
                              className="h-5 w-16 bg-muted-foreground/20 rounded animate-pulse"
                            />
                          ))}
                      </div>
                    </div>
                  </div>
                ))
            : // Actual content
              latestManga.map((manga) => (
                <Link
                  key={manga.otherName}
                  href={`/manga/${manga.otherName}`}
                  className="group flex gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="relative aspect-[3/4] w-16 md:w-20 shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={manga.image}
                      alt={manga.comicName}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <div className="flex-1 min-w-0 py-1">
                    <h3 className="font-medium text-sm md:text-base line-clamp-1 group-hover:text-primary transition-colors">
                      {manga.comicName}
                    </h3>

                    <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span className="text-primary font-medium">
                        {/* Chương {manga.chapter} */}
                        {manga.listChapters[0]?.chapterName || "Chưa có chương"}
                      </span>
                      <span>{formatDate(manga.releaseDate)}</span>
                      <span>{manga.views.toLocaleString()} lượt xem</span>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-1">
                      {manga.listTags.map((tag) => (
                        <span
                          key={tag.tagName}
                          className="px-1.5 py-0.5 bg-muted text-xs rounded"
                        >
                          {tag.tagName}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
}
