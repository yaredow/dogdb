import { Button } from "@/components/ui/button";
import { useGetFollowers } from "../api/use-get-followers";
import { useUserId } from "../hooks/use-user-id";
import { useFollowUser } from "../api/use-follow-user";
import { useUnfollowUser } from "../api/use-unfollow-user";

export default function FollowButton() {
  const userId = useUserId();
  const { data } = useGetFollowers({ userId });
  const { follow, isPending: isFollowPending } = useFollowUser({ userId });
  const { unfollow, isPending: isUnfollowPending } = useUnfollowUser({
    userId,
  });
  const isPending = isFollowPending || isUnfollowPending;

  const handleClick = () => {
    if (data?.isFollowedByUser) {
      unfollow({ param: { userId } });
    } else {
      follow({
        param: { userId },
      });
    }
  };

  return (
    <Button
      variant={data?.isFollowedByUser ? "secondary" : "primary"}
      disabled={isPending}
      onClick={handleClick}
    >
      {data?.isFollowedByUser ? "Unfollow" : "Follow"}
    </Button>
  );
}
