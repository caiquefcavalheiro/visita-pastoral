import { Entypo } from "@expo/vector-icons";
import { Center, ITextProps, Text } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

interface AppendButtonProps {
  appendButtonProps?: TouchableOpacityProps;
  bgColor?: string;
  text?: string;
  textProps?: ITextProps;
}

const AppendButton = ({
  appendButtonProps,
  bgColor = "green.300",
  text,
  textProps,
}: AppendButtonProps) => {
  return (
    <Center flexDir="row">
      <TouchableOpacity {...appendButtonProps}>
        <Center h="8" w="8" bg={bgColor} borderRadius="full" shadow="9">
          <Entypo name="plus" size={20} color="white" />
        </Center>
      </TouchableOpacity>
      {text && <Text {...textProps}>{text}</Text>}
    </Center>
  );
};

export default AppendButton;
