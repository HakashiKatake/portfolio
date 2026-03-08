import Link from "next/link";
import PageIntro from "@/components/simple-site/PageIntro";
import ProjectCard from "@/components/simple-site/ProjectCard";
import BlogCard from "@/components/simple-site/BlogCard";
import { getPortfolioData } from "@/data/loader";
import {
  getFeaturedProjects,
  getProjectStats,
  getSortedBlogs,
  isPublicAssetAvailable,
} from "@/lib/simple-site";

export default function SimpleHomePage() {
  const data = getPortfolioData();
  const featuredProjects = getFeaturedProjects(data).slice(0, 6);
  const latestBlogs = getSortedBlogs(data).slice(0, 2);
  const stats = getProjectStats(data);

  return (
    <div>
      <PageIntro
        label="Studio Portfolio"
        title="Game systems, shipped fast, documented clearly."
        summary={data.about.bio}
        aside={
          <div className="simple-timeline">
            <p>
              I build gameplay-first projects with an emphasis on readable architecture, clean loops, and quick iteration.
            </p>
            <div className="simple-action-row">
              <Link href="/simple/games" className="simple-action simple-focus-ring">
                Open Games
              </Link>
              <Link href="/simple/projects" className="simple-action simple-focus-ring">
                Open Projects
              </Link>
            </div>
          </div>
        }
      />

      <section className="simple-stats" aria-label="Portfolio stats">
        <article className="simple-stat">
          <strong>{stats.totalProjects}</strong>
          <span>Total Projects</span>
        </article>
        <article className="simple-stat">
          <strong>{stats.totalGames}</strong>
          <span>Game Pages</span>
        </article>
        <article className="simple-stat">
          <strong>{stats.totalBlogs}</strong>
          <span>Blog Posts</span>
        </article>
        <article className="simple-stat">
          <strong>{stats.totalJams}</strong>
          <span>Game Jams</span>
        </article>
      </section>

      <section className="simple-section">
        <div className="simple-strip-row">
          <h2 className="simple-section-title">Featured Builds</h2>
          <Link href="/simple/projects" className="simple-action simple-focus-ring">
            Browse Archive
          </Link>
        </div>
        <div className="simple-grid simple-grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id ?? project.name}
              project={project}
              hrefBase="/simple/projects"
              hasCover={isPublicAssetAvailable(project.cover)}
            />
          ))}
        </div>
      </section>

      <section className="simple-section">
        <div className="simple-strip-row">
          <h2 className="simple-section-title">Latest Writing</h2>
          <Link href="/simple/blog" className="simple-action simple-focus-ring">
            Read Blog
          </Link>
        </div>
        <div className="simple-grid simple-grid-cols-2">
          {latestBlogs.map((blog) => (
            <BlogCard key={blog.slug ?? blog.title} blog={blog} />
          ))}
        </div>
      </section>
    </div>
  );
}
