export const getAllbreeds = async () => {
  const response = await fetch("http://backend:5000/api/v1/breed", {
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
    const response = await fetch(`http://backend:5000/api/v1/breed/${slug}`, {
      method: "GET",
    });

    if (!response.ok) return null;

    const data = await response.json();

    return data.breed;
  } catch (error) {
    console.error(error);
    return null;
  }
};
