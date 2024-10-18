import { blockUser } from "@/services/userService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "./use-toast";

export default function useBlockUser() {
  const { isPending, mutate: block } = useMutation({
    mutationFn: (blockedId: string) => blockUser(blockedId),
    onSuccess: (data) => {
      toast({
        description: data.message,
      });
    },
    onError: (error) => {
      toast({
        description: error.message,
        variant: "destructive",
      });
    },
  });
  return { isPending, block };
}
