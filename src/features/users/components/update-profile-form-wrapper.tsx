import { Loader2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import UpdateProfileForm from "./update-profile-from";
import { useGetUser } from "../api/use-get-user";
import { useUserId } from "../hooks/use-user-id";

type UpdateProfileFormWrapperProps = {
  onCancel: () => void;
};

export default function UpdateProfileFormWrapper({
  onCancel,
}: UpdateProfileFormWrapperProps) {
  const userId = useUserId();
  const { user, isPending } = useGetUser({ userId });
  console.log({ isPending });

  if (isPending) {
    return (
      <Card className="h-[714px] w-full border-none shadow-none">
        <CardContent className="flex h-full items-center justify-center">
          <Loader2 className="size-5 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return <UpdateProfileForm onCancel={onCancel} user={user} />;
}
