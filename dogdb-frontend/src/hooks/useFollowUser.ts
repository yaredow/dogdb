import { followUser } from "@/services/userService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "./use-toast";

export default function useFollowUser() {
  const { isPending, mutate: follow } = useMutation({
    mutationFn: (followingId: string) => followUser(followingId),
    onSuccess: (data) => {
      toast({
        description: data.message,
      });
    },
    onError: () => {
      toast({
        description: "Something went wrong",
        variant: "destructive",
      });
    },
  });

  return { isPending, follow };
}
