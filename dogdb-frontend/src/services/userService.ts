import { EXPRESS_URL } from "@/lib/constants";

export const getCurrentLoggedInUser = async () => {
  const response = await fetch(`${EXPRESS_URL}/api/v1/user/me`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  const data = await response.json();

  return data.user;
};
