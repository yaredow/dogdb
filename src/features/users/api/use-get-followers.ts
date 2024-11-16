"use client";

import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import { FollowerInfo } from "../types";

type UseGetBreedProps = {
  userId: string;
};

export const useGetFollowers = ({ userId }: UseGetBreedProps) => {
  const { data, isPending } = useQuery<FollowerInfo>({
    queryKey: ["user", userId],
    queryFn: async () => {
      const response = await client.api.users.followers[":userId"].$get({
        param: { userId },
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data: FollowerInfo = await response.json();

      return data;
    },
  });

  return { data, isPending };
};
