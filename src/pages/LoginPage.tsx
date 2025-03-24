import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn, Mail, Lock, Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ thông tin đăng nhập");
      return;
    }

    setError("");
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);

      // Mock authentication for demo
      if (email === "user@example.com" && password === "password") {
        // Successful login
        localStorage.setItem("user", JSON.stringify({ name: "Người dùng", email }));
        navigate("/");
      } else {
        // Failed login
        setError("Email hoặc mật khẩu không chính xác");
      }
    }, 1500);
  };

  return (
    <div className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Đăng nhập</CardTitle>
            <CardDescription>Đăng nhập để truy cập vào tài khoản của bạn</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {error && (
              <div className="mb-4 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Mật khẩu</Label>
                  <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                    Quên mật khẩu?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Ghi nhớ đăng nhập
                </label>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center gap-1">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
                    Đang đăng nhập...
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <LogIn className="h-4 w-4" />
                    Đăng nhập
                  </span>
                )}
              </Button>
            </form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Hoặc đăng nhập với</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Facebook className="h-4 w-4 text-blue-600" />
                <span>Facebook</span>
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Twitter className="h-4 w-4 text-sky-500" />
                <span>Google</span>
              </Button>
            </div>
          </CardContent>

          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Chưa có tài khoản?{" "}
              <Link to="/register" className="font-medium text-primary hover:underline">
                Đăng ký ngay
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
