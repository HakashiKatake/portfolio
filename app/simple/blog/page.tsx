import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Card } from "pixel-retroui";
import PageIntro from "@/components/simple-site/PageIntro";
import BlogCard from "@/components/simple-site/BlogCard";
import Reveal from "@/components/simple-site/Reveal";
import { getPortfolioData } from "@/data/loader";
import { getSortedBlogs } from "@/lib/simple-site";
import { RETRO_CARD_PROPS, RETRO_THEME } from "@/components/simple-site/theme";

export default function BlogListPage() {
  const data = getPortfolioData();
  const blogs = getSortedBlogs(data);

  return (
    <div>
      <PageIntro
        label="Dev Journal"
        title="Game architecture and production notes"
        summary="Long-form posts focused on gameplay systems, architecture decisions, and lessons learned from shipped builds and jams."
        aside={<p>Posts include practical engineering notes from Unity production, optimization passes, and cross-engine experiments.</p>}
      />

      <section className="simple-section simple-two-col">
        <Reveal>
          <Card {...RETRO_CARD_PROPS} className="simple-retro-card">
            <div className="simple-card-content">
              <h2 className="simple-section-title">Topics</h2>
              <Accordion
                collapsible
                bg={RETRO_THEME.panelAlt}
                textColor={RETRO_THEME.text}
                borderColor={RETRO_THEME.border}
                shadowColor={RETRO_THEME.shadow}
              >
                <AccordionItem value="patterns" bg={RETRO_THEME.panelAlt} textColor={RETRO_THEME.text} borderColor={RETRO_THEME.border}>
                  <AccordionTrigger>Game Design Patterns</AccordionTrigger>
                  <AccordionContent>State, component-driven architecture, object pooling, and event systems.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="polyglot" bg={RETRO_THEME.panelAlt} textColor={RETRO_THEME.text} borderColor={RETRO_THEME.border}>
                  <AccordionTrigger>Polyglot Game Experiments</AccordionTrigger>
                  <AccordionContent>What changes across engines and languages when building similar gameplay loops.</AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.08}>
          <Card {...RETRO_CARD_PROPS} className="simple-retro-card">
            <div className="simple-card-content">
              <h2 className="simple-section-title">Post Count</h2>
              <p className="simple-card-text">{blogs.length} posts available in the journal.</p>
            </div>
          </Card>
        </Reveal>
      </section>

      <section className="simple-section">
        <Reveal>
          <h2 className="simple-section-title">All Posts</h2>
        </Reveal>
        <div className="simple-grid simple-grid-cols-2">
          {blogs.map((blog, index) => (
            <BlogCard key={blog.slug ?? blog.title} blog={blog} revealDelay={index * 0.08} />
          ))}
        </div>
      </section>
    </div>
  );
}
