import { Conversation, Message, User } from "@prisma/client";

export type FullConversationType = Conversation & {
  messages: Message[];
  users: User[];
};

export type FullMessageType = Message & {
  sender: User;
  seen: User[];
};
