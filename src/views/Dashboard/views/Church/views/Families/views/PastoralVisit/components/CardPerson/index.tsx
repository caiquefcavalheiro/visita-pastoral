import { Center, Text, VStack } from "native-base";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import {
  PersonModel,
  PositionModel,
} from "../../../../../../../../../../database/entities/FamilieChurchPersonSermon";
import { ModalEditPosition, PositionM } from "../ModalEditPosition";

interface CardPersonProps {
  person: PersonModel;
  positions: PositionModel[];
}

const CardPerson = ({ person, positions }: CardPersonProps) => {
  const [defaultPositions, setDefaultPositions] = useState(
    (person?.positions as PositionM[]) ?? []
  );
  const [open, setOpen] = useState(false);

  return (
    <VStack space={2}>
      <TouchableOpacity onPress={() => setOpen(true)}>
        <Center
          justifyContent="space-between"
          flexDir="row"
          py={4}
          px={8}
          bg="yellow.300"
          borderRadius={10}
        >
          <Text ml={2} color="blue.400" fontSize="16">
            {person.name}
          </Text>
        </Center>
      </TouchableOpacity>
      {defaultPositions.map(({ position, id }) => (
        <Text ml={3} fontSize={14} color="blue.700" key={id + position}>
          {position}
        </Text>
      ))}

      <ModalEditPosition
        positions={positions}
        onClose={() => {
          setOpen(false);
        }}
        open={open}
        handleAdd={(newPositions) => {
          setDefaultPositions(newPositions);
        }}
        person={person}
      />
    </VStack>
  );
};

export default CardPerson;
