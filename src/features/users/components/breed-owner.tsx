"use client";

import DefaultPfp from "@/../public/images/Default_pfp.svg";
import Link from "next/link";
import { Avatar, AvatarImage } from "../../../components/ui/avatar";
import { User } from "@prisma/client";

type BreedOwnerProps = {
  user: User;
};

function BreedOwnerCard({ user }: BreedOwnerProps) {
  return (
    <Link
      href={`/profile/${user?.id}`}
      className="flex flex-row items-center justify-center gap-6 rounded-lg border py-2 hover:bg-muted"
    >
      <Avatar>
        <AvatarImage
          src={user.image || DefaultPfp.src}
          alt={user.name || "dog owner image"}
          className="rounded-full"
        />
      </Avatar>
      <div className="px-2">
        <h1>{`${user.name}`}</h1>
        <span className="text-sm text-muted-foreground">{`@${user.name?.toLowerCase()}`}</span>
      </div>
    </Link>
  );
}

export default function BreedOwner({ breedOwners }: { breedOwners: User[] }) {
  return (
    <div className="w-full bg-background py-4">
      <h2 className="mb-6 text-xl font-bold md:text-2xl">
        {breedOwners && breedOwners.length > 0
          ? "People who own this breed"
          : null}
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {breedOwners &&
          breedOwners.map((user: User) => (
            <BreedOwnerCard key={user.id} user={user} />
          ))}
      </div>
    </div>
  );
}
