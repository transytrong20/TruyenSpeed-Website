"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

interface GenreManga {
  id: string;
  title: string;
  coverImage: string;
  genre: string;
  rating: number;
}

export function GenreSection() {
  const genres = [
    { id: "action", name: "Hành động" },
    { id: "romance", name: "Tình cảm" },
    { id: "comedy", name: "Hài hước" },
    { id: "fantasy", name: "Fantasy" },
  ];

  return (
    <section className="py-8 bg-muted/50">
      <div className="container">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Truyện theo thể loại</h2>
          <Button variant="link" asChild className="gap-1 px-0">
            <Link href="/genres">
              Xem tất cả <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {genres.map((genre) => (
            <div key={genre.id} className="group">
              <Link href={`/genre/${genre.id}`} className="block">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3">
                  <Image
                    src="http://192.168.1.63:9000/truyenspeed/ComicBookCover/menh-luan-chi-chu-lam-ke-bien-di-giang-xuong-nhan-gian.webp"
                    alt={genre.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold text-lg">
                      {genre.name}
                    </h3>
                    <p className="text-white/80 text-sm">★ 4.5</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[1, 2, 3, 4].map((item) => (
                    <div
                      key={item}
                      className="text-sm hover:text-primary transition-colors"
                    >
                      Truyện {item}
                    </div>
                  ))}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
