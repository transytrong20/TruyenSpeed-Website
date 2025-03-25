"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Book,
  Rows,
  Columns,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const bannerItems = [
  {
    id: 1,
    title: "One Piece",
    description: "Hành trình trở thành Vua Hải Tặc của Luffy và băng Mũ Rơm",
    image:
      "http://192.168.1.63:9000/truyenspeed/ComicBookCover/menh-luan-chi-chu-lam-ke-bien-di-giang-xuong-nhan-gian.webp",
    chapter: 1102,
    views: "1.2M",
    rating: 4.9,
    genres: ["Hành động", "Phiêu lưu", "Hài hước"],
    lastChapter: 1102,
    firstChapter: 1,
  },
  {
    id: 2,
    title: "Jujutsu Kaisen",
    description: "Cuộc chiến của các Chú Thuật Sư chống lại những lời nguyền",
    image:
      "http://192.168.1.63:9000/truyenspeed/ComicBookCover/menh-luan-chi-chu-lam-ke-bien-di-giang-xuong-nhan-gian.webp",
    chapter: 245,
    views: "956K",
    rating: 4.8,
    genres: ["Hành động", "Siêu nhiên", "Dark Fantasy"],
    lastChapter: 245,
    firstChapter: 1,
  },
  {
    id: 3,
    title: "Chainsaw Man",
    description: "Denji và hành trình trở thành Chainsaw Man",
    image:
      "http://192.168.1.63:9000/truyenspeed/ComicBookCover/menh-luan-chi-chu-lam-ke-bien-di-giang-xuong-nhan-gian.webp",
    chapter: 156,
    views: "878K",
    rating: 4.7,
    genres: ["Hành động", "Horror", "Dark Fantasy"],
    lastChapter: 156,
    firstChapter: 1,
  },
];

export function BannerSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % bannerItems.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(
      (prev) => (prev - 1 + bannerItems.length) % bannerItems.length
    );
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrev();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  useEffect(() => {
    const timer = setInterval(handleNext, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <section className="relative bg-muted/30 overflow-hidden">
      <div
        className="container relative h-[300px] md:h-[400px]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="absolute inset-0 flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {bannerItems.map((item, index) => (
            <div key={item.id} className="relative w-full h-full flex-shrink-0">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

              <div className="absolute inset-0 container flex flex-col justify-center">
                <div className="max-w-xl space-y-4">
                  <div className="space-y-2">
                    <h2 className="text-2xl md:text-4xl font-bold text-white">
                      {item.title}
                    </h2>
                    <p className="text-sm md:text-base text-white/90 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-white/90">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span>{item.rating}</span>
                    </div>
                    <span>Chương {item.chapter}</span>
                    <span>{item.views} lượt xem</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {item.genres.map((genre) => (
                      <span
                        key={genre}
                        className="px-2 py-1 bg-white/10 rounded-full text-xs text-white"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="gap-2">
                          <Book className="h-4 w-4" />
                          Đọc ngay
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-48">
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/manga/manga-${item.id}/chapters/${item.lastChapter}?mode=vertical`}
                            className="flex items-center gap-2"
                          >
                            <Columns className="h-4 w-4" />
                            <div className="flex-1">
                              <div className="font-medium">Đọc dọc</div>
                              <div className="text-xs text-muted-foreground">
                                Cuộn dọc từng trang
                              </div>
                            </div>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/manga/manga-${item.id}/chapters/${item.lastChapter}?mode=horizontal`}
                            className="flex items-center gap-2"
                          >
                            <Rows className="h-4 w-4" />
                            <div className="flex-1">
                              <div className="font-medium">Đọc ngang</div>
                              <div className="text-xs text-muted-foreground">
                                Lật ngang từng trang
                              </div>
                            </div>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/manga/manga-${item.id}/chapters/${item.firstChapter}?mode=vertical`}
                            className="flex items-center gap-2"
                          >
                            <Book className="h-4 w-4" />
                            <div className="flex-1">
                              <div className="font-medium">Đọc từ đầu</div>
                              <div className="text-xs text-muted-foreground">
                                Bắt đầu từ chương 1
                              </div>
                            </div>
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                      variant="outline"
                      asChild
                      className="bg-white/10 hover:bg-white/20"
                    >
                      <Link href={`/manga/manga-${item.id}`}>Chi tiết</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8 rounded-full bg-black/50 backdrop-blur-sm text-white pointer-events-auto transition-opacity",
              currentIndex === 0 ? "opacity-0" : "opacity-100 hover:bg-black/70"
            )}
            onClick={handlePrev}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8 rounded-full bg-black/50 backdrop-blur-sm text-white pointer-events-auto transition-opacity",
              currentIndex === bannerItems.length - 1
                ? "opacity-0"
                : "opacity-100 hover:bg-black/70"
            )}
            onClick={handleNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
          {bannerItems.map((_, index) => (
            <button
              key={index}
              className={cn(
                "h-1 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "w-6 bg-primary"
                  : "w-2 bg-white/50 hover:bg-white/70"
              )}
              onClick={() => {
                if (isTransitioning) return;
                setIsTransitioning(true);
                setCurrentIndex(index);
                setTimeout(() => setIsTransitioning(false), 500);
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
