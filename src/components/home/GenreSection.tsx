"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const popularGenres = [
  {
    id: "action",
    name: "Hành động",
    image:
      "http://192.168.1.63:9000/truyenspeed/ComicBookCover/menh-luan-chi-chu-lam-ke-bien-di-giang-xuong-nhan-gian.webp",
    count: 1234,
    color: "from-orange-500/20",
  },
  {
    id: "comedy",
    name: "Hài hước",
    image:
      "http://192.168.1.63:9000/truyenspeed/ComicBookCover/menh-luan-chi-chu-lam-ke-bien-di-giang-xuong-nhan-gian.webp",
    count: 856,
    color: "from-yellow-500/20",
  },
  {
    id: "romance",
    name: "Tình cảm",
    image:
      "http://192.168.1.63:9000/truyenspeed/ComicBookCover/menh-luan-chi-chu-lam-ke-bien-di-giang-xuong-nhan-gian.webp",
    count: 945,
    color: "from-pink-500/20",
  },
  {
    id: "fantasy",
    name: "Giả tưởng",
    image:
      "http://192.168.1.63:9000/truyenspeed/ComicBookCover/menh-luan-chi-chu-lam-ke-bien-di-giang-xuong-nhan-gian.webp",
    count: 723,
    color: "from-purple-500/20",
  },
  {
    id: "horror",
    name: "Kinh dị",
    image:
      "http://192.168.1.63:9000/truyenspeed/ComicBookCover/menh-luan-chi-chu-lam-ke-bien-di-giang-xuong-nhan-gian.webp",
    count: 432,
    color: "from-red-500/20",
  },
];

export function GenreSection() {
  return (
    <section className="py-6">
      <div className="container">
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">Thể loại phổ biến</h2>
            <p className="text-sm text-muted-foreground">
              Top những thể loại được yêu thích nhất
            </p>
          </div>
          <Button variant="outline" size="sm" asChild className="gap-1">
            <Link href="/genres">
              Tất cả thể loại
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {popularGenres.map((genre) => (
            <Link
              key={genre.id}
              href={`/genres/${genre.id}`}
              className="group relative block"
            >
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted">
                <Image
                  src={genre.image}
                  alt={genre.name}
                  fill
                  className="object-cover brightness-[0.7] group-hover:scale-110 group-hover:brightness-[0.5] transition-all duration-300"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${genre.color} to-transparent opacity-60 mix-blend-overlay`}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <h3 className="text-white font-semibold text-lg mb-1 drop-shadow-md">
                    {genre.name}
                  </h3>
                  <p className="text-white/90 text-sm">
                    {genre.count.toLocaleString()} truyện
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 ring-1 ring-white/10 rounded-lg group-hover:ring-primary/50 transition-all duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
