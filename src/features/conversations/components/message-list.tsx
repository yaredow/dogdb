"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import ConversationBottombar from "./conversation-bottom-bar";
import MessageItem from "./message-item";
import { User } from "better-auth";
import { useGetConversationId } from "../hooks/use-get-conversation-id";
import { FullMessageType } from "@/lib/types";

interface ChatListProps {
  messages: FullMessageType[];
  currentUser: User;
}

export default function MessageList({
  messages: initialMessages,
  currentUser,
}: ChatListProps) {
  const conversationId = useGetConversationId();
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessage] = useState(initialMessages);

  // useEffect(() => {
  //   if (!socket) return;
  //
  //   socket.emit("joinConversation", conversationId);
  //
  //   const handleMessage = (newMessage: FullMessageType) => {
  //     console.log("message received", newMessage);
  //     setMessage((prevMessages) => [...prevMessages, newMessage]);
  //   };
  //
  //   socket.on("messageRecived", handleMessage);
  //
  //   return () => {
  //     socket.off("messageRecived", handleMessage);
  //   };
  // }, [conversationId]);

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
                selectedUser={selectedUser}
                isLast={isLast}
              />
            );
          })}
        </AnimatePresence>
      </div>
      <ConversationBottombar conversationId={conversationId} />
    </div>
  );
}
