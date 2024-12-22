import React, { createContext, useContext, useState } from 'react';
import { Reward } from '../types/Reward';

export interface CreateProjectState {
  title: string;
  description: string;
  imageURL: string; // Project main image URL
  story: string;
  fundingGoal: number;
  category: string;
  tags: string[];
  deadline: string;
  rewards: Reward[];
   // Selected payment method (e.g., 'visa', 'mastercard')
  paymentInfo: {
    paymentMethod: string;
    cardNumber: string;
  };
}

const initialState: CreateProjectState = {
  title: '',
  imageURL: '',
  description: '',
  story: '',
  fundingGoal: 0,
  category: '',
  tags: [],
  deadline: '',
  rewards: [],
  paymentInfo: {
    paymentMethod: "Visa",
    cardNumber: "",
  },
};

// Context type
interface CreateProjectContextType {
  state: CreateProjectState;
  setState: React.Dispatch<React.SetStateAction<CreateProjectState>>;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

// Create the context
const CreateProjectContext = createContext<CreateProjectContextType | undefined>(undefined);

// Provider component
export const CreateProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<CreateProjectState>(initialState);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const value = {
    state,
    setState,
    currentStep,
    setCurrentStep,
  };

  return <CreateProjectContext.Provider value={value}>{children}</CreateProjectContext.Provider>;
};

// Hook to use the context
export const useCreateProjectContext = () => {
  const context = useContext(CreateProjectContext);
  if (!context) {
    throw new Error('useCreateProjectContext must be used within a CreateProjectProvider');
  }
  return context;
};
