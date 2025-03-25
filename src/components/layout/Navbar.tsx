"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2 mr-6">
            <span className="text-xl font-bold">MangaReader</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/latest"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Mới cập nhật
            </Link>
            <Link
              href="/popular"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Phổ biến
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="link"
                  className="text-sm font-medium p-0 h-auto"
                >
                  Thể loại
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-40">
                <DropdownMenuItem className="focus:bg-primary/5">
                  <Link href="/genres/action" className="w-full">
                    Hành động
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-primary/5">
                  <Link href="/genres/comedy" className="w-full">
                    Hài hước
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-primary/5">
                  <Link href="/genres/romance" className="w-full">
                    Tình cảm
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-primary/5">
                  <Link href="/genres/fantasy" className="w-full">
                    Giả tưởng
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-primary/5">
                  <Link href="/genres/horror" className="w-full">
                    Kinh dị
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="relative hidden md:flex">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm truyện..."
              className="w-64 pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <ThemeToggle />
          <Button
            variant="outline"
            size="sm"
            asChild
            className="hidden md:inline-flex"
          >
            <Link href="/bookmark">Đánh dấu</Link>
          </Button>
          <Button
            variant="default"
            size="sm"
            asChild
            className="hidden md:inline-flex"
          >
            <Link href="/history">Lịch sử đọc</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
