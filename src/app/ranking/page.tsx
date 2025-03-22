"use client";

import { useState } from "react";
import { getAllManga } from "@/data/manga";
import { MangaGrid } from "@/components/shared/manga-grid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function RankingPage() {
  const [currentTab, setCurrentTab] = useState("views");
  const allMangas = getAllManga();

  // Sắp xếp theo lượt xem
  const byViews = [...allMangas].sort((a, b) => b.views - a.views);

  // Sắp xếp theo đánh giá
  const byRating = [...allMangas].sort((a, b) => b.rating - a.rating);

  // Sắp xếp theo mới nhất
  const byUpdated = [...allMangas].sort((a, b) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  return (
    <div className="container py-6 md:py-8">
      <h1 className="text-3xl font-bold mb-6">Xếp hạng truyện</h1>
      <p className="text-muted-foreground mb-6">
        Danh sách truyện được đánh giá và xem nhiều nhất trên MangaVerse.
      </p>

      <Tabs defaultValue="views" onValueChange={setCurrentTab} className="w-full mb-6">
        <TabsList className="w-full md:w-auto grid grid-cols-3">
          <TabsTrigger value="views">Lượt xem</TabsTrigger>
          <TabsTrigger value="rating">Đánh giá</TabsTrigger>
          <TabsTrigger value="updated">Mới nhất</TabsTrigger>
        </TabsList>
        <TabsContent value="views" className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Top truyện theo lượt xem</h2>
          <MangaGrid
            mangas={byViews}
            columns={{
              sm: 2,
              md: 3,
              lg: 4,
              xl: 5
            }}
          />
        </TabsContent>
        <TabsContent value="rating" className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Top truyện theo đánh giá</h2>
          <MangaGrid
            mangas={byRating}
            columns={{
              sm: 2,
              md: 3,
              lg: 4,
              xl: 5
            }}
          />
        </TabsContent>
        <TabsContent value="updated" className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Top truyện mới cập nhật</h2>
          <MangaGrid
            mangas={byUpdated}
            columns={{
              sm: 2,
              md: 3,
              lg: 4,
              xl: 5
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
