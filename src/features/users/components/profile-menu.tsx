"use client";

import { Ban, CircleSlash, Ellipsis, Link, Upload } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { User as AuthType } from "better-auth";
import { User as PrismaType } from "@prisma/client";
import { useUnblockUser } from "../api/use-unblock-user";
import { useUserId } from "../hooks/use-user-id";
import { useBlockUser } from "../api/use-block-user";
import { copyToClipboard } from "@/lib/utils";
import { useConfirm } from "@/hooks/use-confirm";
import { useGetFollowers } from "@/features/users/api/use-get-followers";

type UserProfileMenuProps = {
  user: AuthType | PrismaType;
  isBlocked: boolean | undefined;
};

export default function ProfileMenu({ user, isBlocked }: UserProfileMenuProps) {
  const path = usePathname();
  const userId = useUserId();
  const userProfileUrl = `http://localhost:3000${path}`;
  const { data } = useGetFollowers({ userId });
  const { unblock, isPending: isUnblockPending } = useUnblockUser({ userId });
  const { block, isPending: isBlockPending } = useBlockUser({ userId });

  const [UnblockUserDialog, confirmUnblock] = useConfirm({
    title: "Unblock user",
    message: "This will unblock the user",
    variant: "secondary",
  });
  const [BlockUserDialog, confirmBlock] = useConfirm({
    title: "Block user",
    message: "This will block the user",
    variant: "destructive",
  });

  const handleBlockUser = async () => {
    const ok = await confirmBlock();
    if (ok) {
      block({
        param: { blockedId: userId },
      });
    }
  };

  const handleUnblockUser = async () => {
    const ok = await confirmUnblock();

    if (ok) {
      unblock({
        param: {
          blockedId: userId,
        },
      });
    }
  };

  return (
    <div className="flex flex-col gap-y-2">
      <BlockUserDialog />
      <UnblockUserDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <Ellipsis className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col items-start justify-start">
          {!data?.isBlocked ? (
            <DropdownMenuItem
              onClick={handleBlockUser}
              disabled={isBlockPending}
            >
              <Ban size={16} />
              <span>Block</span>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onClick={handleUnblockUser}
              disabled={isUnblockPending}
            >
              <CircleSlash size={16} />
              <span>Unblock</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={(Event: React.MouseEvent) => {
              Event.stopPropagation();
              copyToClipboard(userProfileUrl);
            }}
            className="flex items-center justify-center gap-2"
          >
            <Link size={16} />
            <span>Copy link to profile</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
