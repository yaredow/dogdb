import prisma from "@/lib/prisma";
import { cache } from "react";

export const getUser = cache(async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
});
