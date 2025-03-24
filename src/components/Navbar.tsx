import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, BookMarked, Home, Book, Menu, LogIn, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle/theme-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Search3D } from "@/components/ui/search-3d";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface NavbarProps {
  title?: string;
}

export function Navbar({ title = "MangaNovaVN" }: NavbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; avatar?: string } | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Kiểm tra xem người dùng đã đăng nhập chưa
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      setIsSearchOpen(false);
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const navItems = [
    { path: "/", label: "Trang chủ", icon: Home },
    { path: "/explore", label: "Khám phá", icon: Book },
    { path: "/bookmarks", label: "Yêu thích", icon: BookMarked },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="mt-8 flex flex-col items-start gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="flex items-center gap-2 text-lg font-semibold"
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  ))}
                  {user && (
                    <Link to="/profile" className="flex items-center gap-2 text-lg font-semibold">
                      <User className="h-5 w-5" />
                      Hồ sơ
                    </Link>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
            <Link to="/" className="flex items-center gap-2">
              <span className="inline-block text-xl font-bold md:text-2xl">{title}</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "group relative rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  isActive(item.path)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                <div className="flex items-center gap-2">
                  <item.icon
                    className={cn(
                      "h-4 w-4 transition-transform",
                      isActive(item.path)
                        ? "text-primary"
                        : "text-muted-foreground group-hover:text-foreground",
                    )}
                  />
                  {item.label}
                </div>
                {isActive(item.path) && (
                  <span className="absolute -bottom-[1px] left-0 right-0 mx-2 h-[2px] bg-primary" />
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* Search, User Avatar and Theme Toggle */}
        <div className="flex items-center space-x-4">
          <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" className="group relative h-9 w-9 rounded-full">
                <Search className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                <span className="sr-only">Tìm kiếm</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-hidden p-4 sm:max-w-xl md:max-w-3xl lg:max-w-4xl">
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

          <ThemeToggle />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative rounded-full">
                  <Avatar className="h-8 w-8 transition-transform hover:scale-105">
                    <AvatarImage src={user.avatar || ""} alt={user.name} />
                    <AvatarFallback className="bg-primary text-sm text-primary-foreground">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="absolute -bottom-1 -right-1 h-2.5 w-2.5 rounded-full border-2 border-background bg-green-500"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex cursor-pointer items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Hồ sơ</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/bookmarks" className="flex cursor-pointer items-center">
                    <BookMarked className="mr-2 h-4 w-4" />
                    <span>Truyện yêu thích</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  <span>Đăng xuất</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button size="sm" className="rounded-full" asChild>
              <Link to="/login" className="flex items-center gap-1">
                <LogIn className="mr-1 h-4 w-4" />
                <span>Đăng nhập</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
