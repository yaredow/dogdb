import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "@/services/authServices";
import { useRouter } from "next/navigation";
import { toast } from "./use-toast";
import { SignupFormDataType } from "@/lib/schemas";

export default function useSignup() {
  const router = useRouter();
  const { mutate: signup, isPending } = useMutation({
    mutationFn: (data: SignupFormDataType) => signupApi(data),
    onSuccess: () => {
      toast({
        description: "Account created successfully",
      });
      router.push("/profile");
    },
    onError: (error) => {
      toast({
        description: error.message,
        variant: "destructive",
      });
    },
  });
  return { signup, isPending };
}
