import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageIntro from "@/components/simple-site/PageIntro";
import MarkdownBlocks from "@/components/simple-site/MarkdownBlocks";
import { getPortfolioData } from "@/data/loader";
import { formatDate, getBlogBySlug, resolveBlogSlug } from "@/lib/simple-site";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

function loadMarkdown(slug: string): string | null {
  const markdownPath = path.join(process.cwd(), "data", "blog", `${slug}.md`);
  if (!fs.existsSync(markdownPath)) {
    return null;
  }

  const fileContent = fs.readFileSync(markdownPath, "utf-8");
  const parsed = matter(fileContent);
  return parsed.content.trim();
}

export function generateStaticParams() {
  const data = getPortfolioData();
  return data.blogs.map((blog) => ({ slug: resolveBlogSlug(blog) }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const data = getPortfolioData();
  const blog = getBlogBySlug(data, slug);

  if (!blog) {
    notFound();
  }

  const markdown = loadMarkdown(slug);

  return (
    <div>
      <PageIntro
        label="Blog Post"
        title={blog.title}
        summary={blog.description}
        aside={
          <div className="simple-timeline">
            <p>{formatDate(blog.date)}</p>
            <div className="simple-tag-row">
              {(blog.tags ?? []).map((tag) => (
                <span key={tag} className="simple-tag">
                  {tag}
                </span>
              ))}
            </div>
            <Link href="/simple/blog" className="simple-action simple-focus-ring">
              Back to Blog
            </Link>
          </div>
        }
      />

      <section className="simple-section">
        <h2 className="simple-section-title">Article</h2>
        {markdown ? <MarkdownBlocks content={markdown} /> : <p className="simple-section-text">Markdown content not found for this post.</p>}
      </section>

      <section className="simple-section">
        <h2 className="simple-section-title">References</h2>
        <div className="simple-action-row">
          {blog.linkedin ? (
            <a href={blog.linkedin} target="_blank" rel="noreferrer" className="simple-action simple-focus-ring">
              LinkedIn Post
            </a>
          ) : null}
          {blog.github ? (
            <a href={blog.github} target="_blank" rel="noreferrer" className="simple-action simple-focus-ring">
              GitHub Repo
            </a>
          ) : null}
          {!blog.linkedin && !blog.github ? <p className="simple-section-text">No reference links added.</p> : null}
        </div>
      </section>
    </div>
  );
}
