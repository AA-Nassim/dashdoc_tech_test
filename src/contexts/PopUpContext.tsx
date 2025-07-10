import React, { createContext, useContext, useState, type ReactNode } from "react";

type PopUpContent = {
  title: string;
  content: string;
};

interface PopUpContextType {
  show: (content: PopUpContent) => void;
  hide: () => void;
  isOpen: boolean;
  popupContent: PopUpContent | null;
}

const PopUpContext = createContext<PopUpContextType | undefined>(undefined);

export const PopUpProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [popupContent, setPopupContent] = useState<PopUpContent | null>(null);

  const show = (content: PopUpContent) => {
    setPopupContent(content);
    setIsOpen(true);
  };

  const hide = () => {
    setIsOpen(false);
    setPopupContent(null);
  };

  return (
    <PopUpContext.Provider value={{ show, hide, isOpen, popupContent }}>
      {children}
    </PopUpContext.Provider>
  );
};

export const usePopUp = () => {
  const ctx = useContext(PopUpContext);
  if (!ctx) throw new Error("usePopUp must be used within a PopUpProvider");
  return ctx;
};