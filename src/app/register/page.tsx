import { Metadata } from "next";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Đăng ký - MangaReader",
  description: "Đăng ký tài khoản MangaReader mới",
};

export default function RegisterPage() {
  return (
    <div className="container py-10">
      <RegisterForm />
    </div>
  );
}
