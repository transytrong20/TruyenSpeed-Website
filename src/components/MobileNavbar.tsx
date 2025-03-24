import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, BookOpen, Search, BookMarked } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Search3D } from "@/components/ui/search-3d";

export function MobileNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      setIsSearchOpen(false);
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const navItems = [
    { icon: Home, label: "Trang chủ", path: "/" },
    { icon: BookOpen, label: "Khám phá", path: "/explore" },
    { icon: BookMarked, label: "Yêu thích", path: "/bookmarks" },
  ];

  return (
    <div className="fixed bottom-0 z-50 w-full border-t bg-background lg:hidden">
      <nav className="flex h-16">
        {navItems.map((item) => {
          const isActive =
            item.path === "/" ? location.pathname === "/" : location.pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-1 flex-col items-center justify-center"
            >
              <div
                className={cn(
                  "relative flex flex-col items-center justify-center space-y-1",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-primary",
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5 transition-transform duration-300",
                    isActive ? "scale-110" : "",
                  )}
                />
                <span className="text-xs">{item.label}</span>
                {isActive && (
                  <span className="absolute -bottom-4 h-1 w-8 rounded-full bg-primary" />
                )}
              </div>
            </Link>
          );
        })}

        {/* Search Button with Dialog */}
        <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
          <DialogTrigger asChild>
            <button className="flex flex-1 flex-col items-center justify-center">
              <div
                className={cn(
                  "relative flex flex-col items-center justify-center space-y-1",
                  location.pathname === "/search"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary",
                )}
              >
                <Search
                  className={cn(
                    "h-5 w-5 transition-transform duration-300",
                    location.pathname === "/search" ? "scale-110" : "",
                  )}
                />
                <span className="text-xs">Tìm kiếm</span>
                {location.pathname === "/search" && (
                  <span className="absolute -bottom-4 h-1 w-8 rounded-full bg-primary" />
                )}
              </div>
            </button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] max-w-xl overflow-hidden p-4">
            <DialogTitle className="sr-only">Tìm kiếm</DialogTitle>
            <Search3D
              autoFocus
              onSearch={handleSearch}
              placeholder="Tìm kiếm truyện của bạn..."
              showOnMobile={true}
              maxResults={4}
            />
          </DialogContent>
        </Dialog>
      </nav>
    </div>
  );
}
