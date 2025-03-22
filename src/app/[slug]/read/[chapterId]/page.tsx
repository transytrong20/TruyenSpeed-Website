import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, List, Home } from "lucide-react";

import { getMangaBySlug } from "@/data/manga";
import { Button } from "@/components/ui/button";

interface ReadChapterPageProps {
  params: {
    slug: string;
    chapterId: string;
  };
}

export default function ReadChapterPage({ params }: ReadChapterPageProps) {
  const manga = getMangaBySlug(params.slug);

  if (!manga) {
    notFound();
  }

  const chapter = manga.chapters.find(ch => ch.id === params.chapterId);

  if (!chapter) {
    notFound();
  }

  // Tìm chương trước và chương sau
  const currentIndex = manga.chapters.findIndex(ch => ch.id === params.chapterId);
  const prevChapter = currentIndex > 0 ? manga.chapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < manga.chapters.length - 1 ? manga.chapters[currentIndex + 1] : null;

  return (
    <div className="bg-background min-h-screen pb-10">
      {/* Header Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href={`/${manga.slug}`}>
                  <Home className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Thông tin truyện</span>
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href={`/${manga.slug}/chapters`}>
                  <List className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Danh sách chương</span>
                </Link>
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                asChild={!!prevChapter}
                variant="outline"
                size="sm"
                disabled={!prevChapter}
              >
                {prevChapter ? (
                  <Link href={`/${manga.slug}/read/${prevChapter.id}`}>
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">Chương trước</span>
                  </Link>
                ) : (
                  <span>
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">Chương trước</span>
                  </span>
                )}
              </Button>
              <Button
                asChild={!!nextChapter}
                variant="outline"
                size="sm"
                disabled={!nextChapter}
              >
                {nextChapter ? (
                  <Link href={`/${manga.slug}/read/${nextChapter.id}`}>
                    <span className="hidden sm:inline">Chương sau</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                ) : (
                  <span>
                    <span className="hidden sm:inline">Chương sau</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Chapter Title */}
      <div className="container pt-6 pb-4 text-center">
        <h1 className="text-xl font-bold mb-1">{manga.title}</h1>
        <h2 className="text-lg font-medium text-muted-foreground">
          Chương {chapter.number}: {chapter.title}
        </h2>
      </div>

      {/* Chapter Content */}
      <div className="container max-w-4xl mx-auto">
        <div className="flex flex-col items-center gap-4">
          {chapter.images.map((image, index) => (
            <div key={index} className="w-full flex justify-center">
              <Image
                src={image}
                alt={`Trang ${index + 1}`}
                width={800}
                height={1200}
                priority={index < 3}
                className="max-w-full h-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="container max-w-4xl mx-auto mt-10">
        <div className="flex items-center justify-between">
          <Button
            asChild={!!prevChapter}
            variant="outline"
            disabled={!prevChapter}
          >
            {prevChapter ? (
              <Link href={`/${manga.slug}/read/${prevChapter.id}`}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Chương trước
              </Link>
            ) : (
              <span>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Chương trước
              </span>
            )}
          </Button>

          <Button asChild variant="outline">
            <Link href={`/${manga.slug}/chapters`}>
              <List className="h-4 w-4 mr-2" />
              Danh sách chương
            </Link>
          </Button>

          <Button
            asChild={!!nextChapter}
            variant="outline"
            disabled={!nextChapter}
          >
            {nextChapter ? (
              <Link href={`/${manga.slug}/read/${nextChapter.id}`}>
                Chương sau
                <ChevronRight className="h-4 w-4 ml-2" />
              </Link>
            ) : (
              <span>
                Chương sau
                <ChevronRight className="h-4 w-4 ml-2" />
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
