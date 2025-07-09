import { StepProvider } from "./StepContext";
import { AddressesProvider } from "./AddressesContext";
import { PathProvider } from "./PathContext";

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <StepProvider>
    <AddressesProvider>
      <PathProvider>
        {children}
      </PathProvider>
    </AddressesProvider>
  </StepProvider>
);