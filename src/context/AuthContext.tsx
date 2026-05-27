import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { User } from "../types";

type SubRole = "volunteer" | "sponsor" | "participant" | null;

interface AuthContextValue {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  subRole: SubRole;
  switchRole: (role: "volunteer" | "sponsor" | "participant") => void;
  logout: () => void;
  signIn: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const DEMO_PASSWORDS: Record<string, string> = {
  "organizer@eventtech.club": "demo1234",
  "volunteer@eventtech.club": "demo1234",
  "sponsor@google.com": "demo1234",
  "mukundasaimothku@gmail.com": "demo1234",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUserState] = useState<User | null>(null);
  const [subRole, setSubRole] = useState<SubRole>(null);

  const setCurrentUser = useCallback((user: User | null) => {
    setCurrentUserState(user);
    if (!user) setSubRole(null);
  }, []);

  const switchRole = useCallback((role: "volunteer" | "sponsor" | "participant") => {
    setSubRole(role);
  }, []);

  const logout = useCallback(() => {
    setCurrentUserState(null);
    setSubRole(null);
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const expectedPassword = DEMO_PASSWORDS[email.toLowerCase()];
    if (!expectedPassword || password !== expectedPassword) {
      throw new Error("Invalid credentials");
    }
    // Try to authenticate against the API
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Authentication failed");
    setCurrentUserState(data.user);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, subRole, switchRole, logout, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
