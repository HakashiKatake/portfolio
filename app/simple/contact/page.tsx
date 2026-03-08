import { getPortfolioData } from "@/data/loader";
import { Github, Linkedin, Mail, Send, Terminal } from "lucide-react";

export default async function ContactPage() {
  const data = await getPortfolioData();

  return (
    <div className="flex flex-col w-full min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      
      {/* Header */}
      <div className="w-full pt-20 pb-16 px-8 border-b-4 border-[var(--foreground)] bg-[var(--color-primary)]">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-4">
          <span className="flex items-center gap-2 font-inter font-bold uppercase tracking-[0.2em] bg-[var(--background)] text-[var(--foreground)] px-3 py-1 border-2 border-[var(--foreground)] shadow-[4px_4px_0px_var(--foreground)]">
            <Terminal size={16} />
            Dir: /contact
          </span>
          <h1 className="font-playfair font-black text-6xl md:text-8xl lg:text-9xl uppercase tracking-tighter mix-blend-multiply">
            Establish Link
          </h1>
          <div className="font-inter font-bold uppercase tracking-widest bg-[var(--background)] px-4 py-2 border-2 border-[var(--foreground)] mt-4">
            Comms & Inquiries
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-6xl w-full mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 flex-1 pb-32">
          
          {/* Left Block - Manifesto / Prompt */}
          <div className="flex flex-col justify-start">
              <div className="brutal-card p-8 md:p-12 bg-white relative h-full flex flex-col justify-center mt-4">
                 <span className="absolute -top-6 -left-4 bg-[var(--color-accent)] text-[var(--foreground)] border-4 border-[var(--foreground)] px-4 py-2 font-inter font-black uppercase tracking-widest text-lg md:text-xl shadow-[8px_8px_0px_var(--foreground)]">
                     STATUS: AWAITING INPUT
                 </span>
                 <p className="font-inter text-xl md:text-2xl font-medium leading-relaxed mt-4">
                    Looking for a game developer? Found a bug? Just want to say hi? Establish a connection via the designated nodes.
                 </p>
                 <div className="mt-12 flex items-center gap-4 text-[var(--foreground)] font-playfair font-black text-3xl md:text-4xl uppercase tracking-tight">
                    <Send size={32} /> Ping me on the subspace.
                 </div>
              </div>
          </div>

          {/* Right Block - Links Layout */}
          <div className="flex flex-col gap-6 justify-start">
              
              {data.contact.email && (
                  <a href={`mailto:${data.contact.email}`} className="brutal-card bg-white p-8 flex items-center justify-between group hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[12px_12px_0px_var(--foreground)] transition-transform">
                      <div className="flex flex-col gap-2">
                          <span className="text-[var(--foreground)] font-inter text-sm font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                              <Mail size={16} /> Email Direct
                          </span>
                          <span className="font-playfair text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter group-hover:underline decoration-4 underline-offset-4">
                              {data.contact.email}
                          </span>
                      </div>
                      <div className="w-16 h-16 border-4 border-[var(--foreground)] rounded-full hidden sm:flex items-center justify-center group-hover:bg-[var(--color-primary)] transition-colors shrink-0">
                          <Send size={24} className="-rotate-45" />
                      </div>
                  </a>
              )}

              {data.contact.linkedin && (
                  <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="brutal-card bg-[#0077b5] text-white p-8 flex items-center justify-between group hover:-translate-y-1 hover:-translate-x-1 transition-transform border-4 border-transparent hover:bg-white hover:text-[#0077b5] hover:border-[#0077b5] hover:shadow-[12px_12px_0px_var(--foreground)]">
                      <div className="flex flex-col gap-2">
                          <span className="font-inter text-sm font-bold uppercase tracking-[0.2em] flex items-center gap-2 border-b-2 border-transparent group-hover:border-[#0077b5] pb-1 inline-flex w-max">
                              <Linkedin size={16} /> Network Link
                          </span>
                          <span className="font-playfair text-4xl md:text-5xl font-black uppercase tracking-tighter">
                              LINKEDIN
                          </span>
                      </div>
                       <div className="w-16 h-16 border-4 border-current rounded-full hidden sm:flex items-center justify-center bg-transparent group-hover:bg-[#0077b5]/10 transition-colors shrink-0">
                          <Send size={24} className="-rotate-45" />
                      </div>
                  </a>
              )}

              {data.contact.github && (
                  <a href={data.contact.github} target="_blank" rel="noopener noreferrer" className="brutal-card bg-[var(--foreground)] text-[var(--background)] p-8 flex items-center justify-between group hover:-translate-y-1 hover:-translate-x-1 transition-transform border-4 border-[var(--foreground)] hover:bg-white hover:text-[var(--foreground)] hover:shadow-[12px_12px_0px_var(--foreground)]">
                      <div className="flex flex-col gap-2">
                          <span className="font-inter text-sm font-bold uppercase tracking-[0.2em] flex items-center gap-2 border-b-2 border-transparent group-hover:border-[var(--foreground)] pb-1 inline-flex w-max">
                              <Github size={16} /> Source Repo
                          </span>
                          <span className="font-playfair text-4xl md:text-5xl font-black uppercase tracking-tighter">
                              GITHUB
                          </span>
                      </div>
                      <div className="w-16 h-16 border-4 border-current rounded-full hidden sm:flex items-center justify-center bg-transparent group-hover:bg-[var(--foreground)]/10 transition-colors shrink-0">
                          <Send size={24} className="-rotate-45" />
                      </div>
                  </a>
              )}
              
          </div>

      </div>

    </div>
  );
}
