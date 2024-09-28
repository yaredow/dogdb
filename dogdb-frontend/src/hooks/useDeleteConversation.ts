import { useMutation } from "@tanstack/react-query";
import { toast } from "./use-toast";
import { deleteConversation } from "@/services/conversationService";

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
