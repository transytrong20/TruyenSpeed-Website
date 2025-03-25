"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Home,
  List,
  ArrowLeft,
  Columns,
  Rows,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MangaPageTurner3D } from "@/components/effects/MangaPageTurner3D";
import Image from "next/image";

// Mock data: Trong thực tế nên thay thế bằng dữ liệu từ API
const MANGA_DETAIL = {
  id: "dai-quan-gia-la-ma-hoang",
  title: "Đại Quản Gia Là Ma Hoàng",
  coverImage:
    "http://192.168.1.63:9000/truyenspeed/ComicBookCover/dai-quan-gia-la-ma-hoang.webp",
  chapters: [
    { number: "173", title: "Kết cục của cuộc chiến" },
    { number: "172", title: "Đối đầu" },
    { number: "171", title: "Phản công" },
    { number: "170", title: "Nguy hiểm" },
    { number: "169", title: "Bí mật" },
  ],
};

// Mock data cho trang truyện
const CHAPTER_PAGES = Array.from({ length: 50 }, (_, index) => {
  const pageNumber = (index + 1).toString().padStart(2, "0");
  return `http://192.168.1.63:9000/truyenspeed/DataComic/dai-quan-gia-la-ma-hoang/chapter-173/dai-quan-gia-la-ma-hoang_chapter-173_trang-${pageNumber}.webp`;
});

interface ChapterPageClientProps {
  params: {
    id: string;
    chapter: string;
  };
}

