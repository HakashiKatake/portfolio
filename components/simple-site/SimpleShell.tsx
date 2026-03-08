import type { PortfolioData } from "@/components/types";
import SimpleNav from "@/components/simple-site/SimpleNav";
import RetroLinkButton from "@/components/simple-site/RetroLinkButton";
import { Bubble } from "pixel-retroui";
import { RETRO_THEME } from "@/components/simple-site/theme";

interface SimpleShellProps {
  data: PortfolioData;
  children: React.ReactNode;
}

export default function SimpleShell({ data, children }: SimpleShellProps) {
  const name = data.meta?.name ?? data.name;
  const title = data.meta?.title ?? data.title;

  return (
    <div className="simple-shell">
      <div className="simple-starfield" aria-hidden="true" />

      <header className="simple-header">
        <div className="simple-header-inner">
          <div>
            <p className="simple-wordmark">{name}</p>
            <p className="simple-wordmark-subtitle">{title}</p>
          </div>
          <SimpleNav />
        </div>
      </header>

      <main className="simple-main">{children}</main>

      <footer className="simple-footer">
        <div className="simple-footer-inner">
          <Bubble
            direction="left"
            bg={RETRO_THEME.bubbleBg}
            textColor={RETRO_THEME.text}
            borderColor={RETRO_THEME.border}
            className="simple-footer-bubble"
          >
            {data.about.location} • {new Date().getFullYear()}
          </Bubble>

          <div className="simple-footer-actions">
            <p>{name}</p>
            <RetroLinkButton href={data.meta?.resumeUrl ?? "/resume.pdf"} variant="primary" newTab>
              Resume
            </RetroLinkButton>
          </div>
        </div>
      </footer>
    </div>
  );
}
