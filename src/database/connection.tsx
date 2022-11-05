import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ActivityIndicator } from "react-native";
import { ChurchModel } from "./entities/Church";
import * as SQLite from "expo-sqlite";
import { ChurchRepository } from "./repositories/ChurchRepository";

import { Connection, createConnection } from "typeorm";

interface DatabaseConnectionContextData {
  churchRepository: ChurchRepository;
}

const DatabaseConnectionContext = createContext<DatabaseConnectionContextData>(
  {} as DatabaseConnectionContextData
);

export const DatabaseConnectionProvider = ({ children }: any) => {
  const [connection, setConnection] = useState<Connection | null>(null);

  const connect = useCallback(async () => {
    const createdConnection = await createConnection({
      type: "expo",
      database: "visita_batismal.db",
      driver: SQLite,
      entities: [ChurchModel],

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
