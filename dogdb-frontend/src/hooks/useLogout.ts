import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { logout as logoutUser } from "@/services/authServices";
import useAuthState from "@/store/auth-store";

export default function useLogout() {
  const clearAuth = useAuthState((state) => state.clearAuth);
  const router = useRouter();

  const { isPending, mutate: logout } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      clearAuth();
      router.push("/");
    },
    onError: (error) => {
      console.error("Logout failed", error);
    },
  });
  return { isPending, logout };
}
