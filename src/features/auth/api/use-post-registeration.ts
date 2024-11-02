import { toast } from "@/hooks/use-toast";
import { client } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";

type ResponseType = InferResponseType<(typeof client.api.auth)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.auth)["$post"]>;

export const usePostRegisteration = () => {
  const router = useRouter();
  const { mutate, isPending } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.$post({ json });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast({
        description: "Information submited successfully",
      });
      router.push("/");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        description: error.message,
      });
    },
  });

  return { mutate, isPending };
};
