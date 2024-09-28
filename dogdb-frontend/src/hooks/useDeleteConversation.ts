import { useMutation } from "@tanstack/react-query";
import { deleteConversation } from "@/services/conversationService";
import { toast } from "./use-toast";

export default function useDeleteConversation() {
  const { isPending, mutate: deleteConvo } = useMutation({
    mutationFn: (conversationId: string) => deleteConversation(conversationId),
    onSuccess: (message: string) => {
      toast({
        description: message,
      });
    },
    onError: (error) => {
      toast({
        description: error.message,
      });
    },
  });
  return { isPending, deleteConvo };
}
