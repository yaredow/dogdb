"use client";

import { MoreHorizontal } from "lucide-react";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import ConversationItem from "./conversation-item";
import { FullConversationType } from "@/lib/types";
import { useGetConversationId } from "../hooks/use-get-conversation-id";

type SidebarProps = {
  conversations: FullConversationType[];
};

export default function ConversationSidebar({ conversations }: SidebarProps) {
  const conversationId = useGetConversationId();

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

      {conversations && conversations.length > 0 ? (
        <div className="grid gap-1 px-2">
          <ul className="flex flex-col gap-1">
            {conversations.map((conversation, index) => (
              <li key={index} className="w-full">
                <ConversationItem
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
