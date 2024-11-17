import { Conversation, Message } from "@prisma/client";
import { User as DBUser } from "@prisma/client";
import { AuthUser } from "./client";

export type UserType = AuthUser | DBUser;

export type FullMessageType = Message & {
  sender: UserType;
  seen: UserType[];
};

export type FullConversationType = Conversation & {
  messages: FullMessageType[];
  users: UserType[];
};
