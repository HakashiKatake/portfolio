import { Button, Card, Input, TextArea } from "pixel-retroui";
import PageIntro from "@/components/simple-site/PageIntro";
import RetroLinkButton from "@/components/simple-site/RetroLinkButton";
import { getPortfolioData } from "@/data/loader";
import { RETRO_CARD_PROPS, RETRO_THEME } from "@/components/simple-site/theme";

export default function ContactPage() {
  const data = getPortfolioData();

  return (
    <div>
      <PageIntro
        label="Contact"
        title="Open for game development collaboration"
        summary="Reach out for freelance work, studio collaboration, jam teams, or technical discussions around gameplay systems."
        aside={<p>Best response channel: email. You can also connect via LinkedIn and GitHub links below.</p>}
      />

      <section className="simple-section simple-two-col">
        <Card {...RETRO_CARD_PROPS} className="simple-retro-card">
          <div className="simple-card-content">
            <h2 className="simple-section-title">Send a Message</h2>
            <div className="simple-form-grid">
              <Input
                placeholder="Your name"
                bg={RETRO_THEME.panelAlt}
                textColor={RETRO_THEME.text}
                borderColor={RETRO_THEME.border}
                className="simple-retro-input"
              />
              <Input
                type="email"
                placeholder="Your email"
                bg={RETRO_THEME.panelAlt}
                textColor={RETRO_THEME.text}
                borderColor={RETRO_THEME.border}
                className="simple-retro-input"
              />
              <TextArea
                placeholder="Tell me about your game, role, or collaboration idea"
                bg={RETRO_THEME.panelAlt}
                textColor={RETRO_THEME.text}
                borderColor={RETRO_THEME.border}
                className="simple-retro-textarea"
              />
              <Button
                type="button"
                bg={RETRO_THEME.buttonPrimaryBg}
                textColor={RETRO_THEME.buttonText}
                shadow={RETRO_THEME.buttonShadow}
                borderColor={RETRO_THEME.border}
                className="simple-retro-button simple-submit-button"
              >
                Send Inquiry
              </Button>
            </div>
          </div>
        </Card>

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
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
