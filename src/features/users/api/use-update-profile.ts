import { toast } from "@/hooks/use-toast";
import { client } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.users)["update-profile"][":userId"]["$patch"],
  200
>;

type RequestType = InferRequestType<
  (typeof client.api.users)["update-profile"][":userId"]["$patch"]
>;

export default function useUpdateProfile() {
  const { mutate: updateProfile, isPending } = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async ({ form, param }) => {
      const response = await client.api.users["update-profile"][
        ":userId"
      ].$patch({
        param,
        form,
      });

      if (!response.ok) {
        throw new Error("Failed to update your profile");
      }

      const data = await response.json();

      return data;
    },
    onSuccess: () => {
      toast({
        description: "Profile updated correctly",
      });
    },
    onError: (error) => {
      toast({
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return { updateProfile, isPending };
}
