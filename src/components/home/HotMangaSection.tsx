"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface HotManga {
  comicName: string;
  otherName: string;
  image: string;
  creator: string;
  status: string;
  introduction: string;
  views: number;
  listChapters: { chapterName: string }[];
  listTags: string[];
}

export function HotMangaSection() {
  const [hotManga, setHotManga] = useState<HotManga[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotManga = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://localhost:44308/app/data/comic/truyen-hot");
        if (!response.ok) throw new Error("Failed to fetch hot manga");
        const data: HotManga[] = await response.json();
        setHotManga(data);
      } catch (error) {
        console.error("Error fetching hot manga:", error);
        setHotManga([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHotManga();
  }, []);

  return (
    <section className="py-8 bg-gradient-to-b from-background to-muted/20">
      <div className="container">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <span className="bg-primary text-primary-foreground px-2 py-1 rounded-md">Hot</span> Truyện Hot
          </h2>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="gap-1 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Link href="/hot">
              Xem tất cả <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="space-y-4">
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 animate-pulse"
              >
                <div className="relative w-20 h-28 flex-shrink-0 rounded-md bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 w-3/4 bg-muted rounded" />
                  <div className="h-4 w-1/2 bg-muted rounded" />
                </div>
              </div>
            ))
          ) : hotManga.length > 0 ? (
            hotManga.map((manga, index) => (
              <motion.div
                key={manga.otherName}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  href={`/manga/${manga.otherName}`}
                  className="flex items-center gap-4 p-4 rounded-lg bg-card hover:bg-muted/50 transition-all duration-300 shadow-sm hover:shadow-md border border-border"
                >
                  <div className="relative w-20 h-28 flex-shrink-0">
                    <Image
                      src={manga.image}
                      alt={manga.comicName}
                      fill
                      className="object-cover rounded-md transition-transform duration-300 hover:scale-105"
                    />
                    <Badge className="absolute top-1 left-1 bg-primary text-primary-foreground text-xs">
                      {manga.status}
                    </Badge>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-foreground mb-1 hover:text-primary transition-colors">
                      {manga.comicName}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <span>{manga.listChapters[0]?.chapterName || "Chưa có chương"}</span>
                      <span className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        {(manga.views / 100000).toFixed(1)} / 5
                      </span>
                      <span>{manga.views.toLocaleString()} lượt xem</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {manga.introduction}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="text-center text-muted-foreground py-4">
              Không có truyện hot nào để hiển thị.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}