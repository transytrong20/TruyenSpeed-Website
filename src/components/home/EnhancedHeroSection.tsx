"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroBackground3D } from "@/components/effects/HeroBackground3D";
import { BookPageEffect } from "@/components/effects/BookPageEffect";

interface BannerData {
  slug: string;
  title: string;
  description: string;
  latestChapter: string;
  backgroundImg: string;
  coverImage1: string;
  coverImage2: string;
  coverImage3: string;
}

export function EnhancedHeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [featuredManga, setFeaturedManga] = useState<BannerData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedManga = async () => {
      try {
        setIsLoading(true);
        const url = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await fetch(`${url}comic/banner`);
        if (!response.ok) {
          throw new Error("Failed to fetch featured manga");
        }
        const data = await response.json();
        setFeaturedManga(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedManga();
  }, []);

  useEffect(() => {
    const interval = setInterval(goToNext, 8000);
    return () => clearInterval(interval);
  }, [featuredManga.length]);

  const goToPrev = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex((prev) =>
      prev === 0 ? featuredManga.length - 1 : prev - 1
    );

    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const goToNext = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex((prev) =>
      prev === featuredManga.length - 1 ? 0 : prev + 1
    );

    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  // Auto slide every 8 seconds
  // useEffect(() => {
  //   const interval = setInterval(goToNext, 8000);
  //   return () => clearInterval(interval);
  // }, []);

  if (isLoading) {
    return (
      <section className="relative bg-background py-8 overflow-hidden">
        <div className="container">
          <div className="relative overflow-hidden rounded-lg aspect-[21/15] md:aspect-[3/1] bg-muted">
            <div className="absolute inset-0 bg-skeleton-gradient animate-shimmer" />
            <div className="grid w-full h-full grid-cols-1 md:grid-cols-2">
              {/* Left side - Description skeleton */}
              <div className="relative z-10 h-full flex flex-col justify-center p-6 md:p-12 space-y-4">
                {/* Title skeleton */}
                <div className="h-8 md:h-12 w-3/4 bg-muted-foreground/20 rounded-lg animate-pulse" />

                {/* Description skeleton */}
                <div className="space-y-2">
                  <div className="h-4 w-full bg-muted-foreground/20 rounded animate-pulse" />
                  <div className="h-4 w-5/6 bg-muted-foreground/20 rounded animate-pulse" />
                  <div className="h-4 w-4/6 bg-muted-foreground/20 rounded animate-pulse" />
                </div>

                {/* Buttons skeleton */}
                <div className="flex gap-3 pt-4">
                  <div className="h-10 w-28 bg-muted-foreground/20 rounded-md animate-pulse" />
                  <div className="h-10 w-36 bg-muted-foreground/20 rounded-md animate-pulse" />
                </div>
              </div>

              {/* Right side - Book Effect skeleton */}
              <div className="relative h-full hidden md:flex items-center justify-center p-8">
                <div className="w-[250px] h-[350px] bg-muted-foreground/20 rounded-lg animate-pulse">
                  <div className="absolute inset-0 bg-skeleton-gradient animate-shimmer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative bg-background py-8 overflow-hidden">
        <div className="container">Error: {error}</div>
      </section>
    );
  }

  if (!featuredManga.length) {
    return (
      <section className="relative bg-background py-8 overflow-hidden">
        <div className="container">No featured manga available</div>
      </section>
    );
  }

  const currentManga = featuredManga[currentIndex];

  return (
    <section className="relative bg-background py-8 overflow-hidden">
      {/* 3D Background */}
      <HeroBackground3D />

      <div className="container">
        <div className="relative overflow-hidden rounded-lg aspect-[21/15] md:aspect-[3/1]">
          <div
            className="absolute inset-0 flex items-center"
            style={{
              // backgroundImage: `url(${currentManga.backgroundImg})`,
              backgroundImage: `url('https://i.pinimg.com/736x/1c/28/2b/1c282b3553980d3b191825c039cd9c6f.jpg')`,
            }}
          >
            <div className="grid w-full h-full grid-cols-1 md:grid-cols-2">
              {/* Left side - Description */}
              <div className="relative z-10 h-full flex flex-col justify-center p-6 md:p-12">
                <h1
                  className={`text-2xl md:text-4xl font-bold mb-2 md:mb-4 transition-all duration-500 ${
                    isTransitioning
                      ? "opacity-0 -translate-x-10"
                      : "opacity-100 translate-x-0"
                  }`}
                >
                  {currentManga.title}
                </h1>
                <p
                  className={`text-muted-foreground text-sm md:text-base mb-4 md:mb-6 line-clamp-3 md:line-clamp-4 transition-all duration-500 delay-100 ${
                    isTransitioning
                      ? "opacity-0 -translate-x-10"
                      : "opacity-100 translate-x-0"
                  }`}
                >
                  {currentManga.description}
                </p>
                <div
                  className={`flex gap-3 transition-all duration-500 delay-200 ${
                    isTransitioning
                      ? "opacity-0 -translate-y-10"
                      : "opacity-100 translate-y-0"
                  }`}
                >
                  <Button asChild>
                    <Link href={`/manga/${currentManga.slug}`}>
                      Xem chi tiết
                    </Link>
                  </Button>
                  <Button variant="secondary" asChild>
                    <Link
                      href={`/manga/${currentManga.slug}/${currentManga.latestChapter}`}
                    >
                      Đọc chương mới nhất
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right side - Book Effect */}
              <div className="relative h-full hidden md:flex items-center justify-center p-8">
                <div className="w-[250px] h-[350px]">
                  <BookPageEffect
                    coverImages={[
                      currentManga.coverImage1,
                      currentManga.coverImage2,
                      currentManga.coverImage3,
                    ]}
                    title={currentManga.title}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 flex justify-between z-20">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-background/30 backdrop-blur hover:bg-background/50"
              onClick={goToPrev}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Trước</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-background/30 backdrop-blur hover:bg-background/50"
              onClick={goToNext}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Sau</span>
            </Button>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {featuredManga.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-muted"
                }`}
                onClick={() => {
                  if (isTransitioning) return;
                  setIsTransitioning(true);
                  setCurrentIndex(index);
                  setTimeout(() => {
                    setIsTransitioning(false);
                  }, 500);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
