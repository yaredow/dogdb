import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import DefaultPfp from "@/../public/images/Default_pfp.svg";
import ConversationDrawer from "./conversation-drawer";
import Link from "next/link";
import ConversationDrawerMobile from "./conversation-drawer-mobile";
import { User } from "@/types";
import useDeleteConversation from "@/hooks/useDeleteConversation";
import { ArrowLeft } from "lucide-react";

interface ChatTopbarProps {
  selectedUser: User;
  conversationId: string;
}

export default function ConversationTopbar({
  selectedUser,
  conversationId,
}: ChatTopbarProps) {
  const { deleteConvo, isPending } = useDeleteConversation();

  const handleConversationDelete = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();
    try {
      deleteConvo(conversationId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-14 w-full items-center justify-between border-b md:h-20 md:p-4">
      <div className="flex items-center gap-4">
        <Link href="/conversations" className="block md:hidden">
          <ArrowLeft className="text-xl" />
        </Link>
        <Avatar className="flex items-center justify-center">
          <AvatarImage
            src={selectedUser?.image || DefaultPfp.src}
            alt={selectedUser?.firstName || ""}
            width={6}
            height={6}
            className="h-10 w-10"
          />
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{`${selectedUser.firstName} ${selectedUser.lastName}`}</span>
          <span className="text-xs">{`@${selectedUser.userName}`}</span>
        </div>
      </div>

      <div className="hidden md:block">
        <ConversationDrawer
          selectedUser={selectedUser}
          onDelete={handleConversationDelete}
        />
      </div>

      <div className="block md:hidden">
        <ConversationDrawerMobile
          selectedUser={selectedUser}
          onDelete={handleConversationDelete}
        />
      </div>
    </div>
  );
}
