import React from "react";
import BreedGrid from "../breed/breed-grid";
import { getAllbreeds } from "@/data/breed";

export default async function HomePage() {
  const breeds = await getAllbreeds();

  if (!breeds) return <div>No breeds</div>;

  return (
    <section className="mb-10">
      <BreedGrid breeds={breeds} />
    </section>
  );
}
