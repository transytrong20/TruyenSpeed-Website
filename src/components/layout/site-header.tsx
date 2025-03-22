"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Search, Menu, X, BookOpen, History, Heart, Clock, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  href: string;
  icon?: React.ReactNode;
}

const mainNavItems: NavItem[] = [
  {
    title: "Trang chủ",
    href: "/",
    icon: <BookOpen className="mr-2 h-4 w-4" />,
  },
  {
    title: "Mới cập nhật",
    href: "/latest",
    icon: <Clock className="mr-2 h-4 w-4" />,
  },
  {
    title: "Thể loại",
    href: "/genres",
    icon: <BookOpen className="mr-2 h-4 w-4" />,
  },
  {
    title: "Xếp hạng",
    href: "/ranking",
    icon: <Heart className="mr-2 h-4 w-4" />,
  },
  {
    title: "Lịch sử",
    href: "/history",
    icon: <History className="mr-2 h-4 w-4" />,
  },
];

export function SiteHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">MangaVerse</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden gap-6 md:flex">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {isSearchOpen ? (
            <div className="flex items-center border rounded-md overflow-hidden">
              <Input
                type="search"
                placeholder="Tìm truyện..."
                className="border-0 focus-visible:ring-0 h-9"
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Tìm kiếm</span>
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Chuyển theme</span>
          </Button>

          {/* Mobile nav */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Mở menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="flex items-center space-x-2">
                    <BookOpen className="h-6 w-6" />
                    <span className="font-bold">MangaVerse</span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                {mainNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center py-2 text-sm font-medium transition-colors hover:text-primary",
                      pathname === item.href ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
