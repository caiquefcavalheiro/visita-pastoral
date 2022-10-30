import {
  FormControl,
  IRadioGroupProps,
  IRadioProps,
  ITextProps,
  Radio,
  Stack,
  Text,
} from "native-base";
import {
  Control,
  Controller,
  FieldError,
  FieldErrorsImpl,
  Merge,
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
};

export const CustomRadio = ({
  options,
  radioGroupProps,
  textStyle,
  error,
  label,
  name,
  control,
}: customRadioProps) => {
  return (
    <Controller
      control={control}
      name={name || ""}
      render={({ field: { onChange, value } }) => (
        <FormControl w="100%" isInvalid={error ? true : false}>
          {label && (
            <FormControl.Label>
              <Text {...defaultLabelStyle}>{label}</Text>
            </FormControl.Label>
          )}
          <Radio.Group
            {...radioGroupProps}
            onChange={onChange}
            defaultValue={value}
          >
            <Stack
              direction={{
                base: "row",
              }}
              alignItems={{
                base: "flex-start",
                md: "center",
              }}
              justifyContent="space-between"
              px="10"
              space={5}
              w="100%"
            >
              {options.map(({ value, label, style = {} }) => (
                <Radio
                  value={value}
                  key={value}
                  {...{ ...defaultStyle, ...style }}
                >
                  <Text {...{ ...defaultTextStyle, ...textStyle }}>
                    {label}
                  </Text>
                </Radio>
              ))}
            </Stack>
          </Radio.Group>
          {error && (
            <FormControl.ErrorMessage>
              {error?.message}
            </FormControl.ErrorMessage>
          )}
        </FormControl>
      )}
    />
  );
};
