import { InferRequestType, InferResponseType } from "hono";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { toast } from "@/hooks/use-toast";

type UseUnblockUserProps = {
  userId: string;
};

type ResponseType = InferResponseType<
  (typeof client.api.users)["unblock"][":blockedId"]["$delete"]
>;
type RequestType = InferRequestType<
  (typeof client.api.users)["unblock"][":blockedId"]["$delete"]
>;

export const useUnblockUser = ({ userId }: UseUnblockUserProps) => {
  const queryClient = useQueryClient();
  const { mutate: unblock, isPending } = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async () => {
      const response = await client.api.users["unblock"][":blockedId"].$delete({
        param: {
          blockedId: userId,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to unblock user");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
      toast({
        description: "You unblocked this user",
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        description: "Error unblocking this user",
        variant: "destructive",
      });
    },
  });
  return { unblock, isPending };
};
