import { Button } from "@/components/ui/button";
import { useGetFollowers } from "../api/use-get-followers";
import { useUserId } from "../hooks/use-user-id";
import { useFollowUser } from "../api/use-follow-user";
import { useUnfollowUser } from "../api/use-unfollow-user";
import { useUnblockUser } from "../api/use-unblock-user";

export default function FollowButton() {
  const userId = useUserId();
  const { data } = useGetFollowers({ userId });
  const { follow, isPending: isFollowPending } = useFollowUser({ userId });
  const { unblock, isPending: isUnblockLoading } = useUnblockUser({ userId });
  const { unfollow, isPending: isUnfollowPending } = useUnfollowUser({
    userId,
  });

  const isPending = isFollowPending || isUnfollowPending || isUnblockLoading;
  const isBlocked = data?.isBlocked;
  const isFollowedByUser = data?.isFollowedByUser;

  const buttonLabel = isBlocked
    ? "Unblock"
    : isFollowedByUser
      ? "Unfollow"
      : "Follow";

  const buttonVariant = isBlocked
    ? "destructive"
    : isFollowedByUser
      ? "secondary"
      : "primary";

  const handleClick = () => {
    if (isBlocked) {
      unblock({ param: { blockedId: userId } });
    } else if (isFollowedByUser) {
      unfollow({ param: { userId } });
    } else {
      follow({ param: { userId } });
    }
  };

  return (
    <Button variant={buttonVariant} disabled={isPending} onClick={handleClick}>
      {buttonLabel}
    </Button>
  );
}
