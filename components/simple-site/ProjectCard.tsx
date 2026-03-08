import type { Project } from "@/components/types";
import RetroLinkButton from "@/components/simple-site/RetroLinkButton";
import { resolveProjectId } from "@/lib/simple-site";
import { Card } from "pixel-retroui";
import { RETRO_CARD_PROPS } from "@/components/simple-site/theme";

interface ProjectCardProps {
  project: Project;
  hrefBase: "/simple/projects" | "/simple/games";
  hasCover: boolean;
}

export default function ProjectCard({ project, hrefBase, hasCover }: ProjectCardProps) {
  const slug = resolveProjectId(project);
  const linkPath = `${hrefBase}/${slug}`;

  return (
    <Card {...RETRO_CARD_PROPS} className="simple-retro-card simple-project-card">
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

      <div className="simple-card-content">
        <p className="simple-kicker">{project.year ?? "Year N/A"}</p>
        <h2 className="simple-card-title">{project.name}</h2>
        <p className="simple-card-text">{project.description}</p>
        <div className="simple-meta-row">
          <span>{project.engine}</span>
          <span>{project.category}</span>
        </div>
        <RetroLinkButton href={linkPath} variant="primary" className="simple-card-button">
          Open Build Log
        </RetroLinkButton>
      </div>
    </Card>
  );
}
