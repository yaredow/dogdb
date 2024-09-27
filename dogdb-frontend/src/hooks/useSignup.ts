import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "@/services/authServices";
import { useRouter } from "next/navigation";
import { toast } from "./use-toast";
import { SignupFormDataType } from "@/lib/schemas";
import { User } from "@/types";
import { useAuth } from "@/context/AuthContext";

export default function useSignup() {
  const router = useRouter();
  const { setUser, setIsAuthenticated } = useAuth();
  const { mutate: signup, isPending } = useMutation({
    mutationFn: (data: SignupFormDataType) => signupApi(data),
    onSuccess: (data: User) => {
      toast({
        description: "Account created successfully",
      });
      setUser(data);
      setIsAuthenticated(true);
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
