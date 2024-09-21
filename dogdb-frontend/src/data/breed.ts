import { EXPRESS_URL } from "@/lib/constants";

export const getAllbreeds = async () => {
  try {
    const response = await fetch(`${EXPRESS_URL}/api/v1/breed`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("failed to fetch data");
    }

    const data = await response.json();

    return data.breeds;
  } catch (error) {
    console.error("Error fetching breeds:", error);
    return null;
  }
};
