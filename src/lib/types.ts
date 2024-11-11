import { Conversation, Message } from "@prisma/client";
import { User as AuthUser } from "better-auth";
import { User as DBUser } from "@prisma/client";

export type UserType = AuthUser | DBUser;

export type FullMessageType = Message & {
  sender: UserType;
  seen: UserType[];
};

export type FullConversationType = Conversation & {
  messages: FullMessageType[];
  users: UserType[];
};
