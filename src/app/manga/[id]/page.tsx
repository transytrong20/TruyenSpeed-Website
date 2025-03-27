import { Metadata } from "next";
import { MangaDetailClient } from "@/components/manga/MangaDetailClient";

async function fetchMangaDetail(slug: string, username: string = "") {
  const urlapi = process.env.NEXT_PUBLIC_API_BASE_URL;
  const url = `${urlapi}comic/thong-tin-truyen?slug=${slug}&username=${username}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "*/*",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>; // Thêm Promise để rõ ràng hóa bất đồng bộ
}): Promise<Metadata> => {
  const { id } = await params; // Await params trước khi dùng
  const rawManga = await fetchMangaDetail(id);

  if (!rawManga) {
    return {
      title: "Manga Not Found - TruyenSpeed",
      description: "Không tìm thấy thông tin truyện.",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:3000";

  return {
    title: `${rawManga.comicName} - TruyenSpeed`,
    description: rawManga.introduction || "Đang cập nhật",
    openGraph: {
      title: rawManga.comicName,
      description: rawManga.introduction || "Đang cập nhật",
      images: [rawManga.image],
      url: `${baseUrl}/manga/${id}`,
    },
  };
};

export default async function MangaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>; // Thêm Promise để rõ ràng hóa bất đồng bộ
}) {
  const { id } = await params; // Await params trước khi dùng
  const rawManga = await fetchMangaDetail(id);

  if (!rawManga) {
    return <div>Không thể tải thông tin truyện. Vui lòng thử lại sau.</div>;
  }

  const manga = {
    id: id,
    title: rawManga.comicName,
    alternativeTitles: rawManga.alternativeTitles
      ? rawManga.alternativeTitles.split(", ")
      : [rawManga.otherName],
    description: rawManga.introduction || "Đang cập nhật",
    genres: rawManga.listTags.map((tag: { tagName: string }) => tag.tagName),
    author: rawManga.creator || "Đang cập nhật",
    status: rawManga.status || "Đang cập nhật",
    coverImage: rawManga.image,
    rating: rawManga.vote || 0,
    totalViews: rawManga.views || 0,
    totalVote: rawManga.totalVote || 0,
    totalBookmarks: rawManga.bookmarks || 0,
    chapters: rawManga.listChapters.map((chapter: any) => ({
      number: chapter.chapterName.replace("Chapter ", ""),
      title: chapter.title,
      releaseDate: chapter.releaseDate.split("T")[0],
    })),
  };

  return <MangaDetailClient manga={manga} slug={id} />;
}
