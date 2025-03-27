import { Metadata } from "next";
import { MangaDetailClient } from "@/components/manga/MangaDetailClient";

async function fetchMangaDetail(slug: string, token?: string) {
  const urlapi = process.env.NEXT_PUBLIC_API_BASE_URL;
  const url = `${urlapi}comic/thong-tin-truyen?slug=${slug}`;

  try {
    const headers: Record<string, string> = {
      accept: "*/*",
    };

    // Nếu có token, thêm Bearer Token vào header
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers,
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching manga detail:", error);
    return null;
  }
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> => {
  const { id } = await params;
  // Lấy token từ context hoặc nơi lưu trữ (ví dụ: server-side session, cookie)
  const token = process.env.SERVER_TOKEN || ""; // Giả sử token được lưu ở đây, tùy vào cách bạn quản lý auth
  const rawManga = await fetchMangaDetail(id, token);

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
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // Lấy token từ context hoặc nơi lưu trữ (tùy hệ thống auth của bạn)
  const token = process.env.SERVER_TOKEN || ""; // Thay bằng logic lấy token thực tế
  const rawManga = await fetchMangaDetail(id, token);

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
    isBookmarks: rawManga.isBookmarks || false,
    isLiked: rawManga.isLiked || false,
    totalLikes: rawManga.totalLikes || 0,
    chapters: rawManga.listChapters.map((chapter: any) => ({
      number: chapter.chapterName.replace("Chapter ", ""),
      title: chapter.title,
      releaseDate: chapter.releaseDate.split("T")[0],
    })),
  };

  return <MangaDetailClient manga={manga} slug={id} />;
}
