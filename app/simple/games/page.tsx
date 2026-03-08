import { Card } from "pixel-retroui";
import PageIntro from "@/components/simple-site/PageIntro";
import ProjectCard from "@/components/simple-site/ProjectCard";
import RetroLinkButton from "@/components/simple-site/RetroLinkButton";
import Reveal from "@/components/simple-site/Reveal";
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
        summary="Game-focused catalog of Unity and jam projects, including gameplay breakdowns, tools, platforms, and external play links."
        aside={
          <div className="simple-timeline">
            <p>{games.length} game pages</p>
            <p>{playableCount} with playable builds</p>
            <p>Coverage: Android launches, Steam-in-development, and game jam experiments.</p>
            <RetroLinkButton href="/simple/projects" variant="primary">
              View Full Project Archive
            </RetroLinkButton>
          </div>
        }
      />

      <section className="simple-section">
        <Reveal>
          <Card {...RETRO_CARD_PROPS} className="simple-retro-card simple-section-banner">
            <p className="simple-kicker">Game-first view of your complete portfolio</p>
          </Card>
        </Reveal>

        <div className="simple-grid simple-grid-cols-3">
          {games.map((project, index) => (
            <ProjectCard
              key={project.id ?? project.name}
              project={project}
              hrefBase="/simple/games"
              hasCover={isPublicAssetAvailable(project.cover)}
              revealDelay={index * 0.05}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
