import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, authenticateUser } from '../utils/auth';
import { setAuthCookie, getAuthCookie, clearAuthCookie } from '../utils/cookies';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize auth state from cookie on mount
  useEffect(() => {
    const savedUser = getAuthCookie();
    if (savedUser) {
      setUser(savedUser);
    }
    setIsInitialized(true);
  }, []);

  const login = (username: string, password: string): boolean => {
    const authenticatedUser = authenticateUser(username, password);
    
    if (authenticatedUser) {
      setUser(authenticatedUser);
      setAuthCookie(authenticatedUser);
      return true;
    }
    
    return false;
  };

  const logout = (): void => {
    setUser(null);
    clearAuthCookie();
  };

  const isAuthenticated = !!user;

  // Don't render children until auth state is initialized
  if (!isInitialized) {
    return null; // or a loading spinner
  }

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useGetCurrentUser = (): User | null => {
  const { user } = useAuth();
  return user;
};
