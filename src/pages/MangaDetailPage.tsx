import { useParams, Link } from "react-router-dom";
import {
  Book,
  BookMarked,
  Calendar,
  ChevronRight,
  Clock,
  Globe,
  Heart,
  User,
  MessageSquare,
  Share2,
  Star,
  Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getMangaById } from "@/lib/data/manga-data";
import { Badge } from "@/components/ui/badge";
import { ChapterList } from "@/components/manga/ChapterList";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

export default function MangaDetailPage() {
  const { id } = useParams<{ id: string }>();
  const manga = getMangaById(id || "");

  if (!manga) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-bold mb-4">Không tìm thấy truyện</h1>
        <p className="text-muted-foreground mb-6">Truyện bạn đang tìm kiếm không tồn tại.</p>
        <Link to="/explore">
          <Button>Quay lại trang khám phá</Button>
        </Link>
      </div>
    );
  }

  const handleBookmark = () => {
    toast.success("Đã thêm vào danh sách yêu thích");
  };

  return (
    <div className="mb-24">
      <div className="flex flex-col gap-4 md:flex-row md:gap-8">
        <div className="md:w-1/3 lg:w-1/4">
          <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
            <img
              src={manga.coverImage}
              alt={manga.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mt-6 space-y-4">
            <Button className="w-full" size="lg">
              <Book className="mr-2 h-4 w-4" /> Bắt đầu đọc
            </Button>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={handleBookmark}>
                <BookMarked className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="flex-1">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="flex-1">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium mb-3">Thông tin</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Tác giả:</span>
                <span className="font-medium">{manga.author}</span>
              </li>
              <li className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Xuất bản:</span>
                <span className="font-medium">{manga.publicationYear}</span>
              </li>
              <li className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Trạng thái:</span>
                <span className="font-medium">{manga.status === "Terminé" ? "Đã hoàn thành" : "Đang tiến hành"}</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Quốc gia:</span>
                <span className="font-medium">{manga.origin}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Link to="/explore" className="text-sm text-muted-foreground hover:text-primary">
              Khám phá
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{manga.title}</span>
          </div>

          <h1 className="text-3xl font-bold mb-2">{manga.title}</h1>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="font-medium">{manga.rating}</span>
              <span className="text-muted-foreground text-sm">/5</span>
            </div>
            <div className="flex items-center gap-1">
              <Book className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{manga.chapters.length} chương</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Cập nhật {manga.lastUpdate}</span>
            </div>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {manga.genres.map((genre) => (
              <Badge key={genre} variant="secondary">{genre}</Badge>
            ))}
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Giới thiệu</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-line">
                {manga.description}
              </p>
            </CardContent>
          </Card>

          <Tabs defaultValue="chapters">
            <TabsList className="mb-4">
              <TabsTrigger value="chapters">Chương</TabsTrigger>
              <TabsTrigger value="comments">Bình luận</TabsTrigger>
              <TabsTrigger value="related">Tương tự</TabsTrigger>
            </TabsList>

            <TabsContent value="chapters">
              <ChapterList chapters={manga.chapters} mangaId={manga.id} />
            </TabsContent>

            <TabsContent value="comments">
              <div className="space-y-4">
                <div className="flex items-start gap-4 pb-4 border-b">
                  <Avatar>
                    <AvatarFallback>UN</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Người dùng123</h4>
                      <span className="text-xs text-muted-foreground">2 ngày trước</span>
                    </div>
                    <p className="mt-1 text-sm">Tôi thích truyện này, cốt truyện hấp dẫn và nhân vật phát triển tốt!</p>
                    <div className="flex items-center gap-4 mt-2">
                      <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1 h-auto p-0">
                        <Heart className="h-3 w-3" />
                        <span>12</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1 h-auto p-0">
                        <MessageSquare className="h-3 w-3" />
                        <span>Trả lời</span>
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarFallback>MT</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">MangaTop</h4>
                      <span className="text-xs text-muted-foreground">5 ngày trước</span>
                    </div>
                    <p className="mt-1 text-sm">Minh họa thật tuyệt vời, tôi rất mong chờ phần tiếp theo!</p>
                    <div className="flex items-center gap-4 mt-2">
                      <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1 h-auto p-0">
                        <Heart className="h-3 w-3" />
                        <span>8</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1 h-auto p-0">
                        <MessageSquare className="h-3 w-3" />
                        <span>Trả lời</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="related">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {manga.relatedManga.map((relatedId, index) => {
                  const related = getMangaById(relatedId);
                  if (!related) return null;

                  return (
                    <Link to={`/manga/${related.id}`} key={index}>
                      <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                        <img
                          src={related.coverImage}
                          alt={related.title}
                          className="aspect-[2/3] w-full object-cover"
                        />
                        <CardFooter className="p-2">
                          <CardTitle className="text-sm">{related.title}</CardTitle>
                        </CardFooter>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
