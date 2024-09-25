export const getAllbreeds = async () => {
  try {
    const response = await fetch("http://dogdb_backend:5000/api/v1/breed", {
      method: "GET",
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
    const response = await fetch(
      `http://dogdb_backend:5000/api/v1/breed/${slug}`,
      {
        method: "GET",
      },
    );

    if (!response.ok) return [];

    const data = await response.json();

    return data.breed;
  } catch (error) {
    console.error(error);

    return [];
  }
};
