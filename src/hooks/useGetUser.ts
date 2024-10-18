import { getCurrentLoggedInUser } from "@/services/userService";
import { useQuery } from "@tanstack/react-query";

export default function useGetUser(isAuthenticated: boolean) {
  const { data: user, isFetching } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentLoggedInUser,
    enabled: isAuthenticated,
  });

  return { user, isFetching };
}
