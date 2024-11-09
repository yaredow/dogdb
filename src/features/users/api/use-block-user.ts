import { InferRequestType, InferResponseType } from "hono";

import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { toast } from "@/hooks/use-toast";

type UseBlockUserProps = {
  userId: string;
};

type ResponseType = InferResponseType<
  (typeof client.api.users)["block"][":blockedId"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.users)["block"][":blockedId"]["$post"]
>;

export const useBlockUser = ({ userId }: UseBlockUserProps) => {
  const { mutate: block, isPending } = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async () => {
      const response = await client.api.users["block"][":blockedId"].$post({
        param: {
          blockedId: userId,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to block user");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast({
        description: "User blocked successful",
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        description: "Error blocking user",
        variant: "destructive",
      });
    },
  });
  return { block, isPending };
};
