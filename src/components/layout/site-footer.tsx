import Link from "next/link";
import { BookOpen, Github } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-background py-6">
      <div className="container flex flex-col items-center gap-4 md:flex-row md:justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          <p className="text-sm font-medium">
            MangaVerse - Đọc truyện tranh online
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 md:flex-row md:gap-6">
          <nav className="flex gap-4 md:gap-6">
            <Link
              href="/about"
              className="text-xs md:text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Giới thiệu
            </Link>
            <Link
              href="/terms"
              className="text-xs md:text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Điều khoản
            </Link>
            <Link
              href="/privacy"
              className="text-xs md:text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Bảo mật
            </Link>
            <Link
              href="/contact"
              className="text-xs md:text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Liên hệ
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </a>
          </div>
        </div>
      </div>
      <div className="container mt-4">
        <p className="text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} MangaVerse. Tất cả các bộ truyện và hình ảnh trên MangaVerse đều thuộc bản quyền của tác giả và nhà xuất bản tương ứng.
        </p>
      </div>
    </footer>
  );
}
