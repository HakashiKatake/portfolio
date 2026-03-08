import PageIntro from "@/components/simple-site/PageIntro";
import ProjectCard from "@/components/simple-site/ProjectCard";
import { getPortfolioData } from "@/data/loader";
import { getGameProjects, hasPlayableBuild, isPublicAssetAvailable } from "@/lib/simple-site";

export default function GamesPage() {
  const data = getPortfolioData();
  const games = getGameProjects(data);
  const playableCount = games.filter((project) => hasPlayableBuild(project)).length;

  return (
    <div>
      <PageIntro
        label="Games Index"
        title="Playable experiments and jam submissions."
        summary="This section focuses on game builds first. Every item links to a full game detail page with context and release notes."
        aside={
          <div className="simple-timeline">
            <p>{games.length} game pages</p>
            <p>{playableCount} with playable builds</p>
          </div>
        }
      />

      <section className="simple-section">
        <h2 className="simple-section-title">Game Catalog</h2>
        <div className="simple-grid simple-grid-cols-3">
          {games.map((project) => (
            <ProjectCard
              key={project.id ?? project.name}
              project={project}
              hrefBase="/simple/games"
              hasCover={isPublicAssetAvailable(project.cover)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
