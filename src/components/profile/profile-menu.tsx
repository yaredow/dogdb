"use client";

import { Ban, Ellipsis, Link, Upload } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import useCopyToClipboard from "@/hooks/useCopyToClipboard";
import { usePathname } from "next/navigation";
import { User } from "@/types";
import useUnblockUser from "@/hooks/useUnblockuser";
import useBlockUser from "@/hooks/useBlockUser";

type UserProfileMenuProps = {
  user: User;
  isBlocked: boolean;
  debounceBlockStatus: () => void;
};

export default function ProfileMenu({
  user,
  isBlocked,
  debounceBlockStatus,
}: UserProfileMenuProps) {
  const path = usePathname();
  const userProfileUrl = `http://localhost:3000${path}`;
  const { copytoClipboard } = useCopyToClipboard(userProfileUrl);
  const { unblock, isPending: unblockPending } = useUnblockUser();
  const { block, isPending: blockPending } = useBlockUser();

  const handleBlockUser = () => {
    block(user.id);
    debounceBlockStatus();
  };

  const handleUnblockUser = () => {
    unblock(user.id);
    debounceBlockStatus();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Ellipsis className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col items-start justify-start">
        {!isBlocked ? (
          <AlertDialog>
            <AlertDialogTrigger>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                }}
                className="flex flex-row items-center justify-center gap-2"
              >
                <Ban size={16} />
                <span>{`Block @${user.userName?.toLowerCase()}`}</span>{" "}
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {`Unblock @${user.userName?.toLowerCase()}?`}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {`They will not be able to follow you or view your posts, and you will not see posts or notifications from @${user.userName?.toLowerCase()}. `}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleBlockUser}
                  disabled={blockPending}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <AlertDialog>
            <AlertDialogTrigger>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                }}
                className="flex flex-row items-center justify-center gap-2"
              >
                <Ban size={16} />
                <span>{`Unblock @${user.userName?.toLowerCase()}`}</span>
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {`Unblock @${user.userName?.toLowerCase()}?`}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  They will be able to follow you and view your posts.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleUnblockUser}
                  disabled={unblockPending}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center justify-center gap-2">
          <Upload size={16} />
          <span>Share profile via...</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={(Event: React.MouseEvent) => {
            Event.stopPropagation();
            copytoClipboard();
          }}
          className="flex items-center justify-center gap-2"
        >
          <Link size={16} />
          <span>Copy link to profile</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
