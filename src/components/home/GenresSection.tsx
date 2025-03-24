"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { GenreCard3D } from "@/components/effects/GenresGrid3D";

const GENRES = [
  { id: "action", name: "Hành động", icon: "⚔️" },
  { id: "comedy", name: "Hài hước", icon: "😂" },
  { id: "romance", name: "Tình cảm", icon: "❤️" },
  { id: "fantasy", name: "Giả tưởng", icon: "🧙" },
  { id: "horror", name: "Kinh dị", icon: "👻" },
  { id: "adventure", name: "Phiêu lưu", icon: "🗺️" },
  { id: "sci-fi", name: "Khoa học viễn tưởng", icon: "🚀" },
  { id: "mystery", name: "Bí ẩn", icon: "🔍" },
  { id: "drama", name: "Kịch tính", icon: "🎭" },
  { id: "slice-of-life", name: "Đời thường", icon: "🏙️" },
  { id: "supernatural", name: "Siêu nhiên", icon: "✨" },
  { id: "sports", name: "Thể thao", icon: "⚽" },
];

export function GenresSection() {
  return (
    <section className="py-8">
      <div className="container">
        <h2 className="text-2xl font-bold mb-6">Thể loại</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {GENRES.map((genre) => (
            <Link key={genre.id} href={`/genres/${genre.id}`}>
              <GenreCard3D icon={genre.icon} name={genre.name} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
