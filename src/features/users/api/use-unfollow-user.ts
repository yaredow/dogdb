import { InferRequestType, InferResponseType } from "hono";

import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { toast } from "@/hooks/use-toast";

type UseUnfollowUser = {
  userId: string;
};

type ResponseType = InferResponseType<
  (typeof client.api.users)["unfollow"][":userId"]["$delete"]
>;
type RequestType = InferRequestType<
  (typeof client.api.users)["unfollow"][":userId"]["$delete"]
>;

export const useUnfollowUser = ({ userId }: UseUnfollowUser) => {
  const { mutate: unfollow, isPending } = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async () => {
      const response = await client.api.users["unfollow"][":userId"].$delete({
        param: {
          userId,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to unfollow user");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast({
        description: "You unfollowed this user",
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        description: "Error unfollowing this user",
        variant: "destructive",
      });
    },
  });
  return { unfollow, isPending };
};
