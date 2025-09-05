import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../services/auth';
import { User } from '../types/auth';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      // In a real app, you might want to validate the token with the server
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authService.signin(email, password);
    setToken(response.token);
    localStorage.setItem('token', response.token);
    // You might want to decode the JWT to get user info
    setUser({ email });
  };

  const signup = async (email: string, password: string, name: string) => {
    const response = await authService.signup(email, password, name);
    setToken(response.token);
    localStorage.setItem('token', response.token);
    setUser({ email, name });
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const value = {
    user,
    token,
    loading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}