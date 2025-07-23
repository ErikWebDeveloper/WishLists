// src/routes/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { type JSX } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { session, loading } = useAuth();

  if (loading) return null; // o un loader

  return session ? children : <Navigate to="/login" replace />;
}
