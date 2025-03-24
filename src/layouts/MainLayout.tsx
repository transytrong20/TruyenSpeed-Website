import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { MobileNavbar } from "@/components/MobileNavbar";
import { Footer } from "@/components/Footer";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto py-6 px-4">
        <Outlet />
      </main>
      <Footer />
      <MobileNavbar />
    </div>
  );
}
