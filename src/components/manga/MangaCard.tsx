import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface MangaCardProps {
  id: string;
  title: string;
  coverImage: string;
  latestChapter?: string;
  hotLabel?: boolean;
  newLabel?: boolean;
}

export function MangaCard({
  id,
  title,
  coverImage,
  latestChapter,
  hotLabel,
  newLabel,
}: MangaCardProps) {
  return (
    <Card className="overflow-hidden border-none bg-background hover:shadow-lg transition-shadow group">
      <Link href={`/manga/${id}`} className="block">
        <div className="relative aspect-[2/3] overflow-hidden">
          <Image
            src={coverImage}
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute bottom-2 left-2 right-2 text-white text-sm font-medium line-clamp-2">
              {title}
            </div>
          </div>

          {(hotLabel || newLabel) && (
            <div className="absolute top-2 left-2 flex gap-1">
              {hotLabel && (
                <span className="bg-red-500 text-white text-xs font-medium px-1.5 py-0.5 rounded">
                  HOT
                </span>
              )}
              {newLabel && (
                <span className="bg-blue-500 text-white text-xs font-medium px-1.5 py-0.5 rounded">
                  NEW
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
      <CardContent className="p-2">
        <Link href={`/manga/${id}`} className="block">
          <h3 className="font-medium text-sm line-clamp-2 hover:text-primary">
            {title}
          </h3>
        </Link>
      </CardContent>
      {latestChapter && (
        <CardFooter className="p-2 pt-0">
          <Link
            href={`/manga/${id}/${latestChapter}`}
            className="text-xs text-muted-foreground hover:text-primary"
          >
            Chapter {latestChapter}
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}
