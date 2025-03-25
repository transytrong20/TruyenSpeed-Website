"use client";

import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Bookmark, Clock, BookOpen } from "lucide-react";

interface Bookmark {
  id: string;
  title: string;
  coverImage: string;
  lastChapter: string;
  lastRead: string;
  updatedAt: string;
}

interface BookmarksClientProps {
  bookmarks: Bookmark[];
}

export function BookmarksClient({ bookmarks }: BookmarksClientProps) {
  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Tủ truyện</h1>
          <p className="text-muted-foreground">
            Danh sách truyện bạn đã lưu ({bookmarks.length})
          </p>
        </div>
      </div>

      {bookmarks.length === 0 ? (
        <div className="text-center py-12">
          <Bookmark className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-lg font-medium mb-2">Chưa có truyện nào</h2>
          <p className="text-muted-foreground mb-4">
            Bạn chưa lưu truyện nào vào tủ truyện
          </p>
          <Button asChild>
            <Link href="/manga">Khám phá truyện</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {bookmarks.map((bookmark) => (
            <Card key={bookmark.id} className="overflow-hidden">
              <Link href={`/manga/${bookmark.id}`}>
                <div className="aspect-[2/3] relative overflow-hidden group">
                  <Image
                    src={bookmark.coverImage}
                    alt={bookmark.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              </Link>
              <CardContent className="p-3">
                <Link
                  href={`/manga/${bookmark.id}`}
                  className="font-medium hover:text-primary line-clamp-1 text-sm"
                >
                  {bookmark.title}
                </Link>
                <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>Chapter {bookmark.lastChapter}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Đọc: {bookmark.lastRead}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-3 pt-0">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs"
                  asChild
                >
                  <Link
                    href={`/manga/${bookmark.id}/chapter/${bookmark.lastRead}`}
                  >
                    Đọc tiếp
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
