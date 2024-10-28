import { Conversation, Message } from "@prisma/client";
import { User } from "better-auth";

export type FullConversationType = Conversation & {
  messages: Message[];
  users: User[];
};

export type FullMessageType = Message & {
  sender: User;
  seen: User[];
};
