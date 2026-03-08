import { Card } from "pixel-retroui";
import PageIntro from "@/components/simple-site/PageIntro";
import RetroLinkButton from "@/components/simple-site/RetroLinkButton";
import Reveal from "@/components/simple-site/Reveal";
import ContactForm from "@/components/simple-site/ContactForm";
import { getPortfolioData } from "@/data/loader";
import { RETRO_CARD_PROPS } from "@/components/simple-site/theme";

export default function ContactPage() {
  const data = getPortfolioData();
  const resumes = data.resumes ?? [];
  const hireMe = data.hireMe;
  const focusRows = (data.skills ?? []).slice(0, 4).map((skill) => ({
    label: skill.name,
    value: skill.description ?? skill.level,
  }));

  return (
    <div>
      <PageIntro
        label="Contact"
        title="Open for game development collaboration"
        summary="Reach out for Unity gameplay programming, optimization passes, game jam collaborations, or prototype-to-release support."
        aside={
          <div className="simple-timeline">
            <p>Best response channel: email.</p>
            {data.contact.website ? <p>Studio: {data.contact.website}</p> : null}
          </div>
        }
      />

      <section className="simple-section simple-two-col">
        <Reveal>
          <Card {...RETRO_CARD_PROPS} className="simple-retro-card">
            <div className="simple-card-content">
              <h2 className="simple-section-title">Send a Message</h2>
              <ContactForm />
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.1}>
          <Card {...RETRO_CARD_PROPS} className="simple-retro-card">
            <div className="simple-card-content">
              <h2 className="simple-section-title">Direct Channels</h2>
              <p className="simple-card-text">Email: {data.contact.email}</p>
              <div className="simple-button-row">
                <RetroLinkButton href={`mailto:${data.contact.email}`} variant="primary">
                  Email Direct
                </RetroLinkButton>
                <RetroLinkButton href={data.contact.linkedin} newTab>
                  LinkedIn
                </RetroLinkButton>
                <RetroLinkButton href={data.contact.github} newTab>
                  GitHub
                </RetroLinkButton>
                {data.contact.itch ? (
                  <RetroLinkButton href={data.contact.itch} newTab>
                    Itch.io
                  </RetroLinkButton>
                ) : null}
                {data.contact.website ? (
                  <RetroLinkButton href={data.contact.website} newTab>
                    Stopwatch Games
                  </RetroLinkButton>
                ) : null}
              </div>

              {resumes.length ? (
                <>
                  <h3 className="simple-kicker">Resumes</h3>
                  <div className="simple-button-row">
                    {resumes.map((resume) => (
                      <RetroLinkButton key={resume.url} href={resume.url} newTab>
                        {resume.label}
                      </RetroLinkButton>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          </Card>
        </Reveal>
      </section>

      <section className="simple-section">
        <Reveal>
          <Card {...RETRO_CARD_PROPS} className="simple-retro-card">
            <div className="simple-card-content">
              <h2 className="simple-section-title">{hireMe?.heading ?? "Collaboration Focus"}</h2>
              {hireMe ? (
                <>
                  <p className="simple-card-text">{hireMe.availability}</p>
                  {hireMe.mode ? <p className="simple-card-text">{hireMe.mode}</p> : null}
                  <div className="simple-grid simple-grid-cols-2">
                    {hireMe.services.map((service) => (
                      <div key={service.title} className="simple-learning-block">
                        <p className="simple-kicker">{service.title}</p>
                        <p className="simple-card-text">{service.details}</p>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="simple-strip">
                  {focusRows.map((row) => (
                    <div key={row.label} className="simple-strip-row">
                      <span>{row.label}</span>
                      <span>{row.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </Reveal>
      </section>
    </div>
  );
}
