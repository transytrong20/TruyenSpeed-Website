"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Grid2X2, List, History, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface Chapter {
  id: number;
  number: number;
  title: string;
  updatedAt: string;
  views: number;
  isRead?: boolean;
}

interface ChapterListProps {
  mangaId: number;
  chapters: Chapter[];
}

export function ChapterList({ mangaId, chapters }: ChapterListProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Danh sách chương ({chapters.length})
        </h3>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className={cn("gap-2", viewMode === "grid" && "bg-muted")}
            onClick={() => setViewMode("grid")}
          >
            <Grid2X2 className="h-4 w-4" />
            <span className="hidden sm:inline">Dạng lưới</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn("gap-2", viewMode === "list" && "bg-muted")}
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
            <span className="hidden sm:inline">Dạng danh sách</span>
          </Button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {chapters.map((chapter) => (
            <Link
              key={chapter.id}
              href={`/manga/manga-${mangaId}/chapters/${chapter.number}`}
              className={cn(
                "block p-3 rounded-lg hover:bg-muted transition-colors",
                chapter.isRead && "text-muted-foreground"
              )}
            >
              <div className="text-sm font-medium">Chương {chapter.number}</div>
              {chapter.title && (
                <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                  {chapter.title}
                </div>
              )}
              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  <span>{chapter.views.toLocaleString()}</span>
                </div>
                {chapter.isRead && (
                  <div className="flex items-center gap-1">
                    <History className="h-3 w-3" />
                    <span>Đã đọc</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="space-y-1">
          {chapters.map((chapter) => (
            <Link
              key={chapter.id}
              href={`/manga/manga-${mangaId}/chapters/${chapter.number}`}
              className={cn(
                "flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors",
                chapter.isRead && "text-muted-foreground"
              )}
            >
              <div className="flex items-center gap-4">
                <div>
                  <div className="font-medium">Chương {chapter.number}</div>
                  {chapter.title && (
                    <div className="text-sm text-muted-foreground">
                      {chapter.title}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{chapter.views.toLocaleString()}</span>
                </div>
                <div>{chapter.updatedAt}</div>
                {chapter.isRead && (
                  <div className="flex items-center gap-1">
                    <History className="h-4 w-4" />
                    <span>Đã đọc</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
