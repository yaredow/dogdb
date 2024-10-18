import EmptyState from "@/components/empty-chat";
import { getConversations } from "@/data/conversation";
import { loggedInUser } from "@/data/user";
import { FullConversationType } from "@/types";

export const metadata = {
  title: "Chat",
  description: "Chat with fellow dog owners",
};

export default async function Page() {
  const conversations = (await getConversations()) as FullConversationType[];

  const thereAreConversations = conversations?.length > 0;
  const currentUser = await loggedInUser();

  return (
    <main className="flex w-full flex-col items-center justify-center overflow-hidden md:h-[80vh] md:p-4 md:px-12">
      <EmptyState
        conversations={conversations}
        thereAreConversations={thereAreConversations}
        user={currentUser}
      />
    </main>
  );
}
