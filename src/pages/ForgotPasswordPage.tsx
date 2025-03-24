import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!email) {
      setError("Vui lòng nhập địa chỉ email");
      return;
    }

    setError("");
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-[80vh] py-10 px-4">
      <div className="w-full max-w-md">
        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Quên mật khẩu</CardTitle>
            <CardDescription>
              Nhập email đã đăng ký để nhận liên kết đặt lại mật khẩu
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 rounded-md bg-destructive/15 text-destructive text-sm mb-4">
                {error}
              </div>
            )}

            {success ? (
              <div className="p-4 rounded-md bg-green-100 text-green-800 text-sm mb-4">
                <h3 className="font-medium text-base mb-1">Yêu cầu đã được gửi!</h3>
                <p>
                  Chúng tôi đã gửi email hướng dẫn đặt lại mật khẩu đến <strong>{email}</strong>.
                  Vui lòng kiểm tra hộp thư của bạn và làm theo hướng dẫn.
                </p>
              </div>
            ) : (
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
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-1">
                      <span className="h-4 w-4 rounded-full border-2 border-current border-r-transparent animate-spin" />
                      Đang gửi...
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Send className="h-4 w-4" />
                      Gửi liên kết đặt lại
                    </span>
                  )}
                </Button>
              </form>
            )}
          </CardContent>

          <CardFooter className="flex justify-center">
            <div className="flex flex-col items-center gap-2">
              <Link
                to="/login"
                className="flex items-center gap-1 text-primary font-medium hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                Quay lại đăng nhập
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
