import { ReactNode } from "react";
import { OrientationProvider } from "./OrientationProvider";

interface ProviderProps {
  children: ReactNode;
}

export const Provider = ({ children }: ProviderProps) => {
  return <OrientationProvider>{children}</OrientationProvider>;
};
