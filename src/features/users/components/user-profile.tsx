"use client";

import { User as PrismsUser } from "@prisma/client";
import { User as AuthUser } from "better-auth";

type UserProfileProps = {
  user: PrismsUser | AuthUser;
  isCurrentUser: boolean;
};

export default function UserProfile({ user, isCurrentUser }: UserProfileProps) {
  return <div>{JSON.stringify(user)}</div>;
}
