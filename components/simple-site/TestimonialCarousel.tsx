"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "pixel-retroui";
import TestimonialCard from "@/components/simple-site/TestimonialCard";
import { RETRO_THEME } from "@/components/simple-site/theme";
import type { Testimonial } from "@/components/types";

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const items = useMemo(() => testimonials.filter((item) => item.quote), [testimonials]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, 6400);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [items.length]);

  if (!items.length) {
    return null;
  }

  const goToIndex = (nextIndex: number) => {
    const normalized = (nextIndex + items.length) % items.length;
    setActiveIndex(normalized);
  };

  return (
    <div className="simple-testimonial-carousel" aria-label="Testimonials">
      <div className="simple-carousel-window">
        <div className="simple-carousel-track" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
          {items.map((item, index) => (
            <div className="simple-carousel-slide" key={`${item.name}-${item.date ?? index}`}>
              <TestimonialCard testimonial={item} className="simple-testimonial-card-featured" />
            </div>
          ))}
        </div>
      </div>

      {items.length > 1 ? (
        <div className="simple-carousel-controls">
          <Button
            type="button"
            bg={RETRO_THEME.buttonSecondaryBg}
            textColor={RETRO_THEME.buttonText}
            shadow={RETRO_THEME.buttonShadow}
            borderColor={RETRO_THEME.border}
            className="simple-retro-button simple-carousel-nav"
            onClick={() => goToIndex(activeIndex - 1)}
          >
            Prev
          </Button>

          <div className="simple-carousel-dots" role="tablist" aria-label="Testimonial slides">
            {items.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={`${item.name}-dot-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Show testimonial ${index + 1}`}
                  className={isActive ? "simple-carousel-dot simple-carousel-dot-active" : "simple-carousel-dot"}
                  onClick={() => goToIndex(index)}
                />
              );
            })}
          </div>

          <Button
            type="button"
            bg={RETRO_THEME.buttonSecondaryBg}
            textColor={RETRO_THEME.buttonText}
            shadow={RETRO_THEME.buttonShadow}
            borderColor={RETRO_THEME.border}
            className="simple-retro-button simple-carousel-nav"
            onClick={() => goToIndex(activeIndex + 1)}
          >
            Next
          </Button>
        </div>
      ) : null}
    </div>
  );
}
