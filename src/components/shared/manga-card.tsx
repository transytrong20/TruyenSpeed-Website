import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn, slugify } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/format";

interface MangaCardProps {
  id: string;
  title: string;
  cover: string;
  rating: number;
  views: number;
  status: string;
  className?: string;
  isCompact?: boolean;
}

export function MangaCard({
  id,
  title,
  cover,
  rating,
  views,
  status,
  className,
  isCompact = false,
}: MangaCardProps) {
  // Tạo slug từ tiêu đề truyện
  const slug = slugify(title);

  return (
    <Link href={`/${slug}`}>
      <Card
        className={cn(
          "group overflow-hidden transition-all hover:shadow-md h-full",
          className
        )}
      >
        <div className="relative aspect-[2/3] overflow-hidden rounded-t-md">
          <Image
            src={cover}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {!isCompact && (
            <div className="absolute top-2 right-2">
              <Badge
                variant={
                  status === "Đang tiến hành"
                    ? "default"
                    : status === "Đã hoàn thành"
                    ? "secondary"
                    : "outline"
                }
                className="font-medium text-xs"
              >
                {status}
              </Badge>
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium">{rating.toFixed(1)}</span>
            </div>
            <div className="text-xs font-medium">{formatNumber(views)}</div>
          </div>
        </div>
        <CardContent
          className={cn(
            "p-3",
            isCompact ? "py-2" : "py-3"
          )}
        >
          <h3
            className={cn(
              "font-semibold line-clamp-2 group-hover:text-primary transition-colors",
              isCompact ? "text-xs" : "text-sm"
            )}
          >
            {title}
          </h3>
          {isCompact && (
            <div className="flex items-center justify-between mt-1 text-xs text-muted-foreground">
              <span className="truncate max-w-[100px]">{status}</span>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>{rating.toFixed(1)}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
