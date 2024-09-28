import { getConversationById } from "@/data/conversation";
import MessageList from "@/components/conversations/message-list";
import { loggedInUser } from "@/data/user";
import { User, FullConversationType } from "@/types";

type Iparam = {
  params: { conversationId: string };
};

export default async function Page({ params }: Iparam) {
  const { conversationId } = params;
  const conversation = (await getConversationById(
    conversationId,
  )) as FullConversationType;

  const currentUser = await loggedInUser();

  const selectedUser = conversation?.users.find(
    (user: User) => user.id !== currentUser?.id,
  ) as User;

  return (
    <div className="flex h-[95vh] w-full flex-col justify-between md:h-[80vh]">
      <ConversationTopbar
        selectedUser={selectedUser}
        conversationId={conversationId}
      />

      <MessageList
        messages={conversation?.messages}
        selectedUser={selectedUser}
        conversationId={conversation?.id}
        currentUser={currentUser}
      />
    </div>
  );
}
