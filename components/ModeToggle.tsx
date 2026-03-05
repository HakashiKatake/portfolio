"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "pixel-retroui";

export function ModeToggle() {
  const pathname = usePathname();

  // Don't show on landing page
  if (pathname === "/") return null;

  const isSimple = pathname === "/simple";
  const targetHref = isSimple ? "/cool" : "/simple";
  const label = isSimple ? "🎮 Interactive Mode" : "📄 Simple Mode";

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <Link href={targetHref}>
        <Button
          bg="#7c3aed"
          textColor="#ffffff"
          shadow="#4c1d95"
          borderColor="#a855f7"
          className="text-sm px-4 py-2 cursor-pointer hover:scale-105 transition-transform"
        >
          {label}
        </Button>
      </Link>
    </div>
  );
}
