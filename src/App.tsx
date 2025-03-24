import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

// Layout
import MainLayout from "@/layouts/MainLayout";

// Pages
const HomePage = lazy(() => import("@/pages/HomePage"));
const ExplorePage = lazy(() => import("@/pages/ExplorePage"));
const MangaDetailPage = lazy(() => import("@/pages/MangaDetailPage"));
const ReadPage = lazy(() => import("@/pages/ReadPage"));
const BookmarksPage = lazy(() => import("@/pages/BookmarksPage"));
const SearchPage = lazy(() => import("@/pages/SearchPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("@/pages/ForgotPasswordPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

function App() {
  return (
    <>
      <Suspense fallback={<div className="w-full h-screen flex items-center justify-center">Đang tải...</div>}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="explore" element={<ExplorePage />} />
            <Route path="manga/:id" element={<MangaDetailPage />} />
            <Route path="read/:id/:chapter" element={<ReadPage />} />
            <Route path="bookmarks" element={<BookmarksPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Routes>
      </Suspense>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
