"use client";

import Link from "next/link";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { MobileMenu } from "./MobileMenu";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex items-center gap-4 md:hidden px-4 h-16 border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <MobileMenu />
        <div className="flex-1 flex justify-center">
          <Link href="/" className="text-xl font-bold">MangaReader</Link>
        </div>
      </div>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
