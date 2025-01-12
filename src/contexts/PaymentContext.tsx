import React, { createContext, useContext, useState } from "react";
import { Reward } from "../types/Reward";
import { Project } from "../types/Project";

interface PaymentContextProps {
  project: Project | null;
  setProject: (project: Project | null) => void;
  reward: Reward | null;
  setReward: (reward: Reward | null) => void;
  pledgeAmount: number;
  setPledgeAmount: (amount: number) => void;
  paymentMethod: string | null;
  setPaymentMethod: (method: string) => void;
  paymentInfo: string | null;
  setPaymentInfo: (info: string) => void;
}

const PaymentContext = createContext<PaymentContextProps | undefined>(undefined);

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [project, setProject] = useState<Project | null>(null);
  const [reward, setReward] = useState<Reward | null>(null);
  const [pledgeAmount, setPledgeAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<string | null>(null);

  return (
    <PaymentContext.Provider
      value={{ project, setProject, reward, setReward, pledgeAmount, setPledgeAmount, paymentMethod, setPaymentMethod, paymentInfo, setPaymentInfo }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = (): PaymentContextProps => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("usePayment must be used within a PaymentProvider");
  }
  return context;
};
