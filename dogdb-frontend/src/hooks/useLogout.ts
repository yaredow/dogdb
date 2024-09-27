import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { logout as logoutUser } from "@/services/authServices";
import { useAuth } from "@/context/AuthContext";

export default function useLogout() {
  const router = useRouter();
  const { setUser, setIsAuthenticated } = useAuth();
  const { isPending, mutate: logout } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      setUser(null);
      setIsAuthenticated(false);
      router.push("/");
    },
    onError: (error) => {
      console.error("Logout failed", error);
    },
  });
  return { isPending, logout };
}
