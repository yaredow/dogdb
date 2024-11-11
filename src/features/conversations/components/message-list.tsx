"use client";

import React, { useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import ConversationBottombar from "./conversation-bottom-bar";
import MessageItem from "./message-item";
import { useGetConversationId } from "../hooks/use-get-conversation-id";
import { FullMessageType, UserType } from "@/lib/types";

interface ChatListProps {
  currentUser: UserType;
  messages: FullMessageType[];
  selectedUser: UserType;
}

export default function MessageList({
  messages,
  currentUser,
  selectedUser,
}: ChatListProps) {
  const conversationId = useGetConversationId();
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = messagesContainerRef.current;

    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto overflow-x-hidden">
      <div
        ref={messagesContainerRef}
        className="flex h-full w-full flex-col overflow-y-auto overflow-x-hidden"
      >
        <AnimatePresence>
          {messages?.map((message, index) => {
            const isLast = index === messages.length - 1;

            return (
              <MessageItem
                key={index}
                message={message}
                currentUser={currentUser}
                isLast={isLast}
                selectedUser={selectedUser}
              />
            );
          })}
        </AnimatePresence>
      </div>
      <ConversationBottombar conversationId={conversationId} />
    </div>
  );
}
