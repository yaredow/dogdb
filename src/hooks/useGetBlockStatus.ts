import { blockStatus } from "@/services/userService";
import { useQuery } from "@tanstack/react-query";

export default function useGetBlockStatus(userId: string) {
  const {
    isLoading: isPending,
    refetch,
    data: isBlocked,
  } = useQuery({
    queryKey: ["isBlocked", userId],
    queryFn: () => blockStatus(userId),
  });

  return { isPending, isBlocked, refetch };
}
