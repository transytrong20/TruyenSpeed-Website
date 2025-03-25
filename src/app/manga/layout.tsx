import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Danh sách truyện - MangaReader",
  description: "Khám phá kho truyện tranh đa dạng và phong phú",
};

export default function MangaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
