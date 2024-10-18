import { unblockUser } from "@/services/userService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "./use-toast";

export default function useUnblockUser() {
  const { isPending, mutate: unblock } = useMutation({
    mutationFn: (blockedId: string) => unblockUser(blockedId),
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
  return { isPending, unblock };
}
