import UserProfile from "@/features/users/components/user-profile";
import { getUser } from "@/features/users/query";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import { headers } from "next/headers";

type UserProfilePageProps = {
  params: {
    userId: string;
  };
};

export async function generateMetadata({
  params,
}: UserProfilePageProps): Promise<Metadata> {
  const session = await auth.api.getSession({ headers: headers() });

  if (!session) return {};

  const user = await getUser(params.userId);

  return {
    title: `${user?.name}`,
  };
}

export default async function UserProfilePage({
  params,
}: UserProfilePageProps) {
  const session = await auth.api.getSession({ headers: headers() });
  const otherUser = await getUser(params.userId);

  if (!session?.user || !otherUser) {
    return <div>No user found</div>;
  }

  const isCurrentUser = session.user.id === params.userId;
  const user = isCurrentUser ? session.user : otherUser;

  return (
    <main className="min-h-screen">
      <UserProfile user={user} isCurrentUser={isCurrentUser} />
    </main>
  );
}
