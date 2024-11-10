import prisma from "@/lib/prisma";
import { SessionMiddleware } from "@/lib/session-middleware";
import { Hono } from "hono";

const app = new Hono()
  .get("/:userId", async (c) => {
    const { userId } = c.req.param();
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json({ data: user });
  })
  .get("/breed-owners/:breedId", SessionMiddleware, async (c) => {
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
  })
  .get("/followers/:userId", SessionMiddleware, async (c) => {
    const { userId } = c.req.param();
    const currentUser = c.get("user");

    if (!currentUser) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        followers: {
          where: {
            followerId: currentUser.id,
          },
          select: {
            followerId: true,
          },
        },
        _count: {
          select: {
            followers: true,
          },
        },
      },
    });

    const blockRecord = await prisma.block.findFirst({
      where: {
        OR: [
          {
            blockerId: currentUser.id,
            blockedId: userId,
          },
          {
            blockerId: userId,
            blockedId: currentUser.id,
          },
        ],
      },
    });

    const data = {
      followers: user?._count.followers ?? 0,
      isFollowedByUser: !!user?.followers.length,
      isBlocked: !!blockRecord,
    };

    return c.json(data);
  })
  .post("/follow/:userId", SessionMiddleware, async (c) => {
    const { userId } = c.req.param();
    const currentUser = c.get("user");

    if (!currentUser) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    await prisma.follow.upsert({
      where: {
        followerId_followingId: {
          followerId: currentUser.id,
          followingId: userId,
        },
      },
      create: {
        followerId: currentUser.id,
        followingId: userId,
      },
      update: {},
    });

    return c.json({ success: true });
  })
  .delete("/unfollow/:userId", SessionMiddleware, async (c) => {
    const { userId } = c.req.param();
    const currentUser = c.get("user");

    if (!currentUser) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    await prisma.follow.deleteMany({
      where: {
        followerId: currentUser.id,
        followingId: userId,
      },
    });

    return c.json({ success: true });
  })
  .post("/block/:blockedId", SessionMiddleware, async (c) => {
    const { blockedId } = c.req.param();
    const user = c.get("user");

    if (!user) {
      return c.json({ error: "Unauthorized" }, 400);
    }

    // find any follow relationship between the users
    const followRecords = await prisma.follow.findMany({
      where: {
        OR: [
          { followerId: user.id, followingId: blockedId },
          { followerId: blockedId, followingId: user.id },
        ],
      },
    });

    // Delete the follow relationship
    if (followRecords.length > 0) {
      await prisma.follow.deleteMany({
        where: {
          OR: [
            { followerId: user.id, followingId: blockedId },
            { followerId: blockedId, followingId: user.id },
          ],
        },
      });
    }

    const blockRecord = await prisma.block.upsert({
      where: {
        blockerId_blockedId: {
          blockerId: user.id,
          blockedId: blockedId,
        },
      },
      create: {
        blockerId: user.id,
        blockedId: blockedId,
      },
      update: {},
    });

    const data = {
      isBlocked: !!blockRecord,
    };

    return c.json(data);
  })
  .delete("/unblock/:blockedId", SessionMiddleware, async (c) => {
    const { blockedId } = c.req.param();
    const user = c.get("user");

    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    // Unblock the user
    await prisma.block.deleteMany({
      where: {
        blockerId: user.id,
        blockedId,
      },
    });

    return c.json({ success: true });
  });
export default app;
