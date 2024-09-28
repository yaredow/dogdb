"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import Defaultpfp from "@/../public/images/Default_pfp.svg";
import useLogout from "@/hooks/useLogout";
import useAuthState from "@/store/auth-store";

export default function UserMenu() {
  const { logout } = useLogout();
  const user = useAuthState((state) => state.user);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Image
            src={user?.image || Defaultpfp}
            alt="User profile picture"
            width={50}
            height={50}
            className="aspect-square rounded-full bg-background object-cover"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{`${user?.firstName} ${user?.lastName}`}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={`/profile/${user?.id}`}>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={(Event: React.MouseEvent) => {
            Event.stopPropagation();
            logout();
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
