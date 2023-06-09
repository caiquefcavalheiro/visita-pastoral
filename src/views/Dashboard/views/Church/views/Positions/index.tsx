import { EvilIcons } from "@expo/vector-icons";
import orderBy from "lodash/orderBy";
import debounce from "lodash/debounce";

import { Box, Center, FlatList, Flex, View } from "native-base";
import { useCallback, useEffect, useState } from "react";
import CustomInput from "../../../../../../components/customInput";
import { Header } from "../../../../../../components/Header";
import { useDatabaseConnection } from "../../../../../../database/connection";
import {
  PersonModel,
  PositionModel,
} from "../../../../../../database/entities/FamilieChurchPersonSermon";
import usePersonService from "../../../../../../database/services/personService";
import usePositionService from "../../../../../../database/services/positionService";
import Row from "../../components/Row";
import { ModalEditPosition } from "../../components/ModalEditPosition";
import OrderButton from "./components/OrderButton";
import { orderByDate } from "../../../../../../utils";

const Positions = ({ route }: any) => {
  const church = route?.params?.church;

  const [positions, setPositions] = useState<PositionModel[]>([]);

  const [currentPersons, setPersons] = useState<PersonModel[]>([]);

  const [search, setSeach] = useState("");

  const [currentPerson, setCurrentPerson] = useState<PersonModel | null>(null);

  const [open, setOpen] = useState(false);

  const { connection } = useDatabaseConnection();

  const persons = usePersonService(connection);

  const Position = usePositionService(connection);

  const getAllPersons = useCallback(async () => {
    const personsDb = await persons.getAllPersonsOfChurch(church?.id);

    setPersons(personsDb);
  }, []);

  useEffect(() => {
    getAllPersons();
  }, []);

  const handleSeach = debounce((text) => {
    setSeach(text);
  }, 700);

  const filteredPersons = currentPersons?.filter((item) => {
    if (search) {
      return item.name.includes(search);
    }
    return item;
  });

  useEffect(() => {
    (async () => {
      const response = await Position.getAllPositionsOfChurch(church.id);
      setPositions(response);
    })();
  }, []);

  return (
    <View w="100%" h="100%" bg="gray.200">
      <Header title="Pessoas" path="Church" />

      <Center px="9%" my="10">
        <CustomInput
          name="cityChurchOrganizedGroup"
          inputProps={{
            onChangeText: handleSeach,
          }}
          InputRightElement={
            <Box pr="3">
              <EvilIcons name="search" size={30} />
            </Box>
          }
          px={10}
        />
        <Flex w="100%" alignItems="flex-end" mt={4} pr={4}>
          <OrderButton
            actions={{
              0: () => {
                setPersons(
                  orderBy(
                    currentPersons,
                    [(person) => person.name.toLowerCase()],
                    ["asc"]
                  )
                );
              },
              1: () => {
                const familieSorted = [...currentPersons].sort((a, b) => {
                  if (a?.createdAt && b?.createdAt) {
                    return orderByDate(a.createdAt, b.createdAt);
                  }

                  return -1;
                });

                setPersons(familieSorted);
              },
            }}
          />
        </Flex>
      </Center>
      <FlatList
        data={filteredPersons}
        px={10}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View my={2} />}
        renderItem={({ item, index }) => (
          <>
            <Row
              name={item.name}
              onPress={() => {
                setCurrentPerson(item);

                setOpen(true);
              }}
            />
            {index === filteredPersons?.length - 1 && <View my={3} />}
          </>
        )}
      />

      <ModalEditPosition
        positions={positions}
        onClose={() => {
          setOpen(false);
          setCurrentPerson(null);
        }}
        open={open}
        handleAdd={() => {
          getAllPersons();
        }}
        {...(currentPerson && {
          person: currentPerson,
        })}
      />
    </View>
  );
};

export default Positions;
