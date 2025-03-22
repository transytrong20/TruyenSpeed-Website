"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/shared/section-header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Star, MessageSquare, Activity, Award } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { formatNumber } from "@/lib/format";
import { popularMangas } from "@/data/manga";

export function WeeklyTopManga() {
  const [currentTab, setCurrentTab] = useState("most-viewed");

  // Dữ liệu mẫu - trong thực tế sẽ được lấy từ API
  const mostViewed = [...popularMangas].sort((a, b) => b.views - a.views).slice(0, 5);
  const highestRated = [...popularMangas].sort((a, b) => b.rating - a.rating).slice(0, 5);
  const mostDiscussed = [...popularMangas].sort((a, b) => (b.rating * b.views) - (a.rating * a.views)).slice(0, 5);

  const renderTopItem = (manga: typeof popularMangas[0], index: number, category: string) => {
    const topColors = [
      "text-amber-500 border-amber-500",   // 1st position
      "text-zinc-500 border-zinc-500",     // 2nd position
      "text-orange-700 border-orange-700", // 3rd position
      "text-muted-foreground border-muted-foreground", // rest
      "text-muted-foreground border-muted-foreground"  // rest
    ];

    return (
      <Link
        key={`${manga.slug}-${index}`}
        href={`/${manga.slug}`}
        className="flex items-center gap-3 py-2.5 px-2.5 rounded-lg hover:bg-accent/20 transition-colors"
      >
        <div className={`flex-shrink-0 h-7 w-7 flex items-center justify-center border-2 rounded-full font-bold ${topColors[Math.min(index, 4)]}`}>
          {index + 1}
        </div>

        <div className="relative h-14 w-10 flex-shrink-0 overflow-hidden rounded-sm">
          <Image
            src={manga.cover}
            alt={manga.title}
            fill
            className="object-cover"
            sizes="40px"
          />
        </div>

        <div className="flex-1 min-w-0 overflow-hidden">
          <h3 className="text-sm font-medium truncate">{manga.title}</h3>
          <div className="flex text-xs text-muted-foreground">
            {category === "most-viewed" && (
              <div className="flex items-center gap-1">
                <Activity className="h-3 w-3" />
                <span>{formatNumber(manga.views)}</span>
              </div>
            )}

            {category === "highest-rated" && (
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>{manga.rating.toFixed(1)}</span>
              </div>
            )}

            {category === "most-discussed" && (
              <div className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3" />
                <span>{formatNumber(Math.floor(manga.views / 1000))}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div>
      <SectionHeader
        title="Bảng xếp hạng tuần"
        href="/ranking"
        className="mb-4"
      />

      <div className="bg-card p-3 sm:p-4 rounded-lg border shadow-sm h-full flex flex-col">
        <div className="flex items-center justify-center mb-3">
          <Award className="h-6 w-6 text-primary mr-2" />
          <h3 className="text-base font-semibold">Top truyện nổi bật</h3>
        </div>

        <Tabs defaultValue="most-viewed" onValueChange={setCurrentTab} className="w-full flex-1 flex flex-col">
          <TabsList className="w-full grid grid-cols-3 mb-3 h-9">
            <TabsTrigger value="most-viewed" className="text-xs px-1">Lượt xem</TabsTrigger>
            <TabsTrigger value="highest-rated" className="text-xs px-1">Đánh giá</TabsTrigger>
            <TabsTrigger value="most-discussed" className="text-xs px-1">Thảo luận</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-hidden">
            <TabsContent value="most-viewed" className="h-full m-0 p-0">
              <div className="space-y-0.5">
                {mostViewed.map((manga, index) => renderTopItem(manga, index, "most-viewed"))}
              </div>
            </TabsContent>

            <TabsContent value="highest-rated" className="h-full m-0 p-0">
              <div className="space-y-0.5">
                {highestRated.map((manga, index) => renderTopItem(manga, index, "highest-rated"))}
              </div>
            </TabsContent>

            <TabsContent value="most-discussed" className="h-full m-0 p-0">
              <div className="space-y-0.5">
                {mostDiscussed.map((manga, index) => renderTopItem(manga, index, "most-discussed"))}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
