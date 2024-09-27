import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "@/services/authServices";
import { useRouter } from "next/navigation";
import { toast } from "./use-toast";
import { SignupFormDataType } from "@/lib/schemas";
import { User } from "@/types";
import useAuthState from "@/store/auth-store";

export default function useSignup() {
  const router = useRouter();
  const setUser = useAuthState((state) => state.setUser);

  const { mutate: signup, isPending } = useMutation({
    mutationFn: (data: SignupFormDataType) => signupApi(data),
    onSuccess: (data: User) => {
      toast({
        description: "Account created successfully",
      });
      setUser(data);
      router.push(`/profile/${data.id}`);
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
