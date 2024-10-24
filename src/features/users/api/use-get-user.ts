import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

type UseGetBreedProps = {
  userId: string;
};

export const useGetUser = ({ userId }: UseGetBreedProps) => {
  const { data: user, isFetching } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const response = await client.api.users[":userId"].$get({
        param: { userId },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }

      const data = await response.json();
      return data.data;
    },
    enabled: !!userId,
  });

  return { user, isFetching };
};
