import BreedGrid from "./breed-grid";

const fetchBreeds = async () => {
  const response = await fetch("http://localhost:5000/api/v1/breed");

  if (!response.ok) {
    throw new Error("Failed to fetch breeds");
  }

  const data = await response.json();

  return data.breeds;
};

export default async function BreedPage() {
  const breeds = await fetchBreeds();

  if (!breeds) {
    return <div>No breeds found</div>;
  }

  return <BreedGrid breeds={breeds} />;
}
