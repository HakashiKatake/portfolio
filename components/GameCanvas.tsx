"use client";

import { useEffect, useRef, useState } from "react";
import { PortfolioData } from "./types";

interface GameCanvasProps {
  data: PortfolioData;
  onExit?: () => void;
  onOpenSimple?: () => void;
}

export function GameCanvas({ data, onExit, onOpenSimple }: GameCanvasProps) {
  const gameRef = useRef<HTMLDivElement>(null);
  const phaserGame = useRef<Phaser.Game | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!gameRef.current || phaserGame.current) return;

    const initPhaser = async () => {
      const Phaser = (await import("phaser")).default;
      const { GameScene } = await import("@/game/GameScene");

      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: 960,
        height: 540,
        parent: gameRef.current!,
        pixelArt: true,
        physics: {
          default: "arcade",
          arcade: {
            gravity: { x: 0, y: 800 },
            debug: false,
          },
        },
        scene: [GameScene],
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        backgroundColor: "#0a0a1a",
      };

      phaserGame.current = new Phaser.Game(config);
      
      // Pass data to the game scene via registry
      phaserGame.current.registry.set("portfolioData", data);
      phaserGame.current.registry.set("onExit", onExit);
      phaserGame.current.registry.set("onOpenSimple", onOpenSimple);

      setLoading(false);
    };

    initPhaser();

    return () => {
      if (phaserGame.current) {
        phaserGame.current.destroy(true);
        phaserGame.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-black">
          <div className="text-center">
            <p className="text-green-400 crt-effect text-lg mb-2">&gt; Loading portfolio...</p>
            <div className="w-48 h-2 bg-gray-800 rounded overflow-hidden">
              <div className="h-full bg-green-500 animate-pulse" style={{ width: "60%" }} />
            </div>
          </div>
        </div>
      )}
      <div ref={gameRef} className="w-full h-full" />
    </div>
  );
}
