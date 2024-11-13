import prisma from "@/lib/prisma";
import { SessionMiddleware } from "@/lib/session-middleware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono()
  .get("/", SessionMiddleware, async (c) => {
    const user = c.get("user");

    if (!user) {
      return c.json({ error: "Unautherized" }, 401);
    }

    const conversation = await prisma.conversation.findMany({
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    });

    console.log({ conversation });

    return c.json({ data: conversation });
  })
  .get("/:conversationId", SessionMiddleware, async (c) => {
    const user = c.get("user");
    const { conversationId } = c.req.param();

    if (!user) {
      return c.json({ error: "Unautherized" }, 401);
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
    });

    return c.json({ data: conversation });
  })
  .post(
    "/start-conversation",
    SessionMiddleware,
    zValidator("query", z.object({ userId: z.string() })),
    async (c) => {
      const { userId } = c.req.valid("query");
      const user = c.get("user");

      if (!user) {
        return c.json({ error: "Unautherized" }, 401);
      }

      const existingConversation = await prisma.conversation.findMany({
        where: {
          AND: [
            {
              users: {
                some: {
                  id: user?.id,
                },
              },
            },
            {
              users: {
                some: {
                  id: userId,
                },
              },
            },
          ],
        },
        include: {
          users: {
            select: {
              id: true,
            },
          },
          messages: {
            select: {
              seen: true,
              sender: true,
            },
          },
        },
      });

      let conversation;

      if (existingConversation.length > 0) {
        conversation = existingConversation[0];
      } else {
        conversation = await prisma.conversation.create({
          data: {
            users: {
              connect: [
                {
                  id: user?.id,
                },
                {
                  id: userId,
                },
              ],
            },
          },
          include: {
            users: {
              select: {
                id: true,
              },
            },
            messages: {
              select: {
                seen: true,
                sender: true,
              },
            },
          },
        });
      }

      return c.json({ data: conversation });
    },
  );

export default app;
