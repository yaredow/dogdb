import prisma from "@/lib/prisma";
import { Hono } from "hono";

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
  .get("/breed-owners/:breedId", async (c) => {
    const { breedId } = c.req.param();

    const owners = await prisma.user.findMany({
      where: {
        breeds: {
          some: {
            breedId,
          },
        },
      },
      include: {
        breeds: {
          include: {
            breed: true,
          },
        },
      },
    });

    if (!owners.length) {
      c.json({ error: "No breed owners found" }, 404);
    }

    return c.json({ data: owners });
  });

export default app;
