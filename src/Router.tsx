import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/Login";
import ListPage from "./pages/ListPage";
import WishPage from "./pages/WishPage";

export default function AppRouter() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="list"
            element={
              <ProtectedRoute>
                <ListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/list/:listId"
            element={
              <ProtectedRoute>
                <WishPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
