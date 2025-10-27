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
import { Navigation } from "./components/layout/navigation/Navigation";
import { ToastProvider } from "./components/ui/toaster/ToastContext";
import { IssuesProvider } from "./features/board/context/IssuesContext";
import { IssuesLoader } from "./features/board/components/board-view/loader/IssuesLoader";

export const App = () => {
  return (
    <Router>
      <ToastProvider>
        <IssuesProvider>
          <IssuesLoader />
          <Navigation />
          <Routes>
            <Route path="/board" element={<BoardPage />} />
            <Route path="/issue/:id" element={<IssueDetailPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/board" />} />
          </Routes>
        </IssuesProvider>
      </ToastProvider>
    </Router>
  );
};
