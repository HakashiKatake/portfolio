import { getPortfolioData } from "@/data/loader";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Github, Linkedin, Terminal } from "lucide-react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import FadeInUp from "@/components/FadeInUp";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const data = await getPortfolioData();
  return data.blogs.map((b) => ({
    slug: b.slug ?? b.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  }));
}

/** Try to load a local markdown file for this slug */
function loadMarkdown(slug: string): { content: string; data: Record<string, unknown> } | null {
  const blogDir = path.join(process.cwd(), "data", "blog");
  const mdPath = path.join(blogDir, `${slug}.md`);
  if (fs.existsSync(mdPath)) {
    const raw = fs.readFileSync(mdPath, "utf-8");
    return matter(raw);
  }
  return null;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const data = await getPortfolioData();
  const blog = data.blogs.find(
    (b) => (b.slug ?? b.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")) === slug
  );
  if (!blog) notFound();

  const md = loadMarkdown(slug);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      
      {/* Back nav */}
      <FadeInUp>
        <div className="w-full pt-8 px-8 bg-[var(--background)] border-b-4 border-[var(--foreground)] pb-4 flex justify-start items-center max-w-4xl mx-auto border-x-4 border-t-4 mt-8 brutal-card">
          <Link
            href="/simple/blog"
            className="inline-flex items-center gap-2 font-inter font-bold uppercase tracking-widest text-sm hover:underline decoration-2 underline-offset-4"
          >
            <ArrowLeft size={16} strokeWidth={3} /> Return to Logs
          </Link>
        </div>
      </FadeInUp>

      <main className="max-w-4xl mx-auto px-8 pb-32 pt-8">
        
        {/* Meta Header Box */}
        <FadeInUp delay={0.1}>
          <div className="mb-12 pb-12 border-b-4 border-[var(--foreground)] brutal-card p-8 md:p-12 bg-white">
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold mb-8 uppercase tracking-widest">
              <span className="flex items-center gap-2 bg-[var(--color-primary)] border-2 border-[var(--foreground)] px-3 py-1">
                <Calendar size={16} />
                {blog.date && (
                  <span>
                    {new Date(blog.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                )}
              </span>
              <div className="flex gap-2">
                {blog.tags?.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 border-2 border-[var(--foreground)] bg-[var(--color-accent)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <h1 className="font-playfair font-black text-5xl md:text-7xl mb-6 uppercase tracking-tight leading-none bg-[var(--foreground)] text-[var(--background)] inline-block px-4 py-2">
              {blog.title}
            </h1>
            <p className="font-inter text-xl md:text-2xl font-medium leading-relaxed max-w-2xl mt-4">
              {blog.description}
            </p>
          </div>
        </FadeInUp>

        {/* Local markdown content */}
        <FadeInUp delay={0.2}>
          {md ? (
            <article className="prose prose-lg prose-headings:font-playfair prose-headings:font-black prose-headings:uppercase prose-p:font-inter prose-p:font-medium max-w-none mb-16 brutal-card p-8 md:p-12 bg-white relative">
              <div className="absolute top-8 right-8 p-4 opacity-10 pointer-events-none">
                <Terminal size={120} />
              </div>
              <div className="relative z-10 text-[var(--foreground)] leading-relaxed whitespace-pre-wrap">
                {md.content}
              </div>
            </article>
          ) : (
            <div className="brutal-card p-12 bg-white text-center font-playfair font-black text-4xl uppercase tracking-tighter mb-16">
               DATA_PAYLOAD_MISSING
            </div>
          )}
        </FadeInUp>

        {/* External links */}
        <FadeInUp delay={0.3}>
          <div className="flex flex-wrap gap-6 pt-8">
            {blog.linkedin && (
              <a
                href={blog.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-4 bg-[#0077b5] text-white font-bold uppercase tracking-widest border-4 border-transparent hover:border-[#0077b5] hover:bg-white hover:text-[#0077b5] brutal-shadow transition-all group"
              >
                <Linkedin size={20} /> Read on LinkedIn
              </a>
            )}
            {blog.github && (
              <a
                href={blog.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-4 bg-[var(--foreground)] text-[var(--background)] font-bold uppercase tracking-widest border-4 border-[var(--foreground)] hover:bg-white hover:text-[var(--foreground)] brutal-shadow transition-all group"
              >
                <Github size={20} /> View on GitHub
              </a>
            )}
          </div>
        </FadeInUp>
      </main>
    </div>
  );
}
