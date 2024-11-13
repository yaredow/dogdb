import { motion } from "framer-motion";

import Image from "next/image";
import { CheckCheck } from "lucide-react";

import { formatDate } from "@/lib/utils";
import { FullMessageType, UserType } from "@/lib/types";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import DefaultPfp from "@/assets/images/Default_pfp.svg";

type MessageItemProps = {
  message: FullMessageType;
  currentUser: UserType;
  selectedUser: UserType;
  isLast: boolean;
};

export default function MessageItem({
  message,
  currentUser,
  selectedUser,
  isLast,
}: MessageItemProps) {
  const seenList = message.seen || [];
  const isMessageFromCurrentUser = message.senderId === currentUser.id;
  const isMessageSeenByOtherUser = seenList.some(
    (user) => user.id === selectedUser.id,
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
      animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
      transition={{
        opacity: { duration: 0.1 },
        layout: {
          type: "spring",
          bounce: 0.3,
          duration: 0.2,
        },
      }}
      style={{
        originX: 0.5,
        originY: 0.5,
      }}
    >
      <div className="mx-4">
        <div
          className={`flex items-start gap-2 ${isMessageFromCurrentUser ? "flex-row-reverse" : "flex-row"}`}
        >
          <Avatar className="mt-1 flex-shrink-0">
            <AvatarImage
              src={
                isMessageFromCurrentUser
                  ? currentUser.image || DefaultPfp.src
                  : selectedUser.image || DefaultPfp.src
              }
              alt={
                isMessageFromCurrentUser
                  ? currentUser.name || ""
                  : selectedUser.name || ""
              }
              width={24}
              height={24}
            />
          </Avatar>

          <div
            className={`flex flex-col ${isMessageFromCurrentUser ? "items-end" : "items-start"}`}
          >
            {message.body ? (
              <>
                <span
                  className={`max-w-xs rounded-md p-3 ${isMessageFromCurrentUser ? "bg-primary text-primary-foreground" : "bg-accent"}`}
                >
                  {message.body}
                </span>

                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    {formatDate(message.createdAt).split(",")[1]}
                  </span>

                  {isLast &&
                    isMessageFromCurrentUser &&
                    isMessageSeenByOtherUser && (
                      <span className="text-xs text-muted-foreground">
                        <CheckCheck size={16} />
                      </span>
                    )}
                </div>
              </>
            ) : (
              message.image && (
                <div className="relative aspect-square h-48 overflow-hidden rounded-md">
                  <Image
                    src={message.image}
                    alt={message.id}
                    fill
                    className="object-cover"
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
