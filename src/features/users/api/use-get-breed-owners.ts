"use client";

import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

type UseGetBreedProps = {
  breedId: string;
};

export const useGetBreedOwners = ({ breedId }: UseGetBreedProps) => {
  const { data: breedOwners, isPending } = useQuery({
    queryKey: ["breed", breedId],
    queryFn: async () => {
      const response = await client.api.breeds["breed-owners"][":breedId"].$get(
        {
          param: { breedId },
        },
      );

      if (!response.ok) {
        throw new Error("Something went wrong while fetching dog owners");
      }

      const data = await response.json();

      return data.data;
    },
  });

  return { breedOwners, isPending };
};
