"use client";

import DefaultPfp from "@/../public/images/Default_pfp.svg";
import Link from "next/link";
import { Avatar, AvatarImage } from "../../../components/ui/avatar";
import { useGetBreedOwners } from "../api/use-get-breed-owners";
import { Loader2 } from "lucide-react";

type BreedOwnerProps = {
  name: string;
  id: string;
  image: string | null;
};

function BreedOwnerCard({ name, image, id }: BreedOwnerProps) {
  return (
    <Link
      href={`/users/${id}`}
      className="flex flex-row items-center justify-center gap-6 rounded-lg border py-2 hover:bg-muted"
    >
      <Avatar>
        <AvatarImage
          src={image || DefaultPfp.src}
          alt={name || "dog owner image"}
          className="rounded-full"
        />
      </Avatar>
      <div className="px-2">
        <h1>{`${name}`}</h1>
        <span className="text-sm text-muted-foreground">{`@${name?.toLowerCase()}`}</span>
      </div>
    </Link>
  );
}

type BreedOwnerType = {
  breedId: string;
};

export default function BreedOwner({ breedId }: BreedOwnerType) {
  const { breedOwners, isPending } = useGetBreedOwners({ breedId });

  if (isPending) {
    return (
      <Loader2 className="flex items-center justify-center animate-spin" />
    );
  }

  return (
    <div className="w-full bg-background py-4">
      <h2 className="mb-6 text-xl font-bold md:text-2xl">
        {breedOwners && breedOwners.length > 0
          ? "People who own this breed"
          : null}
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {breedOwners &&
          breedOwners.map(({ id, name, image }) => (
            <BreedOwnerCard key={id} id={id} image={image} name={name} />
          ))}
      </div>
    </div>
  );
}
