import Link from "next/link";
import { notFound } from "next/navigation";
import PageIntro from "@/components/simple-site/PageIntro";
import { getPortfolioData } from "@/data/loader";
import {
  getGameProjects,
  getProjectById,
  hasPlayableBuild,
  isPublicAssetAvailable,
  resolveProjectId,
} from "@/lib/simple-site";

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
            <Link href="/simple/games" className="simple-action simple-focus-ring">
              Back to Games
            </Link>
          </div>
        }
      />

      <section className="simple-section">
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
      </section>

      <section className="simple-section">
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
      </section>

      <section className="simple-section">
        <h2 className="simple-section-title">External Links</h2>
        <div className="simple-action-row">
          {project.demo ? (
            <a href={project.demo} target="_blank" rel="noreferrer" className="simple-action simple-focus-ring">
              Play Now
            </a>
          ) : null}
          {project.github ? (
            <a href={project.github} target="_blank" rel="noreferrer" className="simple-action simple-focus-ring">
              Source Code
            </a>
          ) : null}
          {project.linkedin ? (
            <a href={project.linkedin} target="_blank" rel="noreferrer" className="simple-action simple-focus-ring">
              LinkedIn Post
            </a>
          ) : null}
          {!project.demo && !project.github && !project.linkedin ? (
            <p className="simple-section-text">No external links published for this game.</p>
          ) : null}
        </div>
      </section>
    </div>
  );
}
