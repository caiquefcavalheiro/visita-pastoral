import {
  IRadioGroupProps,
  IRadioProps,
  ITextProps,
  Radio,
  Stack,
  Text,
} from "native-base";

type customRadioProps = {
  options: {
    value: any;
    label: string;
    style?: IRadioProps;
  }[];
  radioGroupProps: IRadioGroupProps;
  textStyle?: ITextProps;
};

const defaultStyle = {
  colorScheme: "blue",
  my: 1,
};

const defaultTextStyle = {
  fontSize: 16,
};

export const customRadio = ({
  options,
  radioGroupProps,
  textStyle,
}: customRadioProps) => {
  return (
    <Radio.Group {...radioGroupProps}>
      <Stack
        direction={{
          base: "row",
        }}
        alignItems={{
          base: "flex-start",
          md: "center",
        }}
        space={4}
        minW="20%"
        maxW="100%"
      >
        {options.map(({ value, label, style = {} }) => (
          <Radio value={value} key={value} {...{ ...defaultStyle, ...style }}>
            <Text {...{ ...defaultTextStyle, ...textStyle }}>{label}</Text>
          </Radio>
        ))}
      </Stack>
    </Radio.Group>
  );
};
