"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star, BookOpen, Eye, Clock } from "lucide-react";

import { Manga } from "@/data/manga";
import { Button } from "@/components/ui/button";
import { GenreBadge } from "@/components/shared/genre-badge";
import { formatNumber } from "@/lib/format";
import { truncate, formatDate } from "@/lib/utils";

interface FeaturedMangaProps {
  mangas: Manga[];
}

export function FeaturedManga({ mangas }: FeaturedMangaProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const manga = mangas[currentIndex];

  const nextManga = useCallback(() => {
    setCurrentIndex((prev) => (prev === mangas.length - 1 ? 0 : prev + 1));
  }, [mangas.length]);

  const prevManga = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? mangas.length - 1 : prev - 1));
  }, [mangas.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextManga();
    }, 7000);

    return () => clearInterval(interval);
  }, [nextManga]);

  // Tìm chương đầu tiên để đọc
  const firstChapter = manga.chapters.length > 0 ? manga.chapters[0] : null;

  return (
    <div className="relative overflow-hidden rounded-xl bg-card shadow-md border h-[380px] md:h-[420px] lg:h-[450px]">
      <div className="absolute inset-0 w-full h-full">
        {/* Banner Image */}
        <Image
          src={manga.cover}
          alt={manga.title}
          fill
          priority
          className="object-cover brightness-[0.7]"
          sizes="100vw"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />

        {/* Navigation Buttons */}
        <Button
          onClick={prevManga}
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 bg-background/40 text-white hover:bg-background/60 rounded-full h-10 w-10"
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Trước</span>
        </Button>
        <Button
          onClick={nextManga}
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 bg-background/40 text-white hover:bg-background/60 rounded-full h-10 w-10"
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Sau</span>
        </Button>

        {/* Content */}
        <div className="absolute inset-0 flex items-center px-6 md:px-10 lg:px-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 w-full h-full items-center">
            {/* Book Cover - Tablet & Desktop Only */}
            <div className="hidden md:block md:col-span-3 lg:col-span-2">
              <div className="relative aspect-[2/3] w-full max-w-[140px] mx-auto overflow-hidden rounded-lg shadow-2xl">
                <Image
                  src={manga.cover}
                  alt={manga.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 0vw, 140px"
                />
              </div>
            </div>

            {/* Details */}
            <div className="md:col-span-9 lg:col-span-10 flex flex-col justify-center max-w-3xl h-full py-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full font-medium">
                  Nổi bật
                </div>
                <div className="text-white/80 text-xs flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{formatDate(manga.updatedAt)}</span>
                </div>
              </div>

              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 line-clamp-2">
                {manga.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-3 text-white">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{manga.rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Eye className="h-4 w-4" />
                  <span>{formatNumber(manga.views)}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <BookOpen className="h-4 w-4" />
                  <span>{manga.chapters.length} ch</span>
                </div>
                <div className="flex items-center text-xs px-2 py-0.5 rounded-md bg-background/30">
                  {manga.status}
                </div>
              </div>

              {/* Description */}
              <p className="text-white/90 text-xs md:text-sm line-clamp-2 md:line-clamp-3 mb-4 max-w-3xl">
                {truncate(manga.description, 180)}
              </p>

              {/* Genres */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {manga.genres.slice(0, 4).map((genre) => (
                  <GenreBadge
                    key={genre}
                    genre={genre}
                    className="bg-background/20 hover:bg-primary border-none text-white text-xs py-0.5 px-2"
                  />
                ))}
                {manga.genres.length > 4 && (
                  <span className="text-xs text-white/70">+{manga.genres.length - 4}</span>
                )}
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-2 mt-auto">
                <Button asChild size="sm" className="text-sm h-8">
                  <Link href={`/${manga.slug}/chapter-${firstChapter?.number || 1}`}>Đọc Ngay</Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="text-sm h-8 bg-background/20 text-white border-white/30 hover:bg-background/40">
                  <Link href={`/${manga.slug}/chapters`}>Danh Sách Chương</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {mangas.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? "bg-primary w-4"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
