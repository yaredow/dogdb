import UserProfile from "@/features/users/components/user-profile";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function UserProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return <div>No user found</div>;
  }

  return <UserProfile loggedInUser={session?.user} />;
}
