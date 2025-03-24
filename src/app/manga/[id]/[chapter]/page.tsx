"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Home, List, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MangaPageTurner3D } from "@/components/effects/MangaPageTurner3D";

// Mock data: Trong thực tế nên thay thế bằng dữ liệu từ API
const MANGA_DETAIL = {
  id: "one-piece",
  title: "One Piece",
  coverImage: "https://m.media-amazon.com/images/I/81s8xJUzWGL._AC_UF1000,1000_QL80_.jpg",
  chapters: [
    { number: "1112", title: "Những người bạn" },
    { number: "1111", title: "Bí mật của Laugh Tale" },
    { number: "1110", title: "Trận chiến cuối cùng" },
    { number: "1109", title: "Hải tặc và Thủy quân lục chiến" },
    { number: "1108", title: "Sự trở lại của Shanks" },
  ],
};

// Mock data cho trang truyện
const CHAPTER_PAGES = [
  "https://cdn.statically.io/img/swebtoon.net/f=auto/wp-content/uploads/2020/04/001-103.jpg",
  "https://cdn.statically.io/img/swebtoon.net/f=auto/wp-content/uploads/2020/04/002-103.jpg",
  "https://cdn.statically.io/img/swebtoon.net/f=auto/wp-content/uploads/2020/04/003-102.jpg",
  "https://cdn.statically.io/img/swebtoon.net/f=auto/wp-content/uploads/2020/04/004-101.jpg",
  "https://cdn.statically.io/img/swebtoon.net/f=auto/wp-content/uploads/2020/04/005-97.jpg",
  "https://cdn.statically.io/img/swebtoon.net/f=auto/wp-content/uploads/2020/04/006-96.jpg",
  "https://cdn.statically.io/img/swebtoon.net/f=auto/wp-content/uploads/2020/04/007-87.jpg",
  "https://cdn.statically.io/img/swebtoon.net/f=auto/wp-content/uploads/2020/04/008-82.jpg",
];

export default function ChapterPage({ params }: { params: { id: string; chapter: string } }) {
  const [chapterIndex, setChapterIndex] = useState(0);
  const [selectedChapter, setSelectedChapter] = useState(params.chapter);
  const manga = MANGA_DETAIL;

  // Tìm index của chapter hiện tại
  useEffect(() => {
    const index = manga.chapters.findIndex(c => c.number === params.chapter);
    setChapterIndex(index !== -1 ? index : 0);
    setSelectedChapter(params.chapter);
  }, [params.chapter, manga.chapters]);

  const prevChapter = chapterIndex < manga.chapters.length - 1 ? manga.chapters[chapterIndex + 1] : null;
  const nextChapter = chapterIndex > 0 ? manga.chapters[chapterIndex - 1] : null;

  // Handler khi người dùng chọn chương khác
  const handleChapterChange = (value: string) => {
    window.location.href = `/manga/${manga.id}/${value}`;
  };

  // Handler khi người dùng lật qua chapter trước/sau
  const goToPrevChapter = () => {
    if (prevChapter) {
      window.location.href = `/manga/${manga.id}/${prevChapter.number}`;
    }
  };

  const goToNextChapter = () => {
    if (nextChapter) {
      window.location.href = `/manga/${manga.id}/${nextChapter.number}`;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top navigation */}
      <div className="sticky top-0 z-20 bg-background border-b">
        <div className="container py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild>
                <Link href={`/manga/${manga.id}`}>
                  <ArrowLeft className="h-5 w-5" />
                  <span className="sr-only">Quay lại</span>
                </Link>
              </Button>
              <h1 className="text-sm font-medium truncate max-w-[200px] md:max-w-xs">
                {manga.title} - Chapter {params.chapter}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <Select
                defaultValue={params.chapter}
                value={selectedChapter}
                onValueChange={handleChapterChange}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Chọn chương" />
                </SelectTrigger>
                <SelectContent>
                  {manga.chapters.map((chapter) => (
                    <SelectItem key={chapter.number} value={chapter.number}>
                      Chapter {chapter.number}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Main content - manga pages with 3D effect */}
      <div className="flex-1 flex flex-col items-center bg-muted/30 py-4">
        <div className="container max-w-4xl mx-auto flex flex-col items-center">
          <MangaPageTurner3D
            pages={CHAPTER_PAGES}
            onPrevPage={goToPrevChapter}
            onNextPage={goToNextChapter}
            mangaTitle={manga.title}
            chapterNumber={params.chapter}
          />
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="sticky bottom-0 z-20 bg-background border-t py-3">
        <div className="container">
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" asChild disabled={!prevChapter}>
              <Link href={prevChapter ? `/manga/${manga.id}/${prevChapter.number}` : "#"}>
                Chương trước
              </Link>
            </Button>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" asChild>
                <Link href={`/manga/${manga.id}`}>
                  <List className="h-4 w-4" />
                  <span className="sr-only">Danh sách chương</span>
                </Link>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <Link href="/">
                  <Home className="h-4 w-4" />
                  <span className="sr-only">Trang chủ</span>
                </Link>
              </Button>
            </div>

            <Button variant="outline" size="sm" asChild disabled={!nextChapter}>
              <Link href={nextChapter ? `/manga/${manga.id}/${nextChapter.number}` : "#"}>
                Chương sau
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
