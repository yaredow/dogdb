import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { FullConversationType, UserType } from "@/lib/types";

import ConversationTopbar from "@/features/conversations/components/conversation-top-bar";
import { getConversationsWithId } from "@/features/conversations/queries";
import MessageList from "@/features/conversations/components/message-list";

type ConversationWithIdPageProps = {
  params: {
    conversationId: string;
  };
};

export default async function ConversationWithIdPage({
  params,
}: ConversationWithIdPageProps) {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  const conversation = (await getConversationsWithId(
    params.conversationId,
  )) as FullConversationType;

  if (!conversation) {
    return <div>No conversation yet</div>;
  }

  const selectedUser = conversation?.users.find(
    (user) => user.id !== session.user.id,
  ) as UserType;

  return (
    <div className="flex h-[95vh] w-full flex-col justify-between gap-y-4 md:h-[80vh]">
      <ConversationTopbar selectedUser={selectedUser} />

      <MessageList
        currentUser={session.user}
        messages={conversation.messages}
        selectedUser={selectedUser}
      />
    </div>
  );
}
