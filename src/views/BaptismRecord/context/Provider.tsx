import { createContext, ReactNode, useContext, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface BaptismRecordProviderProps {
  children: ReactNode;
}

interface BaptismRecordContextData {}

const Context = createContext({} as BaptismRecordContextData);

const useBaptismRecord = () => {
  const context = useContext(Context);

  return context;
};

const BaptismRecordProvider = ({ children }: BaptismRecordProviderProps) => {
  const schema = yup.object().shape({
    pastorSignature: yup.string().when("secretaryOrResponsibleGroup", {
      is: (field: { signature: string }) => !!!field?.signature,
      then: yup
        .string()
        .required("È necessário a assinatura do pastor ou secretaria !"),
      otherwise: yup.string(),
    }),
    responsibleSignature: yup.string(),
    candidateSignature: yup
      .string()
      .required("A assinatura do canditato é obrigatória !"),
    secretaryOrResponsibleGroup: yup.string(),
  });

  return <Context.Provider value={{}}>{children}</Context.Provider>;
};

export { BaptismRecordProvider, useBaptismRecord };
