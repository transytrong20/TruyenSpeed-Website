import { Link } from "react-router-dom";
import { BookOpen, Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Manga } from "@/lib/types";

interface MangaCardProps {
  manga: Manga;
  showBadge?: boolean;
}

export function MangaCard({ manga, showBadge = true }: MangaCardProps) {
  return (
    <Link to={`/manga/${manga.id}`} className="group">
      <Card className="h-full overflow-hidden border-transparent transition-colors duration-300 hover:border-primary">
        <div className="relative aspect-[2/3] overflow-hidden bg-muted">
          <img
            src={manga.coverImage}
            alt={manga.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {showBadge && manga.status === "En cours" && (
            <Badge className="absolute left-2 top-2 bg-primary/90 hover:bg-primary">
              {manga.status}
            </Badge>
          )}

          {showBadge && manga.status === "Terminé" && (
            <Badge className="absolute left-2 top-2 bg-green-600/90 hover:bg-green-600">
              {manga.status}
            </Badge>
          )}

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-6">
            <div className="flex items-center justify-between text-xs text-white">
              <div className="flex items-center gap-1">
                <BookOpen className="h-3 w-3" />
                <span>{manga.chapters.length} Ch.</span>
              </div>

              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>{manga.rating}</span>
              </div>
            </div>
          </div>
        </div>

        <CardFooter className="p-3">
          <div>
            <h3 className="line-clamp-1 text-sm font-medium">{manga.title}</h3>
            <p className="text-xs text-muted-foreground">{manga.author}</p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
