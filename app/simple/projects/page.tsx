"use client";

import { useState, useEffect } from "react";
import { Project, PortfolioData } from "@/components/types";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FadeInUp from "@/components/FadeInUp";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/portfolio.json")
      .then((res) => res.json())
      .then((data: PortfolioData) => {
        setProjects(data.projects);
        setLoading(false);
      });
  }, []);

  const filteredProjects = projects.filter((p) => {
    if (filter === "all") return true;
    const plats = p.platform || [];
    const lowerCategory = p.category?.toLowerCase() || "";
    
    if (filter === "mobile") return plats.some((plat) => plat.toLowerCase() === "mobile");
    if (filter === "pc") return plats.some((plat) => plat.toLowerCase() === "pc");
    if (filter === "web") return plats.some((plat) => plat.toLowerCase() === "web");
    if (filter === "gamejam") return lowerCategory === "game jam" || lowerCategory === "gamejam";
    if (filter === "personal") return lowerCategory === "personal";
    return true;
  });

  const filterOptions = [
    { id: "all", label: "All Works" },
    { id: "pc", label: "PC" },
    { id: "mobile", label: "Mobile" },
    { id: "web", label: "Web" },
    { id: "gamejam", label: "Game Jams" },
    { id: "personal", label: "Personal" },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      
      {/* ─── Header ─── */}
      <div className="w-full pt-20 pb-16 px-8 border-b-4 border-[var(--foreground)] bg-[var(--color-primary)]">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-4">
          <FadeInUp>
            <span className="font-inter font-bold uppercase tracking-[0.2em] bg-[var(--background)] text-[var(--foreground)] px-3 py-1 border-2 border-[var(--foreground)] shadow-[4px_4px_0px_var(--foreground)]">
              Dir: /projects
            </span>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h1 className="font-playfair font-black text-6xl md:text-8xl lg:text-9xl uppercase tracking-tighter mix-blend-multiply">
              Index
            </h1>
          </FadeInUp>
        </div>
      </div>

      {/* ─── Filters ─── */}
      <div className="w-full border-b-4 border-[var(--foreground)] bg-background sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-8 py-4 flex flex-col md:flex-row md:items-center gap-4">
          <span className="font-inter font-black uppercase text-sm tracking-widest hidden md:block border-r-4 border-[var(--foreground)] pr-4 py-2">
            Filter
          </span>
          <div className="flex flex-wrap gap-2 md:gap-4 justify-center md:justify-start">
            {filterOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setFilter(opt.id)}
                className={`
                  font-inter font-bold text-xs md:text-sm uppercase tracking-widest px-4 py-2 border-2 border-[var(--foreground)] transition-all
                  ${filter === opt.id 
                    ? "bg-[var(--foreground)] text-[var(--background)] shadow-[2px_2px_0px_var(--color-primary)] translate-x-[-2px] translate-y-[-2px]" 
                    : "bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--color-primary)] hover:shadow-[4px_4px_0px_var(--foreground)] hover:translate-x-[-4px] hover:translate-y-[-4px]"
                  }
                `}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Grid ─── */}
      <div className="max-w-7xl w-full mx-auto px-8 py-12 md:py-24">
        {loading ? (
          <div className="w-full py-32 flex justify-center items-center">
            <span className="font-inter font-black text-4xl uppercase tracking-widest animate-pulse">
              Loading...
            </span>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="w-full py-32 flex justify-center items-center border-4 border-dashed border-[var(--foreground)] bg-card">
            <span className="font-inter font-black text-2xl uppercase tracking-widest">
              No results found
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <FadeInUp key={project.id || project.name} delay={index * 0.05}>
                <Link
                  href={`/simple/projects/${project.id ?? project.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="group block brutal-card min-h-[400px] flex flex-col h-full"
                >
                  <div className="aspect-[4/3] w-full border-b-4 border-[var(--foreground)] bg-[var(--foreground)] overflow-hidden relative">
                    {project.cover ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img 
                        src={project.cover} 
                        alt={project.name}
                        className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-playfair font-black text-3xl text-white/20 uppercase tracking-tight text-center p-4">
                        {project.name}
                      </div>
                    )}
                    {project.category && (
                      <div className="absolute top-4 right-4 bg-[var(--color-primary)] border-2 border-[var(--foreground)] text-[var(--foreground)] font-inter font-bold text-xs uppercase px-3 py-1 shadow-[4px_4px_0px_var(--foreground)]">
                        {project.category}
                      </div>
                    )}
                  </div>
                  <div className="p-6 bg-[var(--background)] flex-1 flex flex-col justify-between group-hover:bg-[var(--foreground)] group-hover:text-[var(--background)] transition-colors">
                    <div>
                      <h3 className="font-playfair font-black text-3xl uppercase tracking-tight mb-3">
                        {project.name}
                      </h3>
                      <p className="font-inter line-clamp-2 text-sm md:text-base font-medium opacity-80 mb-6">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between border-t-2 border-current pt-4">
                       <span className="font-inter font-bold text-xs uppercase tracking-widest">
                         {project.platform?.join(", ") || "Various"}
                       </span>
                       <ArrowRight size={20} className="transform group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              </FadeInUp>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
