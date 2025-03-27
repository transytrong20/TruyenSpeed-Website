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
import { useRouter, usePathname } from "next/navigation";

interface ReadingComic {
  title: string;
  description: string;
  coverImage: string;
  imageChapters: {
    image: string;
    title: string;
    alt: string;
  }[];
  listChapters: {
    chapterName: string;
    title: string;
  }[];
}

interface ChapterPageClientProps {
  params: { id: string; chapter: string };
  readingComic: ReadingComic;
}

export function ChapterPageClient({
  params,
  readingComic,
}: ChapterPageClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [chapterIndex, setChapterIndex] = useState(0);
  const [selectedChapter, setSelectedChapter] = useState(params.chapter);
  const [sortAscending, setSortAscending] = useState(false);
  const [showUI, setShowUI] = useState(true);

  // Chuẩn hóa danh sách chương
  const normalizedChapters = readingComic.listChapters.map((ch) => ({
    number: ch.chapterName.toLowerCase().replace("chapter ", "").trim(),
    title: ch.title,
  }));

  const manga = {
    id: params.id,
    title: readingComic.title,
    coverImage: readingComic.coverImage,
    chapters: normalizedChapters,
  };

  const [readingMode, setReadingMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("readingMode") || "vertical";
    }
    return "vertical";
  });

  // Sắp xếp danh sách chương
  const sortedChapters = [...manga.chapters].sort((a, b) => {
    const aNum = parseFloat(a.number);
    const bNum = parseFloat(b.number);
    return sortAscending ? aNum - bNum : bNum - aNum;
  });

  // Tìm index của chapter hiện tại
  useEffect(() => {
    const index = sortedChapters.findIndex((c) => c.number === params.chapter);
    setChapterIndex(index !== -1 ? index : 0);
    setSelectedChapter(params.chapter);
  }, [params.chapter, sortedChapters]);

  const prevChapter =
    chapterIndex < sortedChapters.length - 1
      ? sortedChapters[chapterIndex + 1]
      : null;
  const nextChapter =
    chapterIndex > 0 ? sortedChapters[chapterIndex - 1] : null;

  // Dữ liệu trang đã được API sắp xếp sẵn
  const sortedPages = readingComic.imageChapters;

  const handleChapterChange = (value: string) => {
    router.push(`/manga/${manga.id}/${value}`);
  };

  const goToPrevChapter = () => {
    if (prevChapter) {
      router.push(`/manga/${manga.id}/${prevChapter.number}`);
    }
  };

  const goToNextChapter = () => {
    if (nextChapter) {
      router.push(`/manga/${manga.id}/${nextChapter.number}`);
    }
  };

  const handleReadingModeChange = (mode: string) => {
    setReadingMode(mode);
    localStorage.setItem("readingMode", mode);
    router.push(`${pathname}?mode=${mode}`);
  };

  const handleContentClick = () => {
    setShowUI(!showUI);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Top navigation */}
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
                {manga.title} - {params.chapter}
              </h1>
            </div>

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
                value={selectedChapter}
                onValueChange={handleChapterChange}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Chọn chương" />
                </SelectTrigger>
                <SelectContent>
                  {sortedChapters.map((chapter) => (
                    <SelectItem key={chapter.number} value={chapter.number}>
                      {chapter.number}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

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
                                {chapter.number}
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
          <div className="container mx-auto px-2 md:px-4">
            {sortedPages.map((page, index) => (
              <div
                key={index}
                className="relative w-full md:rounded-lg overflow-hidden shadow-md"
              >
                <Image
                  src={page.image}
                  alt={page.alt}
                  width={0}
                  height={0}
                  className="w-full h-auto"
                  priority={index < 2}
                  loading={index < 2 ? "eager" : "lazy"}
                  sizes="100vw"
                  quality={85}
                  style={{
                    maxWidth: "100%",
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <MangaPageTurner3D
            pages={sortedPages.map((page) => page.image)}
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
              className="min-w-[100px] hover:bg-primary hover:text-primary-foreground transition-colors"
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
              <Button
                variant="outline"
                size="icon"
                asChild
                className="hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Link href={`/manga/${manga.id}`}>
                  <List className="h-4 w-4" />
                  <span className="sr-only">Danh sách chương</span>
                </Link>
              </Button>
              <Button
                variant="outline"
                size="icon"
                asChild
                className="hover:bg-primary hover:text-primary-foreground transition-colors"
              >
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
              className="min-w-[100px] hover:bg-primary hover:text-primary-foreground transition-colors"
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
