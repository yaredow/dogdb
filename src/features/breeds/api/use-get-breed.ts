import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetBreed = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["breed"],
    queryFn: async () => {
      const response = await client.api.breeds[":slug"].$get({
        param: { slug },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch breed");
      }
    },
  });
};
