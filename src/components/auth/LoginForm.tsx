"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2, User2, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login, setToken, setUser } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [touched, setTouched] = useState({
    username: false,
    password: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const getFieldError = (field: "username" | "password") => {
    if (!touched[field]) return "";
    if (!formData[field]) {
      return field === "username"
        ? "Vui lòng nhập tên đăng nhập"
        : "Vui lòng nhập mật khẩu";
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Kiểm tra validation trước khi submit
    if (!formData.username || !formData.password) {
      setTouched({ username: true, password: true });
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await login(formData);
      if (response.success) {
        setToken(response.data.token);
        setUser({
          username: response.data.username,
          email: "",
          phoneNumber: "",
          firstName: "",
          lastName: "",
        });

        // Kích hoạt event auth-change
        window.dispatchEvent(new Event("auth-change"));

        // Lấy URL redirect từ query params
        const redirectUrl = searchParams.get("redirect");
        if (redirectUrl) {
          router.push(decodeURIComponent(redirectUrl));
        } else {
          router.push("/");
        }
        router.refresh();
      } else {
        setError(response.message || "Đăng nhập thất bại");
      }
    } catch (err) {
      setError("Tên đăng nhập hoặc mật khẩu không đúng");
    } finally {
      setIsLoading(false);
    }
  };

  const usernameError = getFieldError("username");
  const passwordError = getFieldError("password");

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Đăng nhập
          </CardTitle>
          <CardDescription>
            Đăng nhập để truy cập tài khoản của bạn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type="text"
                  name="username"
                  placeholder="Tên đăng nhập"
                  value={formData.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`pl-10 ${
                    usernameError ? "border-destructive" : ""
                  }`}
                />
                <User2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              {usernameError && (
                <p className="text-sm text-destructive">{usernameError}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Mật khẩu"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`pl-10 ${
                    passwordError ? "border-destructive" : ""
                  }`}
                />
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              {passwordError && (
                <p className="text-sm text-destructive">{passwordError}</p>
              )}
            </div>

            {error && (
              <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang đăng nhập...
                </>
              ) : (
                "Đăng nhập"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 border-t pt-6">
          <div className="text-sm text-muted-foreground text-center">
            Chưa có tài khoản?{" "}
            <Link
              href="/register"
              className="text-primary hover:underline font-medium"
            >
              Đăng ký ngay
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
