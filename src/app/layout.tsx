import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SiteLayout } from "@/components/layout/site-layout";
import { Toaster } from "sonner";

const fontSans = FontSans({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "MangaVerse - Đọc truyện tranh online",
  description: "MangaVerse là trang web đọc truyện tranh online với đa dạng thể loại, cập nhật nhanh chóng và giao diện thân thiện.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}>
        <SiteLayout>
          {children}
        </SiteLayout>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
