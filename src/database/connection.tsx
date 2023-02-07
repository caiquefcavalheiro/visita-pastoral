import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ActivityIndicator } from "react-native";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { ChurchRepository } from "./repositories/ChurchRepository";

import { Connection, createConnection } from "typeorm";

import { FamilieRepository } from "./repositories/FamilieRepository";
import { PastoralVisitRepository } from "./repositories/PastoralVisitRepository";
import { PersonRepository } from "./repositories/PersonRepository";
import { SermonRepository } from "./repositories/SermonRepository";
import {
  ChurchModel,
  FamilieModel,
  PastoralVisitModel,
  PersonModel,
  PositionModel,
  SermonModel,
} from "./entities/FamilieChurchPersonSermon";
import { RunActions } from "./actions";
import { backup } from "./backup";

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

const dataBaseName = "visitaBatismal450.db";

export const DatabaseConnectionProvider = ({ children }: any) => {
  const [connection, setConnection] = useState<Connection | null>(null);

  const connect = useCallback(async () => {
    const createdConnection = await createConnection({
      type: "expo",
      database: dataBaseName,
      driver: SQLite,
      entities: [
        PersonModel,
        FamilieModel,
        SermonModel,
        PastoralVisitModel,
        ChurchModel,
        PositionModel,
      ],

      synchronize: true,
    });

    setConnection(createdConnection);
  }, [connection]);

  const rootDirectory = FileSystem.documentDirectory + "SQLite/" + dataBaseName;

  async function readDBFile(fileUri: string) {
    const result = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    return result;
  }

  const backUpTheDatabase = async () => {
    const file = await readDBFile(rootDirectory ?? "");

    console.log(file, "file");
  };

  const updateDatabaseBackup = async () => {
    try {
      // await FileSystem.deleteAsync(rootDirectory + "-journal");
      await FileSystem.writeAsStringAsync(rootDirectory, backup, {
        encoding: FileSystem.EncodingType.Base64,
      });
    } catch (error) {
      console.log(`Erro ao criar arquivo: ${error}`);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      // backUpTheDatabase();
    }, 1000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      // updateDatabaseBackup();
    }, 2000);
  }, []);

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
      <RunActions connection={connection} />
      {children}
    </DatabaseConnectionContext.Provider>
  );
};

export function useDatabaseConnection() {
  const context = useContext(DatabaseConnectionContext);

  return context;
}
