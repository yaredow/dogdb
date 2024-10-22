import prisma from "@/lib/prisma";
import { SessionMiddleware } from "@/lib/session-middleware";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const app = new Hono()
  .get("/", SessionMiddleware, async (c) => {
    const breeds = await prisma.breed.findMany();

    if (!breeds) {
      return c.json({ error: "No breed found" }, 400);
    }

    return c.json({ data: breeds });
  })
  .get("/:slug", async (c) => {
    const { slug } = c.req.param();
    const breed = await prisma.breed.findFirst({
      where: {
        slug,
      },
    });

    if (!breed) {
      c.json({ error: "No breed with that Id" }, 401);
    }

    c.json({ data: breed });
  });

export default app;
