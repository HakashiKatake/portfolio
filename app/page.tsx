"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "pixel-retroui";

export default function LandingPage() {
  const [stars, setStars] = useState<{ x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 60 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 3,
    }));
    setStars(generated);
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0a1a]">
      {/* Pixel star background */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              opacity: 0.6,
            }}
          />
        ))}
      </div>

      {/* Purple gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-purple-900/30 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-4 text-center">
        {/* Pixel art title */}
        <div className="animate-float">
          <h1 className="text-5xl md:text-7xl font-bold neon-glow text-purple-300 tracking-wider">
            SAURABH
          </h1>
          <p className="text-lg md:text-xl text-purple-400 mt-2 tracking-widest">
            GAME DEVELOPER
          </p>
        </div>

        {/* Subtitle */}
        <p className="text-sm md:text-base text-gray-400 max-w-md">
          Choose your experience — explore an interactive 3D world or view a classic portfolio.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link href="/cool">
            <Button
              bg="#7c3aed"
              textColor="#ffffff"
              shadow="#4c1d95"
              borderColor="#a855f7"
              className="text-lg px-8 py-3 cursor-pointer hover:scale-105 transition-transform"
            >
              🎮 Enter Interactive Portfolio
            </Button>
          </Link>
          <Link href="/simple">
            <Button
              bg="#1e1b4b"
              textColor="#c4b5fd"
              shadow="#0f0a2e"
              borderColor="#6d28d9"
              className="text-lg px-8 py-3 cursor-pointer hover:scale-105 transition-transform"
            >
              📄 View Simple Portfolio
            </Button>
          </Link>
        </div>

        {/* Hint text */}
        <p className="text-xs text-gray-600 mt-8 animate-pulse">
          Press any button to begin...
        </p>
      </div>

      {/* Bottom decorative bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
    </main>
  );
}
