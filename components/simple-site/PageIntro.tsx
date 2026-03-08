import { Card } from "pixel-retroui";
import Reveal from "@/components/simple-site/Reveal";
import { RETRO_CARD_PROPS } from "@/components/simple-site/theme";

interface PageIntroProps {
  label: string;
  title: string;
  summary: string;
  aside?: React.ReactNode;
  asideClassName?: string;
}

export default function PageIntro({ label, title, summary, aside, asideClassName }: PageIntroProps) {
  return (
    <section className="simple-intro">
      <Reveal>
        <Card {...RETRO_CARD_PROPS} className="simple-retro-card simple-intro-card">
          <div className="simple-intro-main">
            <p className="simple-eyebrow">{label}</p>
            <h1 className="simple-title">{title}</h1>
            <p className="simple-summary">{summary}</p>
            <div className="simple-intro-divider" aria-hidden="true" />
          </div>
        </Card>
      </Reveal>

      {aside ? (
        <Reveal delay={0.08}>
          <Card {...RETRO_CARD_PROPS} className="simple-retro-card simple-intro-aside-card">
            <aside className={asideClassName ? `simple-intro-aside ${asideClassName}` : "simple-intro-aside"}>{aside}</aside>
          </Card>
        </Reveal>
      ) : null}
    </section>
  );
}
