import Link from "next/link";
import { getPortfolioData } from "@/data/loader";

export const metadata = {
  title: "Saurabh | Developer Portfolio",
  description: "Brutalist developer portfolio exploring code, design, and 3D experiences.",
};

export default async function SimpleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getPortfolioData();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] font-inter">
      {/* ─── Brutalist Header ─── */}
      <header className="sticky top-0 z-50 bg-[var(--background)] border-b-4 border-[var(--foreground)] flex flex-col md:flex-row items-center justify-between px-8 py-4">
        
        {/* Logo / Name */}
        <div className="flex-shrink-0">
          <Link href="/simple" className="font-playfair text-3xl md:text-4xl font-black uppercase tracking-tight text-[var(--foreground)] hover:text-[var(--color-primary)] transition-colors">
            {data.meta?.name ?? data.name}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap justify-center items-center gap-4 md:gap-8 mt-4 md:mt-0 font-inter font-bold text-sm tracking-widest uppercase">
          <Link href="/simple/projects" className="hover:text-[var(--color-primary)] transition-colors">
            Projects
          </Link>
          <Link href="/simple/about" className="hover:text-[var(--color-primary)] transition-colors">
            About
          </Link>
          <Link href="/simple/blog" className="hover:text-[var(--color-primary)] transition-colors">
            Blog
          </Link>
          <Link href="/simple/contact" className="hover:text-[var(--color-primary)] transition-colors">
            Contact
          </Link>
          
          <a
            href={data.meta?.resumeUrl ?? "/resume.pdf"}
            className="md:ml-4 brutal-btn text-xs px-4 py-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
        </nav>
      </header>

      {/* ─── Page Content (Full Width) ─── */}
      <main className="flex-1 w-full relative z-0">
        {children}
      </main>

      {/* ─── Brutalist Footer ─── */}
      <footer className="bg-[var(--background)] border-t-4 border-[var(--color-primary)] flex flex-col md:flex-row mt-auto items-center justify-between p-6 md:p-8 text-[var(--foreground)]">
        <div className="flex items-center gap-4">
          <p className="font-playfair font-black text-2xl uppercase tracking-tighter">
            {data.meta?.name ?? data.name}
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <p className="font-inter font-bold text-sm tracking-widest uppercase text-[var(--color-primary)]">
            © {new Date().getFullYear()} ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
}
