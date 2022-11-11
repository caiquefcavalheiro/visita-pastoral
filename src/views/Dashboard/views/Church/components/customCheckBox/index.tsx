import { Checkbox, FormControl, ITextProps, Stack, Text } from "native-base";
import { useController, Control, UseControllerProps } from "react-hook-form";

type CustomCheckBoxProps = {
  text: string;
  error?: {
    message: string;
  };
  label?: string;
  name?: string;
  control?: Control<any>;
  rules?: UseControllerProps["rules"];
  value?: any;
};

const defaultLabelStyle: ITextProps = {
  fontSize: "20",
};

export const CustomCheckBox = ({
  text,
  error,
  label,
  control,
  name,
  rules,
  value,
}: CustomCheckBoxProps) => {
  const {
    field: { onChange, value: valueC },
  } = useController({ name: name || "", control, rules });

  return (
    <Stack space={1} w="100%">
      <FormControl w="100%" isInvalid={error ? true : false}>
        {label && (
          <FormControl.Label {...defaultLabelStyle}>
            <Text {...defaultLabelStyle}>{label}</Text>
          </FormControl.Label>
        )}
        <Checkbox
          isChecked={Boolean(valueC)}
          onChange={() => {
            if (valueC) {
              onChange(null);
            } else {
              onChange(value);
            }
          }}
          value={valueC}
        >
          <Text ml={2}>{text}</Text>
        </Checkbox>
      </FormControl>
    </Stack>
  );
};
