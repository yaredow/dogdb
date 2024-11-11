import { InferRequestType, InferResponseType } from "hono";

import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { toast } from "@/hooks/use-toast";

type UseStartConversationProps = {
  userId: string;
};

type ResponseType = InferResponseType<
  (typeof client.api.conversations)["start-conversation"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.conversations)["start-conversation"]["$post"]
>;

export const useStartConversation = ({ userId }: UseStartConversationProps) => {
  const { mutate: startConversation, isPending } = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async () => {
      const response = await client.api.conversations[
        "start-conversation"
      ].$post({
        query: {
          userId,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to start a conversation");
      }

      return await response.json();
    },
    onError: (error) => {
      console.error(error);
      toast({
        description: "Error starting conversation",
        variant: "destructive",
      });
    },
  });
  return { startConversation, isPending };
};
