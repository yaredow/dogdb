import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

type UseGetBreedProps = {
  slug: string;
};

export const useGetBreed = ({ slug }: UseGetBreedProps) => {
  const { data: breed, isPending } = useQuery({
    queryKey: ["breed", slug],
    queryFn: async () => {
      const response = await client.api.breeds[":slug"].$get({
        param: { slug },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch breed");
      }

      const data = await response.json();
      return data.data;
    },
    select: (data) => {
      return {
        ...data,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      };
    },
    enabled: !!slug,
  });

  return { breed, isPending };
};
