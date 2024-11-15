import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

type UseGetBreedProps = {
  userId: string;
};

export const useGetUser = ({ userId }: UseGetBreedProps) => {
  const { data: user, isPending } = useQuery({
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
    select: (data) => {
      return {
        ...data,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
        birthDate: new Date(data.birthDate),
      };
    },
    enabled: !!userId,
  });

  return { user, isPending };
};
