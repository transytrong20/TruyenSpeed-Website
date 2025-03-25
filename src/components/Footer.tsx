import Link from "next/link";
import { Facebook, Github, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-3">Về chúng tôi</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-primary">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary">
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link href="/dmca" className="hover:text-primary">
                  Báo cáo vi phạm
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Điều khoản</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/terms" className="hover:text-primary">
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary">
                  Câu hỏi thường gặp
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Thể loại</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/genres/action" className="hover:text-primary">
                  Hành động
                </Link>
              </li>
              <li>
                <Link href="/genres/romance" className="hover:text-primary">
                  Tình cảm
                </Link>
              </li>
              <li>
                <Link href="/genres/comedy" className="hover:text-primary">
                  Hài hước
                </Link>
              </li>
              <li>
                <Link href="/genres" className="hover:text-primary">
                  Xem tất cả
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Theo dõi chúng tôi</h3>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 MangaReader. Tất cả các quyền được bảo lưu.</p>
          <p className="mt-1">
            Website đọc truyện tranh online. Tất cả hình ảnh đều thuộc bản quyền
            của tác giả và nhà xuất bản.
          </p>
        </div>
      </div>
    </footer>
  );
}
