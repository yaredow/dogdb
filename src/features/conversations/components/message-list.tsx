"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import MessageItem from "./message-item";
import { FullMessageType, User } from "@/types";
import { socket } from "@/socket";
import ConversationBottombar from "./conversation-bottom-bar";

interface ChatListProps {
  messages: FullMessageType[];
  selectedUser: User;
  currentUser: User;
  conversationId: string;
}

export default function MessageList({
  messages: initialMessages,
  conversationId,
  selectedUser,
  currentUser,
}: ChatListProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessage] = useState(initialMessages);

  useEffect(() => {
    if (!socket) return;

    socket.emit("joinConversation", conversationId);

    const handleMessage = (newMessage: FullMessageType) => {
      console.log("message received", newMessage);
      setMessage((prevMessages) => [...prevMessages, newMessage]);
    };

    socket.on("messageRecived", handleMessage);

    return () => {
      socket.off("messageRecived", handleMessage);
    };
  }, [conversationId]);

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
