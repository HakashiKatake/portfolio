"use client";

import { GameJam } from "./types";
import { TrophyIcon } from "./SVGIcons";

export function SVGTimeline({ jams }: { jams: GameJam[] }) {
  const sorted = [...jams].sort((a, b) => (b.year ?? 0) - (a.year ?? 0));

  return (
    <div className="relative">
      {/* Vertical tracking line */}
      <div className="absolute left-6 top-0 bottom-0 w-1 bg-[var(--color-primary)] opacity-50 border-x border-[var(--color-dark)]" />

      <div className="space-y-8">
        {sorted.map((jam, i) => (
          <div key={i} className="relative flex items-start gap-4 pl-2 group">
            {/* SVG node */}
            <div className="relative z-10 shrink-0">
              <svg width="32" height="32" viewBox="0 0 32 32" className="transition-transform group-hover:scale-110">
                <rect x="4" y="4" width="24" height="24" fill="var(--color-dark)" stroke="var(--color-primary)" strokeWidth="3" />
                <rect x="10" y="10" width="12" height="12" fill="var(--color-accent)" className="opacity-0 group-hover:opacity-100 transition-opacity" />
                <rect x="12" y="12" width="8" height="8" fill="var(--color-primary)" className="opacity-100 group-hover:opacity-0 transition-opacity" />
              </svg>
            </div>

            {/* Content box */}
            <div className="flex-1 bg-[var(--color-dark)] border-2 border-[var(--color-primary)] hard-shadow p-5 group-hover:hard-shadow-accent transition-colors">
              <div className="flex items-center gap-2 mb-1">
                <TrophyIcon className="w-4 h-4 text-[var(--color-accent)]" />
                <h3 className="font-jersey text-lg text-white">{jam.name}</h3>
                {jam.year && (
                  <span className="text-xs text-gray-500 ml-auto">{jam.year}</span>
                )}
              </div>
              <p className="text-sm text-gray-400 font-roboto">
                <span className="text-[var(--color-accent2)]">{jam.project}</span>
                {jam.role && <span className="text-gray-500"> · {jam.role}</span>}
              </p>
               {jam.result && (
                <div className="mt-3">
                  <span className="inline-block text-[11px] font-bold uppercase px-2 py-1 bg-[var(--color-accent)] text-[var(--color-dark)] border-2 border-[var(--color-dark)] shadow-[2px_2px_0_var(--color-primary)] tracking-wider">
                    {jam.result}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
