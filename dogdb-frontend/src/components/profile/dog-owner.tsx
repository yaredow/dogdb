"use client";

import DefaultPfp from "@/../public/images/Default_pfp.svg";
import Link from "next/link";
import { Avatar, AvatarImage } from "../ui/avatar";
import { User } from "@/types";

function DogOwnerCard({ user }: { user: User }) {
  console.log({ user });

  return (
    <Link
      href={`/profile/${user.id}`}
      className="flex flex-row items-center justify-center gap-6 rounded-lg border py-2 hover:bg-muted"
    >
      <Avatar>
        <AvatarImage
          src={user.image || DefaultPfp.src}
          alt={user.firstName || "dog owner image"}
          className="rounded-full"
        />
      </Avatar>
      <div className="px-2">
        <h1>{user.firstName}</h1>
        <span className="text-sm text-muted-foreground">{`@${user.userName?.toLowerCase()}`}</span>
      </div>
    </Link>
  );
}

export default function DogOwner({ breedOwners }: { breedOwners: User[] }) {
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
            <DogOwnerCard key={user.id} user={user} />
          ))}
      </div>
    </div>
  );
}
