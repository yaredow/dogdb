import { SigninDataType } from "@/lib/schemas";
import { useMutation } from "@tanstack/react-query";
import { signin as signinApi } from "@/services/authServices";
import { User } from "@/types";
import { useRouter } from "next/navigation";
import useAuthState from "@/store/auth-store";

export default function useSignin() {
  const router = useRouter();
  const setUser = useAuthState((state) => state.setUser);

  const { isPending, mutate: signin } = useMutation({
    mutationFn: (data: SigninDataType) => signinApi(data),
    onSuccess: (data: User) => {
      setUser(data);
      router.push(`/profile/${data.id}`);
    },
  });

  return { signin, isPending };
}
