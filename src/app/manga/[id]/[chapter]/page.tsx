import { Metadata } from "next";
import { ChapterPageClient } from "@/components/manga/ChapterPageClient";

interface ReadingComic {
  title: string;
  description: string;
  coverImage: string;
  imageChapters: {
    image: string;
    title: string;
    alt: string;
  }[];
  listChapters: {
    chapterName: string;
    title: string;
  }[];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; chapter: string }>;
}): Promise<Metadata> {
  const { id, chapter } = await params;
  const res = await fetch(
    `https://localhost:44308/app/data/comic/truyen-tranh?slug=${id}&chapter=${chapter}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return {
      title: "Lỗi tải truyện",
      description: "Không thể tải thông tin truyện",
    };
  }

  const data: ReadingComic = await res.json();

  return {
    title: `${data.title} - Chapter ${chapter}`,
    description: data.description,
    openGraph: {
      title: `${data.title} - Chapter ${chapter}`,
      description: data.description,
      images: [data.coverImage],
    },
  };
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ id: string; chapter: string }>;
}) {
  const { id, chapter } = await params;
  const res = await fetch(
    `https://localhost:44308/app/data/comic/truyen-tranh?slug=${id}&chapter=${chapter}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return (
      <div className="container mx-auto py-10 text-center">
        <h1 className="text-2xl font-bold text-red-600">Lỗi tải dữ liệu</h1>
        <p>Không thể tải thông tin truyện. Vui lòng thử lại sau.</p>
      </div>
    );
  }

  const data: ReadingComic = await res.json();

  return <ChapterPageClient params={{ id, chapter }} readingComic={data} />;
}
