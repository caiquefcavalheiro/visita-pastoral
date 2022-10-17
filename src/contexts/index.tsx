import { ReactNode } from "react";

interface ProviderProps {
  children: ReactNode;
}

export const Provider = ({ children }: ProviderProps) => <>{children}</>;
