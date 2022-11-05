import { EvilIcons } from "@expo/vector-icons";
import { Box, Center, FlatList, View } from "native-base";
import CustomInput from "../../../../../../components/customInput";
import { Header } from "../../../../../../components/Header";
import Row from "./components/Row";

interface FamiliesProps {}

const Families = ({}: FamiliesProps) => {
  const mock = [
    {
      name: "Families",
    },
    {
      name: "Families 1",
    },
    {
      name: "Families 3",
    },
  ];

  return (
    <View w="100%" h="100%" bg="gray.200">
      <Header title="Famílias" path="Church" />

      <Center px="9%" my="10">
        <CustomInput
          name="cityChurchOrganizedGroup"
          InputRightElement={
            <Box pr="3">
              <EvilIcons name="search" size={30} />
            </Box>
          }
          px={10}
        />
      </Center>
      <FlatList
        data={mock}
        px={10}
        keyExtractor={(item) => item.name}
        ItemSeparatorComponent={() => <View my={2} />}
        renderItem={({ item }) => <Row name={item.name} />}
      />
    </View>
  );
};

export default Families;
