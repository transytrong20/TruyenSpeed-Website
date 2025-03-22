"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { MangaGrid } from "@/components/shared/manga-grid";
import { Button } from "@/components/ui/button";
import { Manga, getAllManga } from "@/data/manga";
import { toast } from "sonner";

type HistoryEntry = {
  mangaId: string;
  chapterId: string;
  lastRead: Date;
};

export default function HistoryPage() {
  const [historyItems, setHistoryItems] = useState<Manga[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Lấy lịch sử đọc từ localStorage
  useEffect(() => {
    const loadHistory = () => {
      setIsLoading(true);

      try {
        // Trong trường hợp thực tế, dữ liệu này sẽ được lưu trong localStorage
        // Ở đây chúng ta mô phỏng có một số truyện trong lịch sử
        const allMangas = getAllManga();
        const mockHistory = allMangas.slice(0, 4);

        setHistoryItems(mockHistory);
      } catch (error) {
        console.error("Failed to load history:", error);
        toast.error("Không thể tải lịch sử đọc truyện");
      } finally {
        setIsLoading(false);
      }
    };

    loadHistory();
  }, []);

  const clearHistory = () => {
    // Trong trường hợp thực tế, đây sẽ xóa dữ liệu từ localStorage
    setHistoryItems([]);
    toast.success("Đã xóa lịch sử đọc truyện");
  };

  return (
    <div className="container py-6 md:py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Lịch sử đọc truyện</h1>

        {historyItems.length > 0 && (
          <Button variant="outline" onClick={clearHistory}>
            <Trash2 className="mr-2 h-4 w-4" />
            Xóa lịch sử
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="py-20 text-center">
          <p className="text-lg text-muted-foreground">Đang tải lịch sử đọc...</p>
        </div>
      ) : historyItems.length > 0 ? (
        <MangaGrid
          mangas={historyItems}
          columns={{
            sm: 2,
            md: 3,
            lg: 4,
            xl: 5
          }}
        />
      ) : (
        <div className="py-20 text-center">
          <p className="text-lg text-muted-foreground">
            Bạn chưa đọc truyện nào gần đây.
          </p>
          <Button asChild className="mt-4">
            <Link href="/">Khám phá truyện</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
