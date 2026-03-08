import { Card } from "pixel-retroui";
import PageIntro from "@/components/simple-site/PageIntro";
import ProjectCard from "@/components/simple-site/ProjectCard";
import RetroLinkButton from "@/components/simple-site/RetroLinkButton";
import Reveal from "@/components/simple-site/Reveal";
import { getPortfolioData } from "@/data/loader";
import { getSortedProjects, isPublicAssetAvailable } from "@/lib/simple-site";
import { RETRO_CARD_PROPS } from "@/components/simple-site/theme";

export default function ProjectsPage() {
  const data = getPortfolioData();
  const projects = getSortedProjects(data);

  return (
    <div>
      <PageIntro
        label="Project Archive"
        title="All production logs"
        summary="From shipped Android releases to in-development PC titles, with gameplay systems and optimization notes for each build."
        aside={
          <div className="simple-timeline">
            <p>{projects.length} tracked projects.</p>
            <p>Focus: modular Unity architecture and stable runtime performance.</p>
            <RetroLinkButton href="/simple/games" variant="primary">
              View as Games Catalog
            </RetroLinkButton>
          </div>
        }
      />

      <section className="simple-section">
        <Reveal>
          <Card {...RETRO_CARD_PROPS} className="simple-retro-card simple-section-banner">
            <p className="simple-kicker">Sorted by year then title</p>
          </Card>
        </Reveal>

        <div className="simple-grid simple-grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id ?? project.name}
              project={project}
              hrefBase="/simple/projects"
              hasCover={isPublicAssetAvailable(project.cover)}
              revealDelay={index * 0.05}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
