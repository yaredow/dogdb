import prisma from "@/lib/prisma";
import { SessionMiddleware } from "@/lib/session-middleware";
import { Hono } from "hono";

const app = new Hono().get(
  "/breed-owners/:breedId",
  SessionMiddleware,
  async (c) => {
    const { breedId } = c.req.param();
    const user = c.get("user");

    if (!user) {
      c.json({ error: "Unauthorized" }, 401);
    }

    const breedOwners = await prisma.user.findMany({
      where: {
        breeds: {
          some: {
            breedId,
          },
        },
        email: {
          not: user?.email,
        },
      },
      include: {
        breeds: {
          include: {
            user: {
              select: {
                name: true,
                image: true,
                id: true,
              },
            },
            breed: {
              select: {
                breedName: true,
                id: true,
              },
            },
          },
        },
      },
    });

    if (breedOwners.length === 0) {
      return c.json({ error: "No breed owners found" }, 404);
    }

    return c.json({ data: breedOwners });
  },
);

export default app;
