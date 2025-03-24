import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MangaCard } from "@/components/manga/MangaCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight, Star, Clock, BookOpen, TrendingUp, Award, Flame } from "lucide-react";
import { featuredManga, latestManga, popularManga, genres, allManga } from "@/lib/data/manga-data";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  // State for banner controls
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const bannerItems = featuredManga.slice(0, 6); // Use 6 items for the carousel

  // State for tilt effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  // Selected genre for trending section
  const [selectedGenre, setSelectedGenre] = useState("All");

  // Sort trending manga by rating
  const trendingManga = [...allManga].sort((a, b) => b.rating - a.rating).slice(0, 8);

  // Create manga recommendations by genres
  const recommendedByGenre = genres.slice(0, 5).map(genre => {
    return {
      genre,
      items: allManga.filter(manga => manga.genres.includes(genre)).slice(0, 4)
    };
  });

  // Auto-advance timer ref
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Update cursor position smoothly for parallax effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorPosition(prev => {
        return {
          x: prev.x + (mousePosition.x - prev.x) * 0.1,
          y: prev.y + (mousePosition.y - prev.y) * 0.1
        };
      });
    }, 15);

    return () => clearInterval(interval);
  }, [mousePosition]);

  // Handle mouse movement for the banner area
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

    setMousePosition({ x, y });
  };

  // Auto-advance carousel
  const advanceCarousel = useCallback(() => {
    setActiveIndex(prev => (prev + 1) % bannerItems.length);
  }, [bannerItems.length]);

  // Control carousel
  const prevSlide = () => {
    setActiveIndex(prev => (prev - 1 + bannerItems.length) % bannerItems.length);
  };

  const nextSlide = () => {
    setActiveIndex(prev => (prev + 1) % bannerItems.length);
  };

  // Set up auto-advance timer
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        advanceCarousel();
      }, 5000); // 5 seconds per slide
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [advanceCarousel, isPaused]);

  return (
    <div className="space-y-16 mb-24 pt-8">
      <section className="space-y-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight mb-3">Chào mừng đến với MangaNovaVN</h1>
          <p className="text-lg text-muted-foreground">
            Khám phá và đọc truyện tranh yêu thích của bạn với trải nghiệm mượt mà và đắm chìm.
          </p>
        </div>

        <div
          className="relative h-[500px] perspective-1000 overflow-hidden rounded-xl mt-6"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false);
            setMousePosition({ x: 0, y: 0 });
          }}
        >
          {/* 3D Carousel of banners */}
          <AnimatePresence mode="wait">
            {bannerItems.map((manga, index) => (
              <motion.div
                key={manga.id}
                initial={{ opacity: 0, scale: 0.9, rotateY: 45 }}
                animate={{
                  opacity: index === activeIndex ? 1 : 0,
                  scale: index === activeIndex ? 1 : 0.85,
                  rotateY: index === activeIndex ? cursorPosition.x * 10 : 45,
                  rotateX: index === activeIndex ? -cursorPosition.y * 10 : 0,
                  zIndex: index === activeIndex ? 10 : 0,
                }}
                exit={{ opacity: 0, scale: 0.9, rotateY: -45 }}
                transition={{ duration: 0.5 }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: index === activeIndex ? 'block' : 'none',
                  transformStyle: "preserve-3d"
                }}
              >
                <Link to={`/manga/${manga.id}`} className="block w-full h-full">
                  {/* Banner Card with 3D effect */}
                  <div
                    className="relative overflow-hidden rounded-xl shadow-2xl w-full h-full transform-gpu"
                    style={{
                      backgroundImage: `
                        linear-gradient(135deg,
                        rgba(20, 20, 30, 0.9) 0%,
                        rgba(30, 30, 50, 0.8) 100%
                      )`,
                      transformStyle: "preserve-3d"
                    }}
                  >
                    {/* Background with parallax effect */}
                    <div
                      className="absolute inset-0 blur-[2px] opacity-80"
                      style={{
                        transform: `translateX(${cursorPosition.x * -20}px) translateY(${cursorPosition.y * -20}px)`,
                        backgroundImage: `url(${manga.coverImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        zIndex: -1,
                      }}
                    />

                    {/* Character image with parallax effect */}
                    <div
                      className="absolute inset-0 flex items-center justify-center transform-gpu"
                      style={{
                        transform: `translateX(${cursorPosition.x * 15}px) translateY(${cursorPosition.y * 15}px) translateZ(40px)`,
                        zIndex: 1,
                      }}
                    >
                      <img
                        src={manga.coverImage}
                        alt={manga.title}
                        className="h-[110%] object-cover object-center mask-linear-gradient"
                      />
                    </div>

                    {/* Title and description with 3D effect */}
                    <div
                      className="absolute bottom-0 left-0 right-0 p-8 text-white z-10"
                      style={{
                        transform: `translateZ(30px)`,
                        transformStyle: "preserve-3d",
                        background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)",
                      }}
                    >
                      <h3
                        className="text-3xl font-bold mb-3"
                        style={{ transform: "translateZ(10px)" }}
                      >
                        {manga.title}
                      </h3>
                      <p
                        className="text-base text-white/80 line-clamp-3 mb-6 max-w-3xl"
                        style={{ transform: "translateZ(5px)" }}
                      >
                        {manga.description}
                      </p>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ transform: "translateZ(20px)" }}
                      >
                        <Button size="lg" className="bg-primary/80 hover:bg-primary/100 backdrop-blur-sm">
                          Xem chi tiết
                        </Button>
                      </motion.div>
                    </div>

                    {/* Decorative elements for 3D effect */}
                    <div
                      className="absolute top-4 right-4 w-20 h-20 rounded-full opacity-60 blur-md"
                      style={{
                        background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)",
                        transform: `translateZ(25px) translateX(${cursorPosition.x * -10}px) translateY(${cursorPosition.y * -10}px)`,
                      }}
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Carousel controls */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
            {bannerItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeIndex
                    ? "bg-white w-6"
                    : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Previous/Next buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-sm transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-sm transition-all"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </section>

      {/* MỤC 1: Truyện mới cập nhật - Grid layout */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-primary" />
            <h2 className="text-2xl font-semibold tracking-tight">Truyện mới cập nhật</h2>
          </div>
          <Link to="/explore">
            <Button variant="link" className="gap-1">
              Xem tất cả <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-6">
          {latestManga.slice(0, 10).map((manga) => (
            <MangaCard key={manga.id} manga={manga} />
          ))}
        </div>
      </section>

      {/* MỤC 2: Thể loại tab - Tabs filter */}
      <section className="space-y-6">
        <Tabs defaultValue="popular">
          <div className="flex items-center justify-between border-b pb-2">
            <div className="flex items-center">
              <Award className="h-5 w-5 mr-2 text-amber-500" />
              <h2 className="text-2xl font-semibold tracking-tight">Khám phá theo thể loại</h2>
            </div>
            <TabsList>
              <TabsTrigger value="popular">Phổ biến</TabsTrigger>
              <TabsTrigger value="trending">Xu hướng</TabsTrigger>
              <TabsTrigger value="new">Mới</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="popular" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-6">
              {popularManga.slice(0, 10).map((manga) => (
                <MangaCard key={manga.id} manga={manga} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trending" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-6">
              {popularManga.slice(4, 14).map((manga) => (
                <MangaCard key={manga.id} manga={manga} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="new" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-6">
              {latestManga.slice(0, 10).map((manga) => (
                <MangaCard key={manga.id} manga={manga} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* MỤC 3: Truyện nổi bật - Grid layout */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center">
            <Star className="h-5 w-5 mr-2 text-yellow-500" />
            <h2 className="text-2xl font-semibold tracking-tight">Truyện nổi bật</h2>
          </div>
          <Link to="/explore">
            <Button variant="link" className="gap-1">
              Xem tất cả <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {featuredManga.map((manga) => (
            <Link
              key={manga.id}
              to={`/manga/${manga.id}`}
              className="transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
                <img
                  src={manga.coverImage}
                  alt={manga.title}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 p-4 text-white">
                  <h3 className="font-bold text-lg mb-1">{manga.title}</h3>
                  <div className="flex items-center mb-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="text-sm">{manga.rating}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {manga.genres.slice(0, 2).map((genre, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-primary/20 text-xs">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* MỤC 4: Thể loại đa dạng - Horizontal filter tabs */}
      <section className="space-y-6">
        <div className="flex items-center border-b pb-2">
          <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
          <h2 className="text-2xl font-semibold tracking-tight">Khám phá theo thể loại</h2>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <Badge
            variant={selectedGenre === "All" ? "default" : "outline"}
            className="cursor-pointer text-sm py-1 px-3"
            onClick={() => setSelectedGenre("All")}
          >
            Tất cả
          </Badge>
          {genres.slice(0, 5).map(genre => (
            <Badge
              key={genre}
              variant={selectedGenre === genre ? "default" : "outline"}
              className="cursor-pointer text-sm py-1 px-3"
              onClick={() => setSelectedGenre(genre)}
            >
              {genre}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {allManga
            .filter(manga => selectedGenre === "All" || manga.genres.includes(selectedGenre))
            .slice(0, 12)
            .map((manga) => (
              <Link key={manga.id} to={`/manga/${manga.id}`} className="group">
                <div className="aspect-w-3 aspect-h-4 relative overflow-hidden rounded-md">
                  <img
                    src={manga.coverImage}
                    alt={manga.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <h3 className="text-white text-sm font-medium truncate">{manga.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>

      {/* MỤC 5: Truyện trending có rating cao - List layout */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
            <h2 className="text-2xl font-semibold tracking-tight">Truyện trending có rating cao</h2>
          </div>
          <Link to="/explore">
            <Button variant="link" className="gap-1">
              Xem tất cả <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <Card className="overflow-hidden border-none shadow-sm">
          <CardContent className="p-0">
            <ul className="divide-y">
              {trendingManga.map((manga) => (
                <li key={manga.id} className="p-4 hover:bg-muted/50 transition-colors">
                  <Link to={`/manga/${manga.id}`} className="flex items-center gap-4">
                    <img
                      src={manga.coverImage}
                      alt={manga.title}
                      className="h-20 w-14 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{manga.title}</h3>
                      <p className="text-sm text-muted-foreground truncate">{manga.author}</p>
                      <div className="flex items-center mt-1">
                        <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500 mr-1" />
                        <span className="text-xs text-muted-foreground">{manga.rating}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <Badge variant="outline" className="mb-1">{manga.status}</Badge>
                      <span className="text-xs text-muted-foreground">{manga.lastUpdate}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* MỤC 6: Đề xuất theo thể loại - Card grid by category */}
      <section className="space-y-6">
        <div className="flex items-center border-b pb-2">
          <Flame className="h-5 w-5 mr-2 text-red-500" />
          <h2 className="text-2xl font-semibold tracking-tight">Đề xuất theo thể loại</h2>
        </div>

        <div className="space-y-10">
          {recommendedByGenre.map(({genre, items}) => (
            <div key={genre} className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                  {genre}
                </h3>
                <Link to={`/explore?genre=${genre}`}>
                  <Button variant="ghost" size="sm" className="gap-1 text-xs">
                    Xem thêm <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {items.map((manga) => (
                  <Link key={manga.id} to={`/manga/${manga.id}`} className="group space-y-2">
                    <div className="overflow-hidden rounded-md">
                      <img
                        src={manga.coverImage}
                        alt={manga.title}
                        className="w-full h-[200px] object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium truncate group-hover:text-primary transition-colors">{manga.title}</h4>
                      <p className="text-xs text-muted-foreground">{manga.chapters.length} chapters</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
