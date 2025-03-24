import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, List, Settings, X, Home, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { getMangaById, getMangaChapter } from "@/lib/data/manga-data";
import { toast } from "sonner";

// Types pour les paramètres
interface ReadPageParams {
  id: string;
  chapter: string;
}

export default function ReadPage() {
  const { id, chapter } = useParams<ReadPageParams>();
  const navigate = useNavigate();
  const manga = getMangaById(id ?? "");
  const chapterData = getMangaChapter(id ?? "", chapter ?? "");
  const [currentPage, setCurrentPage] = useState(0);
  const [readerSettings, setReaderSettings] = useState({
    mode: "vertical", // vertical, horizontal, webtoon
    direction: "ltr", // ltr, rtl
    zoom: 100,
  });

  // Récupérer les numéros de chapitre précédent et suivant
  const currentChapterIndex = manga?.chapters.findIndex(
    (c) => c.number === chapter
  );
  const prevChapter = currentChapterIndex > 0
    ? manga?.chapters[currentChapterIndex - 1].number
    : null;
  const nextChapter = currentChapterIndex < (manga?.chapters.length ?? 0) - 1
    ? manga?.chapters[currentChapterIndex + 1].number
    : null;

  // Fonctions de navigation
  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else if (prevChapter) {
      navigate(`/read/${id}/${prevChapter}`);
      toast.info("Chương trước");
    }
  };

  const goToNextPage = () => {
    if (chapterData && currentPage < chapterData.pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else if (nextChapter) {
      navigate(`/read/${id}/${nextChapter}`);
      toast.info("Chương tiếp theo");
    }
  };

  // Utiliser l'effet pour gérer les raccourcis clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPreviousPage();
      } else if (e.key === "ArrowRight") {
        goToNextPage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentPage, chapterData]);

  // Gestion des swipes sur mobile
  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (readerSettings.mode === "horizontal") {
      const threshold = 50;
      if (touchEndX < touchStartX - threshold) {
        // Swipe gauche (page suivante pour ltr, page précédente pour rtl)
        readerSettings.direction === "ltr" ? goToNextPage() : goToPreviousPage();
      } else if (touchEndX > touchStartX + threshold) {
        // Swipe droit (page précédente pour ltr, page suivante pour rtl)
        readerSettings.direction === "ltr" ? goToPreviousPage() : goToNextPage();
      }
    }
  };

  // Si le manga ou le chapitre n'existe pas
  if (!manga || !chapterData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Không tìm thấy nội dung</h1>
        <p className="text-muted-foreground mb-6">
          Truyện hoặc chương bạn đang tìm kiếm không tồn tại.
        </p>
        <Link to="/">
          <Button>Quay lại trang chủ</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      {/* Barre de navigation du lecteur */}
      <header className="h-14 border-b flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link to={`/manga/${id}`}>
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="hidden md:block">
            <h2 className="text-sm font-medium">{manga.title}</h2>
            <p className="text-xs text-muted-foreground">Chương {chapter}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <List className="h-4 w-4" />
                <span className="hidden md:inline">Danh sách chương</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Danh sách chương</SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-[calc(100vh-8rem)] mt-6">
                <div className="space-y-1">
                  {manga.chapters.map((c) => (
                    <Link
                      key={c.number}
                      to={`/read/${id}/${c.number}`}
                      onClick={() => setCurrentPage(0)}
                    >
                      <Button
                        variant={c.number === chapter ? "secondary" : "ghost"}
                        className="w-full justify-start"
                      >
                        Chương {c.number}: {c.title}
                      </Button>
                    </Link>
                  ))}
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden md:inline">Cài đặt</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Cài đặt đọc truyện</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Chế độ đọc</h3>
                  <Tabs
                    defaultValue={readerSettings.mode}
                    onValueChange={(value) =>
                      setReaderSettings({...readerSettings, mode: value as "vertical" | "horizontal" | "webtoon"})
                    }
                  >
                    <TabsList className="w-full">
                      <TabsTrigger value="vertical" className="flex-1">Dọc</TabsTrigger>
                      <TabsTrigger value="horizontal" className="flex-1">Ngang</TabsTrigger>
                      <TabsTrigger value="webtoon" className="flex-1">Webtoon</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {readerSettings.mode === "horizontal" && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Hướng đọc</h3>
                    <Tabs
                      defaultValue={readerSettings.direction}
                      onValueChange={(value) =>
                        setReaderSettings({...readerSettings, direction: value as "ltr" | "rtl"})
                      }
                    >
                      <TabsList className="w-full">
                        <TabsTrigger value="ltr" className="flex-1">Trái → Phải</TabsTrigger>
                        <TabsTrigger value="rtl" className="flex-1">Phải → Trái</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Thu phóng</h3>
                    <span className="text-sm">{readerSettings.zoom}%</span>
                  </div>
                  <Slider
                    defaultValue={[readerSettings.zoom]}
                    min={50}
                    max={200}
                    step={10}
                    onValueChange={(value) =>
                      setReaderSettings({...readerSettings, zoom: value[0]})
                    }
                  />
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Link to="/">
            <Button variant="ghost" size="icon">
              <Home className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Contenu principal - Zone de lecture */}
      <main
        className="flex-1 overflow-auto relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Mode vertical */}
        {readerSettings.mode === "vertical" && (
          <div className="max-w-3xl mx-auto pt-4 pb-20">
            {chapterData.pages.map((page, index) => (
              <div key={index} className="mb-4">
                <img
                  src={page}
                  alt={`Trang ${index + 1}`}
                  className="w-full h-auto"
                  style={{ maxWidth: `${readerSettings.zoom}%` }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Mode horizontal */}
        {readerSettings.mode === "horizontal" && (
          <div className="h-full flex items-center justify-center">
            <div
              className="absolute left-0 top-0 w-1/4 h-full cursor-pointer z-10"
              onClick={readerSettings.direction === "ltr" ? goToPreviousPage : goToNextPage}
            />
            <div
              className="absolute right-0 top-0 w-1/4 h-full cursor-pointer z-10"
              onClick={readerSettings.direction === "ltr" ? goToNextPage : goToPreviousPage}
            />

            <img
              src={chapterData.pages[currentPage]}
              alt={`Trang ${currentPage + 1}`}
              className="max-h-full max-w-full object-contain"
              style={{ maxWidth: `${readerSettings.zoom}%` }}
            />
          </div>
        )}

        {/* Mode webtoon (défiler sans arrêts) */}
        {readerSettings.mode === "webtoon" && (
          <div className="max-w-screen-sm mx-auto pt-4 pb-20">
            <div className="space-y-0">
              {chapterData.pages.map((page, index) => (
                <img
                  key={index}
                  src={page}
                  alt={`Trang ${index + 1}`}
                  className="w-full h-auto"
                  style={{ maxWidth: `${readerSettings.zoom}%` }}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Contrôles de navigation en mode horizontal */}
      {readerSettings.mode === "horizontal" && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-background/80 backdrop-blur-sm rounded-full border shadow-sm px-4 py-2 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => goToPreviousPage()}
            disabled={currentPage === 0 && !prevChapter}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <span className="text-sm">
            {currentPage + 1} / {chapterData.pages.length}
          </span>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => goToNextPage()}
            disabled={currentPage === chapterData.pages.length - 1 && !nextChapter}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      )}

      {/* Boutons de navigation chapitre pour mode vertical/webtoon */}
      {(readerSettings.mode === "vertical" || readerSettings.mode === "webtoon") && (
        <div className="fixed bottom-4 right-4 flex flex-col gap-2">
          {prevChapter && (
            <Button
              size="icon"
              variant="outline"
              className="rounded-full shadow-sm"
              onClick={() => navigate(`/read/${id}/${prevChapter}`)}
            >
              <ChevronUp className="h-5 w-5" />
            </Button>
          )}

          {nextChapter && (
            <Button
              size="icon"
              variant="outline"
              className="rounded-full shadow-sm"
              onClick={() => navigate(`/read/${id}/${nextChapter}`)}
            >
              <ChevronDown className="h-5 w-5" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
