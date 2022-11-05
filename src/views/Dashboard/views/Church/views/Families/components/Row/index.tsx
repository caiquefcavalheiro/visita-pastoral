import { Flex, Text } from "native-base";

interface RowProps {
  name: string;
}

function Row({ name }: RowProps) {
  return (
    <Flex borderBottomColor="black" borderBottomWidth="2">
      <Text ml="5">{name}</Text>
    </Flex>
  );
}

export default Row;
