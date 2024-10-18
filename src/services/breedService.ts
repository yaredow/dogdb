import { EXPRESS_URL } from "@/lib/constants";

export const getAllBreed = async () => {
  const response = await fetch(`${EXPRESS_URL}/api/v1/breed`, {
    method: "GET",
  });

  if (!response) {
    return [];
  }

  const data = await response.json();

  return data.breeds;
};
