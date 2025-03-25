"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUser, logout } from "@/lib/auth";
import { User } from "@/types/auth";
import { LogOut, Settings, User as UserIcon } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = getUser();
    if (!userData) {
      router.push("/login");
      return;
    }
    setUser(userData);
  }, [router]);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
    router.refresh();
  };

  if (!user) return null;

  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>
                <UserIcon className="h-10 w-10" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-2xl">{user.username}</CardTitle>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Thông tin tài khoản
              </h3>
              <div className="grid gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Ngày tham gia</p>
                  <p>
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("vi-VN")
                      : "Không có thông tin"}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Hoạt động gần đây</h3>
              <div className="text-muted-foreground">
                Chưa có hoạt động nào gần đây
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
