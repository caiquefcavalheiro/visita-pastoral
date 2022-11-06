import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ActivityIndicator } from "react-native";
import * as SQLite from "expo-sqlite";
import { ChurchRepository } from "./repositories/ChurchRepository";

import { Connection, createConnection } from "typeorm";

import { FamilieRepository } from "./repositories/FamilieRepository";
import { PastoralVisitRepository } from "./repositories/PastoralVisitRepository";
import { PersonRepository } from "./repositories/PersonRepository";
import { SermonRepository } from "./repositories/SermonRepository";
import ChurchModel from "./entities/Church";
import FamilieModel from "./entities/Familie";
import SermonModel from "./entities/Sermon";
import PersonModel from "./entities/Person";
import PastoralVisitModel from "./entities/PastoralVisit";

interface DatabaseConnectionContextData {
  churchRepository: ChurchRepository;
  familieRepository: FamilieRepository;
  pastoralVisitRepository: PastoralVisitRepository;
  personRepository: PersonRepository;
  sermonRepository: SermonRepository;
  connection: Connection;
}

const DatabaseConnectionContext = createContext<DatabaseConnectionContextData>(
  {} as DatabaseConnectionContextData
);

export const DatabaseConnectionProvider = ({ children }: any) => {
  const [connection, setConnection] = useState<Connection | null>(null);

  const connect = useCallback(async () => {
    const createdConnection = await createConnection({
      type: "expo",
      database: "visitaBatismal.db",
      driver: SQLite,
      entities: [
        ChurchModel,
        FamilieModel,
        SermonModel,
        PersonModel,
        PastoralVisitModel,
      ],

      synchronize: true,
    });

    setConnection(createdConnection);
  }, [connection]);

  useEffect(() => {
    if (!connection) {
      connect();
    }
  }, [connect, connection]);

  if (!connection) {
    return <ActivityIndicator />;
  }

  return (
    <DatabaseConnectionContext.Provider
      value={{
        churchRepository: new ChurchRepository(connection),
        familieRepository: new FamilieRepository(connection),
        pastoralVisitRepository: new PastoralVisitRepository(connection),
        personRepository: new PersonRepository(connection),
        sermonRepository: new SermonRepository(connection),
        connection,
      }}
    >
      {children}
    </DatabaseConnectionContext.Provider>
  );
};

export function useDatabaseConnection() {
  const context = useContext(DatabaseConnectionContext);

  return context;
}