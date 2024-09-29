import ConversationSidebar from "@/components/conversations/conversation-side-bar";
import { getConversations } from "@/data/conversation";
import { getUserFromCookie } from "@/lib/session";
import { DecodedToken, FullConversationType } from "@/types";

export default async function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = (await getConversations()) as FullConversationType[];
  const currentUser = (await getUserFromCookie()) as DecodedToken;

  if (!conversations) return <div>No conversations yet</div>;

  return (
    <div className="flex h-full rounded-lg md:mx-6 md:border">
      <ConversationSidebar
        conversations={conversations}
        currentUserId={currentUser.id!}
      />
      <div className="flex-grow">{children}</div>
    </div>
  );
}
