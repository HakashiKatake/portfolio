"use client";

import { ReactNode } from "react";
import { Card } from "pixel-retroui";

interface RetroLayoutProps {
  children: ReactNode;
}

export function RetroLayout({ children }: RetroLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0a0a1a] text-purple-100">
      {/* Window chrome bar */}
      <div className="sticky top-0 z-50 bg-[#1a1a2e] border-b-4 border-purple-800">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center gap-3">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 text-center">
            <Card
              bg="#0f0a2e"
              borderColor="#4c1d95"
              shadowColor="transparent"
              className="inline-block px-6 py-0.5"
            >
              <span className="text-xs text-purple-400">SaurabhOS v1.0 — Portfolio.exe</span>
            </Card>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {children}
      </main>

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a2e] border-t-4 border-purple-800 py-2 px-4 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Card
            bg="#2d1b69"
            borderColor="#6d28d9"
            shadowColor="transparent"
            className="px-3 py-0.5"
          >
            <span className="text-xs text-purple-300">🎮 START</span>
          </Card>
          <span className="text-xs text-purple-600">
            {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      </div>
    </div>
  );
}
