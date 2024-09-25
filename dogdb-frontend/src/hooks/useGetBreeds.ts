import { getAllBreed } from "@/services/breedService";
import { useQuery } from "@tanstack/react-query";

export default function useGetBreeds() {
  const { data: breeds, isFetching } = useQuery({
    queryKey: ["breeds"],
    queryFn: getAllBreed,
  });

  return { breeds, isFetching };
}
