import { EXPRESS_URL } from "@/lib/constants";

export const logout = async () => {
  const response = await fetch(`${EXPRESS_URL}/api/v1/user/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }
};
