import { InferRequestType, InferResponseType } from "hono";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { toast } from "@/hooks/use-toast";

type UseFollowUser = {
  userId: string;
};

type ResponseType = InferResponseType<
  (typeof client.api.users)["follow"][":userId"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.users)["follow"][":userId"]["$post"]
>;

export const useFollowUser = ({ userId }: UseFollowUser) => {
  const queryClient = useQueryClient();
  const { mutate: follow, isPending } = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async () => {
      const response = await client.api.users["follow"][":userId"].$post({
        param: {
          userId,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to following user");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast({
        description: "Follow successful",
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        description: "Error following user",
        variant: "destructive",
      });
    },
  });

  return { follow, isPending };
};
