import { FullConversationType, User } from "@/types";
import { Button } from "../ui/button";
import { useState } from "react";
import useUnblockUser from "@/hooks/useUnblockuser";
import useFollowUser from "@/hooks/useFollowUser";
import useUnfollowUser from "@/hooks/useUnfollowUser";
import { socket } from "@/socket";
import { useRouter } from "next/navigation";

type UserButtonsProps = {
  user: User;
  isBlocked: boolean;
  isFollowing: boolean;
  debounceBlockStatus: () => void;
  debounceFollowStatus: () => void;
};

type SocketResponseType = {
  success: boolean;
  error: string;
  conversation: FullConversationType;
};

type ButtonVariant =
  | "destructive"
  | "default"
  | "link"
  | "outline"
  | "secondary"
  | null
  | undefined;

export default function UserButtons({
  user,
  isFollowing,
  isBlocked,
  debounceFollowStatus,
  debounceBlockStatus,
}: UserButtonsProps) {
  const { isPending: unblockPending, unblock } = useUnblockUser();
  const { isPending: followPending, follow } = useFollowUser();
  const { isPending: unfollowPending, unfollow } = useUnfollowUser();
  const [isHovering, setIsHovering] = useState(false);
  const router = useRouter();

  const handleStartConversation = () => {
    socket?.emit(
      "startConversation",
      { userId: user.id },
      (response: SocketResponseType) => {
        if (response.success) {
          const { conversation }: { conversation: FullConversationType } =
            response;
          router.push(`/conversation/${conversation.id}`);
        } else {
          console.error(response.error);
        }
      },
    );
  };

  const buttonConfig = (() => {
    if (isBlocked) {
      return {
        text: isHovering ? "Unblock" : "Blocked",
        onClick: () => {
          unblock(user.id);
          debounceBlockStatus();
        },
        disabled: unblockPending,
        variant: isHovering ? "default" : "destructive",
      };
    }

    if (isFollowing) {
      return {
        text: isHovering ? "Unfollow" : "Following",
        onClick: () => {
          unfollow(user.id);
          debounceFollowStatus();
        },
        disabled: unfollowPending,
        variant: isHovering ? "destructive" : "default",
      };
    }

    return {
      text: "Follow", // Keep as "Follow" when not following
      onClick: () => {
        follow(user.id);
        debounceFollowStatus();
      },
      disabled: followPending,
      variant: "default",
    };
  })();

  return (
    <div className="flex flex-row gap-2">
      {!isBlocked && (
        <Button variant="outline" onClick={handleStartConversation}>
          Message
        </Button>
      )}
      <Button
        variant={buttonConfig.variant as ButtonVariant}
        onClick={buttonConfig.onClick}
        disabled={buttonConfig.disabled}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="flex w-[88px] items-center justify-center"
      >
        {buttonConfig.text}
      </Button>
    </div>
  );
}
