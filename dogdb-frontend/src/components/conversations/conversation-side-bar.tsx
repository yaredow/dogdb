"use client";

import { MoreHorizontal } from "lucide-react";
import ConversationItem from "@/components/conversations/conversation-item";
import useConversation from "@/hooks/useConversation";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { FullConversationType } from "@/types";
import { useEffect, useState } from "react";
import { socket } from "@/socket";
import { find } from "lodash";

type SidebarProps = {
  conversations: FullConversationType[];
  currentUserId: string;
};

export default function ConversationSidebar({
  currentUserId,
  conversations: initialConversations,
}: SidebarProps) {
  const [conversations, setConversations] = useState(initialConversations);
  const { conversationId } = useConversation();

  useEffect(() => {
    if (!socket) return;

    const handleConversationStarted = (
      updatedConversation: FullConversationType,
    ) => {
      setConversations((prevConversations: FullConversationType[]) => {
        if ((find(prevConversations), { id: updatedConversation.id })) {
          return prevConversations;
        }

        return [...prevConversations, updatedConversation];
      });
    };

    socket.on("conversationStarted", handleConversationStarted);

    return () => {
      socket.off("conversationStarted", handleConversationStarted);
    };
  }, [currentUserId]);

  return (
    <div className="group relative hidden min-h-[80vh] flex-col gap-4 border-r md:flex md:w-[28%]">
      <div className="mb-2 flex items-center justify-between border-b px-2 md:py-[18.8px]">
        <div className="flex items-center gap-2 text-2xl">
          <p className="font-medium">Messages</p>
          <span className="text-slate-300">
            {conversations && conversations.length > 0
              ? `(${conversations.length})`
              : null}
          </span>
        </div>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-card md:w-[100px]">
              <DropdownMenuItem>Archive chat</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Mark as read</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {conversations.length > 0 ? (
        <div className="grid gap-1 px-2">
          <ul className="flex flex-col gap-1">
            {conversations.map((conversation, index) => (
              <li key={index} className="w-full">
                <ConversationItem
                  currentLoggedInUserId={currentUserId}
                  conversation={conversation}
                  isSelectedConversation={conversationId === conversation.id}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-center">No conversations found</div>
      )}
    </div>
  );
}
