import { Center, Text, VStack } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { PersonModel } from "../../../../../../../../../../database/entities/FamilieChurchPersonSermon";

interface CardPersonProps {
  onClick: () => void;
  person: PersonModel;
}

const CardPerson = ({ person, onClick }: CardPersonProps) => {
  return (
    <VStack space={2}>
      <TouchableOpacity onPress={onClick}>
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
      {person?.positions.map(({ position }) => (
        <Text ml={3} fontSize={14} color="blue.700">
          {position}
        </Text>
      ))}
    </VStack>
  );
};

export default CardPerson;
