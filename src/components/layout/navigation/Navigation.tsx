import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useAuth,
  useGetCurrentUser,
} from "../../../features/login/context/AuthContext";
import { Button } from "../../ui/button";
import { useToast } from "../../ui/toaster/useToast";
import "./Navigation.css";

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
    <nav className="navigation">
      <div className="navigation__links">
        <Link to="/board" className="navigation__link">
          Board
        </Link>
        <Link to="/settings" className="navigation__link">
          Settings
        </Link>
      </div>

      <div className="navigation__user-info">
        <span className="navigation__username">
          {user?.username} ({user?.role})
        </span>
        <Button onClick={handleLogout} variant="danger" size="sm">
          Logout
        </Button>
      </div>
    </nav>
  );
};
