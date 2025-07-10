import React, { createContext, useContext, useState, type ReactNode } from "react";

interface PathContextType {
  path: string[];
  addToPath: (adr: string) => void;
  removeFromPath: (adr: string) => void;
}

const PathContext = createContext<PathContextType | undefined>(undefined);

export const PathProvider = ({ children }: { children: ReactNode }) => {
  const [path, setPath] = useState<string[]>([]);

  const addToPath = (adr: string) => {
    if (adr.trim() && !path.includes(adr.trim())) {
      setPath(prev => [...prev, adr.trim()]);
    }
  };

  const removeFromPath = (adr: string) => {
    setPath(prev => prev.filter(item => item !== adr));
  };

  return (
    <PathContext.Provider value={{ path, addToPath, removeFromPath }}>
      {children}
    </PathContext.Provider>
  );
};

export const usePath = () => {
  const context = useContext(PathContext);
  if (!context) {
    throw new Error("usePath must be used within an PathProvider");
  }
  return context;
};
