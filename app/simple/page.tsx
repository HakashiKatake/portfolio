import Link from "next/link";
import { getPortfolioData } from "@/data/loader";
import { ArrowUpRight } from "lucide-react";
import FadeInUp from "@/components/FadeInUp";

export default async function SimpleHomePage() {
  const data = await getPortfolioData();
  
  const featuredProjects = data.projects
    .filter((p: any) => p.featured)
    .slice(0, 4);

  return (
    <div className="w-full flex flex-col">
      {/* ─── Hero Section ─── */}
      <section className="w-full min-h-[85vh] flex flex-col justify-center px-8 py-20 border-b-4 border-[var(--foreground)] bg-[var(--color-primary)]">
        <div className="max-w-7xl mx-auto w-full">
          <FadeInUp>
            <h1 className="font-playfair font-black text-6xl md:text-8xl lg:text-[10rem] uppercase leading-none tracking-tighter text-[var(--foreground)] mb-8 mix-blend-multiply">
              {data.meta?.name ?? data.name}
            </h1>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <p className="font-inter font-medium text-xl md:text-2xl lg:text-3xl max-w-3xl text-[var(--background)] border-l-8 border-[var(--foreground)] pl-6 py-2">
              {data.about.bio}
            </p>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <div className="mt-12 flex flex-wrap gap-6">
               <Link href="/simple/projects" className="brutal-btn text-xl px-8 py-4 !bg-[var(--background)] !text-[var(--foreground)] hover:!bg-[var(--foreground)] hover:!text-[var(--background)]">
                 View All Projects <ArrowUpRight className="inline ml-2" />
               </Link>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* ─── Featured Work ─── */}
      <section className="w-full px-8 py-24 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto">
          <FadeInUp>
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b-4 border-[var(--foreground)] pb-6 mb-12 gap-4">
              <h2 className="font-playfair font-black text-5xl md:text-7xl uppercase tracking-tighter">
                Featured Work
              </h2>
              <Link href="/simple/projects" className="font-inter font-bold uppercase tracking-widest text-sm hover:underline hover:text-[var(--color-primary)] flex items-center">
                All Projects <ArrowUpRight className="ml-1" size={18}/>
              </Link>
            </div>
          </FadeInUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {featuredProjects.map((project: any, index: number) => (
              <FadeInUp key={project.id ?? project.name} delay={index * 0.1}>
                <Link 
                  href={`/simple/projects/${project.id ?? project.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="group block brutal-card min-h-[400px] flex flex-col h-full"
                >
                  <div className="aspect-[4/3] md:aspect-video w-full border-b-4 border-[var(--foreground)] bg-[var(--foreground)] overflow-hidden relative">
                    {project.cover ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img 
                        src={project.cover} 
                        alt={project.name}
                        className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-playfair font-black text-4xl text-white/20 uppercase tracking-widest">
                        {project.name}
                      </div>
                    )}
                    {project.category && (
                      <div className="absolute top-4 right-4 bg-[var(--color-primary)] border-2 border-[var(--foreground)] text-[var(--foreground)] font-inter font-bold text-xs uppercase px-3 py-1 shadow-[4px_4px_0px_var(--foreground)]">
                        {project.category}
                      </div>
                    )}
                  </div>
                  <div className="p-6 md:p-8 bg-[var(--background)] flex-1 flex flex-col">
                    <h3 className="font-playfair font-black text-3xl md:text-4xl uppercase tracking-tight mb-4 group-hover:text-[var(--color-primary)] transition-colors">
                      {project.name}
                    </h3>
                    <p className="font-inter text-[var(--foreground)] line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                </Link>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
