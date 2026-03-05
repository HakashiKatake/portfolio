import { getPortfolioData } from "@/data/loader";
import { SimplePortfolioClient } from "./SimplePortfolioClient";

export default function SimplePage() {
  const data = getPortfolioData();
  return <SimplePortfolioClient data={data} />;
}
