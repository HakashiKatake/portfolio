"use client";

import { Skill } from "./types";

function levelToPercent(level: string): number {
  switch (level.toLowerCase()) {
    case "beginner": return 25;
    case "intermediate": return 50;
    case "advanced": return 80;
    case "expert": return 95;
    default: return 50;
  }
}

export function SVGSkillBar({ skill }: { skill: Skill }) {
  const pct = levelToPercent(skill.level);

  return (
    <div className="group">
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-jersey text-lg text-white">{skill.name}</span>
        <span className="text-xs text-[var(--color-accent2)] uppercase tracking-wider font-roboto">
          {skill.level}
        </span>
      </div>
      <svg viewBox="0 0 300 20" className="w-full h-5" role="img" aria-label={`${skill.name}: ${skill.level}`}>
        {/* Track border */}
        <rect x="0" y="2" width="300" height="16" fill="var(--color-dark)" stroke="var(--color-primary)" strokeWidth="2" />
        
        {/* Fill block */}
        <rect
          x="2"
          y="4"
          width={Math.max(0, (pct * 3) - 4)}
          height="12"
          fill="var(--color-accent)"
          className="transition-all duration-500"
        />
        
        {/* Segment dividers for retro mechanical look */}
        <g stroke="var(--color-primary)" strokeWidth="2" opacity="0.3">
          <line x1="75" y1="2" x2="75" y2="18" />
          <line x1="150" y1="2" x2="150" y2="18" />
          <line x1="225" y1="2" x2="225" y2="18" />
        </g>
      </svg>
      {skill.description && (
        <p className="text-xs text-gray-500 mt-1 font-roboto">{skill.description}</p>
      )}
    </div>
  );
}
