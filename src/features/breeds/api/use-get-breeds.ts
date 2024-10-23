import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetBreeds = () => {
  const { data: breeds, isFetching } = useQuery({
    queryKey: ["breeds"],
    queryFn: async () => {
      const response = await client.api.breeds.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch breed");
      }

      const data = await response.json();
      return data.data;
    },
  });

  return { breeds, isFetching };
};
