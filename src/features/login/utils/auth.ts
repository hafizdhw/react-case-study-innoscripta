import { currentUser } from "../../../constants/currentUser";

export interface User {
  username: string;
  role: "admin" | "contributor";
}

export interface UserCredentials {
  username: string;
  password: string;
  role: "admin" | "contributor";
}

// Hardcoded user credentials
export const USERS: UserCredentials[] = [
  {
    username: currentUser.name,
    role: "admin",
    password: "admin123",
  },
  {
    username: "bob",
    password: "user123",
    role: "contributor",
  },
];

export const authenticateUser = (
  username: string,
  password: string
): User | null => {
  const normalizedUsername = username.toLowerCase().trim();
  const normalizedPassword = password.trim();

  const user = USERS.find(
    (u) =>
      u.username.toLowerCase() === normalizedUsername &&
      u.password === normalizedPassword
  );

  if (user) {
    return {
      username: user.username,
      role: user.role,
    };
  }

  return null;
};
