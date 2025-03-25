"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getUser, logout } from "@/lib/auth";
import { User } from "@/types/auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function Header() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // Khởi tạo user state
    setUser(getUser());

    // Tạo một custom event để cập nhật user state
    const updateUser = () => setUser(getUser());
    window.addEventListener("auth-change", updateUser);

    return () => {
      window.removeEventListener("auth-change", updateUser);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    router.refresh();
  };

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center">
        <Link href="/" className="text-xl font-bold mr-8">
          MangaReader
        </Link>

        <nav className="flex items-center gap-4 flex-1">
          <Link href="/" className="hover:text-primary">
            Trang chủ
          </Link>
          <Link href="/manga" className="hover:text-primary">
            Danh sách truyện
          </Link>
          <Link href="/genres" className="hover:text-primary">
            Thể loại
          </Link>
          <Link href="/history" className="hover:text-primary">
            Lịch sử đọc
          </Link>
        </nav>

        <div className="flex items-center gap-4">
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
      </div>
    </header>
  );
}
