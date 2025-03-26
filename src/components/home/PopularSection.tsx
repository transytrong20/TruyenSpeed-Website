"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type TimeRange = "day" | "week" | "month";

// Interface khớp với dữ liệu từ API
interface Manga {
  comicName: string;
  otherName: string;
  image: string;
  creator: string;
  status: string;
  introduction: string;
  views: number;
  listChapters: { chapterName: string }[];
  listTags: string[];
}

const timeRangeButtons = [
  { value: "day", label: "Hàng ngày" },
  { value: "week", label: "Hàng tuần" },
  { value: "month", label: "Hàng tháng" },
] as const;

export function PopularSection() {
  const [timeRange, setTimeRange] = useState<TimeRange>("day");
  const [isChanging, setIsChanging] = useState(false);
  const [popularManga, setPopularManga] = useState<Manga[]>([]);
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading

  // Gọi API khi timeRange thay đổi
  useEffect(() => {
    const fetchPopularManga = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://localhost:44308/app/data/comic/truyen-pho-bien?timeRange=${timeRange}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch popular manga");
        }
        const data: Manga[] = await response.json();
        setPopularManga(data);
      } catch (error) {
        console.error("Error fetching popular manga:", error);
        setPopularManga([]); // Trả về rỗng nếu lỗi
      } finally {
        setLoading(false);
      }
    };

    fetchPopularManga();
  }, [timeRange]);

  const handleTimeRangeChange = (value: TimeRange) => {
    if (value === timeRange) return;
    setIsChanging(true);
    setTimeRange(value);
    setTimeout(() => setIsChanging(false), 300);
  };

  return (
    <section className="py-6">
      <div className="container">
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">Phổ biến</h2>
            <p className="text-sm text-muted-foreground">
              Những bộ truyện được yêu thích nhất
            </p>
          </div>
          <Button variant="outline" size="sm" asChild className="gap-1">
            <Link href="/popular">
              Xem tất cả
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="relative mb-6">
          <div className="flex p-1 gap-1 bg-muted/50 hover:bg-muted/80 transition-colors rounded-lg w-fit">
            {timeRangeButtons.map(({ value, label }) => (
              <div key={value} className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleTimeRangeChange(value as TimeRange)}
                  className={cn(
                    "relative z-10 px-6 font-medium transition-all duration-200",
                    timeRange === value
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                    "active:scale-95"
                  )}
                >
                  {label}
                </Button>
                {timeRange === value && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary rounded-md"
                    transition={{
                      type: "spring",
                      bounce: 0.15,
                      duration: 0.5,
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={timeRange}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          >
            {loading ? (
              // Hiển thị loading state
              Array.from({ length: 12 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="aspect-[3/4] rounded-lg bg-muted animate-pulse"
                />
              ))
            ) : popularManga.length > 0 ? (
              popularManga.map((manga, index) => (
                <motion.div
                  key={manga.otherName} // Dùng otherName làm key vì không có id
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.2,
                    delay: index * 0.05,
                    ease: "easeOut",
                  }}
                >
                  <Link
                    href={`/manga/${manga.otherName}`}
                    className="group block"
                  >
                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-muted mb-2">
                      <Image
                        src={manga.image}
                        alt={manga.comicName}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      {/* Không có rating trong API, bỏ hoặc thêm mặc định */}
                      <div className="absolute bottom-0 left-0 right-0 p-2">
                        <div className="flex items-center justify-between text-[10px] text-white/90">
                          <span className="bg-primary/90 px-1.5 py-0.5 rounded-sm">
                            {manga.status}
                          </span>
                          <span>{manga.views} lượt xem</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium text-sm line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                        {manga.comicName}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {manga.listChapters[0]?.chapterName || "Chưa có chương"}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center text-muted-foreground">
                Không có dữ liệu truyện phổ biến
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
