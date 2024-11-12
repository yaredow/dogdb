import { InferRequestType, InferResponseType } from "hono";

import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { toast } from "@/hooks/use-toast";

type UseSendMessageProps = {
  userId: string;
  body: string;
  conversationId: string;
};

type ResponseType = InferResponseType<
  (typeof client.api.messages)["send-message"][":userId"]["$post"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.messages)["send-message"][":userId"]["$post"]
>;

export const useSendMessage = ({
  userId,
  body,
  conversationId,
}: UseSendMessageProps) => {
  const { mutate: sendMessage, isPending } = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async () => {
      const response = await client.api.messages["send-message"][
        ":userId"
      ].$post({
        param: { userId },
        query: { conversationId, body },
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
  return { sendMessage, isPending };
};
