import { getCurrentLoggedInUser } from "@/services/userService";
import { useQuery } from "@tanstack/react-query";

export default function useGetUser() {
  const { data: user, isFetching } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentLoggedInUser,
  });

  return { user, isFetching };
}
