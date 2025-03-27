"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
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
  Search,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ReadOptions } from "@/components/manga/ReadOptions";
import { Badge } from "@/components/ui/badge";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { CommentSection } from "@/components/manga/CommentSection";
import { RatingStars } from "@/components/manga/RatingStars";

interface Chapter {
  number: string;
  title: string;
  releaseDate: string;
}

interface MangaDetailClientProps {
  slug: string; // Nhận slug từ params
}

const CHAPTERS_PER_PAGE = 20;

export function MangaDetailClient({ slug }: MangaDetailClientProps) {
  const [manga, setManga] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [viewMode, setViewMode] = useState<"grid" | "list">(() => {
    if (typeof window !== "undefined") {
      return (
        (localStorage.getItem("chapterViewMode") as "grid" | "list") || "list"
      );
    }
    return "list";
  });
  const [sortAscending, setSortAscending] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleChapters, setVisibleChapters] = useState(CHAPTERS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { ref: loadMoreRef, isIntersecting } = useIntersectionObserver();

  // Lấy username từ localStorage
  useEffect(() => {
    const fetchManga = async () => {
      setLoading(true);
      let username = "guest";

      if (typeof window !== "undefined") {
        const userData = localStorage.getItem("user");
        const user = userData ? JSON.parse(userData) : null;
        username = user?.username || "guest";
      }

      const url = `https://localhost:44308/app/data/comic/thong-tin-truyen?slug=${slug}&username=${username}`;
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            accept: "*/*",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch manga detail");
        }

        const rawManga = await response.json();

        // Chuyển đổi dữ liệu
        const mangaData = {
          id: slug,
          title: rawManga.comicName,
          alternativeTitles: rawManga.alternativeTitles
            ? rawManga.alternativeTitles.split(", ")
            : [rawManga.otherName],
          description: rawManga.introduction || "Đang cập nhật",
          genres: rawManga.listTags.map(
            (tag: { tagName: string }) => tag.tagName
          ),
          author: rawManga.creator || "Đang cập nhật",
          status: rawManga.status || "Đang cập nhật",
          coverImage: rawManga.image,
          rating: rawManga.vote || 0,
          totalViews: rawManga.views || 0,
          totalBookmarks: rawManga.bookmarks || 0,
          chapters: rawManga.listChapters.map((chapter: any) => ({
            number: chapter.chapterName.replace("Chapter ", ""),
            title: chapter.title,
            releaseDate: chapter.releaseDate.split("T")[0],
          })),
        };

        setManga(mangaData);
      } catch (err) {
        setError("Không thể tải thông tin truyện. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchManga();
  }, [slug]);

  // Lọc và sắp xếp chapters
  const filteredAndSortedChapters = useMemo(() => {
    if (!manga?.chapters) return [];
    let filtered = [...manga.chapters];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (chapter) =>
          chapter.number.includes(query) ||
          chapter.title.toLowerCase().includes(query)
      );
    }

    return filtered.sort((a, b) => {
      const aNum = parseInt(a.number);
      const bNum = parseInt(b.number);
      return sortAscending ? aNum - bNum : bNum - aNum;
    });
  }, [manga?.chapters, searchQuery, sortAscending]);

  // Các logic khác giữ nguyên, chỉ cần kiểm tra manga tồn tại
  useEffect(() => {
    if (
      isIntersecting &&
      !isLoadingMore &&
      manga &&
      visibleChapters < filteredAndSortedChapters.length
    ) {
      setIsLoadingMore(true);
      setTimeout(() => {
        setVisibleChapters((prev) =>
          Math.min(prev + CHAPTERS_PER_PAGE, filteredAndSortedChapters.length)
        );
        setIsLoadingMore(false);
      }, 500);
    }
  }, [isIntersecting, filteredAndSortedChapters.length, isLoadingMore]);

  useEffect(() => {
    setVisibleChapters(CHAPTERS_PER_PAGE);
  }, [searchQuery, sortAscending]);

  const handleViewModeChange = (mode: "grid" | "list") => {
    setViewMode(mode);
    localStorage.setItem("chapterViewMode", mode);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  const handleLoadMore = () => {
    if (!isLoadingMore) {
      setIsLoadingMore(true);
      setTimeout(() => {
        setVisibleChapters((prev) =>
          Math.min(prev + CHAPTERS_PER_PAGE, filteredAndSortedChapters.length)
        );
        setIsLoadingMore(false);
      }, 500);
    }
  };

  const displayedChapters = filteredAndSortedChapters.slice(0, visibleChapters);
  const hasMoreChapters = visibleChapters < filteredAndSortedChapters.length;
  const remainingChapters = filteredAndSortedChapters.length - visibleChapters;

  const handleRate = async (rating: number) => {
    console.log("Rated:", rating);
  };

  if (loading) {
    return (
      <div className="container py-8 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="container py-8 text-center">{error}</div>;
  }

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

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8">
        {/* Main content - Manga Info */}
        <div className="space-y-6">
          <div className="flex gap-6">
            {/* Cover image */}
            <div className="w-[180px] shrink-0">
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-md">
                <Image
                  src={manga.coverImage}
                  alt={manga.title}
                  fill
                  sizes="180px"
                  className="object-cover"
                  priority
                />
              </div>
              <Button variant="outline" className="w-full mt-3">
                <Bookmark className="mr-2 h-4 w-4" /> Đánh dấu
              </Button>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold mb-2">{manga.title}</h1>
              {manga.alternativeTitles.length > 0 && (
                <p className="text-muted-foreground text-sm mb-4">
                  Tên khác: {manga.alternativeTitles.join(", ")}
                </p>
              )}

              <div className="grid gap-4 mb-4">
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
                  <div className="flex items-center gap-4">
                    <RatingStars
                      initialRating={manga.rating}
                      onRate={handleRate}
                      size="lg"
                    />
                    <span className="text-sm text-muted-foreground">
                      ({formatNumber(manga.totalViews)} lượt đánh giá)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <span>{formatNumber(manga.totalViews)} lượt xem</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Bookmark className="h-4 w-4 text-muted-foreground" />
                  <span>{formatNumber(manga.totalBookmarks)} đánh dấu</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {manga.genres.map((genre: string) => (
                  <Link
                    key={genre}
                    href={`/genres/${genre.toLowerCase().replace(" ", "-")}`}
                    className="bg-muted px-2.5 py-1 rounded-full text-xs font-medium hover:bg-primary/10"
                  >
                    {genre}
                  </Link>
                ))}
              </div>

              <ReadOptions
                mangaId={parseInt(manga.id) || 0}
                lastChapter={parseInt(manga.chapters[0].number)}
                firstChapter={parseInt(
                  manga.chapters[manga.chapters.length - 1].number
                )}
              />
            </div>
          </div>

          {/* Description */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Giới thiệu</h2>
            <p className="text-muted-foreground whitespace-pre-line">
              {manga.description}
            </p>
          </div>

          {/* Comments */}
          <div className="bg-muted/50 rounded-lg p-4">
            <CommentSection />
          </div>
        </div>

        {/* Sidebar - Chapter list */}
        <div className="space-y-6">
          <div className="border rounded-lg sticky top-4">
            <div className="p-4 border-b flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Tìm kiếm chapter..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 justify-end">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setSortAscending(!sortAscending)}
                  title={
                    sortAscending ? "Sắp xếp giảm dần" : "Sắp xếp tăng dần"
                  }
                >
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => handleViewModeChange("grid")}
                >
                  <Grid2x2 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => handleViewModeChange("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="h-[calc(100vh-200px)] overflow-y-auto">
              {viewMode === "grid" ? (
                <div className="grid grid-cols-2 gap-4 p-4">
                  {displayedChapters.map((chapter) => (
                    <Link
                      href={`/manga/${manga.id}/${chapter.number}`}
                      key={chapter.number}
                      className="p-4 rounded-lg border hover:bg-accent transition-colors"
                    >
                      <div className="font-semibold">
                        Chapter {chapter.number}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {chapter.title}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {chapter.releaseDate}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="divide-y">
                  {displayedChapters.map((chapter) => (
                    <Link
                      href={`/manga/${manga.id}/${chapter.number}`}
                      key={chapter.number}
                      className="flex items-center justify-between p-4 hover:bg-accent transition-colors"
                    >
                      <div>
                        <div className="font-semibold">
                          Chapter {chapter.number}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {chapter.title}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {chapter.releaseDate}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {hasMoreChapters && (
              <div
                ref={loadMoreRef}
                className="p-4 flex justify-center border-t"
              >
                {isLoadingMore ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <Button
                    variant="ghost"
                    onClick={handleLoadMore}
                    className="w-full"
                  >
                    Xem thêm {remainingChapters} chapter
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
