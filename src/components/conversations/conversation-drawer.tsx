"use client";

import { Button } from "@/components/ui/button";
import { Ellipsis, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import ConversationDrawerContent from "./conversation-drawer-content";
import { User } from "@/types";

type ConversationDropdownMenuProps = {
  selectedUser: User;
  onDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function ConversationDropdownMenu({
  selectedUser,
  onDelete,
}: ConversationDropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        drawerRef.current &&
        !drawerRef.current.contains(target) &&
        !(
          target.closest(".alert-dialog-content") ||
          target.closest(".alert-dialog-trigger")
        )
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <Button
        onClick={toggleDrawer}
        variant="outline"
        size="icon"
        className="rounded-full"
      >
        <Ellipsis />
        <span className="sr-only">Toggle profile drawer</span>
      </Button>

      {isOpen && (
        <div
          ref={drawerRef}
          className="absolute right-0 top-0 z-50 w-[350px] rounded-t-lg border bg-background shadow-lg md:p-6"
        >
          <div className="text-end">
            <button onClick={toggleDrawer}>
              <X size={20} />
            </button>
          </div>

          <ConversationDrawerContent
            onDelete={onDelete}
            selectedUser={selectedUser}
          />
        </div>
      )}
    </div>
  );
}
