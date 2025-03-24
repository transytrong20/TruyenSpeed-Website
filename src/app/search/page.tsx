"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Search, FilterX } from "lucide-react";
import { MangaCard } from "@/components/manga/MangaCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MangaItem {
  id: string;
  title: string;
  coverImage: string;
  latestChapter: string;
  newLabel?: boolean;
  hotLabel?: boolean;
}

// Mock data: Trong thực tế nên thay thế bằng dữ liệu từ API
const ALL_MANGA: MangaItem[] = [
  {
    id: "one-piece",
    title: "One Piece",
    coverImage: "https://m.media-amazon.com/images/I/81s8xJUzWGL._AC_UF1000,1000_QL80_.jpg",
    latestChapter: "1112",
  },
  {
    id: "jujutsu-kaisen",
    title: "Jujutsu Kaisen",
    coverImage: "https://m.media-amazon.com/images/I/81TmHlRleJL._AC_UF1000,1000_QL80_.jpg",
    latestChapter: "253",
  },
  {
    id: "spy-x-family",
    title: "Spy x Family",
    coverImage: "https://m.media-amazon.com/images/I/71vMGRog+iL._AC_UF1000,1000_QL80_.jpg",
    latestChapter: "91",
  },
  {
    id: "demon-slayer",
    title: "Demon Slayer: Kimetsu no Yaiba",
    coverImage: "https://m.media-amazon.com/images/I/81miAFqQF-L._AC_UF1000,1000_QL80_.jpg",
    latestChapter: "205",
  },
  {
    id: "solo-leveling",
    title: "Solo Leveling",
    coverImage: "https://m.media-amazon.com/images/I/71HhfnE8DIL._AC_UF1000,1000_QL80_.jpg",
    latestChapter: "179",
  },
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [results, setResults] = useState<MangaItem[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    }
  };

  const performSearch = (query: string) => {
    // Trong thực tế, đây sẽ là một API call
    const filteredResults = ALL_MANGA.filter(manga =>
      manga.title.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filteredResults);
  };

  // Thực hiện tìm kiếm ban đầu khi trang được load với query từ URL
  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery]);

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-sm">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Trang chủ
        </Link>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium">Tìm kiếm</span>
      </div>

      {/* Search form */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex w-full max-w-lg items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm kiếm truyện..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit">Tìm kiếm</Button>
        </form>
      </div>

      {/* Search results */}
      <div>
        <h1 className="text-2xl font-bold mb-6">
          {initialQuery ? (
            <>
              Kết quả tìm kiếm cho: <span className="text-primary">"{initialQuery}"</span>
            </>
          ) : (
            "Tìm kiếm truyện"
          )}
        </h1>

        {initialQuery && results.length === 0 ? (
          <div className="text-center py-12">
            <FilterX className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Không tìm thấy kết quả</h2>
            <p className="text-muted-foreground">
              Không tìm thấy truyện nào phù hợp với từ khóa "{initialQuery}"
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {results.map((manga) => (
              <MangaCard
                key={manga.id}
                id={manga.id}
                title={manga.title}
                coverImage={manga.coverImage}
                latestChapter={manga.latestChapter}
              />
            ))}
          </div>
        )}

        {!initialQuery && (
          <div className="text-center py-12">
            <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Tìm kiếm truyện bạn muốn đọc</h2>
            <p className="text-muted-foreground">
              Nhập tên truyện, tác giả hoặc thể loại để tìm kiếm
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
