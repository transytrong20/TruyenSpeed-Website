import { Metadata } from "next";
import { MangaDetailClient } from "@/components/manga/MangaDetailClient";

// Mock data: Trong thực tế nên thay thế bằng dữ liệu từ API
const MANGA_DETAIL = {
  id: "one-piece",
  title: "One Piece",
  alternativeTitles: ["Vua Hải Tặc", "ワンピース"],
  description:
    "One Piece là câu chuyện về Monkey D. Luffy, một cậu bé có ước mơ trở thành Vua Hải Tặc và tìm kiếm kho báu One Piece. Luffy và băng hải tặc của mình, băng Mũ Rơm, phiêu lưu trên Grand Line, đối mặt với nhiều thử thách, kẻ thù và những cuộc phiêu lưu bất tận.",
  genres: ["Hành động", "Phiêu lưu", "Hài hước", "Siêu nhiên", "Giả tưởng"],
  author: "Eiichiro Oda",
  status: "Đang tiến hành",
  coverImage:
    "http://192.168.1.63:9000/truyenspeed/ComicBookCover/menh-luan-chi-chu-lam-ke-bien-di-giang-xuong-nhan-gian.webp",
  rating: 4.9,
  totalViews: 10500000,
  totalBookmarks: 250000,
  chapters: [
    { number: "1112", title: "Những người bạn", releaseDate: "2023-06-10" },
    {
      number: "1111",
      title: "Bí mật của Laugh Tale",
      releaseDate: "2023-06-03",
    },
    {
      number: "1110",
      title: "Trận chiến cuối cùng",
      releaseDate: "2023-05-27",
    },
    {
      number: "1109",
      title: "Hải tặc và Thủy quân lục chiến",
      releaseDate: "2023-05-20",
    },
    {
      number: "1108",
      title: "Sự trở lại của Shanks",
      releaseDate: "2023-05-13",
    },
    { number: "1107", title: "Bí mật của Roger", releaseDate: "2023-05-06" },
    { number: "1106", title: "Gear 5", releaseDate: "2023-04-29" },
    { number: "1105", title: "Sức mạnh thức tỉnh", releaseDate: "2023-04-22" },
    { number: "1104", title: "Võ thuật Haki", releaseDate: "2023-04-15" },
    {
      number: "1103",
      title: "Con đường đến Laugh Tale",
      releaseDate: "2023-04-08",
    },
  ],
};

export const generateMetadata = ({
  params,
}: {
  params: { id: string };
}): Metadata => {
  // Trong dự án thực tế, cần phải fetch dữ liệu truyện theo params.id
  return {
    title: `${MANGA_DETAIL.title} - MangaReader`,
    description: MANGA_DETAIL.description,
  };
};

export default async function MangaDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // Trong thực tế, fetch data ở đây
  const manga = MANGA_DETAIL;

  return <MangaDetailClient manga={manga} />;
}
