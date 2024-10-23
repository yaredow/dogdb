import { useQuery } from "@tanstack/react-query";

export const useGetBreedFacts = () => {
  const { data: fact, isFetching } = useQuery({
    queryKey: ["facts"],
    queryFn: async () => {
      const response = await fetch("https://dogapi.dog/api/v2/facts", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch breed");
      }

      const data = await response.json();
      return data;
    },
  });

  return { fact, isFetching };
};
