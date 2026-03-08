import Image from "next/image";
import Link from "next/link";
import { Project } from "./types";
import { GithubIcon, LinkIcon } from "./SVGIcons";
import { ChevronRight } from "lucide-react";

interface Props {
  project: Project;
}

export function GridProjectCard({ project }: Props) {
  // Mapping for clean aesthetic platform labels
  const PlatformBadge = ({ platform }: { platform: string }) => {
    switch (platform.toLowerCase()) {
      case "mobile":
        return <span className="flex items-center gap-2 bg-[var(--color-primary)] text-[var(--color-dark)] px-2 py-0.5 rounded font-bold text-[10px] uppercase tracking-widest shadow-[0_0_10px_rgba(57,115,103,0.5)]">Mobile</span>;
      case "pc":
        return <span className="flex items-center gap-2 bg-[#8e24aa] text-white px-2 py-0.5 rounded font-bold text-[10px] uppercase tracking-widest shadow-[0_0_10px_rgba(142,36,170,0.5)]">PC</span>;
      case "web":
        return <span className="flex items-center gap-2 bg-[#e65100] text-white px-2 py-0.5 rounded font-bold text-[10px] uppercase tracking-widest shadow-[0_0_10px_rgba(230,81,0,0.5)]">Web</span>;
      default:
        return <span className="px-2 py-0.5 rounded bg-gray-700 text-white font-bold text-[10px] uppercase tracking-widest">{platform}</span>;
    }
  };

  return (
    <Link 
      href={`/simple/projects/${project.id || project.name.toLowerCase().replace(/\s+/g, '-')}`}
      className="group block relative w-full h-full rounded-xl overflow-hidden glass-panel neon-glow transition-all duration-300"
    >
      <div className="flex flex-col h-full z-10 relative">

        {/* Cover Image Block */}
        <div className="relative w-full aspect-video bg-black overflow-hidden border-b border-white/10">
          {project.cover ? (
            <Image 
              src={project.cover} 
              alt={project.name} 
              fill
              className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" 
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-[var(--color-primary)] font-jersey text-3xl opacity-30 uppercase tracking-widest border border-dashed border-[var(--color-primary)] m-4 rounded">
              [ NO_VISUAL_DATA ]
            </div>
          )}

          {/* overlay gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-transparent pointer-events-none"></div>
          
          {/* Top floating badges */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
             <div className="flex flex-wrap gap-2">
               {project.platform?.map(p => <PlatformBadge key={p} platform={p} />)}
             </div>
             {project.featured && (
                 <span className="bg-[var(--color-accent)] text-black px-2 py-0.5 rounded font-bold text-[10px] uppercase tracking-widest shadow-[0_0_15px_rgba(99,204,202,0.8)]">
                     ★ Featured
                 </span>
             )}
          </div>
        </div>

        {/* Description Block */}
        <div className="flex flex-col flex-1 p-6 relative">
            <h2 className="font-jersey text-3xl md:text-4xl text-white group-hover:text-[var(--color-accent)] uppercase tracking-widest truncate transition-colors mb-2 neon-text">
                {project.name}
            </h2>
            
            <p className="text-gray-400 font-roboto text-sm leading-relaxed mb-6 line-clamp-2 transition-colors group-hover:text-gray-200">
                {project.description}
            </p>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                <span className="font-roboto text-xs font-black text-[var(--color-primary)] opacity-70 uppercase tracking-widest">
                    ID.{(project.id || project.name).slice(0,4)}
                </span>
                
                <span className="flex items-center gap-1 text-[var(--color-accent)] font-jersey text-xl uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                    ACCESS <ChevronRight size={18} />
                </span>
            </div>
        </div>

      </div>
    </Link>
  );
}
