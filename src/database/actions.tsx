import { useEffect } from "react";
import { Connection } from "typeorm";
import usePositionService from "./services/positionService";

export const useCreateThePositions = (connection: Connection) => {
  const positions = [
    { position: "Ancionato" },
    { position: "Diaconato" },
    { position: "Secretaria" },
    { position: "Tesouraria" },
    { position: "Mordomia" },
    { position: "Família" },
    { position: "Ação Solidária" },
    { position: "Música" },
    { position: "Sonoplastia" },
    { position: "Comunicação" },
    { position: "Saúde" },
    { position: "Ministério da Mulher" },
    { position: "Ministério da Criança" },
    { position: "Desbravadores" },
    { position: "Aventureiros" },
    { position: "Ministério Jovem" },
    { position: "Ministério do Idoso" },
    { position: "Construção" },
    { position: "Educação" },
    { position: "Publicações" },
    { position: "Escola Sabatina" },
    { position: "Coordenador de PG" },
    { position: "Ministério Pessoal (Evangelismo)" },
  ];

  const { createMany } = usePositionService(connection);

  useEffect(() => {
    createMany(positions);
  }, []);
};

export const RunActions = ({ connection }: { connection: Connection }) => {
  useCreateThePositions(connection);

  return null;
};