export function ChapterPageClient({ params }: ChapterPageClientProps) {
  const [chapterIndex, setChapterIndex] = useState(0);
  const [selectedChapter, setSelectedChapter] = useState(params.chapter);
  const [sortAscending, setSortAscending] = useState(false);
  const [showUI, setShowUI] = useState(true);
  const manga = MANGA_DETAIL;
  const [readingMode, setReadingMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("readingMode") || "vertical";
    }
    return "vertical";
  });

  // Sắp xếp danh sách chương
  const sortedChapters = [...manga.chapters].sort((a, b) => {
    const aNum = parseInt(a.number);
    const bNum = parseInt(b.number);
    return sortAscending ? aNum - bNum : bNum - aNum;
  });

  // Tìm index của chapter hiện tại
  useEffect(() => {
    const index = manga.chapters.findIndex((c) => c.number === params.chapter);
    setChapterIndex(index !== -1 ? index : 0);
    setSelectedChapter(params.chapter);
  }, [params.chapter, manga.chapters]);

  const prevChapter =
    chapterIndex < manga.chapters.length - 1
      ? manga.chapters[chapterIndex + 1]
      : null;
  const nextChapter =
    chapterIndex > 0 ? manga.chapters[chapterIndex - 1] : null;

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

  const handleReadingModeChange = (mode: string) => {
    setReadingMode(mode);
    localStorage.setItem("readingMode", mode);
    // Reload trang để áp dụng chế độ đọc mới
    window.location.href = `${window.location.pathname}?mode=${mode}`;
  };

  // Toggle UI visibility when tapping on the screen
  const handleContentClick = () => {
    setShowUI(!showUI);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Top navigation - now conditionally rendered */}
      <div
        className={`fixed top-0 left-0 right-0 z-20 bg-background/95 backdrop-blur border-b transition-transform duration-300 ${
          showUI ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild className="md:hidden">
                <Link href={`/manga/${manga.id}`}>
                  <ChevronLeft className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="hidden md:flex"
              >
                <Link href={`/manga/${manga.id}`}>
                  <ArrowLeft className="h-5 w-5" />
                  <span className="sr-only">Quay lại</span>
                </Link>
              </Button>
              <h1 className="text-sm font-medium truncate max-w-[150px] md:max-w-xs">
                {manga.title} - Chapter {params.chapter}
              </h1>
            </div>

            {/* Desktop controls */}
            <div className="hidden md:flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    {readingMode === "vertical" ? (
                      <Columns className="h-4 w-4" />
                    ) : (
                      <Rows className="h-4 w-4" />
                    )}
                    {readingMode === "vertical" ? "Đọc dọc" : "Đọc ngang"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => handleReadingModeChange("vertical")}
                  >
                    <Columns className="h-4 w-4 mr-2" />
                    <div>
                      <div className="font-medium">Đọc dọc</div>
                      <div className="text-xs text-muted-foreground">
                        Cuộn dọc từng trang
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleReadingModeChange("horizontal")}
                  >
                    <Rows className="h-4 w-4 mr-2" />
                    <div>
                      <div className="font-medium">Đọc ngang</div>
                      <div className="text-xs text-muted-foreground">
                        Lật ngang từng trang
                      </div>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={() => setSortAscending(!sortAscending)}
                title={sortAscending ? "Sắp xếp giảm dần" : "Sắp xếp tăng dần"}
              >
                <ArrowUpDown className="h-4 w-4" />
              </Button>

              <Select
                defaultValue={params.chapter}
                value={selectedChapter}
                onValueChange={handleChapterChange}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Chọn chương" />
                </SelectTrigger>
                <SelectContent>
                  {sortedChapters.map((chapter) => (
                    <SelectItem key={chapter.number} value={chapter.number}>
                      Chapter {chapter.number}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] sm:w-[340px]">
                  <SheetHeader>
                    <SheetTitle>Tùy chọn đọc truyện</SheetTitle>
                  </SheetHeader>
                  <div className="py-4 space-y-4">
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Chế độ đọc</div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant={
                            readingMode === "vertical" ? "default" : "outline"
                          }
                          className="w-full justify-start gap-2"
                          onClick={() => handleReadingModeChange("vertical")}
                        >
                          <Columns className="h-4 w-4" />
                          Đọc dọc
                        </Button>
                        <Button
                          variant={
                            readingMode === "horizontal" ? "default" : "outline"
                          }
                          className="w-full justify-start gap-2"
                          onClick={() => handleReadingModeChange("horizontal")}
                        >
                          <Rows className="h-4 w-4" />
                          Đọc ngang
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-medium">Chọn chương</div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setSortAscending(!sortAscending)}
                        >
                          <ArrowUpDown className="h-4 w-4" />
                        </Button>
                        <Select
                          defaultValue={params.chapter}
                          value={selectedChapter}
                          onValueChange={handleChapterChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Chọn chương" />
                          </SelectTrigger>
                          <SelectContent>
                            {sortedChapters.map((chapter) => (
                              <SelectItem
                                key={chapter.number}
                                value={chapter.number}
                              >
                                Chapter {chapter.number}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 py-4 mt-14" onClick={handleContentClick}>
        {readingMode === "vertical" ? (
          <div className="max-w-4xl mx-auto space-y-2 px-0 md:px-4">
            {CHAPTER_PAGES.map((page, index) => (
              <div
                key={index}
                className="relative aspect-[2/3] md:rounded-lg overflow-hidden"
              >
                <Image
                  src={page}
                  alt={`${manga.title} - Trang ${index + 1}`}
                  fill
                  className="object-contain"
                  priority={index < 2}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
                />
              </div>
            ))}
          </div>
        ) : (
          <MangaPageTurner3D
            pages={CHAPTER_PAGES}
            onPrevPage={() => {}}
            onNextPage={() => {}}
            mangaTitle={manga.title}
            chapterNumber={params.chapter}
          />
        )}
      </div>

      {/* Bottom navigation */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-20 bg-background/95 backdrop-blur border-t transition-transform duration-300 ${
          showUI ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="container py-3">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              asChild
              disabled={!prevChapter}
              className="min-w-[100px]"
            >
              <Link
                href={
                  prevChapter ? `/manga/${manga.id}/${prevChapter.number}` : "#"
                }
              >
                <ChevronLeft className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Chương trước</span>
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

            <Button
              variant="outline"
              size="sm"
              asChild
              disabled={!nextChapter}
              className="min-w-[100px]"
            >
              <Link
                href={
                  nextChapter ? `/manga/${manga.id}/${nextChapter.number}` : "#"
                }
              >
                <span className="hidden md:inline">Chương sau</span>
                <ChevronRight className="h-4 w-4 md:ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
