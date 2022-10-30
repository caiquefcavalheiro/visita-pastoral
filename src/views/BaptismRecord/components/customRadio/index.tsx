import {
  FormControl,
  IRadioGroupProps,
  IRadioProps,
  ITextProps,
  Radio,
  Text,
  VStack,
} from "native-base";
import {
  Control,
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseControllerProps,
  useController,
} from "react-hook-form";

type customRadioProps = {
  options: {
    value: any;
    label: string;
    style?: IRadioProps;
  }[];
  radioGroupProps: IRadioGroupProps;
  textStyle?: ITextProps;
  label?: string;
  name?: string;
  control: Control<any>;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  rules?: UseControllerProps["rules"];
};

const defaultStyle = {
  colorScheme: "blue",
  my: 1,
};

const defaultTextStyle = {
  fontSize: 16,
};

const defaultLabelStyle: ITextProps = {
  fontSize: "20",
  mb: "2",
};

export const CustomRadio = ({
  options,
  radioGroupProps,
  textStyle,
  error,
  label,
  name,
  control,
  rules = {},
}: customRadioProps) => {
  const {
    field: { onChange, value },
  } = useController({ name: name || "", control, rules });

  return (
    <FormControl w="100%" isInvalid={error ? true : false}>
      {label && (
        <FormControl.Label>
          <Text {...defaultLabelStyle}>{label}</Text>
        </FormControl.Label>
      )}

      <Radio.Group
        {...radioGroupProps}
        onChange={(value) => onChange(value)}
        defaultValue={value}
      >
        <VStack space="2">
          {options.map(({ value, label, style = {} }) => (
            <Radio value={value} key={value} {...{ ...defaultStyle, ...style }}>
              <Text {...{ ...defaultTextStyle, ...textStyle }}>{label}</Text>
            </Radio>
          ))}
        </VStack>
      </Radio.Group>
      {error && (
        <FormControl.ErrorMessage>{error?.message}</FormControl.ErrorMessage>
      )}
    </FormControl>
  );
};
