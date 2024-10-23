"use client";

import { Breed } from "@prisma/client";
import BreedCard from "./breed-card";
import { useGetBreeds } from "../api/use-get-breeds";

export default function BreedGrid() {
  const { breeds, isFetching } = useGetBreeds();

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4">
      {breeds?.map((breed) => <BreedCard key={breed.id} breed={breed} />)}
    </div>
  );
}
