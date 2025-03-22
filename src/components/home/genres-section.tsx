"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { genres } from "@/data/manga";
import { SectionHeader } from "@/components/shared/section-header";
import { GenreBadge } from "@/components/shared/genre-badge";
import { cn } from "@/lib/utils";

export function GenresSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const maxDisplayGenres = 15;
  const displayGenres = genres.slice(0, maxDisplayGenres);

  return (
    <div className="mb-8">
      <SectionHeader
        title="Thể loại"
        href="/genres"
        className="mb-4"
      />
      <div className="flex flex-wrap gap-2">
        {displayGenres.map((genre, index) => (
          <Link
            href={`/genres/${genre === "Tất cả" ? "" : genre.toLowerCase().replace(/\s+/g, "-")}`}
            key={genre}
            className="relative"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <GenreBadge
              genre={genre}
              className={cn(
                "text-sm",
                hoveredIndex === index && "bg-primary text-primary-foreground"
              )}
            />
            {hoveredIndex === index && (
              <ChevronRight className="absolute -right-1 top-1/2 -translate-y-1/2 h-3 w-3 text-primary" />
            )}
          </Link>
        ))}
        {genres.length > maxDisplayGenres && (
          <Link href="/genres">
            <GenreBadge
              genre={`+${genres.length - maxDisplayGenres}`}
              className="bg-muted hover:bg-primary/80"
            />
          </Link>
        )}
      </div>
    </div>
  );
}
