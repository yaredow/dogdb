import { User, FullConversationType } from "@/types";
import { Button } from "../ui/button";
import { useState } from "react";
import useUnblockUser from "@/hooks/useUnblockuser";
import useFollowUser from "@/hooks/useFollowUser";
import useUnfollowUser from "@/hooks/useUnfollowUser";
import { useRouter } from "next/navigation";
import { socket } from "@/socket";
import { UserCheck, UserPlus } from "lucide-react";

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
  const [hoverState, setHoverState] = useState("");

  const getButtonConfig = () => {
    if (isBlocked) {
      return {
        text: (
          <>
            {hoverState === "following" ? (
              <div className="flex items-center gap-2">
                Block <UserPlus size={16} />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                Unblock <UserCheck size={16} />
              </div>
            )}
          </>
        ),
        onClick: () => {
          unblock(user.id);
          debounceBlockStatus();
        },
        disabled: unblockPending,
        variant:
          hoverState === "blocked"
            ? "destructive"
            : ("default" as ButtonVariant),
        hoverState: "blocked",
      };
    }

    if (isFollowing) {
      return {
        text: (
          <>
            {hoverState === "following" ? (
              <div className="flex items-center gap-1">
                Following <UserCheck size={16} />
              </div>
            ) : (
              <div className="flex items-center gap-1">
                Follow <UserCheck size={16} />
              </div>
            )}
          </>
        ),
        onClick: () => {
          unfollow(user.id);
          debounceFollowStatus();
        },
        disabled: unfollowPending,
        variant:
          hoverState === "following"
            ? "destructive"
            : ("default" as ButtonVariant),
        hoverState: "following",
      };
    }

    return {
      text: (
        <div className="flex items-center gap-2">
          Follow <UserPlus size={16} />
        </div>
      ),
      onClick: () => {
        follow(user.id);
        debounceFollowStatus();
      },
      disabled: followPending,
      variant: "default" as ButtonVariant,
      hoverState: "following",
    };
  };

  const buttonConfig = getButtonConfig();

  return (
    <div className="flex flex-row gap-2">
      {!isBlocked && (
        <Button variant="outline" onClick={handleStartConversation}>
          Message
        </Button>
      )}
      <Button
        variant={buttonConfig.variant}
        onClick={buttonConfig.onClick}
        disabled={buttonConfig.disabled}
        onMouseEnter={() => setHoverState(buttonConfig.hoverState)}
        onMouseLeave={() => setHoverState("")}
        className="flex w-[88px] items-center justify-center"
      >
        {buttonConfig.text}
      </Button>
    </div>
  );
}
