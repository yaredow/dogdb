"use client";

import { nanoid } from "@reduxjs/toolkit";
import BreedCard from "./breed-card";
import useGetBreeds from "@/hooks/useGetBreeds";
import { Breed } from "@/types";

type UseGetBreeds = {
  breeds: Breed[];
  isFetching: boolean;
};

export default function BreedGrid() {
  const { breeds, isFetching }: UseGetBreeds = useGetBreeds();

  if (isFetching) return <div>Loading..</div>;

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
