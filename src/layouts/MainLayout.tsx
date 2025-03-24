import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { MobileNavbar } from "@/components/MobileNavbar";
import { Footer } from "@/components/Footer";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="container mx-auto flex-1 px-4 py-6">
        <Outlet />
      </main>
      <Footer />
      <MobileNavbar />
    </div>
  );
}
