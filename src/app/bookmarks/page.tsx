import { Metadata } from "next";
import { BookmarksClient } from "@/components/bookmarks/BookmarksClient";

export const metadata: Metadata = {
  title: "Tủ truyện - MangaReader",
  description: "Danh sách truyện đã lưu của bạn",
};

// Mock data: Trong thực tế nên thay thế bằng dữ liệu từ API
const BOOKMARKS = [
  {
    id: "one-piece",
    title: "One Piece",
    coverImage:
      "http://192.168.1.63:9000/truyenspeed/ComicBookCover/menh-luan-chi-chu-lam-ke-bien-di-giang-xuong-nhan-gian.webp",
    lastChapter: "1212",
    lastRead: "1210",
    updatedAt: "2024-01-15",
  },
  {
    id: "naruto",
    title: "Naruto",
    coverImage:
      "http://192.168.1.63:9000/truyenspeed/ComicBookCover/menh-luan-chi-chu-lam-ke-bien-di-giang-xuong-nhan-gian.webp",
    lastChapter: "700",
    lastRead: "699",
    updatedAt: "2024-01-14",
  },
  {
    id: "bleach",
    title: "Bleach",
    coverImage:
      "http://192.168.1.63:9000/truyenspeed/ComicBookCover/menh-luan-chi-chu-lam-ke-bien-di-giang-xuong-nhan-gian.webp",
    lastChapter: "686",
    lastRead: "685",
    updatedAt: "2024-01-13",
  },
];

export default function BookmarksPage() {
  return <BookmarksClient bookmarks={BOOKMARKS} />;
}
