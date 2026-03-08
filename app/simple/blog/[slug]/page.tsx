import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Card } from "pixel-retroui";
import { notFound } from "next/navigation";
import PageIntro from "@/components/simple-site/PageIntro";
import MarkdownBlocks from "@/components/simple-site/MarkdownBlocks";
import Reveal from "@/components/simple-site/Reveal";
import RetroLinkButton from "@/components/simple-site/RetroLinkButton";
import { getPortfolioData } from "@/data/loader";
import { formatDate, getBlogBySlug, resolveBlogSlug } from "@/lib/simple-site";
import { RETRO_CARD_PROPS } from "@/components/simple-site/theme";

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
            <RetroLinkButton href="/simple/blog" variant="primary">
              Back to Blog
            </RetroLinkButton>
          </div>
        }
      />

      <section className="simple-section">
        <Reveal>
          <Card {...RETRO_CARD_PROPS} className="simple-retro-card">
            <div className="simple-card-content">
              <h2 className="simple-section-title">Article</h2>
              {markdown ? <MarkdownBlocks content={markdown} /> : <p className="simple-section-text">Markdown content not found for this post.</p>}
            </div>
          </Card>
        </Reveal>
      </section>

      <section className="simple-section">
        <Reveal delay={0.1}>
          <Card {...RETRO_CARD_PROPS} className="simple-retro-card">
            <div className="simple-card-content">
              <h2 className="simple-section-title">References</h2>
              <div className="simple-button-row">
                {blog.linkedin ? (
                  <RetroLinkButton href={blog.linkedin} variant="primary" newTab>
                    LinkedIn Post
                  </RetroLinkButton>
                ) : null}
                {blog.github ? (
                  <RetroLinkButton href={blog.github} newTab>
                    GitHub Repo
                  </RetroLinkButton>
                ) : null}
                {!blog.linkedin && !blog.github ? <p className="simple-section-text">No reference links added.</p> : null}
              </div>
            </div>
          </Card>
        </Reveal>
      </section>
    </div>
  );
}
