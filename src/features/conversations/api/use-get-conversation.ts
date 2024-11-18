import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

type UseGetConversationProps = {
  conversationId: string;
};

export const useGetBreed = ({ conversationId }: UseGetConversationProps) => {
  const { data: conversation, isPending } = useQuery({
    queryKey: ["conversation", conversationId],
    queryFn: async () => {
      const response = await client.api.conversations[":conversationId"].$get({
        param: { conversationId },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch conversation");
      }

      const data = await response.json();
      return data.data;
    },
    enabled: !!conversationId,
  });

  return { conversation, isPending };
};
