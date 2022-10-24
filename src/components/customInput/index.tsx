import {
  FormControl,
  IFormControlLabelProps,
  IInputProps,
  Input,
  ITextProps,
  Stack,
  Text,
} from "native-base";
import { memo } from "react";
import { Controller } from "react-hook-form";

interface InputProps {
  label: string;
  name: string;
  control?: any;
  value?: string;
  error?: {
    message: string;
  };
  rest?: any;
}

const defaultInputStyle: IInputProps = {
  w: "100%",
  bgColor: "gray.100",
  borderWidth: "2",
  height: "65px",
};

const defaultLabelStyle: ITextProps = {
  fontSize: "20",
};

const CustomInput = ({
  label,
  name,
  error,
  control,
  value,
  ...rest
}: InputProps | any) => {
  if (!control) {
    return (
      <Stack space={1} w="100%">
        <FormControl w="100%" isInvalid={error ? true : false}>
          {label && (
            <FormControl.Label>
              <Text {...defaultLabelStyle}>{label}</Text>
            </FormControl.Label>
          )}
          <Input value={value} {...{ ...defaultInputStyle, ...rest }} />
          {error && (
            <FormControl.ErrorMessage>
              {error?.message}
            </FormControl.ErrorMessage>
          )}
        </FormControl>
      </Stack>
    );
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <Stack space={1} w="100%">
          <FormControl w="100%" isInvalid={error ? true : false}>
            {label && (
              <FormControl.Label {...defaultLabelStyle}>
                <Text {...defaultLabelStyle}>{label}</Text>
              </FormControl.Label>
            )}
            <Input
              onChangeText={(text) => onChange(text)}
              onBlur={onBlur}
              value={value}
              {...{ ...defaultInputStyle, ...rest }}
            />
            {error && (
              <FormControl.ErrorMessage>
                {error?.message}
              </FormControl.ErrorMessage>
            )}
          </FormControl>
        </Stack>
      )}
    />
  );
};

export default memo(CustomInput);
