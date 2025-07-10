import { StepProvider } from "./StepContext";
import { AddressesProvider } from "./AddressesContext";
import { PathProvider } from "./PathContext";

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <StepProvider>
    <PathProvider>
      <AddressesProvider>
        {children}
      </AddressesProvider>
    </PathProvider>
  </StepProvider>
);