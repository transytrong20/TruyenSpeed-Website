"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

interface BookPageEffectProps {
  coverImages: string[]; // Đổi từ coverImage thành coverImages (mảng 3 ảnh)
  title: string;
}

export function BookPageEffect({ coverImages, title }: BookPageEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isPageTurning, setIsPageTurning] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDarkTheme = resolvedTheme === "dark";

  // Kiểm tra nếu coverImages không phải mảng 3 phần tử thì trả về thông báo lỗi
  if (!Array.isArray(coverImages) || coverImages.length !== 3) {
    return <div>Error: Please provide exactly 3 cover images</div>;
  }

  // Dữ liệu pages chỉ chứa các ảnh bìa
  const pages = [
    { type: "cover", content: coverImages[0] },
    { type: "cover", content: coverImages[1] },
    { type: "cover", content: coverImages[2] },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    // Hiển thị component sau khi load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    // Tự động lật trang
    const pageInterval = setInterval(() => {
      turnPage();
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(pageInterval);
    };
  }, []);

  const turnPage = () => {
    if (isPageTurning) return;

    setIsPageTurning(true);

    setTimeout(() => {
      setCurrentPage((prev) => (prev + 1) % pages.length);

      setTimeout(() => {
        setIsPageTurning(false);
      }, 500);
    }, 500);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={turnPage}
    >
      <div className="relative w-full h-full perspective-[1000px] book cursor-pointer">
        <div
          className={`relative w-full h-full preserve-3d transition-transform duration-1000 ${
            isPageTurning ? "rotate-y-180" : ""
          }`}
        >
          {/* Front page */}
          <div
            className={`absolute inset-0 w-full h-full backface-hidden border ${
              isDarkTheme ? "border-gray-700" : "border-gray-200"
            } rounded-lg shadow-lg overflow-hidden`}
          >
            <div className="relative w-full h-full">
              <Image
                src={pages[currentPage].content}
                alt={title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <h2 className="text-2xl font-bold text-white text-center px-4">
                  {title}
                </h2>
              </div>
            </div>
          </div>

          {/* Back page (next page) */}
          <div
            className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 border ${
              isDarkTheme ? "border-gray-700" : "border-gray-200"
            } rounded-lg shadow-lg overflow-hidden`}
          >
            <div className="relative w-full h-full">
              <Image
                src={pages[(currentPage + 1) % pages.length].content}
                alt={title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <h2 className="text-2xl font-bold text-white text-center px-4">
                  {title}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .perspective-[1000px] {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
