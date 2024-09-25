import { SigninDataType } from "@/lib/schemas";
import { useMutation } from "@tanstack/react-query";
import { signin as signinApi } from "@/services/authServices";
import { User } from "@/types";
import { useRouter } from "next/navigation";

export default function useSignin() {
  const router = useRouter();
  const { isPending, mutate: signin } = useMutation({
    mutationFn: (data: SigninDataType) => signinApi(data),
    onSuccess: (data: User) => {
      router.push(`/profile/${data.id}`);
    },
  });

  return { signin, isPending };
}
