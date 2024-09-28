import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import DefaultPfp from "@/../public/images/Default_pfp.svg";
import { formatDate } from "@/lib/helpers";
import { CheckCheck } from "lucide-react";
import Image from "next/image";
import { FullMessageType, User } from "@/types";

type MessageItemProps = {
  message: FullMessageType;
  currentUser: User;
  selectedUser: User;
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
      className={cn(
        "flex flex-col gap-2 whitespace-pre-wrap p-4",
        isMessageFromCurrentUser ? "items-end" : "items-start",
      )}
    >
      <div className="flex items-center gap-3">
        {!isMessageFromCurrentUser && (
          <Avatar className="flex items-center justify-center">
            <AvatarImage
              src={selectedUser.image || DefaultPfp}
              alt={selectedUser.firstName || ""}
              width={6}
              height={6}
            />
          </Avatar>
        )}

        {message.body ? (
          <div className="flex flex-col gap-2">
            <span className="max-w-xs rounded-md bg-primary p-3">
              {message.body}
            </span>
            <div className="flex flex-row items-center justify-between">
              <span className="text-xs">
                {formatDate(message.createdAt).split(",")[1]}
              </span>

              {isLast &&
                isMessageFromCurrentUser &&
                isMessageSeenByOtherUser && (
                  <span className="text-xs">
                    <CheckCheck size={16} />
                  </span>
                )}
            </div>
          </div>
        ) : (
          message.image && (
            <div className="relative aspect-square h-48">
              <Image
                src={message.image}
                alt={message.id}
                fill
                className="border-primary-800 border-r object-cover"
              />
            </div>
          )
        )}

        {isMessageFromCurrentUser && (
          <Avatar className="flex items-center justify-center">
            <AvatarImage
              src={currentUser.image || DefaultPfp.src}
              alt={currentUser.firstName || ""}
              width={6}
              height={6}
            />
          </Avatar>
        )}
      </div>
    </motion.div>
  );
}
