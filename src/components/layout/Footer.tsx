import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background py-6">
      <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col items-center md:items-start">
          <Link href="/" className="text-xl font-bold">
            MangaReader
          </Link>
          <p className="text-sm text-muted-foreground mt-1">
            Đọc truyện tranh online miễn phí
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
          <div className="flex flex-col gap-2">
            <h4 className="font-medium">Danh mục</h4>
            <Link
              href="/latest"
              className="text-muted-foreground hover:text-foreground"
            >
              Mới cập nhật
            </Link>
            <Link
              href="/popular"
              className="text-muted-foreground hover:text-foreground"
            >
              Phổ biến
            </Link>
            <Link
              href="/completed"
              className="text-muted-foreground hover:text-foreground"
            >
              Hoàn thành
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-medium">Thể loại</h4>
            <Link
              href="/genres/action"
              className="text-muted-foreground hover:text-foreground"
            >
              Hành động
            </Link>
            <Link
              href="/genres/comedy"
              className="text-muted-foreground hover:text-foreground"
            >
              Hài hước
            </Link>
            <Link
              href="/genres/romance"
              className="text-muted-foreground hover:text-foreground"
            >
              Tình cảm
            </Link>
          </div>
          <div className="flex flex-col gap-2 col-span-2 md:col-span-1 mt-4 md:mt-0">
            <h4 className="font-medium">Liên kết</h4>
            <Link
              href="/about"
              className="text-muted-foreground hover:text-foreground"
            >
              Về chúng tôi
            </Link>
            <Link
              href="/dmca"
              className="text-muted-foreground hover:text-foreground"
            >
              DMCA
            </Link>
            <Link
              href="/terms"
              className="text-muted-foreground hover:text-foreground"
            >
              Điều khoản sử dụng
            </Link>
          </div>
        </div>
      </div>
      <div className="container mt-8">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} MangaReader. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
