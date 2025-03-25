"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

interface CompletedManga {
  id: string;
  title: string;
  coverImage: string;
  totalChapters: number;
  rating: number;
  completedDate: string;
}

export function CompletedSection() {
  return (
    <section className="py-8">
      <div className="container">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Truyện mới hoàn thành</h2>
          <Button variant="link" asChild className="gap-1 px-0">
            <Link href="/completed">
              Xem tất cả <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <Link
              key={item}
              href={`/manga/manga-${item}`}
              className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="relative w-20 h-28 flex-shrink-0">
                <Image
                  src="http://192.168.1.63:9000/truyenspeed/ComicBookCover/menh-luan-chi-chu-lam-ke-bien-di-giang-xuong-nhan-gian.webp"
                  alt="Manga cover"
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">
                  Tên truyện {item}
                </h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{item * 100} chương</span>
                  <span>★ {4.5}</span>
                  <span>Hoàn thành: 2024-03-{item}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
