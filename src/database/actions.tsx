import { useEffect } from "react";
import { Connection } from "typeorm";
import usePositionService from "./services/positionService";

export const positions = [
  { position: "Ancionato" },
  { position: "Aventureiros" },
  { position: "Ação Solidária" },
  { position: "Comunicação" },
  { position: "Construção" },
  { position: "Coordenador de PG" },
  { position: "Desbravadores" },
  { position: "Diaconato" },
  { position: "Educação" },
  { position: "Escola Sabatina" },
  { position: "Família" },
  { position: "Liberdade Religiosa" },
  { position: "MAP" },
  { position: "Ministério Jovem" },
  { position: "Ministério Pessoal (Evangelismo)" },
  { position: "Ministério da Criança" },
  { position: "Ministério da Mulher" },
  { position: "Ministério do Idoso" },
  { position: "Mordomia" },
  { position: "Música" },
  { position: "Publicações" },
  { position: "Recepção" },
  { position: "Saúde" },
  { position: "Secretaria" },
  { position: "Sonoplastia" },
  { position: "Tesouraria" },
];
export const useCreateThePositions = (
  connection: Connection,
  churchId: string
) => {
  const { createMany } = usePositionService(connection);

  useEffect(() => {
    createMany(positions, churchId);
  }, []);
};

export const RunActions = ({ connection }: { connection: Connection }) => {
  return null;
};
