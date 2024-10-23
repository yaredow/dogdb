import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

type UseGetBreedProps = {
  email: string;
  breedId: string;
};

export const useGetBreed = ({ email, breedId }: UseGetBreedProps) => {
  const { data: breed, isFetching } = useQuery({
    queryKey: ["breed", breedId],
    queryFn: async () => {
      const response = await client.api.breeds["breed-owners"][":breedId"].$get(
        {
          param: { breedId },
          query: { email },
        },
      );

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
