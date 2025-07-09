import { createContext, useContext, useState, type ReactNode } from "react";

export type Step = [string, string];

interface StepContextType {
  steps: Step[];
  addStep: (step: Step) => void;
}

const StepContext = createContext<StepContextType | undefined>(undefined);

export const StepProvider = ({ children }: { children: ReactNode }) => {
  const [steps, setSteps] = useState<Step[]>([]);

  const addStep = (step: Step) => {
    setSteps(prev => [...prev, step]);
  };

  return (
    <StepContext.Provider value={{ steps, addStep }}>
      {children}
    </StepContext.Provider>
  );
};

export const useSteps = () => {
  const context = useContext(StepContext);
  if (!context) {
    throw new Error("useSteps must be used within a StepProvider");
  }
  return context;
};
