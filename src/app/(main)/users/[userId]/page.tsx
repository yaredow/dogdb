import UserProfile from "@/features/users/components/user-profile";
import { getUser } from "@/features/users/query";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

type UserProfilePageProps = {
  params: {
    userId: string;
  };
};

export default async function UserProfilePage({
  params,
}: UserProfilePageProps) {
  const session = await auth.api.getSession({ headers: await headers() });
  const otherUser = await getUser(params.userId);

  if (!session?.user || !otherUser) {
    return <div>No user found</div>;
  }

  const isCurrentUser = session?.user.id === params.userId;
  const user = isCurrentUser ? session.user : otherUser;

  return <UserProfile user={user} isCurrentUser={isCurrentUser} />;
}
