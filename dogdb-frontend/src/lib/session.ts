import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "";

export const getUserFromCookie = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("No access token found in cookies");
  }

  try {
    const { payload } = await jwtVerify(
      accessToken,
      new TextEncoder().encode(JWT_ACCESS_SECRET),
    );

    return payload; // This is the decoded JWT payload, which includes the user data
  } catch (error) {
    console.error("Error verifying JWT:", error);
    return null;
  }
};
