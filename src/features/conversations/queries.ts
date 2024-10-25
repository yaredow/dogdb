import prisma from "@/lib/prisma";

export const getConversations = async () => {
  try {
    const conversations = await prisma.conversation.findMany();

    if (!conversations) {
      return null;
    }

    return conversations;
  } catch (error) {
    console.log(error);
    return null;
  }
};
