"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import * as THREE from "three";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MangaPageTurner3DProps {
  pages: string[];
  onPrevPage?: () => void;
  onNextPage?: () => void;
  mangaTitle: string;
  chapterNumber: string;
}

export function MangaPageTurner3D({
  pages,
  onPrevPage,
  onNextPage,
  mangaTitle,
  chapterNumber,
}: MangaPageTurner3DProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Effects for page turning
  const goToNextPage = useCallback(() => {
    if (isFlipping) return;

    if (currentPage < pages.length - 1) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage((prev) => prev + 1);
        setIsFlipping(false);
      }, 500);
    } else if (onNextPage) {
      onNextPage();
    }
  }, [currentPage, isFlipping, onNextPage, pages.length]);

  const goToPrevPage = useCallback(() => {
    if (isFlipping) return;

    if (currentPage > 0) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage((prev) => prev - 1);
        setIsFlipping(false);
      }, 500);
    } else if (onPrevPage) {
      onPrevPage();
    }
  }, [currentPage, isFlipping, onPrevPage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        goToNextPage();
      } else if (e.key === "ArrowLeft") {
        goToPrevPage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [goToNextPage, goToPrevPage]);

  // Particle effect behind the manga pages
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const particleContainer = document.createElement("div");
    particleContainer.className = "absolute inset-0 -z-10";
    container.appendChild(particleContainer);

    // Setup three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    particleContainer.appendChild(renderer.domElement);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;

    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    // Create random positions for particles
    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;

      // Colors - lighter in dark mode, darker in light mode
      const color = isDark ? 0.5 : 0.2;
      colors[i3] = Math.random() * color;
      colors[i3 + 1] = Math.random() * color;
      colors[i3 + 2] = Math.random() * color;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 3,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    camera.position.z = 10;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      particles.rotation.x += 0.0003;
      particles.rotation.y += 0.0005;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      particleContainer.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleResize);
    };
  }, [isDark]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex flex-col items-center justify-center relative"
    >
      {/* Navigation controls */}
      <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-20">
        <div className="text-sm font-medium">
          {mangaTitle} - Chương {chapterNumber} - Trang {currentPage + 1}/
          {pages.length}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={goToPrevPage}>
            <ChevronLeft className="mr-1 h-4 w-4" /> Trước
          </Button>
          <Button variant="outline" size="sm" onClick={goToNextPage}>
            Sau <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Manga page with flip effect */}
      <div
        className="max-w-4xl w-full h-auto flex items-center justify-center py-16"
        onClick={goToNextPage}
      >
        <div
          className={`perspective-[2000px] w-full h-auto cursor-pointer ${
            isFlipping ? "pointer-events-none" : ""
          }`}
        >
          <div
            className={`relative w-full h-auto preserve-3d transition-transform duration-500 ${
              isFlipping ? "rotate-y-90" : ""
            }`}
          >
            {/* Current page */}
            <div className="w-full h-auto backface-hidden bg-card shadow-lg">
              <Image
                src={pages[currentPage]}
                alt={`${mangaTitle} - Trang ${currentPage + 1}`}
                width={800}
                height={1200}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile navigation controls (bottom) */}
      <div className="absolute bottom-2 left-2 right-2 flex justify-between z-20 md:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-card/80 backdrop-blur"
          onClick={goToPrevPage}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-card/80 backdrop-blur"
          onClick={goToNextPage}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <style jsx global>{`
        .perspective-[2000px] {
          perspective: 2000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-90 {
          transform: rotateY(90deg);
        }
      `}</style>
    </div>
  );
}
