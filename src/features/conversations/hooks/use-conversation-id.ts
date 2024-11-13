import { useParams } from "next/navigation";

export const useConversationId = () => {
  const params = useParams();
  return params.conversationId as string;
};
