"use client";

import Link from "next/link";
import { MangaCard } from "@/components/manga/MangaCard";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

// Mock data: Trong thực tế nên thay thế bằng dữ liệu từ API
const LATEST_MANGA = [
  {
    id: "one-piece",
    title: "One Piece",
    coverImage:
      "http:192.168.1.63:9000/truyenspeed/ComicBookCover/menh-luan-chi-chu-lam-ke-bien-di-giang-xuong-nhan-gian.webp",
    latestChapter: "1112",
    newLabel: true,
  },
  {
    id: "jujutsu-kaisen",
    title: "Jujutsu Kaisen",
    coverImage:
      "http:192.168.1.63:9000/truyenspeed/ComicBookCover/menh-luan-chi-chu-lam-ke-bien-di-giang-xuong-nhan-gian.webp",
    latestChapter: "253",
    newLabel: true,
  },
  {
    id: "spy-x-family",
    title: "Spy x Family",
    coverImage:
      "http:192.168.1.63:9000/truyenspeed/ComicBookCover/menh-luan-chi-chu-lam-ke-bien-di-giang-xuong-nhan-gian.webp",
    latestChapter: "91",
    newLabel: true,
  },
  {
    id: "chainsaw-man",
    title: "Chainsaw Man",
    coverImage:
      "https://m.media-amazon.com/images/I/81YYJn1kBzL._AC_UF1000,1000_QL80_.jpg",
    latestChapter: "156",
    newLabel: true,
  },
  {
    id: "my-hero-academia",
    title: "My Hero Academia",
    coverImage:
      "https://m.media-amazon.com/images/I/71olsYX0YsL._AC_UF1000,1000_QL80_.jpg",
    latestChapter: "421",
    newLabel: true,
  },
  {
    id: "tokyo-revengers",
    title: "Tokyo Revengers",
    coverImage:
      "https://m.media-amazon.com/images/I/71YYHcfrLYL._AC_UF1000,1000_QL80_.jpg",
    latestChapter: "278",
    newLabel: true,
  },
];

export function LatestSection() {
  return (
    <section className="py-8">
      <div className="container">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Mới cập nhật</h2>
          <Button variant="link" asChild className="gap-1 px-0">
            <Link href="/latest">
              Xem tất cả <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {LATEST_MANGA.map((manga) => (
            <MangaCard
              key={manga.id}
              id={manga.id}
              title={manga.title}
              coverImage={manga.coverImage}
              latestChapter={manga.latestChapter}
              newLabel={manga.newLabel}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
