import { getPortfolioData } from "@/data/loader";
import { User, MapPin, Cpu, Gamepad2, Award, Terminal } from "lucide-react";
import FadeInUp from "@/components/FadeInUp";

export default async function AboutPage() {
  const data = await getPortfolioData();

  return (
    <div className="flex flex-col w-full min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      
      {/* ─── Header ─── */}
      <div className="w-full pt-24 pb-20 px-8 border-b-4 border-[var(--foreground)] bg-[var(--color-primary)]">
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center gap-6">
          <FadeInUp>
            <span className="inline-flex items-center gap-2 font-inter font-bold uppercase tracking-[0.2em] bg-[var(--background)] text-[var(--foreground)] px-4 py-2 border-2 border-[var(--foreground)] shadow-[4px_4px_0px_var(--foreground)]">
              <User size={18} />
              Dir: /about
            </span>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h1 className="font-playfair font-black text-6xl md:text-8xl lg:text-[10rem] uppercase leading-none tracking-tighter mix-blend-multiply my-4">
              Identity
            </h1>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <div className="inline-flex items-center gap-2 font-inter font-bold text-sm md:text-base uppercase tracking-widest bg-[var(--background)] px-6 py-3 border-2 border-[var(--foreground)] shadow-[4px_4px_0px_var(--foreground)]">
               <MapPin size={20} />
               Loc: {data.about.location}
            </div>
          </FadeInUp>
        </div>
      </div>

      {/* ─── Content ─── */}
      <div className="w-full px-8 py-24 space-y-32">
        
        {/* Bio */}
        <section className="max-w-4xl mx-auto w-full">
            <FadeInUp>
              <div className="brutal-card p-10 md:p-16 bg-card text-center flex flex-col items-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[var(--color-accent)] border-4 border-[var(--foreground)] flex flex-col items-center justify-center mb-8 shadow-[6px_6px_0px_var(--foreground)]">
                    <Cpu size={40} strokeWidth={2} />
                  </div>
                  <h2 className="font-playfair font-black text-4xl md:text-5xl uppercase tracking-tight mb-8">
                    Profile Details
                  </h2>
                  <p className="font-inter text-lg md:text-2xl font-medium leading-relaxed max-w-3xl mx-auto">
                      {data.about.bio}
                  </p>
              </div>
            </FadeInUp>
        </section>

        {/* Technical Protocols (Skills) */}
        <section className="max-w-6xl mx-auto w-full">
           <FadeInUp>
             <div className="flex flex-col items-center text-center gap-4 mb-16">
                 <Terminal size={48} />
                 <h2 className="font-playfair font-black text-5xl md:text-7xl uppercase tracking-tighter">
                     Capabilities
                 </h2>
                 <div className="w-32 h-2 bg-[var(--foreground)] mt-4"></div>
             </div>
           </FadeInUp>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {data.skills.map((skill: any, index: number) => {
                  let fillNum = 0;
                  const lowerLvl = skill.level.toLowerCase();
                  if(lowerLvl.includes('expert') || lowerLvl.includes('advanced')) fillNum = 5;
                  else if (lowerLvl.includes('intermediate') || lowerLvl.includes('proficient')) fillNum = 3;
                  else fillNum = 1;
                  
                  return (
                      <FadeInUp key={skill.name} delay={index * 0.1} className="h-full">
                        <div className="brutal-card p-8 bg-card flex flex-col justify-between h-full text-center hover:-translate-y-2 transition-transform duration-300">
                            <div className="mb-8">
                               <h3 className="font-playfair font-black text-3xl uppercase tracking-tight leading-tight mb-4">{skill.name}</h3>
                               <div className="inline-block font-inter font-bold text-sm uppercase tracking-widest bg-[var(--foreground)] text-[var(--background)] px-3 py-1 mb-6">
                                 {skill.level}
                               </div>
                               <p className="font-inter text-sm md:text-base font-medium border-t-2 border-dashed border-[var(--foreground)] pt-6 text-[var(--foreground)]/80">
                                 {skill.description || "System functional."}
                               </p>
                            </div>
                            
                            {/* Brutalist Progress Bar */}
                            <div className="flex gap-2 h-5 w-full mt-auto">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className={`flex-1 border-2 border-[var(--foreground)] ${i < fillNum ? 'bg-[var(--color-primary)]' : 'bg-transparent'}`}></div>
                                ))}
                            </div>
                        </div>
                      </FadeInUp>
                  )
              })}
           </div>
        </section>

        {/* Favorite Games */}
        <section className="max-w-6xl mx-auto w-full">
           <FadeInUp>
             <div className="flex flex-col items-center text-center gap-4 mb-16">
                 <Gamepad2 size={48} />
                 <h2 className="font-playfair font-black text-5xl md:text-7xl uppercase tracking-tighter">
                     Reference Media
                 </h2>
                 <div className="w-32 h-2 bg-[var(--foreground)] mt-4"></div>
             </div>
           </FadeInUp>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
               {data.favoriteGames.map((g: string, idx: number) => (
                   <FadeInUp key={g} delay={idx * 0.1}>
                     <div className="brutal-card p-6 md:p-8 bg-[var(--color-primary)] flex items-center justify-center text-center aspect-square group cursor-default">
                         <span className="font-playfair font-black text-xl md:text-3xl uppercase tracking-tight group-hover:scale-110 transition-transform duration-300">
                             {g}
                         </span>
                     </div>
                   </FadeInUp>
               ))}
           </div>
        </section>
        
        {/* Game Jams */}
        {data.gameJams.length > 0 && (
            <section className="max-w-5xl mx-auto w-full">
               <FadeInUp>
                 <div className="flex flex-col items-center text-center gap-4 mb-16">
                     <Award size={48} />
                     <h2 className="font-playfair font-black text-5xl md:text-7xl uppercase tracking-tighter">
                         Game Jams
                     </h2>
                     <div className="w-32 h-2 bg-[var(--foreground)] mt-4"></div>
                 </div>
               </FadeInUp>
               <div className="space-y-10">
                   {data.gameJams.map((jam: any, idx: number) => (
                       <FadeInUp key={jam.name} delay={idx * 0.1}>
                         <div className="brutal-card p-0 flex flex-col md:flex-row bg-card overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
                             
                             <div className="bg-[var(--color-accent)] border-b-4 md:border-b-0 md:border-r-4 border-[var(--foreground)] p-8 md:p-12 flex items-center justify-center shrink-0 w-full md:w-48">
                                 <span className="font-playfair font-black text-5xl md:text-6xl text-[var(--foreground)] group-hover:scale-110 transition-transform duration-300">
                                     {jam.year}
                                 </span>
                             </div>
                             
                             <div className="p-8 md:p-10 flex-1 flex flex-col justify-center text-center md:text-left">
                                 <div className="flex flex-col md:flex-row items-center md:justify-between gap-6 mb-6">
                                    <h3 className="font-playfair font-black text-3xl md:text-4xl uppercase tracking-tight">{jam.name}</h3>
                                    {jam.result && (
                                         <span className="font-inter font-bold text-sm uppercase tracking-widest bg-[var(--foreground)] text-[var(--background)] px-4 py-2 shrink-0">
                                             {jam.result}
                                         </span>
                                    )}
                                 </div>
                                 <div className="flex flex-col md:flex-row items-center gap-4 font-inter text-base md:text-lg">
                                     <span className="font-bold uppercase tracking-widest border-2 border-[var(--foreground)] px-4 py-2 bg-[var(--color-primary)]">
                                       ROLE: {jam.role}
                                     </span>
                                     <span className="font-bold border-b-4 border-[var(--color-primary)] pb-1">
                                       {jam.project}
                                     </span>
                                 </div>
                             </div>
                         </div>
                       </FadeInUp>
                   ))}
               </div>
            </section>
        )}

      </div>
    </div>
  );
}
