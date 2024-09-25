import { EXPRESS_URL } from "@/lib/constants";
import { SigninDataType } from "@/lib/schemas";

export const signin = async (userData: SigninDataType) => {
  const response = await fetch(`${EXPRESS_URL}/api/v1/user/signin`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Something went wrong");
  }
  const data = await response.json();
  return data.user;
};

export const logout = async () => {
  const response = await fetch(`${EXPRESS_URL}/api/v1/user/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }
};
