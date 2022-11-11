import { Flex, Text } from "native-base";
import { Pressable } from "react-native";

interface RowProps {
  name: string;
  onPress?: () => void;
}

function Row({ name, onPress }: RowProps) {
  return (
    <Pressable onPress={onPress}>
      <Flex borderBottomColor="black" borderBottomWidth="2">
        <Text ml="5">{name}</Text>
      </Flex>
    </Pressable>
  );
}

export default Row;
