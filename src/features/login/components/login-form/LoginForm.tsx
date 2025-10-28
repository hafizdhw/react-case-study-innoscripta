import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { TextInput } from "../../../../components/ui/text-input/TextInput";
import { Text } from "../../../../components/ui/text/Text";
import { Button } from "../../../../components/ui/button";
import "./LoginForm.css";
import { useToast } from "../../../../components/ui/toaster/useToast";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim()) {
      toast.show({ message: "Please enter a username", type: "error" });
      return;
    }

    if (!password.trim()) {
      toast.show({ message: "Please enter a password", type: "error" });
      return;
    }

    setIsLoading(true);

    try {
      const success = login(username.trim(), password.trim());

      if (success) {
        toast.show({ message: "Login successful!", type: "success" });
        navigate("/board");
      } else {
        toast.show({
          message: "Invalid username or password. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      toast.show({ message: "An error occurred during login", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-form">
      <div className="login-form__card">
        <img src="/innoscripta-logo-blue.svg" alt="Innoscripta Logo" className="login-form__logo" />
        <Text variant="h1" size="3xl" className="login-form__title">
          Welcome Back
        </Text>
        <Text variant="paragraph" size="md" className="login-form__subtitle">
          Please enter your username to continue
        </Text>

        <form onSubmit={handleSubmit} className="login-form__form">
          <div className="login-form__field">
            <Text variant="label" size="sm" className="login-form__label">
              Username
            </Text>
            <TextInput
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="login-form__input"
              disabled={isLoading}
              autoComplete="username"
            />
          </div>

          <div className="login-form__field">
            <Text variant="label" size="sm" className="login-form__label">
              Password
            </Text>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="login-form__input"
              disabled={isLoading}
              autoComplete="current-password"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            className="login-form__button"
            disabled={isLoading || !username.trim() || !password.trim()}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="login-form__hint">
          <Text variant="paragraph" size="sm">
            Admin: alice / admin123 | User: bob / user123
          </Text>
        </div>
      </div>
    </div>
  );
};
