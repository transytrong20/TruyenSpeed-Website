"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface GenreCardProps {
  icon: string;
  name: string;
  onHover?: (isHovered: boolean) => void;
}

export function GenreCard3D({ icon, name, onHover }: GenreCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    let bounds: DOMRect;
    let rotateXTo = 0;
    let rotateYTo = 0;
    let currentRotateX = 0;
    let currentRotateY = 0;

    const lerp = (start: number, end: number, t: number) => {
      return start * (1 - t) + end * t;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!bounds) bounds = card.getBoundingClientRect();

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;

      // Tính toán góc xoay dựa trên vị trí chuột tương đối với thẻ
      const percentX = (mouseX - centerX) / (bounds.width / 2);
      const percentY = (mouseY - centerY) / (bounds.height / 2);

      // Giới hạn góc xoay trong khoảng -15 đến 15 độ
      rotateXTo = -percentY * 10;
      rotateYTo = percentX * 10;

      // Đảm bảo animation đang chạy
      if (!animationRef.current) {
        animateCard();
      }
    };

    const resetCard = () => {
      rotateXTo = 0;
      rotateYTo = 0;

      if (!animationRef.current) {
        animateCard();
      }
    };

    const animateCard = () => {
      // Áp dụng hiệu ứng mượt mà khi di chuyển chuột
      currentRotateX = lerp(currentRotateX, rotateXTo, 0.1);
      currentRotateY = lerp(currentRotateY, rotateYTo, 0.1);

      card.style.transform = `perspective(1000px) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg)`;

      // Dừng animation khi đạt đến giá trị đích
      const isFinished =
        Math.abs(currentRotateX - rotateXTo) < 0.1 &&
        Math.abs(currentRotateY - rotateYTo) < 0.1;

      if (isFinished) {
        card.style.transform = `perspective(1000px) rotateX(${rotateXTo}deg) rotateY(${rotateYTo}deg)`;
        animationRef.current = null;
        return;
      }

      animationRef.current = requestAnimationFrame(animateCard);
    };

    const handleMouseEnter = () => {
      if (onHover) onHover(true);
      // Cập nhật bounds khi chuột vào thẻ
      bounds = card.getBoundingClientRect();
    };

    const handleMouseLeave = () => {
      if (onHover) onHover(false);
      resetCard();
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);
    card.addEventListener("mousemove", handleMouseMove);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
      card.removeEventListener("mousemove", handleMouseMove);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [onHover]);

  return (
    <div
      ref={cardRef}
      className="h-full hover:shadow-md transition-shadow cursor-pointer hover:bg-accent rounded-lg border overflow-hidden bg-card transition-transform duration-200"
      style={{
        transformStyle: "preserve-3d",
        transform: "perspective(1000px)",
        willChange: "transform"
      }}
    >
      <div className="flex items-center justify-center p-4 h-full">
        <div className="text-center">
          <span className="text-3xl mb-2 block">{icon}</span>
          <span className="text-sm font-medium">{name}</span>
        </div>
      </div>
    </div>
  );
}
