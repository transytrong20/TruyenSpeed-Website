"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
      setOpen(false);
    }
  };

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="h-9 w-9">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Mở menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[80%] sm:w-[350px]">
          <SheetHeader className="mb-4">
            <SheetTitle className="text-left">MangaReader</SheetTitle>
          </SheetHeader>
          <form onSubmit={handleSearch} className="relative mb-6">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm truyện..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <nav className="flex flex-col space-y-1">
            <Link
              href="/"
              className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
              onClick={() => setOpen(false)}
            >
              Trang chủ
            </Link>
            <Link
              href="/latest"
              className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
              onClick={() => setOpen(false)}
            >
              Mới cập nhật
            </Link>
            <Link
              href="/popular"
              className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
              onClick={() => setOpen(false)}
            >
              Phổ biến
            </Link>
            <Link
              href="/completed"
              className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
              onClick={() => setOpen(false)}
            >
              Hoàn thành
            </Link>
            <Accordion type="single" collapsible className="w-full border-none">
              <AccordionItem value="genres" className="border-none">
                <AccordionTrigger className="rounded-md px-2 py-2 text-sm font-medium hover:bg-accent">
                  Thể loại
                </AccordionTrigger>
                <AccordionContent className="pb-0">
                  <div className="flex flex-col pl-4">
                    <Link
                      href="/genres/action"
                      className="rounded-md px-3 py-2 text-sm hover:bg-accent"
                      onClick={() => setOpen(false)}
                    >
                      Hành động
                    </Link>
                    <Link
                      href="/genres/comedy"
                      className="rounded-md px-3 py-2 text-sm hover:bg-accent"
                      onClick={() => setOpen(false)}
                    >
                      Hài hước
                    </Link>
                    <Link
                      href="/genres/romance"
                      className="rounded-md px-3 py-2 text-sm hover:bg-accent"
                      onClick={() => setOpen(false)}
                    >
                      Tình cảm
                    </Link>
                    <Link
                      href="/genres/fantasy"
                      className="rounded-md px-3 py-2 text-sm hover:bg-accent"
                      onClick={() => setOpen(false)}
                    >
                      Giả tưởng
                    </Link>
                    <Link
                      href="/genres/horror"
                      className="rounded-md px-3 py-2 text-sm hover:bg-accent"
                      onClick={() => setOpen(false)}
                    >
                      Kinh dị
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="border-t my-4"></div>
            <Link
              href="/bookmark"
              className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
              onClick={() => setOpen(false)}
            >
              Đánh dấu
            </Link>
            <Link
              href="/history"
              className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
              onClick={() => setOpen(false)}
            >
              Lịch sử đọc
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
