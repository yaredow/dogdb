import { getAllbreeds } from "@/data/breed";
import BreedGrid from "./breed-grid";

export default async function BreedPage() {
  const breeds = await getAllbreeds();
  console.log({ breeds });

  if (!breeds) {
    return <div>There are no breeds</div>;
  }

  return <BreedGrid breeds={breeds} />;
}
