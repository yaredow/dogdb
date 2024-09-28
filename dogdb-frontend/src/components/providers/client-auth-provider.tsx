"use client";

import useAuthState from "@/store/auth-store";
import { useEffect } from "react";

const ClientAuthProvider = () => {
  const setUser = useAuthState((state) => state.setUser);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);
  return null;
};

export default ClientAuthProvider;
