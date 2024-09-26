import { toast } from "@/components/ui/use-toast";
import { unfollowUser } from "@/services/userService";
import { useMutation } from "@tanstack/react-query";

export default function useUnfollowUser() {
  const { isPending, mutate: unfollow } = useMutation({
    mutationFn: (followingId: string) => unfollowUser(followingId),
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
  return { isPending, unfollow };
}
