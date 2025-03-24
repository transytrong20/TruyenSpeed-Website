"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data: Trong thực tế nên thay thế bằng dữ liệu từ API
const FEATURED_MANGA = [
  {
    id: "solo-leveling",
    title: "Solo Leveling",
    description: "Trong một thế giới nơi những 'Thợ săn' với những năng lực đặc biệt được thức tỉnh để chiến đấu với những sinh vật quái dị, Sung Jin-Woo, một thợ săn yếu nhất thế giới, phải vật lộn để kiếm sống.",
    coverImage: "https://m.media-amazon.com/images/I/71HhfnE8DIL._AC_UF1000,1000_QL80_.jpg",
    latestChapter: "179"
  },
  {
    id: "blue-lock",
    title: "Blue Lock",
    description: "Sau khi đội tuyển Nhật Bản bị loại tại World Cup 2018, Liên đoàn bóng đá Nhật Bản quyết định thuê Ego Jinpachi. Nhiệm vụ của ông là tuyển chọn các cầu thủ cho dự án Blue Lock nhằm tạo ra tiền đạo xuất sắc nhất thế giới.",
    coverImage: "https://m.media-amazon.com/images/I/81Szj7+ss-L._AC_UF1000,1000_QL80_.jpg",
    latestChapter: "253"
  },
  {
    id: "tower-of-god",
    title: "Tower of God",
    description: "Chứa đựng tất cả những gì mà một người có thể mơ ước, Tower of God (Tòa tháp của Chúa) là một thế giới bí ẩn, nơi mà chỉ những cá nhân được chọn mới có thể leo lên tháp và thực hiện ước mơ của họ.",
    coverImage: "https://m.media-amazon.com/images/I/7194VOAqO8L._AC_UF1000,1000_QL80_.jpg",
    latestChapter: "571"
  }
];

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? FEATURED_MANGA.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === FEATURED_MANGA.length - 1 ? 0 : prev + 1));
  };

  // Auto slide every 6 seconds
  useEffect(() => {
    const interval = setInterval(goToNext, 6000);
    return () => clearInterval(interval);
  }, []);

  const currentManga = FEATURED_MANGA[currentIndex];

  return (
    <section className="relative bg-background py-8">
      <div className="container">
        <div className="relative overflow-hidden rounded-lg aspect-[21/9] md:aspect-[3/1]">
          <div className="absolute inset-0 flex items-center">
            <div className="relative w-full h-full">
              <Image
                src={currentManga.coverImage}
                alt={currentManga.title}
                fill
                priority
                className="object-cover brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            </div>
          </div>

          <div className="relative z-10 h-full flex flex-col justify-center p-6 md:p-12 md:max-w-[50%]">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4">{currentManga.title}</h1>
            <p className="text-gray-200 text-sm md:text-base mb-4 md:mb-6 line-clamp-3 md:line-clamp-4">
              {currentManga.description}
            </p>
            <div className="flex gap-3">
              <Button asChild>
                <Link href={`/manga/${currentManga.id}`}>
                  Xem chi tiết
                </Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href={`/manga/${currentManga.id}/${currentManga.latestChapter}`}>
                  Đọc chương mới nhất
                </Link>
              </Button>
            </div>
          </div>

          <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 flex justify-between z-20">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-black/30 text-white hover:bg-black/50"
              onClick={goToPrev}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Trước</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-black/30 text-white hover:bg-black/50"
              onClick={goToNext}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Sau</span>
            </Button>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {FEATURED_MANGA.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentIndex ? "bg-white" : "bg-white/50"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
