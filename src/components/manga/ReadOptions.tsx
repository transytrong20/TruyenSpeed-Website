"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Columns, Rows, Book, ChevronDown } from "lucide-react";

// Import các components UI với dynamic để tránh SSR
const DropdownMenu = dynamic(
  () => import("@/components/ui/dropdown-menu").then((mod) => mod.DropdownMenu),
  { ssr: false }
);

const DropdownMenuContent = dynamic(
  () =>
    import("@/components/ui/dropdown-menu").then(
      (mod) => mod.DropdownMenuContent
    ),
  { ssr: false }
);

const DropdownMenuItem = dynamic(
  () =>
    import("@/components/ui/dropdown-menu").then((mod) => mod.DropdownMenuItem),
  { ssr: false }
);

const DropdownMenuTrigger = dynamic(
  () =>
    import("@/components/ui/dropdown-menu").then(
      (mod) => mod.DropdownMenuTrigger
    ),
  { ssr: false }
);

const DropdownMenuSeparator = dynamic(
  () =>
    import("@/components/ui/dropdown-menu").then(
      (mod) => mod.DropdownMenuSeparator
    ),
  { ssr: false }
);

interface ReadOptionsProps {
  mangaId: number;
  lastChapter: number;
  firstChapter: number;
}

export function ReadOptions({
  mangaId,
  lastChapter,
  firstChapter,
}: ReadOptionsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-full sm:w-auto gap-2">
            <Book className="h-4 w-4" />
            Đọc ngay
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuItem asChild>
            <Link
              href={`/manga/manga-${mangaId}/chapters/${lastChapter}?mode=vertical`}
              className="flex items-center gap-2"
            >
              <Columns className="h-4 w-4" />
              <div className="flex-1">
                <div className="font-medium">Đọc dọc</div>
                <div className="text-xs text-muted-foreground">
                  Cuộn dọc từng trang
                </div>
              </div>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={`/manga/manga-${mangaId}/chapters/${lastChapter}?mode=horizontal`}
              className="flex items-center gap-2"
            >
              <Rows className="h-4 w-4" />
              <div className="flex-1">
                <div className="font-medium">Đọc ngang</div>
                <div className="text-xs text-muted-foreground">
                  Lật ngang từng trang
                </div>
              </div>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link
              href={`/manga/manga-${mangaId}/chapters/${firstChapter}?mode=vertical`}
              className="flex items-center gap-2"
            >
              <Book className="h-4 w-4" />
              <div className="flex-1">
                <div className="font-medium">Đọc từ đầu</div>
                <div className="text-xs text-muted-foreground">
                  Bắt đầu từ chương 1
                </div>
              </div>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full sm:w-auto gap-2">
            <Columns className="h-4 w-4" />
            Chọn kiểu đọc
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={() => localStorage.setItem("readingMode", "vertical")}
          >
            <Columns className="h-4 w-4" />
            <div className="flex-1">
              <div className="font-medium">Đọc dọc</div>
              <div className="text-xs text-muted-foreground">
                Cuộn dọc từng trang
              </div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={() => localStorage.setItem("readingMode", "horizontal")}
          >
            <Rows className="h-4 w-4" />
            <div className="flex-1">
              <div className="font-medium">Đọc ngang</div>
              <div className="text-xs text-muted-foreground">
                Lật ngang từng trang
              </div>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
