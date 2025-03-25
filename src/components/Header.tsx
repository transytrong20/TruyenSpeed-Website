"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getUser, logout } from "@/lib/auth";
import { User } from "@/types/auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    setUser(getUser());
    const updateUser = () => setUser(getUser());
    window.addEventListener("auth-change", updateUser);
    return () => {
      window.removeEventListener("auth-change", updateUser);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setIsOpen(false);
    router.refresh();
  };

  if (!mounted) return null;

  const navItems = [
    { href: "/", label: "Trang chủ" },
    { href: "/manga", label: "Danh sách truyện" },
    { href: "/genres", label: "Thể loại" },
    { href: "/history", label: "Lịch sử đọc" },
  ];

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader className="border-b pb-4">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block py-2 hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                {user && (
                  <>
                    <Link
                      href="/bookmarks"
                      className="block py-2 hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      Tủ truyện
                    </Link>
                    <Link
                      href="/profile"
                      className="block py-2 hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      Trang cá nhân
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full mt-2"
                      onClick={handleLogout}
                    >
                      Đăng xuất
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/" className="text-xl font-bold mx-4">
            MangaReader
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-4 flex-1 ml-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            title={
              theme === "dark"
                ? "Chuyển sang chế độ sáng"
                : "Chuyển sang chế độ tối"
            }
          >
            {theme === "dark" ? (
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem]" />
            )}
          </Button>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link href="/bookmarks" className="hover:text-primary">
                  Tủ truyện
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 hover:opacity-80"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {user?.username ? user.username[0].toUpperCase() : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span>{user?.username}</span>
                </Link>
                <Button variant="outline" onClick={handleLogout}>
                  Đăng xuất
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Đăng nhập</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Đăng ký</Link>
                </Button>
              </>
            )}
          </div>

          <div className="md:hidden">
            {user ? (
              <Link href="/profile" className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {user?.username ? user.username[0].toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
              </Link>
            ) : (
              <Button size="sm" asChild>
                <Link href="/login">Đăng nhập</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
