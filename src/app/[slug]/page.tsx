import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Star, BookOpen, ArrowRight, Calendar, User, Clock } from "lucide-react";

import { getMangaBySlug } from "@/data/manga";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/format";
import { formatDate } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function MangaPage({ params }: { params: { slug: string } }) {
  const manga = getMangaBySlug(params.slug);

  if (!manga) {
    notFound();
  }

  return (
    <div className="container py-6 md:py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {/* Left side - Cover & Buttons */}
        <div className="md:col-span-1">
          <div className="relative overflow-hidden rounded-lg aspect-[2/3] mb-4">
            <Image
              src={manga.cover}
              alt={manga.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Button asChild size="lg" className="w-full font-medium">
              <Link href={`/${manga.slug}/chapter-${manga.chapters[0]?.number}`}>
                Đọc truyện <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full font-medium">
              <Link href={`/${manga.slug}/chapters`}>
                Xem danh sách chương <BookOpen className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Right side - Details */}
        <div className="md:col-span-2">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">{manga.title}</h1>

          {/* Rating & Status */}
          <div className="flex items-center flex-wrap gap-2 mb-4">
            <div className="flex items-center">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="font-semibold">{manga.rating.toFixed(1)}</span>
            </div>
            <Badge className="font-medium">
              {manga.status}
            </Badge>
            <div className="text-muted-foreground">
              {formatNumber(manga.views)} lượt xem
            </div>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 mb-6">
            {manga.genres.map((genre) => (
              <Link key={genre} href={`/genres/${genre.toLowerCase().replace(/\s+/g, "-")}`}>
                <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                  {genre}
                </Badge>
              </Link>
            ))}
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm font-medium flex items-center">
                  <User className="h-4 w-4 mr-2" /> Tác giả
                </CardTitle>
              </CardHeader>
              <CardContent className="py-0 pb-3">
                <p>{manga.author}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm font-medium flex items-center">
                  <User className="h-4 w-4 mr-2" /> Họa sĩ
                </CardTitle>
              </CardHeader>
              <CardContent className="py-0 pb-3">
                <p>{manga.artist}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm font-medium flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" /> Số chương
                </CardTitle>
              </CardHeader>
              <CardContent className="py-0 pb-3">
                <p>{manga.chapters.length} chương</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Calendar className="h-4 w-4 mr-2" /> Cập nhật
                </CardTitle>
              </CardHeader>
              <CardContent className="py-0 pb-3">
                <p>{formatDate(manga.updatedAt)}</p>
              </CardContent>
            </Card>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Giới thiệu truyện</h2>
            <p className="text-muted-foreground whitespace-pre-line">{manga.description}</p>
          </div>

          {/* Latest Chapters */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Chương mới nhất</h2>
            <div className="space-y-2">
              {manga.chapters.slice(0, 5).map((chapter) => (
                <Link
                  key={chapter.id}
                  href={`/${manga.slug}/chapter-${chapter.number}`}
                  className="flex items-center justify-between p-3 rounded-md hover:bg-muted transition-colors"
                >
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Chương {chapter.number}: {chapter.title}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{formatDate(chapter.publishedAt)}</span>
                  </div>
                </Link>
              ))}
              {manga.chapters.length > 5 && (
                <>
                  <Separator />
                  <div className="pt-2">
                    <Button asChild variant="ghost" className="w-full">
                      <Link href={`/${manga.slug}/chapters`}>
                        Xem tất cả các chương
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
