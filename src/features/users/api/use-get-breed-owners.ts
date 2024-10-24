import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

type UseGetBreedProps = {
  breedId: string;
};

export const useGetBreedOwners = ({ breedId }: UseGetBreedProps) => {
  const { data: breed, isFetching } = useQuery({
    queryKey: ["breed", breedId],
    queryFn: async () => {
      const response = await client.api.users["breed-owners"][":breedId"].$get({
        param: { breedId },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch breed");
      }

      const data = await response.json();
      return data.data;
    },
    enabled: !!breedId,
  });

  return { breed, isFetching };
};
