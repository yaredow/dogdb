"use client";

import { Loader2, LogOutIcon, UserIcon } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { signOut, useSession } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import UserAvatar from "./user-avatar";

type UserButtonProps = {
  className: string;
};

export default function UserButton({ className }: UserButtonProps) {
  const { data: session, isRefetching, isPending } = useSession();
  const { name, image, id } = session?.user || {};
  const isLoading = isRefetching || isPending;

  if (isLoading || !session) {
    return (
      <div className="flex size-10 items-center justify-center rounded-full border border-neutral-200">
        <Loader2 className="size-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn("flex-none rounded-full", className)}>
          <UserAvatar avatarUrl={image || ""} size={40} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4">
        <DropdownMenuLabel>Logged in as @{name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={`/users/${id}`}>
          <DropdownMenuItem>
            <UserIcon className="mr-2 size-4" />
            Profile
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOutIcon className="mr-2 size-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
