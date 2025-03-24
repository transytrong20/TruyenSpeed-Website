"use client";

import Link from "next/link";
import { MangaCard } from "@/components/manga/MangaCard";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

// Mock data: Trong thực tế nên thay thế bằng dữ liệu từ API
const POPULAR_MANGA = [
  {
    id: "demon-slayer",
    title: "Demon Slayer: Kimetsu no Yaiba",
    coverImage: "https://m.media-amazon.com/images/I/81miAFqQF-L._AC_UF1000,1000_QL80_.jpg",
    latestChapter: "205",
    hotLabel: true
  },
  {
    id: "one-punch-man",
    title: "One-Punch Man",
    coverImage: "https://m.media-amazon.com/images/I/81SrwYY-6-L._AC_UF894,1000_QL80_.jpg",
    latestChapter: "195",
    hotLabel: true
  },
  {
    id: "attack-on-titan",
    title: "Attack on Titan",
    coverImage: "https://m.media-amazon.com/images/I/91M9VaZWxOL._AC_UF1000,1000_QL80_.jpg",
    latestChapter: "139",
    hotLabel: true
  },
  {
    id: "naruto",
    title: "Naruto",
    coverImage: "https://m.media-amazon.com/images/I/71QYLrc-IQL._AC_UF1000,1000_QL80_.jpg",
    latestChapter: "700",
    hotLabel: true
  },
  {
    id: "dragon-ball-super",
    title: "Dragon Ball Super",
    coverImage: "https://m.media-amazon.com/images/I/815rh8oxLNL._AC_UF1000,1000_QL80_.jpg",
    latestChapter: "101",
    hotLabel: true
  },
  {
    id: "black-clover",
    title: "Black Clover",
    coverImage: "https://m.media-amazon.com/images/I/71lKmKeNRoL._AC_UF1000,1000_QL80_.jpg",
    latestChapter: "368",
    hotLabel: true
  }
];

export function PopularSection() {
  return (
    <section className="py-8 bg-muted/50">
      <div className="container">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Phổ biến</h2>
          <Button variant="link" asChild className="gap-1 px-0">
            <Link href="/popular">
              Xem tất cả <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {POPULAR_MANGA.map((manga) => (
            <MangaCard
              key={manga.id}
              id={manga.id}
              title={manga.title}
              coverImage={manga.coverImage}
              latestChapter={manga.latestChapter}
              hotLabel={manga.hotLabel}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
