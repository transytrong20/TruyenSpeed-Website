import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, Clock, Eye, EyeOff, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Chapter } from "@/lib/types";

interface ChapterListProps {
  chapters: Chapter[];
  mangaId: string;
}

export function ChapterList({ chapters, mangaId }: ChapterListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [showRead, setShowRead] = useState(true);

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  // Filtrer et trier les chapitres
  const filteredChapters = chapters
    .filter((chapter) => {
      if (!showRead && chapter.read) return false;

      if (searchTerm === "") return true;

      const searchLower = searchTerm.toLowerCase();
      return (
        chapter.number.toLowerCase().includes(searchLower) ||
        chapter.title.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      const aNum = parseFloat(a.number);
      const bNum = parseFloat(b.number);

      return sortDirection === "asc"
        ? aNum - bNum
        : bNum - aNum;
    });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm chương..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleSortDirection}
            className="flex-shrink-0"
          >
            {sortDirection === "asc" ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>

          <Button
            variant={showRead ? "outline" : "default"}
            size="sm"
            className="gap-2 flex-shrink-0"
            onClick={() => setShowRead(!showRead)}
          >
            {showRead ? (
              <>
                <EyeOff className="h-4 w-4" />
                <span className="hidden sm:inline">Ẩn đã đọc</span>
              </>
            ) : (
              <>
                <Eye className="h-4 w-4" />
                <span className="hidden sm:inline">Hiện tất cả</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {filteredChapters.length > 0 ? (
        <div className="space-y-2">
          {filteredChapters.map((chapter) => (
            <Link
              key={chapter.number}
              to={`/read/${mangaId}/${chapter.number}`}
              className="block"
            >
              <div className={`
                p-4 rounded-lg border hover:border-primary
                ${chapter.read ? "opacity-60" : ""}
                transition-colors
              `}>
                <div className="flex justify-between items-center gap-4">
                  <div>
                    <div className="font-medium">
                      Chương {chapter.number}
                      {chapter.title && `: ${chapter.title}`}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3" />
                      <span>{chapter.releaseDate}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {chapter.read && (
                      <div className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                        Đã đọc
                      </div>
                    )}
                    <Button size="sm">
                      Đọc
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">Không tìm thấy chương nào</p>
        </div>
      )}
    </div>
  );
}
