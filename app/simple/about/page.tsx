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
import Reveal from "@/components/simple-site/Reveal";
import RetroLinkButton from "@/components/simple-site/RetroLinkButton";
import TestimonialCard from "@/components/simple-site/TestimonialCard";
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
  const experience = data.experience ?? [];
  const certifications = data.certifications ?? [];
  const education = data.education ?? [];
  const resumes = data.resumes ?? [];
  const highlights = data.resumeHighlights ?? [];
  const careerTimeline = data.careerTimeline ?? [];
  const testimonials = data.testimonials ?? [];

  return (
    <div>
      <PageIntro
        label="About"
        title="Unity and game developer profile"
        summary={data.about.bio}
        aside={
          <div className="simple-timeline">
            <p>{data.about.location}</p>
            <p>{data.meta?.title ?? data.title}</p>
            {highlights.slice(0, 2).map((highlight) => (
              <p key={highlight.label}>
                {highlight.label}: {highlight.value}
              </p>
            ))}
          </div>
        }
      />

      {careerTimeline.length ? (
        <section className="simple-section">
          <Reveal>
            <h2 className="simple-section-title">Career Timeline</h2>
          </Reveal>
          <div className="simple-career-timeline">
            {careerTimeline.map((item, index) => (
              <Reveal
                key={`${item.title}-${item.period}`}
                delay={index * 0.05}
                className={index % 2 === 0 ? "simple-timeline-entry simple-timeline-entry-left" : "simple-timeline-entry simple-timeline-entry-right"}
              >
                <div className="simple-timeline-center" aria-hidden="true">
                  <span className="simple-timeline-dot" />
                </div>
                <Card {...RETRO_CARD_PROPS} className="simple-retro-card simple-timeline-card">
                  <div className="simple-card-content">
                    <p className="simple-kicker">{item.period}</p>
                    <h3 className="simple-card-title">
                      {item.title} • {item.organization}
                    </h3>
                    <p className="simple-card-text">
                      {[item.type, item.location].filter(Boolean).join(" • ")}
                    </p>
                    <p className="simple-card-text">{item.summary}</p>
                    {item.highlights?.length ? (
                      <ul className="simple-article-list">
                        {item.highlights.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      {testimonials.length ? (
        <section className="simple-section simple-testimonial-showcase">
          <Reveal>
            <h2 className="simple-section-title">Recommendations</h2>
          </Reveal>
          <div className="simple-grid simple-grid-cols-2">
            {testimonials.map((item, index) => (
              <Reveal key={`${item.name}-${item.date ?? index}`} delay={index * 0.05}>
                <TestimonialCard testimonial={item} />
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      {experience.length ? (
        <section className="simple-section">
          <Reveal>
            <h2 className="simple-section-title">Professional Experience</h2>
          </Reveal>
          <div className="simple-grid simple-grid-cols-2">
            {experience.map((item, index) => (
              <Reveal key={`${item.company}-${item.period}`} delay={index * 0.06}>
                <Card {...RETRO_CARD_PROPS} className="simple-retro-card">
                  <div className="simple-card-content">
                    <p className="simple-kicker">{item.period}</p>
                    <h3 className="simple-card-title">
                      {item.role} • {item.company}
                    </h3>
                    {item.location ? <p className="simple-card-text">{item.location}</p> : null}
                    <ul className="simple-article-list">
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      <section className="simple-section">
        <Reveal>
          <h2 className="simple-section-title">Skill Matrix</h2>
        </Reveal>
        <div className="simple-grid simple-grid-cols-2">
          {data.skills.map((skill, index) => (
            <Reveal key={skill.name} delay={index * 0.05}>
              <Card {...RETRO_CARD_PROPS} className="simple-retro-card">
                <div className="simple-card-content">
                  <p className="simple-kicker">{skill.level}</p>
                  <h3 className="simple-card-title">{skill.name}</h3>
                  <p className="simple-card-text">{skill.description ?? "No description available."}</p>
                  <ProgressBar progress={levelToProgress(skill.level)} color={RETRO_THEME.border} borderColor={RETRO_THEME.muted} />
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="simple-section simple-two-col">
        <Reveal>
          <Card {...RETRO_CARD_PROPS} className="simple-retro-card">
            <div className="simple-card-content">
              <h2 className="simple-section-title">Certifications & Education</h2>
              <ul className="simple-article-list">
                {certifications.map((cert) => (
                  <li key={cert.title}>
                    {cert.title}
                    {cert.issuer ? ` — ${cert.issuer}` : ""}
                    {cert.status ? ` (${cert.status})` : ""}
                  </li>
                ))}
              </ul>
              <h3 className="simple-kicker">Education</h3>
              <ul className="simple-article-list">
                {education.map((item) => (
                  <li key={`${item.degree}-${item.institution}`}>
                    {item.degree} • {item.institution}
                    {item.expected ? ` — ${item.expected}` : ""}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.1}>
          <Card {...RETRO_CARD_PROPS} className="simple-retro-card">
            <div className="simple-card-content">
              <h2 className="simple-section-title">Resume Downloads</h2>
              <div className="simple-resume-list">
                {resumes.map((resume) => (
                  <div key={resume.url} className="simple-resume-item">
                    <p className="simple-kicker">{resume.label}</p>
                    {resume.focus ? <p className="simple-card-text">{resume.focus}</p> : null}
                    <RetroLinkButton href={resume.url} variant="primary" newTab>
                      Open PDF
                    </RetroLinkButton>
                  </div>
                ))}
              </div>

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
        </Reveal>
      </section>

      <section className="simple-section simple-two-col">
        <Reveal>
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
        </Reveal>

        <Reveal delay={0.1}>
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
            </div>
          </Card>
        </Reveal>
      </section>
    </div>
  );
}
