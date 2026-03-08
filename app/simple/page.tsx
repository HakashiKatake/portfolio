import { Card, ProgressBar } from "pixel-retroui";
import PageIntro from "@/components/simple-site/PageIntro";
import ProjectCard from "@/components/simple-site/ProjectCard";
import BlogCard from "@/components/simple-site/BlogCard";
import RetroLinkButton from "@/components/simple-site/RetroLinkButton";
import Reveal from "@/components/simple-site/Reveal";
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
  const resumeHighlights = data.resumeHighlights ?? [];
  const introImage = data.about.avatar && isPublicAssetAvailable(data.about.avatar) ? data.about.avatar : null;

  const projectCoverage = Math.min(100, Math.round((featuredProjects.length / Math.max(1, stats.totalProjects)) * 100));
  const statCards = [
    { label: "Total Projects", value: stats.totalProjects },
    { label: "Game Pages", value: stats.totalGames },
    { label: "Blog Posts", value: stats.totalBlogs },
    { label: "Game Jams", value: stats.totalJams },
  ];

  return (
    <div>
      <PageIntro
        label="Studio Hub"
        title={`${data.meta?.title ?? data.title} Portfolio`}
        summary={data.about.bio}
        asideClassName="simple-intro-aside-image"
        aside={
          <div className="simple-intro-image-slot">
            {introImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={introImage} alt={`${data.name} portrait`} className="simple-intro-image" />
            ) : (
              <div className="simple-intro-image-empty" aria-hidden="true" />
            )}
          </div>
        }
      />

      {resumeHighlights.length ? (
        <section className="simple-section simple-home-highlights">
          <Reveal>
            <h2 className="simple-section-title">Resume Highlights</h2>
          </Reveal>
          <div className="simple-grid simple-grid-cols-2">
            {resumeHighlights.map((highlight, index) => (
              <Reveal key={highlight.label} delay={index * 0.05}>
                <Card {...RETRO_CARD_PROPS} className="simple-retro-card">
                  <div className="simple-card-content">
                    <p className="simple-kicker">{highlight.label}</p>
                    <p className="simple-card-text">{highlight.value}</p>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      <section className="simple-stats simple-home-stats">
        {statCards.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 0.05}>
            <Card {...RETRO_CARD_PROPS} className="simple-retro-card simple-stat-card">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </Card>
          </Reveal>
        ))}
      </section>

      <section className="simple-section">
        <Reveal>
          <div className="simple-section-head">
            <h2 className="simple-section-title">Featured Builds</h2>
            <RetroLinkButton href="/simple/projects">Browse Full Archive</RetroLinkButton>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <Card {...RETRO_CARD_PROPS} className="simple-retro-card simple-progress-card">
            <p className="simple-kicker">Featured Coverage</p>
            <ProgressBar progress={projectCoverage} color={RETRO_THEME.border} borderColor={RETRO_THEME.muted} />
          </Card>
        </Reveal>

        <div className="simple-grid simple-grid-cols-3">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.id ?? project.name}
              project={project}
              hrefBase="/simple/projects"
              hasCover={isPublicAssetAvailable(project.cover)}
              revealDelay={index * 0.06}
            />
          ))}
        </div>
      </section>

      <section className="simple-section">
        <Reveal>
          <div className="simple-section-head">
            <h2 className="simple-section-title">Latest Dev Logs</h2>
            <RetroLinkButton href="/simple/blog">Read Blog</RetroLinkButton>
          </div>
        </Reveal>

        <div className="simple-grid simple-grid-cols-2">
          {latestBlogs.map((blog, index) => (
            <BlogCard key={blog.slug ?? blog.title} blog={blog} revealDelay={index * 0.08} />
          ))}
        </div>
      </section>
    </div>
  );
}
