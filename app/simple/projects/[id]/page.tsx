import { getPortfolioData } from "@/data/loader";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  platformIcon,
  GithubIcon,
  LinkIcon,
  LinkedInIcon,
} from "@/components/SVGIcons";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const data = await getPortfolioData();
  return data.projects
    .filter((p) => p.id)
    .map((p) => ({ id: p.id! }));
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const data = await getPortfolioData();
  
  // Also try to find by name if id somehow doesn't match perfectly
  const project = data.projects.find((p) => p.id === id || p.name.toLowerCase().replace(/\s+/g, '-') === id);
  if (!project) notFound();

  const missingFields: string[] = [];
  if (!project.role) missingFields.push("Role");
  if (!project.whatILearned) missingFields.push("What I Learned");
  if (!project.tools || project.tools.length === 0) missingFields.push("Tools");

  return (
    <div className="min-h-screen bg-[var(--color-dark)] text-gray-100 flex flex-col w-full selection:bg-[var(--color-accent)] selection:text-[var(--color-dark)]">
      
      {/* MASSIVE FLAT HEAD MENU */}
      <div className="w-full flex">
         <Link
            href="/simple/projects"
            className="flex-1 bg-[var(--color-primary)] border-b-8 border-r-8 border-black p-6 font-jersey text-3xl md:text-5xl text-white hover:bg-[var(--color-accent)] hover:text-black transition-colors uppercase tracking-widest flex items-center justify-center gap-4"
          >
            <span>[ ESC ]</span> RETURN TO DATABASE
          </Link>
          <div className="hidden md:flex flex-1 bg-[var(--color-dark)] border-b-8 border-black p-6 font-jersey text-5xl text-[var(--color-primary)] uppercase tracking-widest items-center justify-center bg-dot-pattern">
              SYS.ID.{id.slice(0,5).toUpperCase()}
          </div>
      </div>

      {/* WARNING BANNER */}
      {missingFields.length > 0 && (
        <div className="w-full bg-[repeating-linear-gradient(45deg,#000,#000_20px,#eab308_20px,#eab308_40px)] border-b-8 border-black p-8 flex justify-center">
            <span className="bg-black text-white font-jersey text-3xl md:text-4xl tracking-widest uppercase px-6 py-2">
              ⚠ MISSING SECTORS: {missingFields.join(", ")}
            </span>
        </div>
      )}

      {/* HEADER BLOCK */}
      <div className="w-full flex w-full flex-col lg:flex-row border-b-8 border-black">
         <div className="flex-1 p-10 md:p-16 lg:p-24 bg-black flex flex-col justify-center border-b-8 lg:border-b-0 lg:border-r-8 border-black">
            <h1 className="font-jersey text-7xl md:text-[8vw] leading-none text-white uppercase tracking-widest text-shadow-solid break-words">
                {project.name}
            </h1>
            <p className="mt-8 text-black bg-[var(--color-accent)] font-jersey text-3xl md:text-4xl inline-block px-6 py-2 uppercase tracking-widest w-max">
                [ {project.category} ]
            </p>
         </div>

         {/* COVER IMAGE */}
         <div className="flex-1 min-h-[40vh] bg-[var(--color-dark)] relative overflow-hidden bg-dot-pattern-dark">
             {project.cover ? (
                 // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={project.cover}
                  alt={project.name}
                  className="absolute inset-0 w-full h-full object-cover filter contrast-125 saturate-0 hover:saturate-100 transition-all duration-700"
                />
             ) : (
                <div className="absolute inset-0 flex items-center justify-center font-jersey text-5xl text-[var(--color-primary)] opacity-50 uppercase tracking-widest">
                    NO_IMAGE_DATA
                </div>
             )}

          </div>

      </div>
    </div>
  );
}
