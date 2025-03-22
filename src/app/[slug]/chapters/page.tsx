import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, ArrowLeft, Calendar, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getMangaBySlug } from "@/data/manga";
import { formatDate } from "@/lib/utils";
import { formatNumber } from "@/lib/format";

export default function ChaptersPage({ params }: { params: { slug: string } }) {
  const manga = getMangaBySlug(params.slug);

  if (!manga) {
    notFound();
  }

  // Sắp xếp chương theo thứ tự giảm dần (mới nhất trước)
  const sortedChapters = [...manga.chapters].sort((a, b) => b.number - a.number);

  return (
    <div className="container py-6 md:py-8">
      <div className="flex items-center gap-4 mb-6">
        <Button asChild variant="outline" size="sm">
          <Link href={`/${manga.slug}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Link>
        </Button>
        <h1 className="text-2xl md:text-3xl font-bold">Danh sách chương</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-8">
        <div className="md:w-[200px] flex-shrink-0">
          <div className="relative overflow-hidden rounded-lg aspect-[2/3]">
            <Image
              src={manga.cover}
              alt={manga.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 200px"
            />
          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-xl md:text-2xl font-bold mb-2">{manga.title}</h2>
          <p className="text-muted-foreground mb-4 line-clamp-3">{manga.description}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>{manga.chapters.length} chương</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Cập nhật: {formatDate(manga.updatedAt)}</span>
            </div>
          </div>
        </div>
      </div>

      <Separator className="mb-6" />

      <div className="flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_200px_150px] py-3 px-4 bg-muted rounded-t-md font-medium">
          <div>Chương</div>
          <div className="hidden md:block">Ngày đăng</div>
          <div className="hidden md:block text-right">Lượt xem</div>
        </div>

        <div className="space-y-2 mt-2">
          {sortedChapters.map((chapter) => (
            <Link
              key={chapter.id}
              href={`/${manga.slug}/chapter-${chapter.number}`}
              className="grid grid-cols-1 md:grid-cols-[1fr_200px_150px] py-3 px-4 rounded-md hover:bg-muted transition-colors"
            >
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Chương {chapter.number}: {chapter.title}</span>
              </div>
              <div className="hidden md:flex items-center text-muted-foreground">
                {formatDate(chapter.publishedAt)}
              </div>
              <div className="hidden md:flex items-center justify-end text-muted-foreground">
                <Eye className="h-4 w-4 mr-1" />
                {formatNumber(chapter.views)}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
