"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, List, Keyboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Manga, Chapter } from "@/data/manga";

interface ChapterNavigationProps {
  manga: Manga;
  currentChapter: Chapter;
  variant?: "full" | "minimal";
  className?: string;
}

export function ChapterNavigation({
  manga,
  currentChapter,
  variant = "full",
  className
}: ChapterNavigationProps) {
  const [showHelp, setShowHelp] = useState(false);

  // Tìm vị trí chương hiện tại
  const currentIndex = manga.chapters.findIndex(
    (chapter) => chapter.id === currentChapter.id
  );

  // Xác định chương trước và chương sau
  const prevChapter = currentIndex > 0 ? manga.chapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < manga.chapters.length - 1 ? manga.chapters[currentIndex + 1] : null;

  // Xử lý phím tắt
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Phím mũi tên trái: chương trước
      if (e.key === "ArrowLeft" && prevChapter) {
        window.location.href = `/manga/${manga.id}/read/${prevChapter.id}`;
      }
      // Phím mũi tên phải: chương sau
      else if (e.key === "ArrowRight" && nextChapter) {
        window.location.href = `/manga/${manga.id}/read/${nextChapter.id}`;
      }
      // Phím Home: về trang chi tiết truyện
      else if (e.key === "Home") {
        window.location.href = `/manga/${manga.id}`;
      }
      // Phím L: danh sách chương
      else if (e.key === "l" || e.key === "L") {
        window.location.href = `/manga/${manga.id}/chapters`;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [manga.id, prevChapter, nextChapter]);

  if (variant === "minimal") {
    return (
      <div className={`flex items-center justify-between gap-2 ${className}`}>
        <Button
          asChild
          variant="outline"
          size="icon"
          disabled={!prevChapter}
        >
          <Link
            href={prevChapter ? `/manga/${manga.id}/read/${prevChapter.id}` : "#"}
            aria-label="Chương trước"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>

        <Button asChild variant="outline" size="sm">
          <Link href={`/manga/${manga.id}/chapters`} aria-label="Danh sách chương">
            <List className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Chương</span>
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          size="icon"
          disabled={!nextChapter}
        >
          <Link
            href={nextChapter ? `/manga/${manga.id}/read/${nextChapter.id}` : "#"}
            aria-label="Chương tiếp"
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex items-center justify-between gap-2">
        <Button
          asChild
          variant="outline"
          disabled={!prevChapter}
          className="flex-1"
        >
          <Link
            href={prevChapter ? `/manga/${manga.id}/read/${prevChapter.id}` : "#"}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Chương trước
          </Link>
        </Button>

        <Button asChild variant="outline">
          <Link href={`/manga/${manga.id}`}>
            Thông tin truyện
          </Link>
        </Button>

        <Button asChild variant="outline">
          <Link href={`/manga/${manga.id}/chapters`}>
            <List className="mr-1 h-4 w-4" />
            Danh sách chương
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          disabled={!nextChapter}
          className="flex-1"
        >
          <Link
            href={nextChapter ? `/manga/${manga.id}/read/${nextChapter.id}` : "#"}
          >
            Chương tiếp
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm">
          <span className="text-muted-foreground">Đang đọc: </span>
          <span className="font-medium">Chương {currentChapter.number}: {currentChapter.title}</span>
        </div>

        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2"
            onClick={() => setShowHelp(!showHelp)}
          >
            <Keyboard className="h-4 w-4 mr-1" />
            <span className="text-xs">Phím tắt</span>
          </Button>

          {showHelp && (
            <div className="absolute right-0 mt-1 p-3 bg-popover border rounded-md shadow-md text-xs space-y-1 z-10 w-60">
              <p className="font-medium mb-1">Phím tắt:</p>
              <p><span className="font-semibold">←</span>: Chương trước</p>
              <p><span className="font-semibold">→</span>: Chương tiếp</p>
              <p><span className="font-semibold">Home</span>: Về trang thông tin truyện</p>
              <p><span className="font-semibold">L</span>: Danh sách chương</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
