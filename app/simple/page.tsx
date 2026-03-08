import { Card, ProgressBar } from "pixel-retroui";
import PageIntro from "@/components/simple-site/PageIntro";
import ProjectCard from "@/components/simple-site/ProjectCard";
import BlogCard from "@/components/simple-site/BlogCard";
import RetroLinkButton from "@/components/simple-site/RetroLinkButton";
import { getPortfolioData } from "@/data/loader";
import {
  getFeaturedProjects,
  getProjectStats,
  getSortedBlogs,
  isPublicAssetAvailable,
} from "@/lib/simple-site";
import { RETRO_CARD_PROPS, RETRO_THEME } from "@/components/simple-site/theme";

export default function SimpleHomePage() {
  const data = getPortfolioData();
  const featuredProjects = getFeaturedProjects(data).slice(0, 6);
  const latestBlogs = getSortedBlogs(data).slice(0, 2);
  const stats = getProjectStats(data);

  const projectCoverage = Math.min(100, Math.round((featuredProjects.length / Math.max(1, stats.totalProjects)) * 100));

  return (
    <div>
      <PageIntro
        label="Studio Hub"
        title="Pixel-forged game dev portfolio"
        summary={data.about.bio}
        aside={
          <div className="simple-timeline">
            <p>Choose your route: playable games, full project logs, or engineering writeups.</p>
            <div className="simple-button-row">
              <RetroLinkButton href="/simple/games" variant="primary">
                Open Games
              </RetroLinkButton>
              <RetroLinkButton href="/simple/projects">Open Projects</RetroLinkButton>
            </div>
          </div>
        }
      />

      <section className="simple-stats">
        <Card {...RETRO_CARD_PROPS} className="simple-retro-card simple-stat-card">
          <strong>{stats.totalProjects}</strong>
          <span>Total Projects</span>
        </Card>
        <Card {...RETRO_CARD_PROPS} className="simple-retro-card simple-stat-card">
          <strong>{stats.totalGames}</strong>
          <span>Game Pages</span>
        </Card>
        <Card {...RETRO_CARD_PROPS} className="simple-retro-card simple-stat-card">
          <strong>{stats.totalBlogs}</strong>
          <span>Blog Posts</span>
        </Card>
        <Card {...RETRO_CARD_PROPS} className="simple-retro-card simple-stat-card">
          <strong>{stats.totalJams}</strong>
          <span>Game Jams</span>
        </Card>
      </section>

      <section className="simple-section">
        <div className="simple-section-head">
          <h2 className="simple-section-title">Featured Builds</h2>
          <RetroLinkButton href="/simple/projects">Browse Full Archive</RetroLinkButton>
        </div>

        <Card {...RETRO_CARD_PROPS} className="simple-retro-card simple-progress-card">
          <p className="simple-kicker">Featured Coverage</p>
          <ProgressBar progress={projectCoverage} color={RETRO_THEME.border} borderColor={RETRO_THEME.muted} />
        </Card>

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
        <div className="simple-section-head">
          <h2 className="simple-section-title">Latest Dev Logs</h2>
          <RetroLinkButton href="/simple/blog">Read Blog</RetroLinkButton>
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
