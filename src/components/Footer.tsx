import { Link } from "react-router-dom";
import { Mail, Github, Twitter, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-background px-4 py-8 pb-24 lg:pb-8">
      <div className="container mx-auto grid grid-cols-2 gap-6 sm:grid-cols-2 sm:gap-8 md:grid-cols-4 lg:grid-cols-5">
        <div className="col-span-2 lg:col-span-2">
          <h2 className="mb-3 text-xl font-bold md:mb-4">MangaNovaVN</h2>
          <p className="mb-4 max-w-md text-sm text-muted-foreground">
            Khám phá và đọc truyện tranh yêu thích của bạn với trải nghiệm mượt mà và đắm chìm. Thư
            viện truyện đa dạng và cập nhật liên tục.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-primary"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-primary"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="mailto:contact@manganovavn.com"
              className="text-muted-foreground transition-colors hover:text-primary"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-medium md:mb-3 md:text-base">Tìm hiểu</h3>
          <ul className="space-y-1.5 text-xs md:space-y-2 md:text-sm">
            <li>
              <Link
                to="/about"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                Giới thiệu
              </Link>
            </li>
            <li>
              <Link
                to="/faq"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                Câu hỏi thường gặp
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                Liên hệ
              </Link>
            </li>
            <li>
              <Link
                to="/donate"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                Ủng hộ
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-medium md:mb-3 md:text-base">Điều khoản</h3>
          <ul className="space-y-1.5 text-xs md:space-y-2 md:text-sm">
            <li>
              <Link
                to="/terms"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                Điều khoản sử dụng
              </Link>
            </li>
            <li>
              <Link
                to="/privacy"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                Chính sách bảo mật
              </Link>
            </li>
            <li>
              <Link
                to="/dmca"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                DMCA
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-medium md:mb-3 md:text-base">Danh mục</h3>
          <ul className="space-y-1.5 text-xs md:space-y-2 md:text-sm">
            <li>
              <Link
                to="/explore"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                Tất cả truyện
              </Link>
            </li>
            <li>
              <Link
                to="/popular"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                Phổ biến nhất
              </Link>
            </li>
            <li>
              <Link
                to="/latest"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                Mới cập nhật
              </Link>
            </li>
            <li>
              <Link
                to="/completed"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                Đã hoàn thành
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto mt-6 border-t border-border pt-6 md:mt-8">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-3 text-xs text-muted-foreground md:mb-0 md:text-sm">
            &copy; {currentYear} MangaNovaVN. Tất cả các quyền được bảo lưu.
          </div>
          <div className="flex items-center text-xs text-muted-foreground md:text-sm">
            <span>Làm với</span>
            <Heart className="mx-1 h-3.5 w-3.5 text-red-500 md:h-4 md:w-4" />
            <span>tại Việt Nam</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
