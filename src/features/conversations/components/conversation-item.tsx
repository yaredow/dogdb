import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import DefaultPf from "@/../public/images/Default_pfp.svg";
import { cn, formatDate } from "@/lib/utils";
import { FullConversationType } from "@/lib/types";

type ConversationItemProps = {
  conversation: FullConversationType;
  currentLoggedInUserId: string;
  isSelectedConversation: boolean;
};
export default function ConversationItem({
  conversation,
  currentLoggedInUserId,
  isSelectedConversation,
}: ConversationItemProps) {
  const otherUser = conversation.users.find(
    (user) => user.id !== currentLoggedInUserId,
  );
  const lastMessage = conversation.messages[conversation.messages.length - 1];

  return (
    <Link
      href={`/conversations/${conversation.id}`}
      className="w-full shrink rounded-lg dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white md:max-w-28"
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
              alt={otherUser?.name || ""}
              width={6}
              height={6}
              className="h-10 w-10"
            />
          </Avatar>

          <div className="flex w-full flex-col">
            <span>{otherUser?.name}</span>
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
