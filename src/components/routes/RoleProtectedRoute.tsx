import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

export default function RoleProtectedRoute({ children, allowedRoles }: RoleProtectedRouteProps) {
  const { currentUser, subRole } = useAuth();

  if (!currentUser) return <Navigate to="/" replace />;

  const activeRole = currentUser.role === "organizer" ? "organizer" : (subRole ?? currentUser.role);

  if (!allowedRoles.includes(activeRole)) {
    return <Navigate to="/select-role" replace />;
  }

  return <>{children}</>;
}
