import { StepProvider } from "./StepContext";
import { AddressesProvider } from "./AddressesContext";
import { PathProvider } from "./PathContext";
import { PopUpProvider } from "./PopUpContext";

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <StepProvider>
    <PathProvider>
      <AddressesProvider>
        <PopUpProvider>
          {children}
        </PopUpProvider>
      </AddressesProvider>
    </PathProvider>
  </StepProvider>
);