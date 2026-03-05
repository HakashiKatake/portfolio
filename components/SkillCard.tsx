"use client";

import { Card, ProgressBar } from "pixel-retroui";
import { Skill } from "./types";

interface SkillCardProps {
  skill: Skill;
}

function levelToProgress(level: string): number {
  switch (level.toLowerCase()) {
    case "beginner": return 25;
    case "intermediate": return 50;
    case "advanced": return 80;
    case "expert": return 95;
    default: return 50;
  }
}

export function SkillCard({ skill }: SkillCardProps) {
  return (
    <Card
      bg="#1e1b4b"
      textColor="#c4b5fd"
      borderColor="#6d28d9"
      shadowColor="#4c1d95"
      className="p-4 w-full"
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-purple-300">{skill.name}</h3>
        <span className="text-xs text-purple-400 uppercase">{skill.level}</span>
      </div>
      <ProgressBar
        progress={levelToProgress(skill.level)}
        color="#a855f7"
        borderColor="#6d28d9"
        size="sm"
      />
      {skill.description && (
        <p className="text-sm text-purple-400 mt-2">{skill.description}</p>
      )}
    </Card>
  );
}
