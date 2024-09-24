import { EXPRESS_URL } from "@/lib/constants";

export const getAllbreeds = async () => {
  try {
    const response = await fetch(`${EXPRESS_URL}/api/v1/breed`, {
      method: "GET",
      cache: "no-cache",
    });
    if (!response.ok) return [];

    const data = await response.json();

    return data.breeds;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getBreedWithSlug = async (slug: string) => {
  try {
    const response = await fetch(`${EXPRESS_URL}/api/v1/breed/${slug}`, {
      method: "GET",
      cache: "no-cache",
    });

    if (!response.ok) return [];

    const data = await response.json();

    return data.breed;
  } catch (error) {
    console.error(error);

    return [];
  }
};
