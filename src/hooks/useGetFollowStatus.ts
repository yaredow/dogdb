import { followStatus } from "@/services/userService";
import { useQuery } from "@tanstack/react-query";

export default function useGetFollowStatus(userId: string) {
  const {
    isLoading: isPending,
    refetch,
    data: isFollowing,
  } = useQuery({
    queryKey: ["isFollowing", userId],
    queryFn: () => followStatus(userId),
  });

  return { isPending, isFollowing, refetch };
}
