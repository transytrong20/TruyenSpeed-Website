"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface PaperMesh extends THREE.Mesh {
  speed: number;
  rotationSpeed: {
    x: number;
    y: number;
    z: number;
  };
}

export function HeroBackground3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Thiết lập scene, camera và renderer
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

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Tạo hiệu ứng các trang giấy bay
    const papers: PaperMesh[] = [];
    const paperGeometry = new THREE.PlaneGeometry(1, 1.5);
    const paperMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7,
    });

    // Tạo nhiều trang giấy và đặt ở các vị trí ngẫu nhiên
    for (let i = 0; i < 30; i++) {
      const paper = new THREE.Mesh(paperGeometry, paperMaterial);
      const paperMesh = Object.assign(paper, {
        speed: Math.random() * 0.02 + 0.01,
        rotationSpeed: {
          x: Math.random() * 0.01 - 0.005,
          y: Math.random() * 0.01 - 0.005,
          z: Math.random() * 0.01 - 0.005,
        },
      }) as PaperMesh;

      paperMesh.position.set(
        Math.random() * 20 - 10,
        Math.random() * 20 - 10,
        Math.random() * 10 - 15
      );
      paperMesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      scene.add(paperMesh);
      papers.push(paperMesh);
    }

    // Đặt vị trí camera
    camera.position.z = 5;

    // Animation function
    const animate = () => {
      requestAnimationFrame(animate);

      // Xoay tất cả các trang giấy
      papers.forEach((paper) => {
        paper.rotation.x += paper.rotationSpeed.x;
        paper.rotation.y += paper.rotationSpeed.y;
        paper.rotation.z += paper.rotationSpeed.z;

        // Di chuyển các trang giấy lên trên và reset khi ra khỏi tầm nhìn
        paper.position.y += paper.speed;

        if (paper.position.y > 10) {
          paper.position.y = -10;
          paper.position.x = Math.random() * 20 - 10;
          paper.position.z = Math.random() * 10 - 15;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      container.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
    ></div>
  );
}
