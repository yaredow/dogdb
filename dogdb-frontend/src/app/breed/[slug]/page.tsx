import BreedDetails from "@/components/breed/breed-detail";
import { getBreedWithSlug } from "@/data/breed";
import { loggedInUser } from "@/data/user";
import { Metadata } from "next";

type IParams = {
  slug: string;
};

export async function generateMetadata({
  params,
}: {
  params: IParams;
}): Promise<Metadata> {
  const { slug } = params;
  const breed = await getBreedWithSlug(slug);
  console.log({ breed });

  return { title: `Breed ${breed?.breedName}` };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const breed = await getBreedWithSlug(slug);
  const currentUser = await loggedInUser();

  return <BreedDetails breed={breed} email={currentUser?.email} />;
}
