import { Manga } from "@/data/manga";
import { MangaCard } from "@/components/shared/manga-card";
import { cn } from "@/lib/utils";

interface MangaGridProps {
  mangas: Manga[];
  className?: string;
  isCompact?: boolean;
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

export function MangaGrid({
  mangas,
  className,
  isCompact = false,
  columns = {
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
  },
}: MangaGridProps) {
  // Sử dụng className tĩnh thay vì tạo động để tránh lỗi hydration
  const getGridClass = () => {
    const colClasses = {
      sm2: "sm:grid-cols-2",
      sm3: "sm:grid-cols-3",
      sm4: "sm:grid-cols-4",
      sm5: "sm:grid-cols-5",
      md2: "md:grid-cols-2",
      md3: "md:grid-cols-3",
      md4: "md:grid-cols-4",
      md5: "md:grid-cols-5",
      lg2: "lg:grid-cols-2",
      lg3: "lg:grid-cols-3",
      lg4: "lg:grid-cols-4",
      lg5: "lg:grid-cols-5",
      xl2: "xl:grid-cols-2",
      xl3: "xl:grid-cols-3",
      xl4: "xl:grid-cols-4",
      xl5: "xl:grid-cols-5"
    };

    const { sm = 2, md = 3, lg = 4, xl = 5 } = columns;

    return cn(
      "grid-cols-2",
      colClasses[`sm${sm}` as keyof typeof colClasses],
      colClasses[`md${md}` as keyof typeof colClasses],
      colClasses[`lg${lg}` as keyof typeof colClasses],
      colClasses[`xl${xl}` as keyof typeof colClasses]
    );
  };

  return (
    <div
      className={cn(
        "grid gap-3 sm:gap-4",
        getGridClass(),
        className
      )}
    >
      {mangas.map((manga) => (
        <MangaCard
          key={manga.id}
          id={manga.id}
          title={manga.title}
          cover={manga.cover}
          rating={manga.rating}
          views={manga.views}
          status={manga.status}
          isCompact={isCompact}
        />
      ))}
    </div>
  );
}
