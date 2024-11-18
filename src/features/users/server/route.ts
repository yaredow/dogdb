import prisma from "@/lib/prisma";
import { SessionMiddleware } from "@/lib/session-middleware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { UpdateProfileSchema } from "../schemas";
import { UploadApiResponse } from "cloudinary";
import cloudinary from "@/lib/cloudinary";

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

    // Block user
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
  })

  .patch(
    "/update-profile/:userId",
    SessionMiddleware,
    zValidator("form", UpdateProfileSchema),
    async (c) => {
      try {
        const user = c.get("user");
        const { userId } = c.req.param();
        const { image, bio, name, birthDate } = c.req.valid("form");
        console.log({ data: c.req.valid("form") });

        if (!user) {
          return c.json({ error: "Unauthorized" }, 401);
        }

        let imageUrl: string | undefined;

        if (image) {
          const arrayBuffer = await image.arrayBuffer();
          const buffer = new Uint8Array(arrayBuffer);

          try {
            const uploadResult = await new Promise<
              UploadApiResponse | undefined
            >((resolve, reject) => {
              cloudinary.uploader
                .upload_stream(
                  {
                    tags: ["doggo-chat"],
                    upload_preset: "doggo-chat",
                  },
                  (err, result) => {
                    if (err) {
                      reject(err);
                    } else {
                      resolve(result);
                    }
                  },
                )
                .end(buffer);
            });

            imageUrl = uploadResult?.secure_url;
          } catch (uploadError) {
            console.error("Image upload error:", uploadError);
            return c.json(
              { error: "Something went wrong while uploading your image" },
              500,
            );
          }
        }

        const updatedUser = await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            image: imageUrl,
            birthDate,
            name,
            bio,
          },
        });
        return c.json({ data: updatedUser });
      } catch (error) {
        console.error("Unexpected error in update-profile handler:", error);
        return c.json(
          { error: "An unexpected error occurred. Please try again later." },
          500,
        );
      }
    },
  );

export default app;
