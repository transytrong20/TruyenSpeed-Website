"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const latestManga = [
  {
    id: 1,
    title: "Tên truyện rất dài và thú vị 1",
    image:
      "http://192.168.1.63:9000/truyenspeed/ComicBookCover/menh-luan-chi-chu-lam-ke-bien-di-giang-xuong-nhan-gian.webp",
    chapter: 245,
    timeAgo: "2 giờ trước",
    views: 1234,
    genres: ["Hành động", "Phiêu lưu"],
  },
  {
    id: 2,
    title: "Tên truyện rất dài và thú vị 2",
    image:
      "http://192.168.1.63:9000/truyenspeed/ComicBookCover/menh-luan-chi-chu-lam-ke-bien-di-giang-xuong-nhan-gian.webp",
    chapter: 123,
    timeAgo: "3 giờ trước",
    views: 856,
    genres: ["Tình cảm", "Học đường"],
  },
  {
    id: 3,
    title: "Tên truyện rất dài và thú vị 3",
    image:
      "http://192.168.1.63:9000/truyenspeed/ComicBookCover/menh-luan-chi-chu-lam-ke-bien-di-giang-xuong-nhan-gian.webp",
    chapter: 56,
    timeAgo: "5 giờ trước",
    views: 945,
    genres: ["Kinh dị", "Giả tưởng"],
  },
  {
    id: 4,
    title: "Tên truyện rất dài và thú vị 4",
    image:
      "http://192.168.1.63:9000/truyenspeed/ComicBookCover/menh-luan-chi-chu-lam-ke-bien-di-giang-xuong-nhan-gian.webp",
    chapter: 89,
    timeAgo: "6 giờ trước",
    views: 723,
    genres: ["Hài hước", "Drama"],
  },
  {
    id: 5,
    title: "Tên truyện rất dài và thú vị 5",
    image:
      "http://192.168.1.63:9000/truyenspeed/ComicBookCover/menh-luan-chi-chu-lam-ke-bien-di-giang-xuong-nhan-gian.webp",
    chapter: 34,
    timeAgo: "8 giờ trước",
    views: 432,
    genres: ["Thể thao", "Học đường"],
  },
];

export function LatestSection() {
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
          {latestManga.map((manga) => (
            <Link
              key={manga.id}
              href={`/manga/manga-${manga.id}`}
              className="group flex gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="relative aspect-[3/4] w-16 md:w-20 shrink-0 overflow-hidden rounded-md">
                <Image
                  src={manga.image}
                  alt={manga.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="flex-1 min-w-0 py-1">
                <h3 className="font-medium text-sm md:text-base line-clamp-1 group-hover:text-primary transition-colors">
                  {manga.title}
                </h3>

                <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  <span className="text-primary font-medium">
                    Chương {manga.chapter}
                  </span>
                  <span>{manga.timeAgo}</span>
                  <span>{manga.views.toLocaleString()} lượt xem</span>
                </div>

                <div className="mt-2 flex flex-wrap gap-1">
                  {manga.genres.map((genre) => (
                    <span
                      key={genre}
                      className="px-1.5 py-0.5 bg-muted text-xs rounded"
                    >
                      {genre}
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
