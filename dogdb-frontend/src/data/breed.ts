import { EXPRESS_URL } from "@/lib/constants";

export const getAllbreeds = async () => {
  const response = await fetch(`${EXPRESS_URL}/api/v1/breed`, {
    cache: "no-cache",
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("failed to fetch data");
  }

  const data = await response.json();

  return data.breeds;
};

export const getBreedWithSlug = async (slug: string) => {
  try {
    const response = await fetch(`${EXPRESS_URL}/api/v1/breed/${slug}`, {
      method: "GET",
      cache: "no-cache",
    });

    if (!response.ok) return null;

    const data = await response.json();

    return data.breed;
  } catch (error) {
    console.error(error);
    return null;
  }
};
