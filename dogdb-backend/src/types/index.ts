import { Breed, User } from "@prisma/client";

export type UserType = {
  id: string;
  email: string;
  name?: string; // Assuming 'name' is not included in your Prisma schema, adjust if needed
  role: string;
  active: boolean;
  verified: boolean;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  emailVerificationToken?: string;
  emailVerificationExpires?: Date;
};

export type DecodedToken = {
  id: string;
  iat: number;
  email: string;
  name: string;
};

export type BreedOwners = {
  id: string;
  breedId: string;
  userId: string;
  user: User;
  breed: Breed;
};
