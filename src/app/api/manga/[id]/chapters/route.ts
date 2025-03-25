import { NextResponse } from "next/server";

// Mock data: Trong thực tế sẽ lấy từ database
const MANGA_CHAPTERS = [
  ...Array.from({ length: 100 }, (_, i) => ({
    number: (1212 - i).toString(),
    title: `Chapter ${1212 - i}`,
    releaseDate: new Date(2024, 0, i + 1).toISOString().split("T")[0],
  })),
  { number: "1112", title: "Những người bạn", releaseDate: "2023-06-10" },
  { number: "1111", title: "Bí mật của Laugh Tale", releaseDate: "2023-06-03" },
  { number: "1110", title: "Trận chiến cuối cùng", releaseDate: "2023-05-27" },
  {
    number: "1109",
    title: "Hải tặc và Thủy quân lục chiến",
    releaseDate: "2023-05-20",
  },
  { number: "1108", title: "Sự trở lại của Shanks", releaseDate: "2023-05-13" },
  { number: "1107", title: "Bí mật của Roger", releaseDate: "2023-05-06" },
  { number: "1106", title: "Gear 5", releaseDate: "2023-04-29" },
  { number: "1105", title: "Sức mạnh thức tỉnh", releaseDate: "2023-04-22" },
  { number: "1104", title: "Võ thuật Haki", releaseDate: "2023-04-15" },
  {
    number: "1103",
    title: "Con đường đến Laugh Tale",
    releaseDate: "2023-04-08",
  },
];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const search = searchParams.get("search") || "";
  const order = searchParams.get("order") || "desc";

  // Lọc chapters theo search query
  let filteredChapters = [...MANGA_CHAPTERS];
  if (search) {
    const searchLower = search.toLowerCase();
    filteredChapters = filteredChapters.filter(
      (chapter) =>
        chapter.number.includes(searchLower) ||
        chapter.title.toLowerCase().includes(searchLower)
    );
  }

  // Sắp xếp chapters
  if (order === "asc") {
    filteredChapters.sort((a, b) => parseInt(a.number) - parseInt(b.number));
  } else {
    filteredChapters.sort((a, b) => parseInt(b.number) - parseInt(a.number));
  }

  // Phân trang
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedChapters = filteredChapters.slice(start, end);

  return NextResponse.json({
    chapters: paginatedChapters,
    total: filteredChapters.length,
    page,
    limit,
    totalPages: Math.ceil(filteredChapters.length / limit),
  });
}
