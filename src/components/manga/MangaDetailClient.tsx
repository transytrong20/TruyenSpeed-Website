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
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ReadOptions } from "@/components/manga/ReadOptions";
import { Badge } from "@/components/ui/badge";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { CommentSection } from "@/components/manga/CommentSection";
import { RatingStars } from "@/components/manga/RatingStars";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

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
    isBookmarks?: boolean;
    isLiked?: boolean;
    totalLikes?: number;
    chapters: Chapter[];
  };
  slug: string;
}

const CHAPTERS_PER_PAGE = 20;

export function MangaDetailClient({
  manga: initialManga,
  slug,
}: MangaDetailClientProps) {
  const [manga, setManga] = useState({
    ...initialManga,
    isLiked: initialManga.isLiked || false,
    totalLikes: initialManga.totalLikes || 0,
  });
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [sortAscending, setSortAscending] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleChapters, setVisibleChapters] = useState(CHAPTERS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { ref: loadMoreRef, isIntersecting } = useIntersectionObserver();

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const savedViewMode = localStorage.getItem("chapterViewMode") as
      | "grid"
      | "list";
    if (savedViewMode) setViewMode(savedViewMode);
  }, []);

  useEffect(() => {
    const updateMangaData = async () => {
      const token = localStorage.getItem("token");
      const url = `https://localhost:44308/app/data/comic/thong-tin-truyen?slug=${slug}`;

      try {
        const headers: Record<string, string> = { accept: "*/*" };
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(url, {
          method: "GET",
          headers,
        });
        if (!response.ok)
          throw new Error("Failed to fetch updated manga detail");

        const rawManga = await response.json();
        const updatedManga = {
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
          rating: rawManga.vote || 5,
          totalViews: rawManga.totalVote || 0,
          totalBookmarks: rawManga.bookmarks || 0,
          isBookmarks: rawManga.isBookmarks || false,
          isLiked: rawManga.isLiked || false,
          totalLikes: rawManga.totalLikes || 0,
          chapters: rawManga.listChapters.map((chapter: any) => ({
            number: chapter.chapterName
              .replace("Chapter ", "")
              .replace("chapter ", ""),
            title: chapter.title,
            releaseDate: chapter.releaseDate.split("T")[0],
          })),
        };
        setManga(updatedManga);
      } catch (error) {
        console.error("Error updating manga detail:", error);
      }
    };

    updateMangaData();
  }, [slug]);

  const handleBookmark = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      const currentUrl = encodeURIComponent(pathname);
      toast.error("Vui lòng đăng nhập", {
        description: "Bạn cần đăng nhập để đánh dấu truyện",
        action: {
          label: "Đăng nhập",
          onClick: () => router.push(`/login?redirect=${currentUrl}`),
        },
        actionButtonStyle: {
          background: "hsl(var(--primary))",
          color: "white",
        },
      });
      return;
    }

    const url = `https://localhost:44308/app/data/comicbookmark/add?slug=${slug}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "*/*",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to toggle bookmark");
      }

      setManga((prev) => ({
        ...prev,
        isBookmarks: !prev.isBookmarks,
        totalBookmarks: prev.isBookmarks
          ? prev.totalBookmarks - 1
          : prev.totalBookmarks + 1,
      }));
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      toast.error("Không thể cập nhật đánh dấu", {
        description: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
      });
    }
  };

  const handleLike = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      const currentUrl = encodeURIComponent(pathname);
      toast.error("Vui lòng đăng nhập", {
        description: "Bạn cần đăng nhập để thích truyện",
        action: {
          label: "Đăng nhập",
          onClick: () => router.push(`/login?redirect=${currentUrl}`),
        },
        actionButtonStyle: {
          background: "hsl(var(--primary))",
          color: "white",
        },
      });
      return;
    }

    const url = `https://localhost:44308/app/data/comiclike/add?slug=${slug}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "*/*",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to toggle like");
      }

      setManga((prev) => ({
        ...prev,
        isLiked: !prev.isLiked,
        totalLikes: prev.isLiked ? prev.totalLikes - 1 : prev.totalLikes + 1,
      }));
    } catch (error) {
      console.error("Error toggling like:", error);
      toast.error("Không thể cập nhật lượt thích", {
        description: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
      });
    }
  };

  const filteredAndSortedChapters = useMemo(() => {
    let filtered = [...manga.chapters];
    if (searchQuery) {
      const query = searchQuery.toLowerCase().replace("chapter ", "").trim();
      filtered = filtered.filter((chapter) => {
        const chapterNum = chapter.number.toLowerCase();
        const chapterTitle = chapter.title.toLowerCase();
        return chapterNum.includes(query) || chapterTitle.includes(query);
      });
    }
    const sorted = filtered.sort((a, b) => {
      const aNum = parseInt(a.number);
      const bNum = parseInt(b.number);
      return sortAscending ? aNum - bNum : bNum - aNum;
    });
    console.log(
      "Filtered chapters length:",
      sorted.length,
      "Query:",
      searchQuery
    ); // Debug
    return sorted;
  }, [manga.chapters, searchQuery, sortAscending]);

  // Reset visibleChapters khi searchQuery hoặc sortAscending thay đổi
  useEffect(() => {
    setVisibleChapters(CHAPTERS_PER_PAGE);
    setIsLoadingMore(false);
  }, [searchQuery, sortAscending]);

  // Load thêm chapter khi scroll tới cuối
  useEffect(() => {
    console.log(
      "Intersection check:",
      isIntersecting,
      "Loading:",
      isLoadingMore,
      "Visible:",
      visibleChapters,
      "Total filtered:",
      filteredAndSortedChapters.length
    ); // Debug
    if (
      isIntersecting &&
      !isLoadingMore &&
      visibleChapters < filteredAndSortedChapters.length
    ) {
      setIsLoadingMore(true);
      setTimeout(() => {
        setVisibleChapters((prev) =>
          Math.min(prev + CHAPTERS_PER_PAGE, filteredAndSortedChapters.length)
        );
        setIsLoadingMore(false);
        console.log(
          "Loaded more, new visible:",
          visibleChapters + CHAPTERS_PER_PAGE
        ); // Debug
      }, 500);
    }
  }, [
    isIntersecting,
    filteredAndSortedChapters.length,
    isLoadingMore,
    visibleChapters,
  ]);

  const handleViewModeChange = (mode: "grid" | "list") => {
    setViewMode(mode);
    localStorage.setItem("chapterViewMode", mode);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  const displayedChapters = filteredAndSortedChapters.slice(0, visibleChapters);
  const hasMoreChapters = visibleChapters < filteredAndSortedChapters.length;

  return (
    <div className="container py-8">
      <div className="flex items-center gap-2 mb-6 text-sm">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Trang chủ
        </Link>
        <span className="text-muted-foreground">/</span>
        <span className="font-medium truncate">{manga.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8">
        <div className="space-y-6">
          <div className="flex gap-6">
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
              <div className="space-y-2 mt-3">
                <Button
                  variant={manga.isBookmarks ? "default" : "outline"}
                  className={`w-full ${
                    manga.isBookmarks ? "bg-green-600 hover:bg-green-700" : ""
                  }`}
                  onClick={handleBookmark}
                >
                  <Bookmark
                    className="mr-2 h-4 w-4"
                    fill={manga.isBookmarks ? "currentColor" : "none"}
                  />
                  {manga.isBookmarks ? "Đã đánh dấu" : "Đánh dấu"}
                </Button>
                <Button
                  variant={manga.isLiked ? "default" : "outline"}
                  className={`w-full ${
                    manga.isLiked ? "bg-red-600 hover:bg-red-700" : ""
                  }`}
                  onClick={handleLike}
                >
                  <Heart
                    className="mr-2 h-4 w-4"
                    fill={manga.isLiked ? "currentColor" : "none"}
                  />
                  {manga.isLiked ? "Đã thích" : "Thích"}
                </Button>
              </div>
            </div>

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
                      comicSlug={slug}
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
                <div className="flex items-center gap-2 text-sm">
                  <Heart className="h-4 w-4 text-muted-foreground" />
                  <span>{formatNumber(manga.totalLikes)} lượt thích</span>
                </div>
              </div>

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

              <ReadOptions
                mangaId={parseInt(manga.id) || 0}
                lastChapter={parseInt(manga.chapters[0].number)}
                firstChapter={parseInt(
                  manga.chapters[manga.chapters.length - 1].number
                )}
              />
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Giới thiệu</h2>
            <p className="text-muted-foreground whitespace-pre-line">
              {manga.description}
            </p>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <CommentSection />
          </div>
        </div>

        <div className="space-y-6">
          <div className="border rounded-lg sticky top-4">
            <div className="p-4 border-b flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    placeholder="Nhập số chương..."
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
              {hasMoreChapters && (
                <div ref={loadMoreRef} className="p-4 flex justify-center">
                  {isLoadingMore ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      Kéo xuống để tải thêm
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function handleRate(rating: number): Promise<void> {
  throw new Error("Function not implemented.");
}
