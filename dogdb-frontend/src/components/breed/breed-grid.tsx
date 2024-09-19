"use client";

import { Breed } from "@/types";
import { nanoid } from "@reduxjs/toolkit";
import BreedCard from "./breed-card";

type BreedGridProps = {
  breeds: Breed[];
};

function BreedGrid({ breeds }: BreedGridProps) {
  return (
    <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4">
      {breeds.map(({ slug, breedName, breedImages, breedShortDescription }) => (
        <div key={nanoid()} className="w-full">
          <BreedCard
            slug={slug}
            breedName={breedName}
            breedImages={breedImages}
            breedShortDescription={breedShortDescription}
          />
        </div>
      ))}
    </div>
  );
}

export default BreedGrid;
