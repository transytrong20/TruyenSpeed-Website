import { Metadata } from "next";
import { MangaDetailClient } from "@/components/manga/MangaDetailClient";

export const generateMetadata = ({
  params,
}: {
  params: { id: string };
}): Metadata => {
  return {
    title: "Loading... - MangaReader", // Metadata sẽ được cập nhật ở client
    description: "Đang tải thông tin truyện...",
  };
};

export default async function MangaDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return <MangaDetailClient slug={params.id} />;
}