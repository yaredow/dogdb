import { Card } from "@/components/ui/card";
import { UserType } from "@/lib/types";

type UpdateProfileFormProps = {
  user: UserType | undefined;
  onCancel: () => void;
};

export default function UpdateProfileForm({
  user,
  onCancel,
}: UpdateProfileFormProps) {
  return <Card>profile</Card>;
}
