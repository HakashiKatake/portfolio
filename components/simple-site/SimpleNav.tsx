"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
              <Link
                href={item.href}
                className={active ? "simple-nav-link simple-nav-link-active" : "simple-nav-link"}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
