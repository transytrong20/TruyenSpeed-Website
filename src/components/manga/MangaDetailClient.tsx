"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ChevronLeft,
  Bookmark,
  Clock,
  BookOpen,
  ArrowUpDown,
  Grid2x2,
  List,
  Star,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReadOptions } from "@/components/manga/ReadOptions";
import { Badge } from "@/components/ui/badge";

interface Chapter {
  number: string;
  title: string;
  releaseDate: string;
}

interface MangaDetailClientProps {
  manga: {
    id: string;
    title: string;
    alternativeTitles: string[];
    description: string;
    genres: string[];
    author: string;
    status: string;
    coverImage: string;
    rating: number;
    totalViews: number;
    totalBookmarks: number;
    chapters: Chapter[];
  };
}

export function MangaDetailClient({ manga }: MangaDetailClientProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">(() => {
    if (typeof window !== "undefined") {
      return (
        (localStorage.getItem("chapterViewMode") as "grid" | "list") || "list"
      );
    }
    return "list";
  });
  const [sortAscending, setSortAscending] = useState(false);

  // Sắp xếp danh sách chapter
  const sortedChapters = [...manga.chapters].sort((a, b) => {
    const aNum = parseInt(a.number);
    const bNum = parseInt(b.number);
    return sortAscending ? aNum - bNum : bNum - aNum;
  });

  const handleViewModeChange = (mode: "grid" | "list") => {
    setViewMode(mode);
    localStorage.setItem("chapterViewMode", mode);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-sm">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Trang chủ
        </Link>
        <span className="text-muted-foreground">/</span>
        <span className="font-medium truncate">{manga.title}</span>
      </div>

      {/* Manga info section */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="md:w-1/3 lg:w-1/4">
          <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-md">
            <Image
              src={manga.coverImage}
              alt={manga.title}
              fill
              sizes="(max-width: 768px) 100vw, 300px"
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="flex-1">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link
              href="/"
              className="flex items-center gap-1 text-muted-foreground"
            >
              <ChevronLeft className="h-4 w-4" /> Quay lại
            </Link>
          </Button>

          <h1 className="text-2xl md:text-3xl font-bold mb-2">{manga.title}</h1>

          {manga.alternativeTitles.length > 0 && (
            <p className="text-muted-foreground text-sm mb-4">
              Tên khác: {manga.alternativeTitles.join(", ")}
            </p>
          )}

          <div className="flex flex-wrap gap-2 mb-4">
            {manga.genres.map((genre) => (
              <Link
                key={genre}
                href={`/genres/${genre.toLowerCase().replace(" ", "-")}`}
                className="bg-muted px-2.5 py-1 rounded-full text-xs font-medium hover:bg-primary/10"
              >
                {genre}
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div>
              <p className="text-sm text-muted-foreground">Tác giả</p>
              <p className="font-medium">{manga.author}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Trạng thái</p>
              <p className="font-medium">{manga.status}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Đánh giá</p>
              <p className="font-medium">⭐ {manga.rating}/5.0</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span>{manga.totalViews.toLocaleString()} lượt đọc</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Bookmark className="h-4 w-4 text-muted-foreground" />
              <span>{manga.totalBookmarks.toLocaleString()} đánh dấu</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <ReadOptions
              mangaId={parseInt(manga.id)}
              lastChapter={parseInt(manga.chapters[0].number)}
              firstChapter={parseInt(
                manga.chapters[manga.chapters.length - 1].number
              )}
            />
            <Button variant="outline" size="lg">
              <Bookmark className="mr-2 h-4 w-4" /> Đánh dấu
            </Button>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-muted/50 rounded-lg p-4 md:p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Giới thiệu</h2>
        <p className="text-muted-foreground whitespace-pre-line">
          {manga.description}
        </p>
      </div>

      {/* Chapters section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Danh sách chương</h2>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => handleViewModeChange("grid")}
              title="Hiển thị dạng lưới"
            >
              <Grid2x2 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => handleViewModeChange("list")}
              title="Hiển thị dạng danh sách"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSortAscending(!sortAscending)}
              title={sortAscending ? "Sắp xếp giảm dần" : "Sắp xếp tăng dần"}
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {sortedChapters.map((chapter) => (
              <Link
                key={chapter.number}
                href={`/manga/${manga.id}/${chapter.number}`}
                className="group bg-muted hover:bg-accent rounded-lg p-4 transition-colors"
              >
                <div className="font-medium group-hover:text-accent-foreground">
                  Chapter {chapter.number}
                </div>
                <div className="text-sm text-muted-foreground line-clamp-1 group-hover:text-accent-foreground">
                  {chapter.title}
                </div>
                <div className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(chapter.releaseDate).toLocaleDateString("vi-VN")}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {sortedChapters.map((chapter) => (
              <Link
                key={chapter.number}
                href={`/manga/${manga.id}/${chapter.number}`}
                className="group flex items-center justify-between rounded-lg p-4 hover:bg-accent transition-colors"
              >
                <div className="space-y-1">
                  <div className="font-medium group-hover:text-accent-foreground">
                    Chapter {chapter.number}
                  </div>
                  <div className="text-sm text-muted-foreground group-hover:text-accent-foreground">
                    {chapter.title}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {new Date(chapter.releaseDate).toLocaleDateString("vi-VN")}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
