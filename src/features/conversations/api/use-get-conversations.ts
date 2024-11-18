import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetConversations = () => {
  const { data: conversations, isPending } = useQuery({
    queryKey: ["breeds"],
    queryFn: async () => {
      const response = await client.api.conversations.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch breed");
      }

      const data = await response.json();

      return data.data;
    },
  });

  return { conversations, isPending };
};
