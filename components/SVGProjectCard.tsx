"use client";

import Link from "next/link";
import { Project } from "./types";
import { platformIcon } from "./SVGIcons";

interface Props {
  project: Project;
}

export function SVGProjectCard({ project }: Props) {
  const id = project.id || project.name.toLowerCase().replace(/\s+/g, "-");
  const hasMissingFields = !project.role || !project.whatILearned || !project.tools?.length;

  return (
    <Link href={`/simple/projects/${id}`} className="group block h-full">
      <div className="relative flex flex-col h-full bg-[var(--color-dark)] border-2 border-[var(--color-primary)] hard-shadow group-hover:hard-shadow-accent transition-all duration-75">
        {/* Retro top bar for the card */}
        <div className="h-6 border-b-2 border-[var(--color-primary)] bg-[var(--color-dark)] flex items-center px-2 gap-1.5 shrink-0 group-hover:border-[var(--color-accent)] transition-colors">
          <div className="w-2 h-2 bg-[var(--color-primary)] group-hover:bg-[var(--color-accent)]"></div>
          <div className="w-2 h-2 bg-[var(--color-primary)] group-hover:bg-[var(--color-accent)]"></div>
          <div className="w-2 h-2 bg-[var(--color-primary)] group-hover:bg-[var(--color-accent)]"></div>
        </div>

        {/* Cover image area */}
        <div className="relative h-48 bg-[#1a1c1e] border-b-2 border-[var(--color-primary)] shrink-0 overflow-hidden group-hover:border-[var(--color-accent)] transition-colors">
          {project.cover ? (
            <img
              src={project.cover}
              alt={project.name}
              className="w-full h-full object-cover filter contrast-125 saturate-50 group-hover:saturate-100 transition-all duration-200"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
                (e.target as HTMLImageElement).nextElementSibling?.classList.remove("hidden");
              }}
            />
          ) : null}
          {/* Fallback placeholder */}
          <div className={`absolute inset-0 flex items-center justify-center ${project.cover ? "hidden" : ""}`}>
            <svg viewBox="0 0 200 120" className="w-32 h-20 opacity-40">
              <rect x="10" y="10" width="180" height="100" rx="8" fill="var(--color-primary)" opacity="0.3" />
              <text x="100" y="55" textAnchor="middle" fill="var(--color-accent)" fontSize="14" fontFamily="monospace">
                {project.engine}
              </text>
              <text x="100" y="75" textAnchor="middle" fill="var(--color-muted)" fontSize="10" fontFamily="monospace">
                {project.category}
              </text>
            </svg>
          </div>

          {/* Featured badge */}
          {project.featured && (
            <span className="absolute top-2 right-2 bg-[var(--color-accent)] text-[var(--color-dark)] text-xs font-bold uppercase tracking-widest px-2 py-1 border border-[var(--color-dark)]">
              ★ FEATURED
            </span>
          )}

          {/* Missing fields warning */}
          {hasMissingFields && (
            <div className="absolute top-2 left-2 bg-[repeating-linear-gradient(45deg,#000,#000_10px,#eab308_10px,#eab308_20px)] text-white text-[10px] font-bold px-2 py-1 uppercase border border-black transform -rotate-2 origin-top-left">
              <span className="bg-black/80 px-1 py-0.5">DEV_NULL: DATA MISSING</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-jersey text-xl text-white group-hover:text-[var(--color-accent)] transition-colors leading-tight">
              {project.name}
            </h3>
            <span className="shrink-0 text-[10px] bg-[var(--color-primary)]/30 text-[var(--color-accent2)] px-2 py-0.5 rounded font-medium">
              {project.engine}
            </span>
          </div>

          <p className="text-sm text-gray-400 line-clamp-2 mb-3 font-roboto leading-relaxed">
            {project.description}
          </p>

          {/* Platform icons */}
          {project.platform && project.platform.length > 0 && (
            <div className="flex items-center gap-2 mb-3">
              {project.platform.map((p) => (
                <span key={p} className="flex items-center gap-1 text-[11px] text-[var(--color-muted)]">
                  {platformIcon(p)}
                  <span className="capitalize">{p}</span>
                </span>
              ))}
              {project.year && (
                <span className="text-[11px] text-gray-500 ml-auto">{project.year}</span>
              )}
            </div>
          )}

          {/* Tools chips */}
          <div className="mt-auto pt-4 border-t border-[var(--color-primary)]/30 group-hover:border-[var(--color-accent)]/50 transition-colors">
            {project.tools && project.tools.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.tools.slice(0, 4).map((tool) => (
                  <span
                    key={tool}
                    className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-[var(--color-dark)] text-[var(--color-accent2)] border border-[var(--color-primary)] shadow-[2px_2px_0_var(--color-primary)] group-hover:border-[var(--color-accent)] group-hover:shadow-[2px_2px_0_var(--color-accent)] group-hover:text-[var(--color-accent)] transition-colors"
                  >
                    {tool}
                  </span>
                ))}
                {project.tools.length > 4 && (
                  <span className="text-[10px] font-bold px-2 py-1 border border-dashed border-gray-600 text-gray-500">
                    +{project.tools.length - 4}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
