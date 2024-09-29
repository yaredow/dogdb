import { Response, Request, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync";
import AppError from "../utils/appError";
import { io } from "../server";
import prisma from "../lib/db/db";

export const startConversation = async (
  currentUserId: string,
  userId: string,
) => {
  try {
    const existingConversations = await prisma.conversation.findMany({
      where: {
        AND: [
          {
            users: {
              some: {
                id: currentUserId,
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
        users: true,
        messages: {
          select: {
            seen: true,
            sender: true,
          },
        },
      },
    });

    let conversation;

    if (existingConversations.length > 0) {
      conversation = existingConversations[0];
    } else {
      conversation = await prisma.conversation.create({
        data: {
          users: {
            connect: [
              {
                id: currentUserId,
              },
              {
                id: userId,
              },
            ],
          },
        },
        include: {
          users: true,
          messages: {
            select: {
              sender: true,
              seen: true,
            },
          },
        },
      });
    }

    io.to(currentUserId).emit("conversationStarted", conversation);
    return { success: true, conversation };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};

export const getConversations = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const user = request.user;

    if (!user) {
      return next(new AppError("Please login", 401));
    }

    const conversations = await prisma.conversation.findMany({
      where: {
        users: {
          some: { id: user.id },
        },
      },
      include: {
        users: true,
        messages: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    if (!conversations) {
      return next(new AppError("There are no conversations", 404));
    }
    return response.status(200).json({ conversations });
  },
);

export const getConversationById = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const user = request.user;
    const conversationId = request.params.conversationId as string;
    if (!user) {
      return next(new AppError("Login first", 401));
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
        messages: true,
      },
    });

    if (!conversation) {
      return next(new AppError("There is not conversation with that Id", 404));
    }

    return response.status(200).json({ conversation });
  },
);

export const deleteConversation = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const user = request.user;
    const conversationId = request.params.conversationId as string;

    if (!user) {
      return next(new AppError("Login first", 401));
    }

    const existingConversations = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    if (!existingConversations) {
      return next(new AppError("There is not conversation with that Id", 404));
    }

    await prisma.conversation.delete({
      where: {
        id: conversationId,
        users: {
          some: {
            id: user.id,
          },
        },
      },
    });

    return response
      .status(200)
      .json({ message: "Conversation deleted successfully" });
  },
);

export const getSeen = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const user = request.user;
    const conversationId = request.params.conversationId as string;

    if (!user) {
      return next(new AppError("Login first", 401));
    }

    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        messages: {
          include: { seen: true },
        },
        users: true,
      },
    });

    if (!conversation) {
      return next(new AppError("There is not conversation with that Id", 404));
    }

    const lastMessage = conversation.messages[conversation.messages.length - 1];

    if (!lastMessage) {
      return response.json(conversation);
    }

    const updatedMessage = await prisma.message.update({
      where: { id: lastMessage.id },
      include: { sender: true, seen: true },
      data: { seen: { connect: { id: user.id } } },
    });

    return response.json({ updatedMessage });
  },
);
