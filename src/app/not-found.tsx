import Link from "next/link";
import { BookX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center gap-6 py-20 md:py-24 lg:py-32">
      <BookX className="h-24 w-24 text-muted-foreground" />
      <h1 className="text-4xl font-bold">404 - Trang không tồn tại</h1>
      <p className="text-xl text-muted-foreground text-center max-w-lg">
        Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/">Về trang chủ</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/genres">Khám phá truyện</Link>
        </Button>
      </div>
    </div>
  );
}
