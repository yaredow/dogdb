import UserPublicProfile from "@/components/profile";
import { getUserById } from "@/data/user";
import { getUserFromCookie } from "@/lib/session";
import { DecodedToken, User } from "@/types";

type IParams = {
  params: Promise<{ userId: string }>;
};

export default async function Page(props: IParams) {
  const params = await props.params;
  const { userId } = params;
  console.log({ userId });

  const currentUser = (await getUserFromCookie()) as DecodedToken;
  const otherUser = (await getUserById(userId)) as User;
  const isCurrentUser = currentUser.id === userId;

  return (
    <UserPublicProfile
      currentUser={currentUser}
      otherUser={otherUser}
      isCurrentUser={isCurrentUser}
    />
  );
}
