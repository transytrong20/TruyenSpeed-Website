"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const popularManga = [
  {
    id: 1,
    title: "Tên truyện rất dài và thú vị 1",
    image:
      "http://192.168.1.63:9000/truyenspeed/ComicBookCover/menh-luan-chi-chu-lam-ke-bien-di-giang-xuong-nhan-gian.webp",
    chapter: 245,
    rating: 4.8,
    views: "1.2M",
    status: "Đang tiến hành",
  },
  {
    id: 2,
    title: "Tên truyện rất dài và thú vị 2",
    image:
      "http://192.168.1.63:9000/truyenspeed/ComicBookCover/menh-luan-chi-chu-lam-ke-bien-di-giang-xuong-nhan-gian.webp",
    chapter: 123,
    rating: 4.5,
    views: "856K",
    status: "Hoàn thành",
  },
  {
    id: 3,
    title: "Tên truyện rất dài và thú vị 3",
    image:
      "http://192.168.1.63:9000/truyenspeed/ComicBookCover/menh-luan-chi-chu-lam-ke-bien-di-giang-xuong-nhan-gian.webp",
    chapter: 56,
    rating: 4.7,
    views: "945K",
    status: "Đang tiến hành",
  },
  {
    id: 4,
    title: "Tên truyện rất dài và thú vị 4",
    image:
      "http://192.168.1.63:9000/truyenspeed/ComicBookCover/menh-luan-chi-chu-lam-ke-bien-di-giang-xuong-nhan-gian.webp",
    chapter: 89,
    rating: 4.3,
    views: "723K",
    status: "Tạm ngưng",
  },
  {
    id: 5,
    title: "Tên truyện rất dài và thú vị 5",
    image:
      "http://192.168.1.63:9000/truyenspeed/ComicBookCover/menh-luan-chi-chu-lam-ke-bien-di-giang-xuong-nhan-gian.webp",
    chapter: 34,
    rating: 4.6,
    views: "432K",
    status: "Đang tiến hành",
  },
  {
    id: 6,
    title: "Tên truyện rất dài và thú vị 6",
    image:
      "http://192.168.1.63:9000/truyenspeed/ComicBookCover/menh-luan-chi-chu-lam-ke-bien-di-giang-xuong-nhan-gian.webp",
    chapter: 167,
    rating: 4.4,
    views: "678K",
    status: "Đang tiến hành",
  },
];

export function PopularSection() {
  return (
    <section className="py-6">
      <div className="container">
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">Phổ biến</h2>
            <p className="text-sm text-muted-foreground">
              Những bộ truyện được yêu thích nhất
            </p>
          </div>
          <Button variant="outline" size="sm" asChild className="gap-1">
            <Link href="/popular">
              Xem tất cả
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {popularManga.map((manga) => (
            <Link
              key={manga.id}
              href={`/manga/manga-${manga.id}`}
              className="group block"
            >
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-muted mb-2">
                <Image
                  src={manga.image}
                  alt={manga.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-2 right-2">
                  <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-1.5 py-0.5 rounded text-white text-xs">
                    <span className="text-yellow-400">★</span>
                    {manga.rating}
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2">
                  <div className="flex items-center justify-between text-[10px] text-white/90">
                    <span className="bg-primary/90 px-1.5 py-0.5 rounded-sm">
                      {manga.status}
                    </span>
                    <span>{manga.views} lượt xem</span>
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="font-medium text-sm line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                  {manga.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Chương {manga.chapter}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
