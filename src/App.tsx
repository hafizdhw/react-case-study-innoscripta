import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { BoardPage } from "./pages/BoardPage";
import { IssueDetailPage } from "./pages/IssueDetailPage";
import { SettingsPage } from "./pages/SettingsPage";
import { LoginPage } from "./pages/LoginPage";
import { Navigation } from "./components/layout/navigation/Navigation";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ToastProvider } from "./components/ui/toaster/ToastContext";
import { AuthProvider } from "./features/login/context/AuthContext";
import { IssuesProvider } from "./features/board/context/IssuesContext";
import { SettingsProvider } from "./features/settings/context/SettingsContext";
import { IssuesLoader } from "./features/board/components/board-view/loader/IssuesLoader";
import { ToastRenderer } from "./components/ui/toaster/ToastRenderer";

export const App = () => {
  return (
    <Router>
      <ToastProvider>
        <AuthProvider>
          <SettingsProvider>
            <IssuesProvider>
              <IssuesLoader />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/board"
                element={
                  <ProtectedRoute>
                    <Navigation />
                    <BoardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/issue/:id"
                element={
                  <ProtectedRoute>
                    <Navigation />
                    <IssueDetailPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Navigation />
                    <SettingsPage />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
            <ToastRenderer />
            </IssuesProvider>
          </SettingsProvider>
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
};
