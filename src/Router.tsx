import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/Login";
import ListPage from "./pages/ListPage";
import WishPage from "./pages/WishPage";
import SharedWishPage from "./pages/SharedLists";
import Dashboard from "./pages/Dashboard";
import AppLayout from "./layouts/AppLayout";

//import ListPage from "./pages/ListPageAb";
//import WishPage from "./pages/WishPageAb";

export default function AppRouter() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/shared/:listId" element={<SharedWishPage />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route element={<AppLayout />}>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
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
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
