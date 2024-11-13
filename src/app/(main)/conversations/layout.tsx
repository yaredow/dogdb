import ConversationsSidebar from "@/features/conversations/components/conversations-sidebar";
import { getConversations } from "@/features/conversations/queries";
import { auth } from "@/lib/auth";
import { FullConversationType } from "@/lib/types";
import { headers } from "next/headers";

type ConversationsLayoutProps = {
  children: React.ReactNode;
};

export default async function ConversationsLayout({
  children,
}: ConversationsLayoutProps) {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  const conversations = (await getConversations()) as FullConversationType[];

  if (!conversations.length) {
    return <div>No conversations</div>;
  }

  if (!session) {
    return <div>No session</div>;
  }

  return (
    <div className="flex h-full items-center rounded-lg md:mx-6 md:border">
      <ConversationsSidebar conversations={conversations} />
      <div className="flex-grow">{children}</div>
    </div>
  );
}
