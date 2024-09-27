"use client";

import { Breed } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BreedCardProps {
  breed: Breed;
}

const BreedCard = ({ breed }: BreedCardProps) => {
  const router = useRouter();
  const { breedImages, breedName, breedShortDescription, slug } = breed;

  const handleClick = () => {
    router.push(`/breed/${slug}`);
  };

  return (
    <article
      onClick={handleClick}
      className="text-secondary-body mb-4 cursor-pointer rounded-lg"
    >
      <Image
        src={breedImages[0]}
        alt={breedName}
        width={800}
        height={400}
        className="rounded-btn shadow"
        unoptimized={true}
      />
      <h2 className="text-md mb-2 mt-2 font-semibold">{breedName}</h2>
      <p className="text-sm">{breedShortDescription}</p>
    </article>
  );
};

export default BreedCard;
