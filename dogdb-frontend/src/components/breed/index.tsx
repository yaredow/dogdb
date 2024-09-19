import { getAllbreeds } from "@/data/breed";
import BreedGrid from "./breed-grid";

export default async function BreedPage() {
  const breeds = await getAllbreeds();

  if (!breeds) {
    return <div>No breeds found</div>;
  }

  return <BreedGrid breeds={breeds} />;
}
