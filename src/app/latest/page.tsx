import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Metadata } from "next";
import { MangaCard } from "@/components/manga/MangaCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

export const metadata: Metadata = {
  title: "Truyện mới cập nhật - MangaReader",
  description: "Danh sách truyện tranh mới cập nhật, đọc truyện tranh online miễn phí",
};

// Mock data: Trong thực tế nên thay thế bằng dữ liệu từ API
const LATEST_MANGA = [
  {
    id: "one-piece",
    title: "One Piece",
    coverImage: "https://m.media-amazon.com/images/I/81s8xJUzWGL._AC_UF1000,1000_QL80_.jpg",
    latestChapter: "1112",
    newLabel: true
  },
  {
    id: "jujutsu-kaisen",
    title: "Jujutsu Kaisen",
    coverImage: "https://m.media-amazon.com/images/I/81TmHlRleJL._AC_UF1000,1000_QL80_.jpg",
    latestChapter: "253",
    newLabel: true
  },
  {
    id: "spy-x-family",
    title: "Spy x Family",
    coverImage: "https://m.media-amazon.com/images/I/71vMGRog+iL._AC_UF1000,1000_QL80_.jpg",
    latestChapter: "91",
    newLabel: true
  },
  {
    id: "chainsaw-man",
    title: "Chainsaw Man",
    coverImage: "https://m.media-amazon.com/images/I/81YYJn1kBzL._AC_UF1000,1000_QL80_.jpg",
    latestChapter: "156",
    newLabel: true
  },
  {
    id: "my-hero-academia",
    title: "My Hero Academia",
    coverImage: "https://m.media-amazon.com/images/I/71olsYX0YsL._AC_UF1000,1000_QL80_.jpg",
    latestChapter: "421",
    newLabel: true
  },
  {
    id: "tokyo-revengers",
    title: "Tokyo Revengers",
    coverImage: "https://m.media-amazon.com/images/I/71YYHcfrLYL._AC_UF1000,1000_QL80_.jpg",
    latestChapter: "278",
    newLabel: true
  },
  {
    id: "demon-slayer",
    title: "Demon Slayer: Kimetsu no Yaiba",
    coverImage: "https://m.media-amazon.com/images/I/81miAFqQF-L._AC_UF1000,1000_QL80_.jpg",
    latestChapter: "205",
    newLabel: true
  },
  {
    id: "one-punch-man",
    title: "One-Punch Man",
    coverImage: "https://m.media-amazon.com/images/I/81SrwYY-6-L._AC_UF894,1000_QL80_.jpg",
    latestChapter: "195",
    newLabel: true
  },
  {
    id: "attack-on-titan",
    title: "Attack on Titan",
    coverImage: "https://m.media-amazon.com/images/I/91M9VaZWxOL._AC_UF1000,1000_QL80_.jpg",
    latestChapter: "139",
    newLabel: true
  },
  {
    id: "naruto",
    title: "Naruto",
    coverImage: "https://m.media-amazon.com/images/I/71QYLrc-IQL._AC_UF1000,1000_QL80_.jpg",
    latestChapter: "700",
    newLabel: true
  },
  {
    id: "dragon-ball-super",
    title: "Dragon Ball Super",
    coverImage: "https://m.media-amazon.com/images/I/815rh8oxLNL._AC_UF1000,1000_QL80_.jpg",
    latestChapter: "101",
    newLabel: true
  },
  {
    id: "black-clover",
    title: "Black Clover",
    coverImage: "https://m.media-amazon.com/images/I/71lKmKeNRoL._AC_UF1000,1000_QL80_.jpg",
    latestChapter: "368",
    newLabel: true
  },
  {
    id: "solo-leveling",
    title: "Solo Leveling",
    coverImage: "https://m.media-amazon.com/images/I/71HhfnE8DIL._AC_UF1000,1000_QL80_.jpg",
    latestChapter: "179",
    newLabel: true
  },
  {
    id: "blue-lock",
    title: "Blue Lock",
    coverImage: "https://m.media-amazon.com/images/I/81Szj7+ss-L._AC_UF1000,1000_QL80_.jpg",
    latestChapter: "253",
    newLabel: true
  },
  {
    id: "tower-of-god",
    title: "Tower of God",
    coverImage: "https://m.media-amazon.com/images/I/7194VOAqO8L._AC_UF1000,1000_QL80_.jpg",
    latestChapter: "571",
    newLabel: true
  },
];

export default function LatestPage() {
  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8 text-sm">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Trang chủ
        </Link>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium">Truyện mới cập nhật</span>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold mb-8">Truyện mới cập nhật</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {LATEST_MANGA.map((manga) => (
          <MangaCard
            key={manga.id}
            id={manga.id}
            title={manga.title}
            coverImage={manga.coverImage}
            latestChapter={manga.latestChapter}
            newLabel={manga.newLabel}
          />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">4</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">5</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
