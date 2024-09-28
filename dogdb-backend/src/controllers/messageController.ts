import { Response, NextFunction, Request } from "express";
import { catchAsync } from "../utils/catchAsync";
import AppError from "../utils/appError";
import { io } from "../server";
import prisma from "../lib/db/db";

type SendMessageProps = {
  body: string;
  conversationId: string;
  userId: string;
};

export const getMessages = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const conversationId = request.params.conversationId as string;

    const messages = await prisma.message.findMany({
      where: {
        conversationId,
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!messages) {
      return next(new AppError("There are no messages with id", 404));
    }

    return response.status(200).json({ messages });
  },
);

export const sendMessage = async ({
  body,
  conversationId,
  userId,
}: SendMessageProps) => {
  try {
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

    const updatedConversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    });

    const lastMessage =
      updatedConversation.messages[updatedConversation.messages.length - 1];
    io.to(conversationId).emit("conversationUpdated", lastMessage);
    io.to(conversationId).emit("messageRecived", newMessage);

    return { success: true, message: newMessage };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};
