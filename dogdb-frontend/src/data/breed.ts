export const getAllbreeds = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/v1/breed");
    if (!response.ok) {
      throw new Error("failed to fetch data");
    }

    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error("Error fetching breeds:", error);
    return null;
  }
};
