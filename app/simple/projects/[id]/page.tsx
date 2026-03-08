import { Bubble, Card } from "pixel-retroui";
import { notFound } from "next/navigation";
import PageIntro from "@/components/simple-site/PageIntro";
import RetroLinkButton from "@/components/simple-site/RetroLinkButton";
import { getPortfolioData } from "@/data/loader";
import {
  getProjectById,
  getSortedProjects,
  hasPlayableBuild,
  isPublicAssetAvailable,
  resolveProjectId,
} from "@/lib/simple-site";
import { RETRO_CARD_PROPS, RETRO_THEME } from "@/components/simple-site/theme";

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  const data = getPortfolioData();
  return getSortedProjects(data).map((project) => ({ id: resolveProjectId(project) }));
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
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
        label="Project Detail"
        title={project.name}
        summary={project.description}
        aside={
          <div className="simple-timeline">
            <p>{project.year ? `Released ${project.year}` : "Year unavailable"}</p>
            <p>{project.engine}</p>
            <p>{project.category}</p>
            <RetroLinkButton href="/simple/projects" variant="primary">
              Back to Projects
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
            <h2 className="simple-section-title">Build Summary</h2>
            <div className="simple-strip">
              <div className="simple-strip-row">
                <span>Engine</span>
                <span>{project.engine}</span>
              </div>
              <div className="simple-strip-row">
                <span>Platform</span>
                <span>{(project.platform ?? []).join(", ") || "Not specified"}</span>
              </div>
              <div className="simple-strip-row">
                <span>Role</span>
                <span>{project.role ?? "Not specified"}</span>
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
            <h2 className="simple-section-title">What I Learned</h2>
            <Bubble
              direction="right"
              bg={RETRO_THEME.bubbleBg}
              textColor={RETRO_THEME.text}
              borderColor={RETRO_THEME.border}
              className="simple-detail-bubble"
            >
              {project.whatILearned ?? "No reflection added for this project yet."}
            </Bubble>

            <h3 className="simple-kicker">Links</h3>
            <div className="simple-button-row">
              {hasPlayableBuild(project) ? (
                <RetroLinkButton href={project.demo} variant="primary" newTab>
                  Play Build
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
              {!project.demo && !project.github && !project.linkedin ? <p className="simple-card-text">No external links published.</p> : null}
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
