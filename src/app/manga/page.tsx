"use client";

import { useState, useMemo } from "react";
import { Metadata } from "next";
import { MangaGrid } from "@/components/manga/MangaGrid";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data: Trong thực tế nên thay thế bằng dữ liệu từ API
const MANGA_LIST = Array.from({ length: 24 }, (_, i) => ({
  id: `manga-${i + 1}`,
  title: `Tên truyện rất dài và thú vị ${i + 1}`,
  coverImage:
    "http://192.168.1.63:9000/truyenspeed/ComicBookCover/menh-luan-chi-chu-lam-ke-bien-di-giang-xuong-nhan-gian.webp",
  status: i % 2 === 0 ? "Đang tiến hành" : "Hoàn thành",
  rating: 4.5,
  totalViews: 100000 + i * 10000,
  totalBookmarks: 50000 + i * 5000,
  latestChapter: (1000 + i).toString(),
  genres: [
    "Hành động",
    "Phiêu lưu",
    "Hài hước",
    "Siêu nhiên",
    "Giả tưởng",
    "Drama",
  ].slice(0, 3),
}));

const ALL_GENRES = [
  "Hành động",
  "Phiêu lưu",
  "Hài hước",
  "Siêu nhiên",
  "Giả tưởng",
  "Drama",
  "Tình cảm",
  "Kinh dị",
  "Thể thao",
  "Học đường",
];

const SORT_OPTIONS = [
  { value: "latest", label: "Mới cập nhật" },
  { value: "views", label: "Lượt xem" },
  { value: "rating", label: "Đánh giá" },
  { value: "bookmarks", label: "Theo dõi" },
];

export default function MangaListPage() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [status, setStatus] = useState<string>("all");

  const filteredManga = useMemo(() => {
    return MANGA_LIST.filter((manga) => {
      // Lọc theo tên
      if (search && !manga.title.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }

      // Lọc theo thể loại
      if (selectedGenres.length > 0) {
        const hasAllGenres = selectedGenres.every((genre) =>
          manga.genres.includes(genre)
        );
        if (!hasAllGenres) return false;
      }

      // Lọc theo trạng thái
      if (status !== "all" && manga.status !== status) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case "views":
          return b.totalViews - a.totalViews;
        case "rating":
          return b.rating - a.rating;
        case "bookmarks":
          return b.totalBookmarks - a.totalBookmarks;
        default:
          return parseInt(b.latestChapter) - parseInt(a.latestChapter);
      }
    });
  }, [search, sortBy, selectedGenres, status]);

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">
              Danh sách truyện
            </h1>
            <p className="text-muted-foreground">
              Tổng hợp những bộ truyện hay và mới nhất
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm truyện..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sắp xếp theo" />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Bộ lọc</SheetTitle>
                </SheetHeader>
                <div className="mt-4 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Trạng thái</h3>
                    <Select value={status} onValueChange={setStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả</SelectItem>
                        <SelectItem value="Đang tiến hành">
                          Đang tiến hành
                        </SelectItem>
                        <SelectItem value="Hoàn thành">Hoàn thành</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Thể loại</h3>
                    <div className="flex flex-wrap gap-2">
                      {ALL_GENRES.map((genre) => (
                        <Badge
                          key={genre}
                          variant={
                            selectedGenres.includes(genre)
                              ? "default"
                              : "outline"
                          }
                          className="cursor-pointer"
                          onClick={() => toggleGenre(genre)}
                        >
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {selectedGenres.map((genre) => (
            <Badge
              key={genre}
              variant="secondary"
              className="cursor-pointer"
              onClick={() => toggleGenre(genre)}
            >
              {genre} ×
            </Badge>
          ))}
          {status !== "all" && (
            <Badge
              variant="secondary"
              className="cursor-pointer"
              onClick={() => setStatus("all")}
            >
              {status} ×
            </Badge>
          )}
        </div>

        <MangaGrid mangas={filteredManga} />
      </div>
    </div>
  );
}
