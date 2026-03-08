import Link from "next/link";
import type { PortfolioData } from "@/components/types";
import SimpleNav from "@/components/simple-site/SimpleNav";

interface SimpleShellProps {
  data: PortfolioData;
  children: React.ReactNode;
}

export default function SimpleShell({ data, children }: SimpleShellProps) {
  const name = data.meta?.name ?? data.name;
  const title = data.meta?.title ?? data.title;

  return (
    <div className="simple-shell">
      <header className="simple-header">
        <div className="simple-header-inner">
          <div>
            <Link href="/simple" className="simple-wordmark">
              {name}
            </Link>
            <p className="simple-wordmark-subtitle">{title}</p>
          </div>
          <SimpleNav />
        </div>
      </header>

      <main className="simple-main">{children}</main>

      <footer className="simple-footer">
        <div className="simple-footer-inner">
          <p>{name}</p>
          <p>
            {data.about.location} • {new Date().getFullYear()}
          </p>
          <a href={data.meta?.resumeUrl ?? "/resume.pdf"} target="_blank" rel="noreferrer">
            Resume
          </a>
        </div>
      </footer>
    </div>
  );
}
