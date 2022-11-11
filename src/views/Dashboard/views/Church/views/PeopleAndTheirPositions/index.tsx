import { EvilIcons } from "@expo/vector-icons";
import { debounce } from "lodash";
import { Box, Center, FlatList, View } from "native-base";
import { useEffect, useState } from "react";
import CustomInput from "../../../../../../components/customInput";
import { Header } from "../../../../../../components/Header";
import { useDatabaseConnection } from "../../../../../../database/connection";
import {
  PersonModel,
  PositionModel,
} from "../../../../../../database/entities/FamilieChurchPersonSermon";
import usePositionService from "../../../../../../database/services/positionService";
import Row from "../../components/Row";
import { ModalPosition } from "./components/ModalPosition";

const PeopleAndTheirPositions = ({ route }: any) => {
  const church = route?.params?.church;

  const [positions, setPositions] = useState<PositionModel[]>([]);

  const [search, setSeach] = useState("");

  const [persons, setPersons] = useState<PersonModel[]>([]);
  const [position, setPosition] = useState("");

  const [open, setOpen] = useState(false);

  const { connection } = useDatabaseConnection();

  const Position = usePositionService(connection);

  const handleSeach = debounce((text) => {
    setSeach(text);
  }, 700);

  const filteredPersons = positions?.filter((item) => {
    if (search) {
      return item.position.includes(search);
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
        data={filteredPersons}
        px={10}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View my={2} />}
        renderItem={({ item, index }) => (
          <>
            <Row
              name={item.position}
              onPress={() => {
                setPersons(item.persons);
                setPosition(item.position);
                setOpen(true);
              }}
            />
            {index === filteredPersons?.length - 1 && <View my={3} />}
          </>
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
