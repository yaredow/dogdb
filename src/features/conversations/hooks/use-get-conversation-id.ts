import { useParams } from "next/navigation";

export const useGetConversationId = () => {
  const params = useParams();
  return params.conversationId as string;
};
