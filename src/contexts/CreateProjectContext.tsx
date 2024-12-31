import React, { createContext, useContext, useEffect, useState } from 'react';
import { Reward } from '../types/Reward';
import { getProjectConfiguration } from '../utils/projectsApi';

export interface CreateProjectState {
  title: string;
  description: string;
  imageUrl: string; // Project main image URL
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

export interface ProjectConfiguration {
  tags: string[];
  categories: string[];
  paymentMethods: string[];
}

const initialState: CreateProjectState = {
  title: '',
  imageUrl: '',
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
  clearError: () => void;
  configurations: ProjectConfiguration | null;
  error: string | null;
  isLoading: boolean;
}

// Create the context
const CreateProjectContext = createContext<CreateProjectContextType | undefined>(undefined);

// Provider component
export const CreateProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<CreateProjectState>(initialState);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [configurations, setConfigurations] = useState<ProjectConfiguration | null>(null)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(()=>{
    const fetchProjectConfiguration = async () => {
      setIsLoading(true);
      try {
        const data = await getProjectConfiguration();
        setConfigurations(data);
      } catch (err: any) {
        console.log('err',err)
        const msg = err?.message.split(":")[1].trim();
        setError(msg || "Failed to fetch project configuration");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjectConfiguration();
  }, [])

  const clearError = () => {
    setError(null);
  };

  const value = {
    state,
    setState,
    currentStep,
    setCurrentStep,
    clearError,
    configurations,
    error,
    isLoading
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
