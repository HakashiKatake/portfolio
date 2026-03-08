import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Bubble,
  Card,
  ProgressBar,
} from "pixel-retroui";
import PageIntro from "@/components/simple-site/PageIntro";
import { getPortfolioData } from "@/data/loader";
import { RETRO_CARD_PROPS, RETRO_THEME } from "@/components/simple-site/theme";

function levelToProgress(level: string): number {
  const normalized = level.toLowerCase();
  if (normalized.includes("advanced") || normalized.includes("expert")) {
    return 90;
  }

  if (normalized.includes("intermediate") || normalized.includes("proficient")) {
    return 65;
  }

  return 45;
}

export default function AboutPage() {
  const data = getPortfolioData();

  return (
    <div>
      <PageIntro
        label="About"
        title="Mechanics-first game developer"
        summary={data.about.bio}
        aside={
          <div className="simple-timeline">
            <p>{data.about.location}</p>
            <p>{data.meta?.title ?? data.title}</p>
          </div>
        }
      />

      <section className="simple-section">
        <h2 className="simple-section-title">Skill Matrix</h2>
        <div className="simple-grid simple-grid-cols-2">
          {data.skills.map((skill) => (
            <Card key={skill.name} {...RETRO_CARD_PROPS} className="simple-retro-card">
              <div className="simple-card-content">
                <p className="simple-kicker">{skill.level}</p>
                <h3 className="simple-card-title">{skill.name}</h3>
                <p className="simple-card-text">{skill.description ?? "No description available."}</p>
                <ProgressBar progress={levelToProgress(skill.level)} color={RETRO_THEME.border} borderColor={RETRO_THEME.muted} />
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="simple-section simple-two-col">
        <Card {...RETRO_CARD_PROPS} className="simple-retro-card">
          <div className="simple-card-content">
            <h2 className="simple-section-title">Game Jam Timeline</h2>
            <Accordion
              collapsible
              bg={RETRO_THEME.panelAlt}
              textColor={RETRO_THEME.text}
              borderColor={RETRO_THEME.border}
              shadowColor={RETRO_THEME.shadow}
            >
              {data.gameJams.map((jam, index) => (
                <AccordionItem
                  key={`${jam.name}-${jam.year}`}
                  value={`jam-${index}`}
                  bg={RETRO_THEME.panelAlt}
                  textColor={RETRO_THEME.text}
                  borderColor={RETRO_THEME.border}
                >
                  <AccordionTrigger>
                    {jam.year ?? "Year N/A"} • {jam.name}
                  </AccordionTrigger>
                  <AccordionContent>
                    {jam.project}
                    {jam.role ? ` — ${jam.role}` : ""}
                    {jam.result ? ` (${jam.result})` : ""}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Card>

        <Card {...RETRO_CARD_PROPS} className="simple-retro-card">
          <div className="simple-card-content">
            <h2 className="simple-section-title">Favorite Games</h2>
            {data.favoriteGames.map((game, index) => (
              <Bubble
                key={game}
                direction={index % 2 === 0 ? "left" : "right"}
                bg={RETRO_THEME.bubbleBg}
                textColor={RETRO_THEME.text}
                borderColor={RETRO_THEME.border}
                className="simple-favorite-bubble"
              >
                {game}
              </Bubble>
            ))}

            <h3 className="simple-kicker">Achievements</h3>
            <ul className="simple-article-list">
              {data.achievements.map((achievement) => (
                <li key={`${achievement.title}-${achievement.year}`}>
                  {achievement.year} • {achievement.title}
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </section>
    </div>
  );
}
