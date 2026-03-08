import { Bubble, Card } from "pixel-retroui";
import { RETRO_CARD_PROPS, RETRO_THEME } from "@/components/simple-site/theme";

interface PageIntroProps {
  label: string;
  title: string;
  summary: string;
  aside?: React.ReactNode;
}

export default function PageIntro({ label, title, summary, aside }: PageIntroProps) {
  return (
    <section className="simple-intro">
      <Card {...RETRO_CARD_PROPS} className="simple-retro-card simple-intro-card">
        <div className="simple-intro-main">
          <p className="simple-eyebrow">{label}</p>
          <h1 className="simple-title">{title}</h1>
          <p className="simple-summary">{summary}</p>
          <Bubble
            direction="left"
            bg={RETRO_THEME.bubbleBg}
            textColor={RETRO_THEME.text}
            borderColor={RETRO_THEME.border}
            className="simple-intro-bubble"
          >
            Built with RetroUI components
          </Bubble>
        </div>
      </Card>

      {aside ? (
        <Card {...RETRO_CARD_PROPS} className="simple-retro-card simple-intro-aside-card">
          <aside className="simple-intro-aside">{aside}</aside>
        </Card>
      ) : null}
    </section>
  );
}
