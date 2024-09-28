"use client";

import EmptyImage from "@/../public/images/doggoEmpty.png";
import Image from "next/image";
import ConversationItem from "./conversations/conversation-item";
import useConversation from "@/hooks/useConversation";
import { Button } from "./ui/button";
import { ArrowLeft, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { FullConversationType, User } from "@/types";

type EmptyStateProps = {
  thereAreConversations: boolean;
  conversations: FullConversationType[];
  user: User;
};

export default function EmptyState({
  thereAreConversations,
  conversations,
  user,
}: EmptyStateProps) {
  const { conversationId } = useConversation();

  return (
    <>
      <main className="hidden h-full flex-col items-center justify-center md:flex">
        {thereAreConversations ? (
          <div className="flex flex-col">
            <Image
              src={EmptyImage}
              alt="A kid hugging a doggo"
              width={200}
              height={200}
            />
            <div className="flex flex-col items-center text-center">
              <h3 className="mt-2 text-2xl font-semibold">
                Select a conversation
              </h3>
            </div>{" "}
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <h3 className="mt-2 text-2xl font-semibold">
              No conversations yet
            </h3>
            <p className="text-sm text-zinc-500">
              Check a dog breed to start a conversation with the owner
            </p>
          </div>
        )}
      </main>

      {/* Mobile view */}
      <div className="flex w-full flex-col md:hidden">
        <div className="mb-2 flex w-full items-center justify-between border-b">
          <div className="flex items-center gap-2 text-2xl">
            <Link href="/" className="block md:hidden">
              <ArrowLeft className="text-xl" />
            </Link>
            <p className="text-lg font-medium">Messages</p>
            <span className="text-lg text-slate-300">
              {conversations && conversations.length > 0
                ? `(${conversations.length})`
                : null}
            </span>
          </div>

          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
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
          <div className="w-full">
            <ul className="flex flex-col gap-1">
              {conversations.map((conversation, index) => (
                <li key={index} className="w-full">
                  <ConversationItem
                    currentLoggedInUserId={user.id}
                    conversation={conversation}
                    isSelectedConversation={conversationId === conversation.id}
                  />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="mt-4 text-center">No conversations found</div>
        )}
      </div>
    </>
  );
}
