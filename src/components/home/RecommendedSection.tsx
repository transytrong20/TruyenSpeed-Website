"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface RecommendedManga {
  id: string;
  title: string;
  coverImage: string;
  description: string;
  rating: number;
}

const TOTAL_ITEMS = 13; // Tổng số truyện

export function RecommendedSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pathname = usePathname();

  // Kiểm tra kích thước màn hình
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Reset index khi URL thay đổi
  useEffect(() => {
    setCurrentIndex(0);
  }, [pathname]);

  // Số lượng item hiển thị dựa vào kích thước màn hình
  const itemsPerView = isMobile ? 3 : 5;
  const totalGroups = Math.ceil(TOTAL_ITEMS / itemsPerView);

  const goToPrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === 0 ? totalGroups - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === totalGroups - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Tính toán items cần hiển thị cho group hiện tại
  const getCurrentItems = () => {
    const start = currentIndex * itemsPerView;
    const items = [];
    for (let i = start; i < start + itemsPerView; i++) {
      if (i < TOTAL_ITEMS) {
        items.push(i + 1);
      }
    }
    return items;
  };

  return (
    <section className="py-8 md:py-12 bg-muted/30">
      <div className="container max-w-6xl mx-auto px-2 md:px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-0 mb-6 md:mb-8">
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">
              Đề xuất cho bạn
            </h2>
            <p className="text-muted-foreground text-xs md:text-sm">
              Dựa trên sở thích đọc của bạn
            </p>
          </div>
          <Button
            variant="outline"
            asChild
            className="w-full md:w-auto gap-1 mt-2 md:mt-0"
          >
            <Link href="/recommended">
              Xem tất cả <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="relative overflow-hidden">
          <div
            className={`grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-4 transition-transform duration-500 ${
              isTransitioning ? "opacity-50" : "opacity-100"
            }`}
          >
            {getCurrentItems().map((item) => (
              <div
                key={item}
                className={`transition-all duration-500 ${
                  item % itemsPerView === Math.floor(itemsPerView / 2)
                    ? "scale-105 z-10"
                    : "scale-95"
                }`}
              >
                <Link
                  href={`/manga/manga-${item}`}
                  className="group relative block aspect-[2/3] rounded-lg md:rounded-xl overflow-hidden"
                >
                  <div className="absolute inset-0">
                    <Image
                      src="http://192.168.1.63:9000/truyenspeed/ComicBookCover/menh-luan-chi-chu-lam-ke-bien-di-giang-xuong-nhan-gian.webp"
                      alt={`Manga ${item}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-2 md:p-4 flex flex-col justify-end h-1/2">
                    <div className="flex items-center gap-1 md:gap-2 mb-1 md:mb-2">
                      <span className="bg-primary/20 text-primary text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded-full">
                        Phổ biến
                      </span>
                      <div className="flex items-center gap-0.5 md:gap-1">
                        <span className="text-yellow-400 text-[10px] md:text-xs">
                          ★
                        </span>
                        <span className="text-white text-[10px] md:text-xs">
                          4.5
                        </span>
                      </div>
                    </div>
                    <h3 className="text-white font-semibold text-sm md:text-base mb-0.5 md:mb-1 line-clamp-1">
                      Truyện {item}
                    </h3>
                    <p className="hidden md:block text-white/80 text-xs line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      Mô tả ngắn về truyện {item}...
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="absolute -left-2 -right-2 md:-left-4 md:-right-4 top-1/2 -translate-y-1/2 flex justify-between z-20 pointer-events-none">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-background/80 shadow-lg backdrop-blur-sm hover:bg-background/90 pointer-events-auto disabled:opacity-50"
              onClick={goToPrev}
              disabled={isTransitioning}
            >
              <ChevronLeft className="h-4 w-4 md:h-6 md:w-6" />
              <span className="sr-only">Trước</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-background/80 shadow-lg backdrop-blur-sm hover:bg-background/90 pointer-events-auto disabled:opacity-50"
              onClick={goToNext}
              disabled={isTransitioning}
            >
              <ChevronRight className="h-4 w-4 md:h-6 md:w-6" />
              <span className="sr-only">Sau</span>
            </Button>
          </div>
          <div className="absolute -bottom-4 md:-bottom-6 left-1/2 -translate-x-1/2 flex gap-1 md:gap-2 z-20">
            {Array.from({ length: totalGroups }).map((_, index) => (
              <button
                key={index}
                className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "w-4 md:w-6 bg-primary"
                    : "bg-primary/30 hover:bg-primary/50"
                }`}
                onClick={() => {
                  if (isTransitioning) return;
                  setIsTransitioning(true);
                  setCurrentIndex(index);
                  setTimeout(() => setIsTransitioning(false), 500);
                }}
                disabled={isTransitioning}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
