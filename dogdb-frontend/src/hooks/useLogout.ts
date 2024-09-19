import { useMutation } from "@tanstack/react-query";
import { logout as logoutUser } from "@/services/authService";
import { useRouter } from "next/navigation";

export default function useLogout() {
  const router = useRouter();
  const { isPending, mutate: logout } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      router.push("/");
    },
    onError: (error: any) => {
      console.error("Logout failed", error);
    },
  });
  return { isPending, logout };
}
