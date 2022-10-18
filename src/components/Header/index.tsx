import { AntDesign } from "@expo/vector-icons";
import { Box, Center, Heading, Image } from "native-base";

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  return (
    <Center
      w="100%"
      minH="110px"
      bg="yellow.300"
      flexDir="row"
      justifyContent="space-between"
      px={7}
      shadow="9"
      paddingTop={5}
    >
      <Box>
        <AntDesign name="left" size={40} color="white" />
      </Box>
      <Heading size="xl" color="white" textAlign="center" mr="30%">
        {title}
      </Heading>
    </Center>
  );
};
