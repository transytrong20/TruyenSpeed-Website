"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  initialRating?: number;
  totalStars?: number;
  onRate?: (rating: number) => Promise<void>; // Hàm async để gửi vote
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
  comicSlug?: string; // Slug của truyện
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
} as const;

export function RatingStars({
  initialRating = 5, // Mặc định 5 nếu không có vote
  totalStars = 5,
  onRate,
  readonly = false,
  size = "md",
  comicSlug,
}: RatingStarsProps) {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClick = async (selectedRating: number) => {
    if (readonly || isSubmitting) return;

    setIsSubmitting(true);
    setRating(selectedRating); // Cập nhật giao diện ngay lập tức

    try {
      if (onRate) {
        await onRate(selectedRating); // Gửi vote lên API
      }
    } catch (error) {
      console.error("Error submitting vote:", error);
      setRating(initialRating); // Rollback nếu lỗi
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMouseEnter = (hoveredRating: number) => {
    if (readonly || isSubmitting) return;
    setHoverRating(hoveredRating);
  };

  const handleMouseLeave = () => {
    if (readonly || isSubmitting) return;
    setHoverRating(0);
  };

  return (
    <div className="flex items-center gap-1" onMouseLeave={handleMouseLeave}>
      {Array.from({ length: totalStars }).map((_, index) => {
        const starRating = index + 1;
        const isActive = starRating <= (hoverRating || rating);

        return (
          <button
            key={index}
            type="button"
            onClick={() => handleClick(starRating)}
            onMouseEnter={() => handleMouseEnter(starRating)}
            className={cn(
              "transition-all duration-100",
              !readonly && "hover:scale-110 active:scale-95",
              readonly && "cursor-default",
              isSubmitting && "opacity-50 cursor-not-allowed"
            )}
            disabled={readonly || isSubmitting}
          >
            <Star
              className={cn(
                sizeClasses[size],
                "transition-colors",
                isActive
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-none text-muted-foreground"
              )}
              strokeWidth={2}
            />
          </button>
        );
      })}
      <span className="ml-2 text-sm text-muted-foreground">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}
