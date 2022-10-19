import { Button } from "native-base";
import { AntDesign, Ionicons } from "@expo/vector-icons";

// const favicon = require("../../../assets/favicon.png");

interface ButtonProps {
  text?: string;
  width: string;
  // icon: ;
  click: () => null;
}

const ButtonDefault = ({ text, width, click }: ButtonProps) => {
  return (
    <Button
      endIcon={<AntDesign as={Ionicons} name="check" size={24} />}
      borderRadius="15"
      pt="18"
      pb="18"
      ml="auto"
      mr="auto"
      mt="40"
      mb="0"
      width={width}
      onPress={click}
    >
      {text}
    </Button>
  );
};

export default ButtonDefault;
