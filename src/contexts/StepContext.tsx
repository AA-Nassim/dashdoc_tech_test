import { createContext, useContext, useState, type ReactNode } from "react";

export type Step = [string, string];

interface StepContextType {
  steps: Step[];
  addStep: (step: Step) => void;
  removeStep: (step: Step) => void;
}

const StepContext = createContext<StepContextType | undefined>(undefined);

export const StepProvider = ({ children }: { children: ReactNode }) => {
  const [steps, setSteps] = useState<Step[]>([]);

  const addStep = (step: Step) => {
    setSteps(prev => {
      // Only add if not already present
      if (prev.some(([a, b]) => (a === step[0] && b === step[1]) || (a === step[1] && b === step[0]))) {
        return prev;
      }
      return [...prev, step];
    });
  };

  const removeStep = (step: Step) => {
    setSteps(prev => prev.filter(([a, b]) => !(a === step[0] && b === step[1])));
  };

  return (
    <StepContext.Provider value={{ steps, addStep, removeStep }}>
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
