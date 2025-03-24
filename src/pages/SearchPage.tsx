import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { MangaCard } from "@/components/manga/MangaCard";
import { Search3D } from "@/components/ui/search-3d";
import { allManga } from "@/lib/data/manga-data";
import { Manga } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [searchResults, setSearchResults] = useState<Manga[]>([]);
  const [filteredResults, setFilteredResults] = useState<{
    all: Manga[];
    action: Manga[];
    adventure: Manga[];
    comedy: Manga[];
    drama: Manga[];
  }>({
    all: [],
    action: [],
    adventure: [],
    comedy: [],
    drama: [],
  });
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const performSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setFilteredResults({
        all: [],
        action: [],
        adventure: [],
        comedy: [],
        drama: [],
      });
      return;
    }

    setIsSearching(true);

    // Simulate search with delay for animation effect
    setTimeout(() => {
      const results = allManga.filter(
        (manga) =>
          manga.title.toLowerCase().includes(query.toLowerCase()) ||
          manga.description.toLowerCase().includes(query.toLowerCase()) ||
          manga.author.toLowerCase().includes(query.toLowerCase()) ||
          manga.genres.some((genre) => genre.toLowerCase().includes(query.toLowerCase())),
      );

      setSearchResults(results);

      // Phân loại kết quả theo thể loại
      const action = results.filter((manga) =>
        manga.genres.some((genre) => genre.toLowerCase() === "action"),
      );

      const adventure = results.filter((manga) =>
        manga.genres.some((genre) => genre.toLowerCase() === "aventure"),
      );

      const comedy = results.filter((manga) =>
        manga.genres.some((genre) => genre.toLowerCase() === "comédie"),
      );

      const drama = results.filter((manga) =>
        manga.genres.some((genre) => genre.toLowerCase() === "drame"),
      );

      setFilteredResults({
        all: results,
        action,
        adventure,
        comedy,
        drama,
      });

      setIsSearching(false);
    }, 500);
  };

  const handleSearch = (query: string) => {
    setSearchParams({ q: query });
    performSearch(query);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // Initial search on page load if query exists
  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery]);

  return (
    <div className="animate-fade-in container mx-auto px-4 py-6">
      <div className="mb-6 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Tìm kiếm</h1>

        <div className="mx-auto flex max-w-xl justify-center">
          <Search3D
            autoFocus
            onSearch={handleSearch}
            placeholder="Tìm kiếm theo tên, tác giả, thể loại..."
            className="w-full"
            showOnMobile={true}
          />
        </div>
      </div>

      {isSearching ? (
        <div className="flex justify-center py-10">
          <div className="perspective-1000 relative">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <div
              className="absolute inset-0 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent opacity-50 blur-md"
              style={{ animationDuration: "1s", animationDelay: "0.1s" }}
            />
          </div>
        </div>
      ) : (
        <>
          {initialQuery && (
            <div className="mb-4">
              <h2 className="mb-1 text-xl font-bold">Kết quả tìm kiếm</h2>
              <p className="text-muted-foreground">
                {searchResults.length === 0
                  ? 'Không tìm thấy kết quả nào cho "' + initialQuery + '"'
                  : `Tìm thấy ${searchResults.length} kết quả cho "${initialQuery}"`}
              </p>
            </div>
          )}

          {searchResults.length > 0 && (
            <Tabs
              defaultValue="all"
              value={activeTab}
              onValueChange={handleTabChange}
              className="mb-4 w-full"
            >
              <div className="mb-4 border-b">
                <TabsList className="mb-[-1px] h-10 bg-transparent">
                  <TabsTrigger
                    value="all"
                    className="h-10 rounded-none px-3 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    Tất cả ({filteredResults.all.length})
                  </TabsTrigger>
                  {filteredResults.action.length > 0 && (
                    <TabsTrigger
                      value="action"
                      className="h-10 rounded-none px-3 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                    >
                      Hành Động ({filteredResults.action.length})
                    </TabsTrigger>
                  )}
                  {filteredResults.adventure.length > 0 && (
                    <TabsTrigger
                      value="adventure"
                      className="h-10 rounded-none px-3 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                    >
                      Phiêu Lưu ({filteredResults.adventure.length})
                    </TabsTrigger>
                  )}
                  {filteredResults.comedy.length > 0 && (
                    <TabsTrigger
                      value="comedy"
                      className="h-10 rounded-none px-3 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                    >
                      Hài Hước ({filteredResults.comedy.length})
                    </TabsTrigger>
                  )}
                  {filteredResults.drama.length > 0 && (
                    <TabsTrigger
                      value="drama"
                      className="h-10 rounded-none px-3 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                    >
                      Kịch Tính ({filteredResults.drama.length})
                    </TabsTrigger>
                  )}
                </TabsList>
              </div>

              <ScrollArea className="h-[calc(100vh-260px)]">
                <TabsContent value="all" className="mt-0 duration-300 animate-in fade-in-50">
                  <div className="grid grid-cols-2 gap-4 pb-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {filteredResults.all.map((manga, index) => (
                      <div
                        key={manga.id}
                        className="animate-slide-up"
                        style={{ animationDelay: `${Math.min(index, 10) * 0.05}s` }}
                      >
                        <MangaCard manga={manga} />
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="action" className="mt-0 duration-300 animate-in fade-in-50">
                  <div className="grid grid-cols-2 gap-4 pb-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {filteredResults.action.map((manga, index) => (
                      <div
                        key={manga.id}
                        className="animate-slide-up"
                        style={{ animationDelay: `${Math.min(index, 10) * 0.05}s` }}
                      >
                        <MangaCard manga={manga} />
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="adventure" className="mt-0 duration-300 animate-in fade-in-50">
                  <div className="grid grid-cols-2 gap-4 pb-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {filteredResults.adventure.map((manga, index) => (
                      <div
                        key={manga.id}
                        className="animate-slide-up"
                        style={{ animationDelay: `${Math.min(index, 10) * 0.05}s` }}
                      >
                        <MangaCard manga={manga} />
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="comedy" className="mt-0 duration-300 animate-in fade-in-50">
                  <div className="grid grid-cols-2 gap-4 pb-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {filteredResults.comedy.map((manga, index) => (
                      <div
                        key={manga.id}
                        className="animate-slide-up"
                        style={{ animationDelay: `${Math.min(index, 10) * 0.05}s` }}
                      >
                        <MangaCard manga={manga} />
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="drama" className="mt-0 duration-300 animate-in fade-in-50">
                  <div className="grid grid-cols-2 gap-4 pb-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {filteredResults.drama.map((manga, index) => (
                      <div
                        key={manga.id}
                        className="animate-slide-up"
                        style={{ animationDelay: `${Math.min(index, 10) * 0.05}s` }}
                      >
                        <MangaCard manga={manga} />
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </ScrollArea>
            </Tabs>
          )}
        </>
      )}

      {!initialQuery && !isSearching && (
        <div className="py-16 text-center">
          <p className="mb-4 text-xl text-muted-foreground">
            Nhập từ khóa để tìm kiếm truyện yêu thích của bạn
          </p>
          <div className="perspective-1000 mx-auto max-w-md">
            <div className="transform-gpu animate-float rounded-xl bg-muted/30 p-8 backdrop-blur-sm">
              <p className="text-sm text-muted-foreground">Bạn có thể tìm kiếm theo:</p>
              <ul className="mt-2 space-y-1 text-sm">
                <li>• Tên truyện</li>
                <li>• Tên tác giả</li>
                <li>• Thể loại</li>
                <li>• Nội dung truyện</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
