import { Card } from "pixel-retroui";
import PageIntro from "@/components/simple-site/PageIntro";
import ProjectCard from "@/components/simple-site/ProjectCard";
import RetroLinkButton from "@/components/simple-site/RetroLinkButton";
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
        summary="From mobile prototypes to jam submissions and long-running personal builds."
        aside={
          <div className="simple-timeline">
            <p>{projects.length} tracked projects.</p>
            <RetroLinkButton href="/simple/games" variant="primary">
              View as Games Catalog
            </RetroLinkButton>
          </div>
        }
      />

      <section className="simple-section">
        <Card {...RETRO_CARD_PROPS} className="simple-retro-card simple-section-banner">
          <p className="simple-kicker">Sorted by year then title</p>
        </Card>

        <div className="simple-grid simple-grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id ?? project.name}
              project={project}
              hrefBase="/simple/projects"
              hasCover={isPublicAssetAvailable(project.cover)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
