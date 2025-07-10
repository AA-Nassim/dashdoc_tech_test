import { createContext, useContext, useState, type ReactNode } from "react";
import { usePath } from "./PathContext";
import { useSteps } from "./StepContext";

interface AddressesContextType {
  addresses: string[];
  addAddress: (adr: string) => void;
  removeAddress: (adr: string) => void;
  resetAddresses: () => void;
}

const AddressesContext = createContext<AddressesContextType | undefined>(undefined);

export const AddressesProvider = ({ children }: { children: ReactNode }) => {
  const [addresses, setAddresses] = useState<string[]>([]);
  const { removeFromPath, resetPath } = usePath();
  const { removeStep, steps, resetSteps } = useSteps();

  const addAddress = (adr: string) => {
    if (adr.trim() && !addresses.includes(adr.trim())) {
      setAddresses(prev => [...prev, adr.trim()]);
    }
  };

  const removeAddress = (adr: string) => {
    setAddresses(prev => prev.filter(a => a !== adr));
    removeFromPath(adr);
    steps.forEach(([a, b]) => {
      if (a === adr || b === adr) {
        removeStep([a, b]);
      }
    });
  };

  const resetAddresses = () => {
    setAddresses([]);
    resetPath();
    resetSteps();
  };

  return (
    <AddressesContext.Provider value={{ addresses, addAddress, removeAddress, resetAddresses }}>
      {children}
    </AddressesContext.Provider>
  );
};

export const useAddresses = () => {
  const ctx = useContext(AddressesContext);
  if (!ctx) throw new Error("useAddresses must be used within an AddressesProvider");
  return ctx;
};
