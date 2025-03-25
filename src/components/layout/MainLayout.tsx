"use client";

import Link from "next/link";
import { Footer } from "./Footer";
import { MobileMenu } from "./MobileMenu";
import { Header } from "@/components/Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex items-center gap-4 md:hidden px-4 h-16 border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <MobileMenu />
        <div className="flex-1 flex justify-center">
          <Link href="/" className="text-xl font-bold">
            MangaReader
          </Link>
        </div>
      </div>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
