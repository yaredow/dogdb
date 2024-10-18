import { cookies } from "next/headers";

export const getTokens = () => {
  const cookieStore = cookies();

  // Retrieve access and refresh tokens from cookies
  const accessToken = cookieStore.get("accessToken")?.value || null;
  const refreshToken = cookieStore.get("refreshToken")?.value || null;

  // Return the tokens as an object
  return { accessToken, refreshToken };
};
