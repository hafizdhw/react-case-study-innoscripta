import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useAuth,
  useGetCurrentUser,
} from "../../../features/login/context/AuthContext";
import { Button } from "../../ui/button";
import { useToast } from "../../ui/toaster/useToast";

export const Navigation = () => {
  const { logout } = useAuth();
  const user = useGetCurrentUser();
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast.show({ message: "Logged out successfully", type: "success" });
  };

  return (
    <nav
      style={{
        padding: "1rem",
        background: "#eee",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <Link to="/board" style={{ marginRight: "1rem" }}>
          Board
        </Link>
        <Link to="/settings">Settings</Link>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <span style={{ fontSize: "0.9rem", color: "#666" }}>
          {user?.username} ({user?.role})
        </span>
        <Button onClick={handleLogout} variant="danger" size="sm">
          Logout
        </Button>
      </div>
    </nav>
  );
};
