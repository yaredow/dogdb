"use client";

import { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GoogleGenerativeAI } from "@google/generative-ai";

type DogBreedChatWidgetProps = {
  breedName: string;
};

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY!,
);

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function DogBreedChatWidget({
  breedName,
}: DogBreedChatWidgetProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setMessages([
        {
          role: "assistant",
          content: `Hello! I see you're looking at information about ${breedName}s. Do you have any questions about this breed?`,
        },
      ]);
    }
  }, [isOpen, breedName]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(input);
      const response = result.response;
      const text = response.text();

      setMessages((prev) => [...prev, { role: "assistant", content: text }]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm sorry, I encountered an error. Please try again later.",
        },
      ]);
    }

    setIsTyping(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-12 h-12 bg-primary text-primary-foreground"
        >
          <span className="sr-only">Open chat</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
            />
          </svg>
        </Button>
      )}
      {isOpen && (
        <Card className="w-80 h-96 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Chat about {breedName}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              <span className="sr-only">Close</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col overflow-y-auto">
            <ScrollArea className="flex-grow pr-4 mb-4" ref={scrollAreaRef}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-4 ${msg.role === "user" ? "text-right" : "text-left"}`}
                >
                  <span
                    className={`inline-block p-2 rounded-lg ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                  >
                    {msg.content}
                  </span>
                </div>
              ))}
              {isTyping && (
                <div className="text-left">
                  <span className="inline-block p-2 rounded-lg bg-muted">
                    Typing...
                  </span>
                </div>
              )}
            </ScrollArea>
            <form
              onSubmit={handleFormSubmit}
              className="flex items-center space-x-2"
            >
              <Input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={handleInputChange}
              />
              <Button type="submit" size="sm">
                Send
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
