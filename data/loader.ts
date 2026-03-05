import { PortfolioData } from "@/components/types";

export function getPortfolioData(): PortfolioData {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const data = require("@/data/portfolio.json");
  return data as PortfolioData;
}
