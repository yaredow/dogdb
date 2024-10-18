"use client";

import BreedCard from "./breed-card";
import { Breed } from "@/types";

type BreedGridProps = {
  breeds: Breed[];
};

export default function BreedGrid({ breeds }: BreedGridProps) {
  return (
    <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4">
      {breeds.map((breed) => (
        <BreedCard key={breed.id} breed={breed} />
      ))}
    </div>
  );
}
