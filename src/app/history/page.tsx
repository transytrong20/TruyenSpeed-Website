import { Metadata } from "next";
import { HistoryClient } from "@/components/history/HistoryClient";

// Mock data: Trong thực tế nên thay thế bằng dữ liệu từ API
const READ_HISTORY = [
  {
    id: "one-piece",
    title: "One Piece",
    coverImage:
      "http://192.168.1.63:9000/truyenspeed/ComicBookCover/menh-luan-chi-chu-lam-ke-bien-di-giang-xuong-nhan-gian.webp",
    chapterNumber: "1212",
    chapterTitle: "Chapter 1212",
    readAt: "2024-01-15T10:30:00Z",
    progress: 100,
  },
  {
    id: "one-piece",
    title: "One Piece",
    coverImage:
      "http://192.168.1.63:9000/truyenspeed/ComicBookCover/menh-luan-chi-chu-lam-ke-bien-di-giang-xuong-nhan-gian.webp",
    chapterNumber: "1211",
    chapterTitle: "Chapter 1211",
    readAt: "2024-01-14T15:45:00Z",
    progress: 100,
  },
  {
    id: "one-piece",
    title: "One Piece",
    coverImage:
      "http://192.168.1.63:9000/truyenspeed/ComicBookCover/menh-luan-chi-chu-lam-ke-bien-di-giang-xuong-nhan-gian.webp",
    chapterNumber: "1210",
    chapterTitle: "Chapter 1210",
    readAt: "2024-01-13T20:15:00Z",
    progress: 75,
  },
];

export const metadata: Metadata = {
  title: "Lịch sử đọc - MangaReader",
  description: "Xem lại những chapter truyện bạn đã đọc",
};

export default function HistoryPage() {
  return <HistoryClient history={READ_HISTORY} />;
}
