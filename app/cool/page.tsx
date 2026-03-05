import { getPortfolioData } from "@/data/loader";
import { CoolPortfolioClient } from "./CoolPortfolioClient";

export default function CoolPage() {
  const data = getPortfolioData();
  return <CoolPortfolioClient data={data} />;
}
