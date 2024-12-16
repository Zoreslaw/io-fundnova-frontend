import { useState, useEffect } from "react";
import { updateUsernameApi, updateEmailApi, updatePasswordApi, fetchBasicInfo } from "../utils/basicInfoApi";
import { User } from "../types/User";
import { useAuth } from "../contexts/AuthContext";


export const useBasicInfo = (user: User) => {
  const [info, setInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { updateUserSession } = useAuth();

  const loadBasicInfo = async () => {
    setIsLoading(true);
    try {
      const data = await fetchBasicInfo(user.userId);
      setInfo(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to fetch advanced info");
    } finally {
      setIsLoading(false);
    }
  };

  const updateUsername = async (newUsername: string) => {
    setIsLoading(true);
    try {
      const data = await updateUsernameApi(user.userId, newUsername);
      setInfo((prevInfo: any) => ({ ...prevInfo, username: data.username }));
      updateUserSession({ username: data.username });
    } catch (err: any) {
      setError(err.message || "Failed to update username");
    } finally {
      setIsLoading(false);
    }
  };

  const updateEmail = async (newEmail: string) => {
    setIsLoading(true);
    try {
      const data = await updateEmailApi(user.userId, newEmail);
      setInfo((prevInfo: any) => ({ ...prevInfo, email: data.email }));
    } catch (err: any) {
      setError(err.message || "Failed to update email");
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    setIsLoading(true);
    try {
      const data = await updatePasswordApi(user.userId, currentPassword, newPassword);
      setInfo((prevInfo: any) => ({ ...prevInfo, passwordLength: data.passwordLength }));
    } catch (err: any) {
      setError(err.message || "Failed to update password");
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    loadBasicInfo();
  }, []);

  return {
    info,
    isLoading,
    error,
    clearError,
    loadBasicInfo,
    updateUsername,
    updateEmail,
    updatePassword,
  };
};
