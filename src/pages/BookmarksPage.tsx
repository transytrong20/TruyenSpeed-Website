import { useState } from "react";
import { Link } from "react-router-dom";
import { BookMarked, History, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MangaCard } from "@/components/manga/MangaCard";
import { getBookmarkedManga, getHistoryManga } from "@/lib/data/manga-data";

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState(getBookmarkedManga());
  const [history, setHistory] = useState(getHistoryManga());

  const clearHistory = () => {
    setHistory([]);
  };

  const removeBookmark = (id: string) => {
    setBookmarks(bookmarks.filter(manga => manga.id !== id));
  };

  return (
    <div className="space-y-8 mb-24">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Thư viện của tôi</h1>
        <p className="text-muted-foreground">
          Quản lý truyện yêu thích và lịch sử đọc của bạn
        </p>
      </div>

      <Tabs defaultValue="bookmarks">
        <TabsList className="mb-6">
          <TabsTrigger value="bookmarks" className="flex items-center gap-2">
            <BookMarked className="h-4 w-4" />
            <span>Yêu thích</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            <span>Lịch sử đọc</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bookmarks">
          {bookmarks.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
              {bookmarks.map((manga) => (
                <div key={manga.id} className="relative group">
                  <MangaCard manga={manga} />
                  <button
                    className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm p-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeBookmark(manga.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <Card className="border-dashed">
              <CardHeader className="text-center">
                <CardTitle>Chưa có truyện yêu thích</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                <p>Bạn chưa có truyện yêu thích nào.</p>
                <p>Khám phá danh mục và đánh dấu những truyện bạn thích!</p>
              </CardContent>
              <CardFooter className="flex justify-center pt-0">
                <Link to="/explore">
                  <Button>Khám phá truyện</Button>
                </Link>
              </CardFooter>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history">
          {history.length > 0 ? (
            <>
              <div className="flex justify-end mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={clearHistory}
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Xóa lịch sử</span>
                </Button>
              </div>

              <div className="space-y-6">
                {history.map((item) => (
                  <div key={`${item.manga.id}-${item.chapter}`} className="flex border rounded-lg overflow-hidden">
                    <div className="h-24 w-16 shrink-0">
                      <img
                        src={item.manga.coverImage}
                        alt={item.manga.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 justify-between items-center p-4">
                      <div>
                        <Link to={`/manga/${item.manga.id}`} className="font-medium hover:text-primary">
                          {item.manga.title}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          Đọc {item.date} • Chương {item.chapter}
                        </p>
                      </div>
                      <Link to={`/read/${item.manga.id}/${item.chapter}`}>
                        <Button size="sm">Tiếp tục</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <Card className="border-dashed">
              <CardHeader className="text-center">
                <CardTitle>Chưa có lịch sử đọc</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                <p>Bạn chưa đọc truyện nào.</p>
                <p>Bắt đầu đọc truyện để thấy lịch sử tại đây!</p>
              </CardContent>
              <CardFooter className="flex justify-center pt-0">
                <Link to="/explore">
                  <Button>Khám phá truyện</Button>
                </Link>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
