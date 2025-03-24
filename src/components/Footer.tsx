import { Link } from "react-router-dom";
import { Mail, Github, Twitter, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t w-full py-8 px-4 pb-24 lg:pb-8">
      <div className="container mx-auto grid gap-6 sm:gap-8 grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
        <div className="col-span-2 lg:col-span-2">
          <h2 className="text-xl font-bold mb-3 md:mb-4">MangaNovaVN</h2>
          <p className="text-muted-foreground text-sm mb-4 max-w-md">
            Khám phá và đọc truyện tranh yêu thích của bạn với trải nghiệm mượt mà và đắm chìm.
            Thư viện truyện đa dạng và cập nhật liên tục.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="mailto:contact@manganovavn.com"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2 md:mb-3 text-sm md:text-base">Tìm hiểu</h3>
          <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
            <li>
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                Giới thiệu
              </Link>
            </li>
            <li>
              <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                Câu hỏi thường gặp
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                Liên hệ
              </Link>
            </li>
            <li>
              <Link to="/donate" className="text-muted-foreground hover:text-primary transition-colors">
                Ủng hộ
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium mb-2 md:mb-3 text-sm md:text-base">Điều khoản</h3>
          <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
            <li>
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                Điều khoản sử dụng
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Chính sách bảo mật
              </Link>
            </li>
            <li>
              <Link to="/dmca" className="text-muted-foreground hover:text-primary transition-colors">
                DMCA
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium mb-2 md:mb-3 text-sm md:text-base">Danh mục</h3>
          <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
            <li>
              <Link to="/explore" className="text-muted-foreground hover:text-primary transition-colors">
                Tất cả truyện
              </Link>
            </li>
            <li>
              <Link to="/popular" className="text-muted-foreground hover:text-primary transition-colors">
                Phổ biến nhất
              </Link>
            </li>
            <li>
              <Link to="/latest" className="text-muted-foreground hover:text-primary transition-colors">
                Mới cập nhật
              </Link>
            </li>
            <li>
              <Link to="/completed" className="text-muted-foreground hover:text-primary transition-colors">
                Đã hoàn thành
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto mt-6 md:mt-8 pt-6 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-0">
            &copy; {currentYear} MangaNovaVN. Tất cả các quyền được bảo lưu.
          </div>
          <div className="flex items-center text-xs md:text-sm text-muted-foreground">
            <span>Làm với</span>
            <Heart className="h-3.5 w-3.5 md:h-4 md:w-4 mx-1 text-red-500" />
            <span>tại Việt Nam</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
