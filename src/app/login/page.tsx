import { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Đăng nhập - MangaReader",
  description: "Đăng nhập vào tài khoản MangaReader của bạn",
};

export default function LoginPage() {
  return (
    <div className="container py-10">
      <LoginForm />
    </div>
  );
}
