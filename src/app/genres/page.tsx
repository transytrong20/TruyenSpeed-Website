"use client";

import { useState } from "react";
import { genres, getAllManga, Manga } from "@/data/manga";
import { MangaGrid } from "@/components/shared/manga-grid";
import { GenreBadge } from "@/components/shared/genre-badge";

export default function GenresPage() {
  const [selectedGenre, setSelectedGenre] = useState<string>("Tất cả");
  const allMangas = getAllManga();

  const filteredMangas: Manga[] = selectedGenre === "Tất cả"
    ? allMangas
    : allMangas.filter(manga => manga.genres.includes(selectedGenre));

  return (
    <div className="container py-6 md:py-8">
      <h1 className="text-3xl font-bold mb-6">Thể loại truyện</h1>

      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {genres.map((genre) => (
            <GenreBadge
              key={genre}
              genre={genre}
              isActive={selectedGenre === genre}
              onClick={() => setSelectedGenre(genre)}
              className="text-sm"
            />
          ))}
        </div>

        <h2 className="text-xl font-semibold mb-4">
          {selectedGenre === "Tất cả" ? "Tất cả truyện" : `Thể loại: ${selectedGenre}`}
          <span className="text-muted-foreground ml-2 font-normal text-base">
            ({filteredMangas.length} truyện)
          </span>
        </h2>

        {filteredMangas.length > 0 ? (
          <MangaGrid
            mangas={filteredMangas}
            columns={{
              sm: 2,
              md: 3,
              lg: 4,
              xl: 5
            }}
          />
        ) : (
          <div className="py-20 text-center">
            <p className="text-lg text-muted-foreground">
              Không tìm thấy truyện nào thuộc thể loại này.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
