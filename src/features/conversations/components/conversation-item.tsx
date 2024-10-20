import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import DefaultPf from "@/../public/images/Default_pfp.svg";
import { formatDate } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { Conversation, FullConversationType, Message, User } from "@/types";
import { useEffect, useState } from "react";
import { socket } from "@/socket";

type ConversationWithDetails = Conversation & {
  users: User[];
  messages: Message[];
};

type ConversationItemProps = {
  conversation: ConversationWithDetails;
  currentLoggedInUserId: string;
  isSelectedConversation: boolean;
};

export default function ConversationItem({
  conversation: initialConversation,
  currentLoggedInUserId,
  isSelectedConversation,
}: ConversationItemProps) {
  const [conversation, setConversation] =
    useState<FullConversationType>(initialConversation);

  const otherUser = conversation.users.find(
    (user: User) => user.id !== currentLoggedInUserId,
  );
  const lastMessage = conversation.messages[conversation.messages.length - 1];

  useEffect(() => {
    if (!socket) return;

    socket.emit("joinConversation", conversation.id);

    const handleUpdateConversation = (updatedMessage: Message) => {
      if (conversation.id === updatedMessage.conversationId) {
        setConversation((prevConversation: FullConversationType) => ({
          ...prevConversation,
          messages: [...prevConversation.messages, updatedMessage],
        }));
      }
    };

    socket.on("conversationUpdated", handleUpdateConversation);

    return () => {
      socket.off("conversationUpdated", handleUpdateConversation);
    };
  }, [conversation.id]);

  return (
    <Link
      href={`/conversation/${conversation.id}`}
      className="w-full shrink rounded-lg dark:bg-muted/10 dark:text-white dark:hover:bg-muted dark:hover:text-white md:max-w-28"
    >
      <div
        className={cn(
          "flex flex-row items-center justify-between p-4 hover:bg-slate-100 dark:hover:bg-muted",
          {
            "w-full rounded-sm bg-slate-100 dark:bg-muted":
              isSelectedConversation,
          },
        )}
      >
        <div className="flex flex-row items-center gap-4">
          <Avatar className="flex items-center justify-center">
            <AvatarImage
              src={otherUser?.image || DefaultPf.src}
              alt={otherUser?.firstName || ""}
              width={6}
              height={6}
              className="h-10 w-10"
            />
          </Avatar>

          <div className="flex w-full flex-col">
            <span>{`${otherUser?.firstName} ${otherUser?.lastName}`}</span>
            {conversation.messages.length > 0 ? (
              <span className="max-w-28 truncate text-ellipsis whitespace-nowrap text-xs text-muted-foreground">
                {lastMessage.body}
              </span>
            ) : (
              <span className="truncate text-xs text-muted-foreground">
                Started a conversation
              </span>
            )}
          </div>
        </div>
        <span className="text-xs">{formatDate(conversation.createdAt)}</span>
      </div>
    </Link>
  );
}
