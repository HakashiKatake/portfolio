"use client";

import { useRouter } from "next/navigation";
import { Button } from "pixel-retroui";
import { RETRO_THEME } from "@/components/simple-site/theme";

interface RetroLinkButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  newTab?: boolean;
}

function isExternalHref(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:");
}

export default function RetroLinkButton({
  href,
  children,
  variant = "secondary",
  className,
  newTab = false,
}: RetroLinkButtonProps) {
  const router = useRouter();
  const isExternal = isExternalHref(href);

  const bg = variant === "primary" ? RETRO_THEME.buttonPrimaryBg : RETRO_THEME.buttonSecondaryBg;

  const handleClick = () => {
    if (isExternal) {
      if (newTab) {
        window.open(href, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = href;
      }
      return;
    }

    router.push(href);
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
      bg={bg}
      textColor={RETRO_THEME.buttonText}
      shadow={RETRO_THEME.buttonShadow}
      borderColor={RETRO_THEME.border}
      className={className ? `simple-retro-button ${className}` : "simple-retro-button"}
    >
      {children}
    </Button>
  );
}
