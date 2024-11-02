import { SessionMiddleware } from "@/lib/session-middleware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { PostSignupSchema } from "../schemas";
import slugify from "slugify";
import prisma from "@/lib/prisma";

const app = new Hono().post(
  "/",
  zValidator("json", PostSignupSchema),
  SessionMiddleware,
  async (c) => {
    const { breed } = c.req.valid("json");
    const user = c.get("user");

    if (!user) {
      return c.json({ error: "Uauthorized" }, 401);
    }

    if (breed && breed.length > 0) {
      const breedRecord = await Promise.all(
        breed.map(async (breed) => {
          const breedSlug = slugify(breed.value, { lower: true });
          return await prisma.breed.findFirst({
            where: {
              slug: breedSlug,
            },
          });
        }),
      );

      const validBreeds = breedRecord.filter((breed) => breed !== null);

      await Promise.all(
        validBreeds.map(async (breed) => {
          if (breed) {
            await prisma.userBreed.create({
              data: {
                userId: user.id,
                breedId: breed.id,
              },
            });
          } else if (validBreeds.length === 0) {
            return c.json({ error: "Invalid breed selected" });
          }
        }),
      );
    }

    return c.json({ message: "created" });
  },
);

export default app;
