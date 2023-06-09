import { EvilIcons } from "@expo/vector-icons";
import debounce from "lodash/debounce";
import { Box, Center, FlatList, View } from "native-base";
import { useEffect, useState } from "react";
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
import { ModalPosition } from "./components/ModalPosition";

type PersonPosition = PositionModel & PersonModel;

const PeopleAndTheirPositions = ({ route }: any) => {
  const church = route?.params?.church;

  const [positions, setPositions] = useState<PersonPosition[]>([]);

  const [search, setSeach] = useState("");

  const [persons, setPersons] = useState<PersonModel[]>([]);

  const [position, setPosition] = useState("");

  const [open, setOpen] = useState(false);

  const { connection } = useDatabaseConnection();

  const Position = usePositionService(connection);

  const Person = usePersonService(connection);

  const handleSeach = debounce((text) => {
    setSeach(text);
  }, 700);

  const filteredPositions = positions?.filter((item) => {
    if (search) {
      if (item?.position) {
        return item?.position.includes(search);
      } else if (item?.otherPosition) {
        return item?.otherPosition?.includes(search);
      }
    }
    return item;
  });

  useEffect(() => {
    (async () => {
      const response = await Position.getAllPositionsOfChurch(church.id);
      const personsPositions = await Person.getAllPersonsOfChurch(church.id);

      setPositions([...response, ...personsPositions] as PersonPosition[]);
    })();
  }, []);

  return (
    <View w="100%" h="100%" bg="gray.200">
      <Header title="Cargos" path="Church" />

      <Center px="9%" mt={10} mb={5}>
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
      </Center>
      <FlatList
        data={filteredPositions}
        px={10}
        keyExtractor={(item) => item.id}
        ListFooterComponent={<View my={3} />}
        renderItem={({ item }) => (
          <View mt={2}>
            {item?.position ? (
              <Row
                name={item.position}
                onPress={() => {
                  setPersons(item.persons);
                  setPosition(item.position);
                  setOpen(true);
                }}
              />
            ) : null}

            {item?.otherPosition ? (
              <Row
                name={item.otherPosition}
                onPress={() => {
                  setPersons([item]);
                  setPosition(item.otherPosition);
                  setOpen(true);
                }}
              />
            ) : null}
          </View>
        )}
      />

      <ModalPosition
        onClose={() => {
          setOpen(false);
        }}
        open={open}
        persons={persons}
        position={position}
      />
    </View>
  );
};

export default PeopleAndTheirPositions;
