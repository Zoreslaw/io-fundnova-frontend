import React, { createContext, useContext, useState, useEffect } from "react";
import { LoginPayload } from "../types/LoginPayload";
import { login, register } from "../utils/authApi";

interface User {
  username: string;
  email: string;
}

interface AuthContextProps {
  user: User | null;
  loginUser: (payload: LoginPayload) => Promise<void>;
  registerUser: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  errorClear: () => void;
  isLoading: boolean;
  error: string | null;
}

interface AuthProviderProps {
    children: any;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const loginUser = async (payload: LoginPayload) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await login(payload);

      const loggedInUser: User = {
        username: data.username,
        email: data.email,
      };
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      //console.log("USELESS: " + loggedInUser.username);
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const registerUser = async (username: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await register(username, email, password);
      const regestredUser: User = {
        username: username,
        email: email,
      };
      setUser(regestredUser);
      localStorage.setItem("user", JSON.stringify(regestredUser));
      console.log("Registration successful:", data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const errorClear = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, registerUser, logout, errorClear, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
