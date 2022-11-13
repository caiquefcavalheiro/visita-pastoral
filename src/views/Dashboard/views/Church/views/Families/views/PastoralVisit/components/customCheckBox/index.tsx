import { Center, Checkbox, Text } from "native-base";
import { useController, Control, UseControllerProps } from "react-hook-form";

type CustomCheckBoxProps = {
  text: string;
  error?: {
    message: string;
  };
  name?: string;
  control?: Control<any>;
  rules?: UseControllerProps["rules"];
  value?: any;
  isEditable?: boolean;
};

export const CustomCheckBox = ({
  text,
  control,
  name,
  rules,
  value,
  isEditable = true,
}: CustomCheckBoxProps) => {
  const {
    field: { onChange, value: valueC },
  } = useController({ name: name || "", control, rules });

  return (
    <Center
      justifyContent="space-between"
      flexDir="row"
      py={4}
      px={8}
      bg="yellow.300"
      borderRadius={10}
    >
      <Text ml={2} color="blue.400" fontSize="16">
        {text}
      </Text>
      <Checkbox
        size="md"
        isChecked={Boolean(valueC)}
        onChange={() => {
          if (valueC) {
            onChange(null);
          } else {
            onChange(value);
          }
        }}
        value={valueC}
        isDisabled={!isEditable}
      >
        <Text></Text>
      </Checkbox>
    </Center>
  );
};
