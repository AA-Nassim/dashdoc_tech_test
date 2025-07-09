import { createContext, useContext, useState, type ReactNode } from "react";

interface AddressesContextType {
  addresses: string[];
  addAddress: (adr: string) => void;
}

const AddressesContext = createContext<AddressesContextType | undefined>(undefined);

export const AddressesProvider = ({ children }: { children: ReactNode }) => {
  const [addresses, setAddresses] = useState<string[]>([]);

  const addAddress = (adr: string) => {
    if (adr.trim() && !addresses.includes(adr.trim())) {
      setAddresses(prev => [...prev, adr.trim()]);
    }
  };

  return (
    <AddressesContext.Provider value={{ addresses, addAddress }}>
      {children}
    </AddressesContext.Provider>
  );
};

export const useAddresses = () => {
  const context = useContext(AddressesContext);
  if (!context) {
    throw new Error("useAddresses must be used within an AddressesProvider");
  }
  return context;
};
