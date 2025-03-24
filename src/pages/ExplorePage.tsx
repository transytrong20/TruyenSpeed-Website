import { useState } from "react";
import { MangaCard } from "@/components/manga/MangaCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { allManga, genres } from "@/lib/data/manga-data";
import { Search, SlidersHorizontal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  // Filter manga based on search term and selected genres
  const filteredManga = allManga.filter((manga) => {
    const matchesSearch =
      searchTerm === "" || manga.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGenres =
      selectedGenres.length === 0 || selectedGenres.some((genre) => manga.genres.includes(genre));

    return matchesSearch && matchesGenres;
  });

  // Toggle genre selection
  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre],
    );
  };

  return (
    <div className="mb-24 space-y-8">
      <h1 className="text-3xl font-bold">Khám phá truyện tranh</h1>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="w-full md:w-3/4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm truyện tranh..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full md:w-1/4">
          <Tabs defaultValue="all">
            <TabsList className="w-full">
              <TabsTrigger value="all" className="flex-1">
                Tất cả
              </TabsTrigger>
              <TabsTrigger value="shounen" className="flex-1">
                Shōnen
              </TabsTrigger>
              <TabsTrigger value="seinen" className="flex-1">
                Seinen
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <Card className="h-fit p-4 lg:w-64">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-medium">Bộ lọc</h3>
            <Button variant="ghost" size="sm" onClick={() => setSelectedGenres([])}>
              Đặt lại
            </Button>
          </div>

          <h3 className="mb-3 flex items-center gap-2 text-sm font-medium">
            <SlidersHorizontal className="h-4 w-4" /> Thể loại
          </h3>

          <ScrollArea className="h-[320px] pr-4">
            <div className="space-y-2">
              {genres.map((genre) => (
                <Button
                  key={genre}
                  variant={selectedGenres.includes(genre) ? "default" : "outline"}
                  size="sm"
                  className="mb-2 mr-2"
                  onClick={() => toggleGenre(genre)}
                >
                  {genre}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </Card>

        <div className="flex-1">
          <h2 className="mb-4 text-xl font-semibold">{filteredManga.length} kết quả tìm thấy</h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
            {filteredManga.map((manga) => (
              <MangaCard key={manga.id} manga={manga} />
            ))}
          </div>

          {filteredManga.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="mb-4 text-muted-foreground">Không tìm thấy truyện</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedGenres([]);
                }}
              >
                Xóa bộ lọc
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
