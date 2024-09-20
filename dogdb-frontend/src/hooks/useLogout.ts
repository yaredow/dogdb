import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { logout as logoutUser } from "@/services/authServices";

export default function useLogout() {
  const router = useRouter();
  const { isPending, mutate: logout } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      router.push("/");
    },
    onError: (error) => {
      console.error("Logout failed", error);
    },
  });
  return { isPending, logout };
}
