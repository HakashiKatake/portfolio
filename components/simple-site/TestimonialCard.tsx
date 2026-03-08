"use client";

import { Card } from "pixel-retroui";
import RetroLinkButton from "@/components/simple-site/RetroLinkButton";
import { RETRO_CARD_PROPS } from "@/components/simple-site/theme";
import type { Testimonial } from "@/components/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((token) => token[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 2);
}

export default function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  const initials = getInitials(testimonial.name) || "TM";

  return (
    <Card
      {...RETRO_CARD_PROPS}
      className={className ? `simple-retro-card simple-testimonial-card ${className}` : "simple-retro-card simple-testimonial-card"}
    >
      <div className="simple-card-content simple-testimonial-content">
        <div className="simple-testimonial-head">
          <div className="simple-testimonial-avatar" aria-hidden={!testimonial.avatar}>
            {testimonial.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={testimonial.avatar} alt={`${testimonial.name} profile`} className="simple-testimonial-avatar-image" />
            ) : (
              <span>{initials}</span>
            )}
          </div>

          <div className="simple-testimonial-meta">
            <p className="simple-kicker">{testimonial.date ?? "Recommendation"}</p>
            <h3 className="simple-card-title">{testimonial.name}</h3>
            <p className="simple-card-text">{testimonial.role}</p>
            {testimonial.relationship ? <p className="simple-card-text">{testimonial.relationship}</p> : null}
          </div>

          <p className="simple-testimonial-badge">Verified</p>
        </div>

        <p className="simple-quote">&ldquo;{testimonial.quote}&rdquo;</p>

        {testimonial.sourceUrl ? (
          <div className="simple-button-row">
            <RetroLinkButton href={testimonial.sourceUrl} newTab>
              View Source
            </RetroLinkButton>
          </div>
        ) : null}
      </div>
    </Card>
  );
}
