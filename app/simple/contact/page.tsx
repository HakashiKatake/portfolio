import PageIntro from "@/components/simple-site/PageIntro";
import { getPortfolioData } from "@/data/loader";

export default function ContactPage() {
  const data = getPortfolioData();

  return (
    <div>
      <PageIntro
        label="Contact"
        title="Open for game dev collaboration and production work."
        summary="Use the channels below for hiring, team invites, jam collaborations, or technical discussions."
        aside={<p>Primary response channel is email. External profiles include project logs and source repositories.</p>}
      />

      <section className="simple-grid simple-grid-cols-2">
        <article className="simple-card">
          <div className="simple-card-content">
            <p className="simple-kicker">Email</p>
            <h2 className="simple-card-title">{data.contact.email}</h2>
            <a href={`mailto:${data.contact.email}`} className="simple-action simple-focus-ring">
              Send Email
            </a>
          </div>
        </article>

        <article className="simple-card">
          <div className="simple-card-content">
            <p className="simple-kicker">LinkedIn</p>
            <h2 className="simple-card-title">Professional Timeline</h2>
            <a href={data.contact.linkedin} target="_blank" rel="noreferrer" className="simple-action simple-focus-ring">
              Open LinkedIn
            </a>
          </div>
        </article>

        <article className="simple-card">
          <div className="simple-card-content">
            <p className="simple-kicker">GitHub</p>
            <h2 className="simple-card-title">Code Archive</h2>
            <a href={data.contact.github} target="_blank" rel="noreferrer" className="simple-action simple-focus-ring">
              Open GitHub
            </a>
          </div>
        </article>

        <article className="simple-card">
          <div className="simple-card-content">
            <p className="simple-kicker">Location</p>
            <h2 className="simple-card-title">{data.about.location}</h2>
            <p className="simple-card-text">Remote-friendly and available for indie and studio-side collaboration.</p>
          </div>
        </article>
      </section>
    </div>
  );
}
