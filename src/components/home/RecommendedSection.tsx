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
    <section className="py-6">
      <div className="container">
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">Đề xuất cho bạn</h2>
            <p className="text-sm text-muted-foreground">
              Dựa trên sở thích đọc của bạn
            </p>
          </div>
          <Button
            variant="link"
            size="sm"
            asChild
            className="text-sm font-medium"
          >
            <Link href="/recommendations">Xem tất cả</Link>
          </Button>
        </div>

        <div className="relative">
          <div
            className={`grid grid-cols-3 md:grid-cols-5 gap-4 transition-all duration-300 ${
              isTransitioning ? "opacity-50" : "opacity-100"
            }`}
          >
            {getCurrentItems().map((item) => (
              <div key={item} className="transition-all duration-300">
                <Link
                  href={`/manga/manga-${item}`}
                  className="group block space-y-2"
                >
                  <div className="relative aspect-[2/3] rounded-md overflow-hidden bg-muted">
                    <Image
                      src="http://192.168.1.63:9000/truyenspeed/ComicBookCover/menh-luan-chi-chu-lam-ke-bien-di-giang-xuong-nhan-gian.webp"
                      alt={`Manga ${item}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 33vw, 20vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-primary font-medium">
                        Chương 245
                      </span>
                      <span className="text-muted-foreground">
                        • 2 giờ trước
                      </span>
                    </div>
                    <h3 className="font-medium text-sm line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                      Truyện {item}
                    </h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="absolute -left-3 -right-3 top-1/3 flex justify-between pointer-events-none">
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 rounded-full bg-background/80 shadow-sm pointer-events-auto transition-opacity ${
                currentIndex === 0 ? "opacity-0" : "opacity-100"
              }`}
              onClick={goToPrev}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 rounded-full bg-background/80 shadow-sm pointer-events-auto transition-opacity ${
                currentIndex >= totalGroups - 1 ? "opacity-0" : "opacity-100"
              }`}
              onClick={goToNext}
              disabled={currentIndex >= totalGroups - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex justify-center mt-4 gap-1">
          {Array.from({ length: totalGroups }).map((_, index) => (
            <button
              key={index}
              className={`h-1 rounded-full transition-all ${
                index === currentIndex
                  ? "w-6 bg-primary"
                  : "w-2 bg-muted hover:bg-muted-foreground"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
