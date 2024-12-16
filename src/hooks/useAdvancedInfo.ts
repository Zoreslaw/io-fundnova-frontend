import { useState, useEffect } from "react";
import {
  fetchAdvancedInfo,
  updateNameApi,
  updateSurnameApi,
  updateAddressApi,
  updatePaymentApi,
  updatePaymentInfoApi,
} from "../utils/advancedInfoApi";
import { User } from "../types/User";

export const useAdvancedInfo = (user: User) => {
  const [info, setInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAdvancedInfo = async () => {
    setIsLoading(true);
    try {
      const data = await fetchAdvancedInfo(user.userId);
      setInfo(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to fetch advanced info");
    } finally {
      setIsLoading(false);
    }
  };

  const updateName = async (newName: string) => {
    setIsLoading(true);
    try {
      const data = await updateNameApi(user.userId, newName);
      setInfo((prevInfo: any) => ({ ...prevInfo, name: data.name }));
    } catch (err: any) {
      setError(err.message || "Failed to update name");
    } finally {
      setIsLoading(false);
    }
  };

  const updateSurname = async (newSurname: string) => {
    setIsLoading(true);
    try {
      const data = await updateSurnameApi(user.userId, newSurname);
      setInfo((prevInfo: any) => ({ ...prevInfo, surname: data.surname }));
    } catch (err: any) {
      setError(err.message || "Failed to update surname");
    } finally {
      setIsLoading(false);
    }
  };

  const updateAddress = async (newAddress: string) => {
    setIsLoading(true);
    try {
      const data = await updateAddressApi(user.userId, newAddress);
      setInfo((prevInfo: any) => ({ ...prevInfo, address: data.address }));
      console.log(info);
    } catch (err: any) {
      setError(err.message || "Failed to update address");
    } finally {
      setIsLoading(false);
    }
  };

  const updatePayment = async (newPayment: string) => {
    setIsLoading(true);
    try {
      const data = await updatePaymentApi(user.userId, newPayment);
      setInfo((prevInfo: any) => ({ ...prevInfo, paymentMethod: data.paymentMethod }));
    } catch (err: any) {
      setError(err.message || "Failed to update payment method");
    } finally {
      setIsLoading(false);
    }
  };

  const updatePaymentInfo = async (newPaymentInfo: string) => {
    setIsLoading(true);
    try {
      const data = await updatePaymentInfoApi(user.userId, newPaymentInfo);
      setInfo((prevInfo: any) => ({ ...prevInfo, paymentInfo: data.paymentInfo }));
    } catch (err: any) {
      setError(err.message || "Failed to update payment info");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAdvancedInfo();
  }, []);

  return {
    info,
    isLoading,
    error,
    loadAdvancedInfo,
    updateName,
    updateSurname,
    updateAddress,
    updatePayment,
    updatePaymentInfo,
  };
};
