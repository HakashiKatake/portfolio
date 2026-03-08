import Link from "next/link";
import { Project } from "./types";
import { platformIcon } from "./SVGIcons";

export function BrutalistProjectCard({ project }: { project: Project }) {
  const href = `/simple/projects/${project.id ?? project.name.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <Link href={href} className="group block relative w-full h-full">
      {/* The offset shadow div */}
      <div className="absolute inset-0 bg-[var(--color-dark)] border-4 border-[var(--color-primary)] translate-x-3 translate-y-3 group-hover:translate-x-2 group-hover:translate-y-2 group-hover:bg-[var(--color-primary)] transition-all duration-200"></div>

      {/* The main card content */}
      <div className="relative h-full bg-[var(--color-dark)] border-4 border-[var(--color-primary)] flex flex-col transform group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-200 z-10 overflow-hidden">
        
        {/* Header Bar */}
        <div className="bg-[var(--color-primary)] px-4 py-2 flex items-center justify-between border-b-4 border-[var(--color-dark)]">
          <div className="flex gap-2">
            <span className="w-3 h-3 bg-[var(--color-dark)]"></span>
            <span className="w-3 h-3 bg-[var(--color-dark)]"></span>
            <span className="w-3 h-3 bg-[var(--color-dark)]"></span>
          </div>
          {project.featured && (
            <span className="font-jersey text-[var(--color-accent)] uppercase tracking-widest text-lg bg-[var(--color-dark)] px-3 shadow-[2px_2px_0px_var(--color-accent)]">
              ★ FEATURED
            </span>
          )}
        </div>

        {/* Cover Image */}
        {project.cover ? (
          <div className="relative h-64 md:h-72 w-full border-b-4 border-[var(--color-primary)] overflow-hidden bg-[var(--color-dark)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={project.cover} 
              alt={project.name} 
              className="w-full h-full object-cover filter contrast-125 saturate-100 group-hover:scale-105 transition-transform duration-500" 
            />
            {/* Subtle retro scanline overlay */}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_4px)] pointer-events-none"></div>
          </div>
        ) : (
          <div className="h-64 md:h-72 w-full bg-dot-pattern border-b-4 border-[var(--color-primary)] flex items-center justify-center">
            <span className="text-[var(--color-primary)] font-jersey text-4xl tracking-widest uppercase">
              NO SIGNAL
            </span>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 md:p-8 flex-1 flex flex-col bg-dot-pattern-dark">
          {/* Engineering / Category Tags */}
          <div className="flex flex-wrap gap-3 mb-4 text-xs font-bold uppercase tracking-widest">
            {project.engine && (
              <span className="px-3 py-1 bg-[var(--color-dark)] text-gray-300 border-2 border-[var(--color-primary)]">
                {project.engine}
              </span>
            )}
            <span className="px-3 py-1 bg-[var(--color-primary)] text-[var(--color-dark)] border-2 border-[var(--color-primary)]">
              {project.category}
            </span>
          </div>

          <h3 className="font-jersey text-5xl text-white uppercase tracking-wider mb-4 leading-none group-hover:text-[var(--color-accent)] transition-colors">
            {project.name}
          </h3>

          <p className="text-gray-300 text-lg font-medium leading-relaxed mb-6 line-clamp-3">
            {project.description}
          </p>

          <div className="mt-auto flex items-center justify-between pt-6 border-t-2 border-dashed border-[var(--color-primary)]">
             <div className="flex gap-3 text-gray-400">
               {project.platform?.map(pl => (
                 <span key={pl} className="flex items-center gap-1 border-b-2 border-transparent">
                   {platformIcon(pl)}
                   <span className="text-sm font-bold tracking-widest uppercase">{pl}</span>
                 </span>
               ))}
             </div>
             <span className="text-[var(--color-accent)] font-jersey text-xl tracking-widest uppercase group-hover:translate-x-2 transition-transform">
               Execute ➔
             </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
