import prisma from "@/lib/prisma";
import { SessionMiddleware } from "@/lib/session-middleware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { string, z } from "zod";

const app = new Hono().post(
  "/send-message/:userId",
  SessionMiddleware,
  zValidator("query", z.object({ conversationId: z.string(), body: string() })),
  async (c) => {
    const user = c.get("user");
    const { conversationId, body } = c.req.valid("query");
    const { userId } = c.req.param();

    if (!user) {
      return c.json({ error: "Unautherized" }, 401);
    }

    const newMessage = await prisma.message.create({
      data: {
        body,
        image: "",
        conversation: {
          connect: {
            id: conversationId,
          },
        },
        sender: {
          connect: {
            id: userId,
          },
        },
        seen: {
          connect: {
            id: userId,
          },
        },
      },

      include: {
        seen: true,
        sender: true,
      },
    });

    return c.json({ data: newMessage });
  },
);

export default app;
