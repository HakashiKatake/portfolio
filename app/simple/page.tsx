import { Card, ProgressBar } from "pixel-retroui";
import PageIntro from "@/components/simple-site/PageIntro";
import ProjectCard from "@/components/simple-site/ProjectCard";
import BlogCard from "@/components/simple-site/BlogCard";
import RetroLinkButton from "@/components/simple-site/RetroLinkButton";
import TestimonialCarousel from "@/components/simple-site/TestimonialCarousel";
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
  const testimonials = data.testimonials ?? [];
  const hireMe = data.hireMe;
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

      {hireMe ? (
        <section className="simple-section">
          <Reveal>
            <h2 className="simple-section-title">{hireMe.heading}</h2>
          </Reveal>

          <div className="simple-two-col">
            <Reveal>
              <Card {...RETRO_CARD_PROPS} className="simple-retro-card">
                <div className="simple-card-content">
                  <p className="simple-kicker">Availability</p>
                  <p className="simple-card-text">{hireMe.availability}</p>
                  {hireMe.mode ? <p className="simple-card-text">{hireMe.mode}</p> : null}
                  {(hireMe.preferredProjects ?? []).length ? (
                    <ul className="simple-article-list">
                      {(hireMe.preferredProjects ?? []).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                  <div className="simple-button-row">
                    <RetroLinkButton href="/simple/contact" variant="primary">
                      Start a Conversation
                    </RetroLinkButton>
                  </div>
                </div>
              </Card>
            </Reveal>

            <div className="simple-grid simple-grid-cols-2">
              {hireMe.services.map((service, index) => (
                <Reveal key={service.title} delay={index * 0.05}>
                  <Card {...RETRO_CARD_PROPS} className="simple-retro-card simple-hire-card">
                    <div className="simple-card-content">
                      <p className="simple-kicker">{service.title}</p>
                      <p className="simple-card-text">{service.details}</p>
                    </div>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

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

      {testimonials.length ? (
        <section className="simple-section simple-testimonial-showcase">
          <Reveal>
            <div className="simple-section-head">
              <h2 className="simple-section-title">Collaborator Recommendations</h2>
              <RetroLinkButton href="/simple/about">View All</RetroLinkButton>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <TestimonialCarousel testimonials={testimonials} />
          </Reveal>
        </section>
      ) : null}

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
