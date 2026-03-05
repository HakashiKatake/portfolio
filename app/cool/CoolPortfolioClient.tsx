"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { PortfolioData } from "@/components/types";

/* ---------- dynamic imports (no SSR) ---------- */
const RoomScene = dynamic(() => import("@/three/RoomScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <p className="text-purple-400 animate-pulse">Loading 3D Room...</p>
    </div>
  ),
});

const GameCanvas = dynamic(
  () =>
    import("@/components/GameCanvas").then((mod) => ({
      default: mod.GameCanvas,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-black flex items-center justify-center">
        <p className="text-green-400 crt-effect animate-pulse">Booting game…</p>
      </div>
    ),
  }
);

interface Props {
  data: PortfolioData;
}

export function CoolPortfolioClient({ data }: Props) {
  const router = useRouter();

  /* isBooted = PC has been booted (SPACE/E pressed) */
  const [isBooted, setIsBooted] = useState(false);
  /* showGame = Phaser canvas is rendered on the "screen" */
  const [showGame, setShowGame] = useState(false);
  /* boot sequence text */
  const [bootText, setBootText] = useState("");
  const [booting, setBooting] = useState(false);

  const handleOpenSimple = useCallback(() => {
    router.push("/simple");
  }, [router]);

  /* --- SPACE/E pressed: boot the PC --- */
  const handleBootPC = useCallback(() => {
    if (isBooted) return;
    setIsBooted(true);
    setBooting(true);
    setBootText("");

    const lines = [
      "> Booting SaurabhOS...",
      "> Loading modules...",
      "> Initializing portfolio engine...",
      "> Compiling assets...",
      "> Ready. Enjoy!",
    ];
    let i = 0;
    const iv = setInterval(() => {
      if (i < lines.length) {
        setBootText((prev) => prev + lines[i] + "\n");
        i++;
      } else {
        clearInterval(iv);
        setTimeout(() => {
          setBooting(false);
          setShowGame(true);
          // Release pointer lock so Phaser receives keyboard input
          if (document.pointerLockElement) {
            document.exitPointerLock();
          }
        }, 400);
      }
    }, 350);
  }, [isBooted]);

  /* --- ESC: turn off PC --- */
  const handleExitPC = useCallback(() => {
    setShowGame(false);
    setBooting(false);
    setBootText("");
    setIsBooted(false);
  }, []);

  /* Preload game sprites while in room */
  useEffect(() => {
    const imgs = [
      "/assets/player/Player-Idle-24x24.png",
      "/assets/backgrounds/parallax-background-sky.png",
      "/assets/tiles/Tile-01.png",
    ];
    imgs.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  /* Build the content that goes on the monitor screen (boot text only) */
  const screenContent = booting ? (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
      <pre style={{ color: "#4ade80", fontSize: "10px", fontFamily: "monospace", whiteSpace: "pre-wrap", lineHeight: 1.5 }}>
        {bootText}
        <span style={{ animation: "pulse 1s infinite" }}>█</span>
      </pre>
    </div>
  ) : null;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* 3D Room is ALWAYS rendered (camera stays at seat, never unmounts) */}
      <RoomScene
        onBootPC={handleBootPC}
        onExitPC={handleExitPC}
        onOpenSimple={handleOpenSimple}
        isBooted={isBooted}
        screenContent={screenContent}
      />

      {/* ---- Fullscreen game overlay (after boot finishes) ---- */}
      {showGame && (
        <div className="absolute inset-0 z-30 flex items-center justify-center">
          <div
            className="relative w-full h-full overflow-hidden bg-black"
          >
            {/* scanline overlay */}
            <div
              className="absolute inset-0 z-10 pointer-events-none opacity-10"
              style={{
                background:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.05) 2px, rgba(0,255,0,0.05) 4px)",
              }}
            />
            {/* CRT curvature */}
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{ boxShadow: "inset 0 0 80px rgba(0,0,0,0.5)", borderRadius: "8px" }}
            />
            <div className="w-full h-full bg-black">
              <GameCanvas
                data={data}
                onExit={handleExitPC}
                onOpenSimple={handleOpenSimple}
              />
            </div>
            <div className="absolute top-2 right-3 z-20 text-purple-400 text-xs opacity-60">
              ESC to exit
            </div>
          </div>
        </div>
      )}

      {/* ESC hint when booting (before game takes over) */}
      {isBooted && !showGame && (
        <div className="absolute top-4 right-4 z-20 text-purple-400 text-xs opacity-60">
          ESC to exit PC
        </div>
      )}
    </div>
  );
}
