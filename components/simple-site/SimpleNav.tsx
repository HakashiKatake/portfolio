"use client";

import { usePathname } from "next/navigation";
import RetroLinkButton from "@/components/simple-site/RetroLinkButton";

const NAV_ITEMS = [
  { href: "/simple", label: "Home" },
  { href: "/simple/games", label: "Games" },
  { href: "/simple/projects", label: "Projects" },
  { href: "/simple/blog", label: "Blog" },
  { href: "/simple/about", label: "About" },
  { href: "/simple/contact", label: "Contact" },
] as const;

function isPathActive(pathname: string, href: string): boolean {
  if (href === "/simple") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SimpleNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary">
      <ul className="simple-nav-list">
        {NAV_ITEMS.map((item) => {
          const active = isPathActive(pathname, item.href);
          return (
            <li key={item.href}>
              <RetroLinkButton
                href={item.href}
                variant={active ? "primary" : "secondary"}
                className={active ? "simple-nav-button simple-nav-button-active" : "simple-nav-button"}
              >
                {item.label}
              </RetroLinkButton>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
