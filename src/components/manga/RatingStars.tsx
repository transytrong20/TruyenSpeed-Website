"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  initialRating?: number;
  totalStars?: number;
  onRate?: (rating: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
} as const;

export function RatingStars({
  initialRating = 0,
  totalStars = 5,
  onRate,
  readonly = false,
  size = "md",
}: RatingStarsProps) {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (selectedRating: number) => {
    if (readonly) return;
    setRating(selectedRating);
    onRate?.(selectedRating);
  };

  const handleMouseEnter = (hoveredRating: number) => {
    if (readonly) return;
    setHoverRating(hoveredRating);
  };

  const handleMouseLeave = () => {
    if (readonly) return;
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
              readonly && "cursor-default"
            )}
            disabled={readonly}
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
