import { Card } from "pixel-retroui";
import { notFound } from "next/navigation";
import PageIntro from "@/components/simple-site/PageIntro";
import Reveal from "@/components/simple-site/Reveal";
import RetroLinkButton from "@/components/simple-site/RetroLinkButton";
import { getPortfolioData } from "@/data/loader";
import {
  getGameProjects,
  getProjectById,
  hasPlayableBuild,
  isPublicAssetAvailable,
  resolveProjectId,
} from "@/lib/simple-site";
import { RETRO_CARD_PROPS } from "@/components/simple-site/theme";

interface GameDetailPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  const data = getPortfolioData();
  return getGameProjects(data).map((project) => ({ id: resolveProjectId(project) }));
}

export default async function GameDetailPage({ params }: GameDetailPageProps) {
  const { id } = await params;
  const data = getPortfolioData();
  const project = getProjectById(data, id);

  if (!project) {
    notFound();
  }

  const hasCover = isPublicAssetAvailable(project.cover);
  const learning = project.learning;
  const engagement = project.engagement ?? (project.teamSize && project.teamSize > 1 ? "team" : "personal");
  const learningSections = [
    { title: "Concepts", items: learning?.concepts ?? [] },
    { title: "Challenges", items: learning?.challenges ?? [] },
    { title: "Mechanics", items: learning?.mechanics ?? [] },
    { title: "Lessons", items: learning?.lessons ?? [] },
    { title: "Results", items: learning?.results ?? [] },
  ].filter((section) => section.items.length > 0);

  return (
    <div>
      <PageIntro
        label="Game Detail"
        title={project.name}
        summary={project.description}
        aside={
          <div className="simple-timeline">
            <p>{project.engine}</p>
            <p>{project.year ?? "Year unavailable"}</p>
            <p>{hasPlayableBuild(project) ? "Build available" : "No public build"}</p>
            <RetroLinkButton href="/simple/games" variant="primary">
              Back to Games
            </RetroLinkButton>
          </div>
        }
      />

      <section className="simple-section">
        <Reveal>
          <Card {...RETRO_CARD_PROPS} className="simple-retro-card">
            <div className="simple-media-frame" aria-hidden="true">
              {hasCover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={project.cover} alt="" className="simple-media-image" />
              ) : (
                <div className="simple-media-fallback">
                  <span>{project.name}</span>
                </div>
              )}
            </div>
          </Card>
        </Reveal>
      </section>

      <section className="simple-section simple-two-col">
        <Reveal>
          <Card {...RETRO_CARD_PROPS} className="simple-retro-card">
            <div className="simple-card-content">
              <h2 className="simple-section-title">Gameplay Notes</h2>
              <div className="simple-strip">
                <div className="simple-strip-row">
                  <span>Category</span>
                  <span>{project.category}</span>
                </div>
                <div className="simple-strip-row">
                  <span>Platform</span>
                  <span>{(project.platform ?? []).join(", ") || "Not specified"}</span>
                </div>
                <div className="simple-strip-row">
                  <span>Tools</span>
                  <span>{(project.tools ?? []).join(", ") || "Not specified"}</span>
                </div>
                <div className="simple-strip-row">
                  <span>Context</span>
                  <span>{engagement === "team" ? "Team Project" : "Personal Project"}</span>
                </div>
                {project.teamSize ? (
                  <div className="simple-strip-row">
                    <span>Team Size</span>
                    <span>{project.teamSize}</span>
                  </div>
                ) : null}
              </div>

              {project.responsibilities?.length ? (
                <div className="simple-learning-block">
                  <h3 className="simple-kicker">Responsibilities</h3>
                  <ul className="simple-article-list">
                    {project.responsibilities.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {project.whatILearned ? <p className="simple-card-text">{project.whatILearned}</p> : null}

              {learningSections.length ? (
                <div className="simple-learning-grid">
                  {learningSections.map((section) => (
                    <div key={section.title} className="simple-learning-block">
                      <h3 className="simple-kicker">{section.title}</h3>
                      <ul className="simple-article-list">
                        {section.items.map((item) => (
                          <li key={`${section.title}-${item}`}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.1}>
          <Card {...RETRO_CARD_PROPS} className="simple-retro-card">
            <div className="simple-card-content">
              <h2 className="simple-section-title">External Links</h2>
              <div className="simple-button-row">
                {project.demo ? (
                  <RetroLinkButton href={project.demo} variant="primary" newTab>
                    Play Now
                  </RetroLinkButton>
                ) : null}
                {project.links?.store ? (
                  <RetroLinkButton href={project.links.store} newTab>
                    Store Page
                  </RetroLinkButton>
                ) : null}
                {project.github ? (
                  <RetroLinkButton href={project.github} newTab>
                    Source Code
                  </RetroLinkButton>
                ) : null}
                {project.linkedin ? (
                  <RetroLinkButton href={project.linkedin} newTab>
                    LinkedIn Post
                  </RetroLinkButton>
                ) : null}
                {!project.demo && !project.links?.store && !project.github && !project.linkedin ? (
                  <p className="simple-card-text">No external links published for this game.</p>
                ) : null}
              </div>
            </div>
          </Card>
        </Reveal>
      </section>
    </div>
  );
}
