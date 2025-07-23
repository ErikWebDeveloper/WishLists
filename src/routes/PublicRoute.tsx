// src/routes/PublicRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { type JSX } from "react";

export default function PublicRoute({ children }: { children: JSX.Element }) {
  const { session, loading } = useAuth();

  if (loading) return null;

  return session ? <Navigate to="/list" replace /> : children;
}
