import type { Metadata } from "next";
import "./simple.css";
import { getPortfolioData } from "@/data/loader";
import SimpleShell from "@/components/simple-site/SimpleShell";

export const metadata: Metadata = {
  title: "Saurabh | Game Developer Portfolio",
  description: "RetroUI-powered purple game developer portfolio with projects, games, and dev logs.",
};

export default async function SimpleLayout({ children }: { children: React.ReactNode }) {
  const data = getPortfolioData();

  return (
    <div className="simple-site">
      <SimpleShell data={data}>{children}</SimpleShell>
    </div>
  );
}
