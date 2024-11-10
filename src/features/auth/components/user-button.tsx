"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader2, LogOutIcon, UserIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import UserAvatar from "./user-avatar";
import Link from "next/link";

type UserButtonProps = {
  className: string;
};

export default function UserButton({ className }: UserButtonProps) {
  const { data: session, isRefetching, isPending } = authClient.useSession();
  const { name, image, id } = session?.user || {};
  const isLoading = isRefetching || isPending;

  if (isLoading || !session) {
    return (
      <div className="size-10 rounded-full flex items-center justify-center border border-neutral-200 ">
        <Loader2 className="animate-spin size-4 text-muted-foreground" />
      </div>
    );
  }

  const handleSignOut = async () => {
    await authClient.signOut();
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
