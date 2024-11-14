import prisma from "@/lib/prisma";
import { Conversation, Message, User } from "@prisma/client";

export const getConversations = async () => {
  try {
    const conversations = await prisma.conversation.findMany({
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
            sender: true,
          },
        },
      },
    });

    if (!conversations) {
      return [];
    }

    return conversations;
  } catch (error) {
    console.log(error);
    return [];
  }
};

type FullConversationType = Conversation & {
  messages: Message[];
  users: User[];
};

export const getConversationsWithId = async (
  conversationId: string,
): Promise<FullConversationType | null> => {
  try {
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: true,
        users: true,
      },
    });

    if (!conversation) {
      return null;
    }

    return conversation;
  } catch (error) {
    return null;
  }
};
