"use client";

import { nanoid } from "@reduxjs/toolkit";
import BreedCard from "./breed-card";
import { Breed } from "@/types";

type BreedGridProps = {
  breeds: Breed[];
};

export default function BreedGrid({ breeds }: BreedGridProps) {
  return (
    <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4">
      {breeds &&
        breeds.map(
          ({ slug, breedName, breedImages, breedShortDescription }) => (
            <div key={nanoid()} className="w-full">
              <BreedCard
                slug={slug}
                breedName={breedName}
                breedImages={breedImages}
                breedShortDescription={breedShortDescription}
              />
            </div>
          ),
        )}
    </div>
  );
}
