import React, { createContext, useContext, useState, useEffect } from "react";
import { LoginPayload } from "../types/LoginPayload";
import { login, register } from "../utils/authApi";
import { User } from "../types/User";


interface AuthContextProps {
  user: User | null;
  loginUser: (payload: LoginPayload) => Promise<void>;
  registerUser: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  serverErrorClear: () => void;
  updateUserSession: (updatedData: Partial<User>) => void;
  // updateUsername: (newUsername: string) => void;
  // updateEmail: (newEmail: string) => void;
  // updatePassword: (currentPassword: string, newPassword: string) => void;
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

    return serverErrorClear;
  }, []);

  const loginUser = async (payload: LoginPayload) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await login(payload);

      const loggedInUser: User = {
        username: data.username,
        email: data.email,
        passwordLength: payload.password.length,
        userId: data.id,
      };

      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
    } catch (err: any) {
      console.log('err',err)
      const msg = err?.message.split(":")[1].trim();
      setError(msg || "Login failed");
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
        passwordLength: password.length,
        userId: data.Id,
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

  // const updateUsername = async (newUsername: string) => {
  //   try {
  //     setIsLoading(true);
  //     const data = await updateUsernameApi(user?.userId || "0", newUsername); // Функция из authApi.ts
  //     if (user) {
  //       setUser({ ...user, username: data.username! }); // Обновляем только, если API вернул username
  //     }
  //   } catch (error: any) {
  //     setError(error.message);
  //     throw new Error("Failed to update username: " + error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  
  // const updateEmail = async (newEmail: string) => {
  //   try {
  //     setIsLoading(true);
  //     const data = await updateEmailApi(user?.userId || "0", newEmail); // Функция из authApi.ts
  //     if (user) {
  //       setUser({ ...user, email: data.email! }); // Обновляем только, если API вернул email
  //     }
  //   } catch (error: any) {
  //     setError(error.message);
  //     throw new Error("Failed to update email: " + error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  
  // const updatePassword = async (currentPassword: string, newPassword: string) => {
  //   try {
  //     setIsLoading(true);
  //     await updatePasswordApi(user?.userId || "0", currentPassword, newPassword);
  //   } catch (error: any) {
  //     setError(error.message);
  //     throw new Error("Failed to update password: " + error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const updateUserSession = (updatedData: Partial<User>) => {
    setUser((prevUser) => {
      if (!prevUser) return null;
      const updatedUser = { ...prevUser, ...updatedData };
      localStorage.setItem("user", JSON.stringify(updatedUser)); // Обновляем localStorage
      return updatedUser;
    });
  };
  

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const serverErrorClear = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ user, updateUserSession, loginUser, registerUser, logout, serverErrorClear, isLoading, error }}>
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
