import { Card } from "pixel-retroui";
import { notFound } from "next/navigation";
import PageIntro from "@/components/simple-site/PageIntro";
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
      </section>

      <section className="simple-section simple-two-col">
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
            </div>
          </div>
        </Card>

        <Card {...RETRO_CARD_PROPS} className="simple-retro-card">
          <div className="simple-card-content">
            <h2 className="simple-section-title">External Links</h2>
            <div className="simple-button-row">
              {project.demo ? (
                <RetroLinkButton href={project.demo} variant="primary" newTab>
                  Play Now
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
              {!project.demo && !project.github && !project.linkedin ? <p className="simple-card-text">No external links published for this game.</p> : null}
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
