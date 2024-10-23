import BreedDetails from "@/features/breeds/components/breed-detail";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { headers } from "next/headers";
import { cache } from "react";

type IParams = {
  slug: string;
};

const getBreed = cache(async (slug: string) => {
  const breed = await prisma.breed.findFirst({
    where: {
      slug,
    },
  });
  return breed;
});

export async function generateMetadata(props: {
  params: Promise<IParams>;
}): Promise<Metadata> {
  const params = await props.params;
  const { slug } = params;
  const breed = await getBreed(slug);

  return { title: `Breed ${breed?.breedName}` };
}

export default async function Page() {
  return <BreedDetails />;
}
