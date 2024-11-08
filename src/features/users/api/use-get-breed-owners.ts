"use client";

import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

type UseGetBreedProps = {
  slug: string;
};

export const useGetBreedOwners = ({ slug }: UseGetBreedProps) => {
  const { data: breedOwners, isPending } = useQuery({
    queryKey: ["breed", slug],
    queryFn: async () => {
      const response = await client.api.breeds["breed-owners"][":slug"].$get({
        param: { slug },
      });

      if (!response.ok) {
        throw new Error("Something went wrong while fetching dog owners");
      }

      const data = await response.json();

      return data.data;
    },
  });

  return { breedOwners, isPending };
};
