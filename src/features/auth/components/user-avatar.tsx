import { cn } from "@/lib/utils";
import Image from "next/image";
import DefaultUserAvatar from "@/assets/images/avatar-placeholder.png";

type UserAvatarProps = {
  avatarUrl: string;
  size?: number;
  className?: string;
};

export default function UserAvatar({
  avatarUrl,
  size,
  className,
}: UserAvatarProps) {
  return (
    <Image
      src={avatarUrl || DefaultUserAvatar}
      width={size || 48}
      height={size || 48}
      alt="avatar"
      className={cn(
        "aspect-square h-fit flex-none rounded-full bg-secondary object-cover",
        className,
      )}
    />
  );
}
