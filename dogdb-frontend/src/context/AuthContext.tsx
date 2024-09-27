"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { User } from "@/types";

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void; // Function to set user state
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void; // Function to set isAuthenticated state
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, setUser, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
