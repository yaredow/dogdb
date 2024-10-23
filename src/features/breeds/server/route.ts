import prisma from "@/lib/prisma";
import { SessionMiddleware } from "@/lib/session-middleware";
import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const app = new Hono()
  .get("/", async (c) => {
    const breeds = await prisma.breed.findMany();

    if (!breeds) {
      return c.json({ error: "No breed found" }, 400);
    }

    return c.json({ data: breeds });
  })
  .get("/:slug", async (c) => {
    const { slug } = c.req.param();

    const breed = await prisma.breed.findFirst({
      where: { slug },
    });

    if (!breed) {
      return c.json({ error: "Breed not found" }, 404);
    }

    return c.json({ data: breed });
  })
  .get(
    "/breed-owners/:breedId",
    SessionMiddleware,
    zValidator("query", z.object({ email: z.string().email() })),
    async (c) => {
      const { breedId } = c.req.param();
      const { email } = c.req.valid("query");
      const user = c.get("user");

      if (!user) {
        return c.json({ error: "Unautherized" }, 404);
      }

      const breedOwners = await prisma.user.findMany({
        where: {
          breeds: {
            some: {
              breedId,
            },
          },
          email: {
            not: email,
          },
        },
        include: {
          breeds: {
            include: {
              breed: {
                select: {
                  breedName: true,
                  slug: true,
                },
              },
            },
          },
        },
      });

      if (!breedOwners) {
        c.json({ error: "No breed owners found" }, 404);
      }

      return c.json({ data: breedOwners });
    },
  );

export default app;
