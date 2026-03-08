import PageIntro from "@/components/simple-site/PageIntro";
import { getPortfolioData } from "@/data/loader";

export default function AboutPage() {
  const data = getPortfolioData();

  return (
    <div>
      <PageIntro
        label="About"
        title="Game developer focused on mechanics and rapid iteration."
        summary={data.about.bio}
        aside={
          <div className="simple-timeline">
            <p>{data.about.location}</p>
            <p>{data.meta?.title ?? data.title}</p>
          </div>
        }
      />

      <section className="simple-section">
        <h2 className="simple-section-title">Skills</h2>
        <div className="simple-grid simple-grid-cols-3">
          {data.skills.map((skill) => (
            <article key={skill.name} className="simple-card">
              <div className="simple-card-content">
                <p className="simple-kicker">{skill.level}</p>
                <h3 className="simple-card-title">{skill.name}</h3>
                <p className="simple-card-text">{skill.description ?? "No description available."}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="simple-section">
        <h2 className="simple-section-title">Game Jam Timeline</h2>
        <div className="simple-timeline">
          {data.gameJams.map((jam) => (
            <article key={`${jam.name}-${jam.year}`} className="simple-timeline-item">
              <strong>
                {jam.year ?? "Year N/A"} • {jam.name}
              </strong>
              <p>
                {jam.project}
                {jam.role ? ` — ${jam.role}` : ""}
              </p>
              {jam.result ? <p>{jam.result}</p> : null}
            </article>
          ))}
        </div>
      </section>

      <section className="simple-section">
        <h2 className="simple-section-title">Achievements</h2>
        <div className="simple-timeline">
          {data.achievements.map((achievement) => (
            <article key={`${achievement.title}-${achievement.year}`} className="simple-timeline-item">
              <strong>{achievement.year}</strong>
              <p>{achievement.title}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="simple-section">
        <h2 className="simple-section-title">Favorite Games</h2>
        <div className="simple-tag-row">
          {data.favoriteGames.map((game) => (
            <span key={game} className="simple-tag">
              {game}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
