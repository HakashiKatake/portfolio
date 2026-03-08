import { getPortfolioData } from "@/data/loader";
import Link from "next/link";
import { Calendar, ChevronRight, BookOpen } from "lucide-react";
import FadeInUp from "@/components/FadeInUp";

export default async function BlogListPage() {
  const data = await getPortfolioData();
  const blogs = data.blogs ?? [];

  return (
    <div className="flex flex-col w-full min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      
      {/* Header */}
      <div className="w-full pt-20 pb-16 px-8 border-b-4 border-[var(--foreground)] bg-[var(--color-primary)]">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-4">
          <FadeInUp>
            <span className="flex items-center gap-2 font-inter font-bold uppercase tracking-[0.2em] bg-[var(--background)] text-[var(--foreground)] px-3 py-1 border-2 border-[var(--foreground)] shadow-[4px_4px_0px_var(--foreground)]">
              <BookOpen size={16} />
              Dir: /blog
            </span>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h1 className="font-playfair font-black text-6xl md:text-8xl lg:text-9xl uppercase tracking-tighter mix-blend-multiply">
              Transmission Logs
            </h1>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <div className="font-inter font-bold uppercase tracking-widest bg-[var(--background)] px-4 py-2 border-2 border-[var(--foreground)] mt-4">
              Game Dev, Design, and Engineering
            </div>
          </FadeInUp>
        </div>
      </div>

      {/* Main Grid */}
      <main className="w-full max-w-5xl mx-auto px-8 py-16 pb-32">
        {blogs.length === 0 ? (
          <FadeInUp>
            <div className="brutal-card p-16 text-center flex flex-col items-center justify-center gap-4 bg-white">
              <BookOpen size={48} />
              <p className="font-playfair font-black text-4xl uppercase tracking-tight">No transmission logged yet.</p>
            </div>
          </FadeInUp>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogs.map((blog, index) => {
              const slug = blog.slug ?? blog.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
              return (
                <FadeInUp key={slug} delay={index * 0.1}>
                  <Link href={`/simple/blog/${slug}`} className="group block focus:outline-none h-full">
                    <div className="brutal-card p-8 bg-white h-full flex flex-col transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1 group-hover:shadow-[8px_8px_0px_var(--foreground)] group-focus:-translate-y-1 group-focus:-translate-x-1 group-focus:shadow-[8px_8px_0px_var(--foreground)]">
                      
                      <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-widest mb-6 border-b-2 border-[var(--foreground)] pb-4">
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
                        <div className="ml-auto flex gap-2">
                          {blog.tags?.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 border-2 border-[var(--foreground)] bg-[var(--color-accent)]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <h2 className="font-playfair font-black text-3xl mb-4 uppercase tracking-tight leading-none group-hover:underline decoration-4 underline-offset-4">
                        {blog.title}
                      </h2>
                      
                      <p className="font-inter text-base font-medium leading-relaxed mb-8 flex-1">
                        {blog.description}
                      </p>
                      
                      <div className="mt-auto pt-6 border-t-2 border-dashed border-[var(--foreground)] flex justify-end">
                         <span className="flex items-center gap-2 font-inter font-bold uppercase tracking-widest group-hover:bg-[var(--foreground)] group-hover:text-[var(--background)] px-3 py-1 transition-colors">
                           Read Sequence <ChevronRight size={16} />
                         </span>
                      </div>
                    </div>
                  </Link>
                </FadeInUp>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
