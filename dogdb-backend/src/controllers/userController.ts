import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import prisma from "../lib/db/db";
import AppError from "../utils/appError";

export const getAllUsers = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const users = await prisma.user.findMany();

    if (!users) {
      return next(new AppError("No user found", 404));
    }

    return response.status(200).json({ users });
  },
);

export const getUser = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const user = request.user;

    if (!user) {
      return next(
        new AppError("You are not logged in. Please login first", 401),
      );
    }

    return response.status(200).json({ user });
  },
);

export const getUserByEmail = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const email = request.params.email as string;
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      return next(new AppError("No user exists with that email", 404));
    }

    return response.status(200).json({ user });
  },
);

export const getUserById = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id as string;

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        followers: true,
        following: true,
      },
    });

    if (!user) {
      return next(new AppError("No user exists with that id", 404));
    }

    return response.status(200).json({ user });
  },
);

export const getBreedOwners = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const breedId = request.params.breedId as string;
    console.log({ breedId });

    const email = request.query.email as string;

    const owners = await prisma.user.findMany({
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
          select: {
            user: true,
            breedId: true,
          },
        },
      },
    });

    console.log({ owners });

    if (!owners) {
      return next(new AppError("This breed has no owners", 404));
    }

    return response.status(200).json({ owners });
  },
);

export const followUser = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const followingId = request.params.followingId as string;
    const user = request.user;

    if (!user) {
      return next(
        new AppError("You are not logged in. Please log in first", 401),
      );
    }

    const existingFollow = await prisma.follows.findUnique({
      where: {
        followerId_followingId: {
          followerId: user.id,
          followingId,
        },
      },
    });

    if (existingFollow) {
      return next(new AppError("You are already following this user", 400));
    }

    await prisma.follows.create({
      data: {
        followerId: user.id,
        followingId,
      },
    });

    return response
      .status(200)
      .json({ message: "You are now following this user" });
  },
);

export const unfollowUser = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const followingId = request.params.followingId as string;
    const user = request.user;

    if (!user) {
      return next(
        new AppError("You are not logged in. Please log in first", 401),
      );
    }

    const existingFollow = await prisma.follows.findUnique({
      where: {
        followerId_followingId: {
          followerId: user.id,
          followingId,
        },
      },
    });

    if (!existingFollow) {
      return next(new AppError("You don't follow this user", 400));
    }

    await prisma.follows.delete({
      where: {
        followerId_followingId: {
          followerId: user.id,
          followingId,
        },
      },
    });
    return response
      .status(200)
      .json({ message: "You have successfully unfollowed the user " });
  },
);

export const blockUser = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const blockedId = request.params.blockedId;
    const user = request.user;

    if (!user) {
      return next(
        new AppError("You are not logged in. Please log in first", 401),
      );
    }

    const existingBlock = await prisma.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: user.id,
          blockedId,
        },
      },
    });

    if (existingBlock) {
      return next(new AppError("You already blocked this user", 400));
    }

    await prisma.block.create({
      data: {
        blockedId,
        blockerId: user.id,
      },
    });

    return response.status(200).json({ message: "User successfully blocked" });
  },
);

export const unblockUser = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const user = request.user;
    const blockedId = request.params.blockedId;

    if (!user) {
      return next(
        new AppError("You are not logged in. Please login first", 401),
      );
    }

    const existingBlock = await prisma.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: user.id,
          blockedId,
        },
      },
    });

    if (existingBlock) {
      await prisma.block.delete({
        where: {
          id: existingBlock.id,
        },
      });
    }

    return response
      .status(200)
      .json({ message: "You have successfully unblocked user" });
  },
);

export const isBlocked = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const user = request.user;
    const blockedId = request.params.blockedId as string;

    if (!user) {
      return next(
        new AppError("You are not logged in. Please login first", 401),
      );
    }

    const blockedUser = await prisma.user.findUnique({
      where: {
        id: blockedId,
      },
    });

    if (!blockedUser) {
      return next(new AppError("No user exists with that id", 404));
    }

    const isBlocked = await prisma.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: user.id,
          blockedId: blockedUser.id,
        },
      },
    });

    return response.status(200).json({ isBlocked: !!isBlocked });
  },
);

export const isFollowing = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const user = request.user;
    const followingId = request.params.followingId as string;
    console.log({ followingId });

    if (!user) {
      return next(
        new AppError("You are not logged in. Please login first", 401),
      );
    }

    const followingUser = await prisma.user.findUnique({
      where: {
        id: followingId,
      },
    });

    if (!followingUser) {
      return next(new AppError("No user exists with that id", 404));
    }

    const isFollowing = await prisma.follows.findUnique({
      where: {
        followerId_followingId: {
          followerId: user.id,
          followingId: followingUser.id,
        },
      },
    });

    console.log({ isFollowing });

    return response.status(200).json({ isFollowing: !!isFollowing });
  },
);
