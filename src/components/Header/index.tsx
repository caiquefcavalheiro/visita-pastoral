import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Box, Center, Heading } from "native-base";
import { TouchableOpacity } from "react-native";

interface HeaderProps {
  title: string;
  path?: string;
}

export const Header = ({ title, path }: HeaderProps) => {
  const navigate = useNavigation();

  return (
    <Center
      w="100%"
      minH="110px"
      bg="yellow.300"
      px={7}
      shadow="9"
      paddingTop={5}
      flexDir="row"
      position="relative"
    >
      {path && (
        <Box position="absolute" left="5%" top="50%" zIndex={0}>
          <TouchableOpacity
            onPress={() => {
              navigate.navigate(path as never);
            }}
          >
            <AntDesign name="left" size={40} color="white" />
          </TouchableOpacity>
        </Box>
      )}
      <Heading size="xl" color="white" textAlign="center">
        {title}
      </Heading>
    </Center>
  );
};
