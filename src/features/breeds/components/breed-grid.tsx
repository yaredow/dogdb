"use client";

import { Breed } from "@prisma/client";
import BreedCard from "./breed-card";
import { useGetBreeds } from "../api/use-get-breeds";
import BreedSkeleton from "./breed-skeleton";

export default function BreedGrid() {
  const { breeds, isFetching } = useGetBreeds();

  if (isFetching) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 space-x-4">
        {Array.from({ length: 20 }).map((_, index) => (
          <BreedSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4">
      {breeds?.map((breed) => <BreedCard key={breed.id} breed={breed} />)}
    </div>
  );
}
