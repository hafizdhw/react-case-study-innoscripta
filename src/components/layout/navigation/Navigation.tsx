import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const toast = useToast();

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast.show({ message: "Logged out successfully", type: "success" });
  };

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="navigation">
      <img src="/innoscripta-logo-blue.svg" alt="Innoscripta Logo" className="navigation__logo" />
      <div className="navigation__links">
        <Link 
          to="/board" 
          className={`navigation__link ${isActiveLink('/board') ? 'active' : ''}`}
        >
          📋 Board
        </Link>
        <Link 
          to="/settings" 
          className={`navigation__link ${isActiveLink('/settings') ? 'active' : ''}`}
        >
          ⚙️ Settings
        </Link>
      </div>

      <div className="navigation__user-info">
        <div className="navigation__username">
          <span className="navigation__username__name">{user?.username}</span>
          <span className="navigation__username__role">{user?.role}</span>
        </div>
        <Button onClick={handleLogout} variant="danger" size="sm">
          🚪 Logout
        </Button>
      </div>
    </nav>
  );
};
