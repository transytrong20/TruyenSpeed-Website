import { Metadata } from "next";
import { ChapterPageClient } from "@/components/manga/ChapterPageClient";

// Mock data cho metadata
const MANGA_DETAIL = {
  id: "one-piece",
  title: "One Piece",
  description: "Bộ truyện về cuộc phiêu lưu của Luffy và băng hải tặc Mũ Rơm",
  coverImage:
    "https://m.media-amazon.com/images/I/81s8xJUzWGL._AC_UF1000,1000_QL80_.jpg",
};

export async function generateMetadata({
  params,
}: {
  params: { id: string; chapter: string };
}): Promise<Metadata> {
  // Trong thực tế, dữ liệu này sẽ được lấy từ API
  const manga = MANGA_DETAIL;

  return {
    title: `${manga.title} - Chapter ${params.chapter}`,
    description: manga.description,
    openGraph: {
      title: `${manga.title} - Chapter ${params.chapter}`,
      description: manga.description,
      images: [manga.coverImage],
    },
  };
}

export default function ChapterPage({
  params,
}: {
  params: { id: string; chapter: string };
}) {
  return <ChapterPageClient params={params} />;
}
