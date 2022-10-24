import { ReactNode } from "react";
import { BaptismRecordProvider } from "./Provider";

interface ProviderProps {
  children: ReactNode;
}

export const Provider = ({ children }: ProviderProps) => (
  <BaptismRecordProvider>{children}</BaptismRecordProvider>
);
