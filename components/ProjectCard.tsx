"use client";

import { Card, Button } from "pixel-retroui";
import { Project } from "./types";

interface ProjectCardProps {
  project: Project;
}

const categoryLabels: Record<string, string> = {
  mobile: "📱 Mobile",
  pc: "🖥️ PC",
  gamejam: "🏆 Game Jam",
  personal: "🌟 Personal",
  tools: "🔧 Tools",
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card
      bg="#1a1a2e"
      textColor="#e0e0ff"
      borderColor="#6d28d9"
      shadowColor="#4c1d95"
      className="p-5 w-full"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-purple-300">{project.name}</h3>
        <span className="text-xs bg-purple-900/50 text-purple-300 px-2 py-1 rounded">
          {project.engine}
        </span>
      </div>
      <p className="text-sm text-purple-400 mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noopener noreferrer">
            <Button
              bg="#7c3aed"
              textColor="#ffffff"
              shadow="#4c1d95"
              borderColor="#a855f7"
              className="text-xs px-3 py-1"
            >
              🎮 Play Demo
            </Button>
          </a>
        )}
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer">
            <Button
              bg="#1e1b4b"
              textColor="#c4b5fd"
              shadow="#0f0a2e"
              borderColor="#6d28d9"
              className="text-xs px-3 py-1"
            >
              💻 GitHub
            </Button>
          </a>
        )}
        {project.linkedin && (
          <a href={project.linkedin} target="_blank" rel="noopener noreferrer">
            <Button
              bg="#1e1b4b"
              textColor="#c4b5fd"
              shadow="#0f0a2e"
              borderColor="#6d28d9"
              className="text-xs px-3 py-1"
            >
              📝 Read More
            </Button>
          </a>
        )}
      </div>
    </Card>
  );
}
