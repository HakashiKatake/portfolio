import { Card } from "pixel-retroui";
import PageIntro from "@/components/simple-site/PageIntro";
import ProjectCard from "@/components/simple-site/ProjectCard";
import RetroLinkButton from "@/components/simple-site/RetroLinkButton";
import { getPortfolioData } from "@/data/loader";
import { getGameProjects, hasPlayableBuild, isPublicAssetAvailable } from "@/lib/simple-site";
import { RETRO_CARD_PROPS } from "@/components/simple-site/theme";

export default function GamesPage() {
  const data = getPortfolioData();
  const games = getGameProjects(data);
  const playableCount = games.filter((project) => hasPlayableBuild(project)).length;

  return (
    <div>
      <PageIntro
        label="Games Index"
        title="Playable projects and jam entries"
        summary="Everything game-related in one pixel-grid catalog, with direct access to details and playable links."
        aside={
          <div className="simple-timeline">
            <p>{games.length} game pages</p>
            <p>{playableCount} with playable builds</p>
            <RetroLinkButton href="/simple/projects" variant="primary">
              View Full Project Archive
            </RetroLinkButton>
          </div>
        }
      />

      <section className="simple-section">
        <Card {...RETRO_CARD_PROPS} className="simple-retro-card simple-section-banner">
          <p className="simple-kicker">Game-first view of your complete portfolio</p>
        </Card>

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
