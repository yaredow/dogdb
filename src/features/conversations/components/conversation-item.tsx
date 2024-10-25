import { Conversation } from "@prisma/client";
import { User } from "better-auth";

type ConversationItemProps = {
  conversation: Conversation;
  currentLoggedUserId: string;
  isSelectedConversation: boolean;
};

export default function ConversationItem({
  conversation,
  currentLoggedUserId,
  isSelectedConversation,
}: ConversationItemProps) {
  return <></>;
}
