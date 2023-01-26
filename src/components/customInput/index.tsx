import {
  FormControl,
  IInputProps,
  Input,
  ITextProps,
  Stack,
  Text,
} from "native-base";
import { memo } from "react";
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseControllerProps,
  useController,
} from "react-hook-form";
import { useMaskedInputProps, Mask } from "react-native-mask-input";

interface InputProps {
  label?: string;
  name?: string;
  control?: any;
  value?: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  rules?: UseControllerProps["rules"];
  mask?: Mask;
  inputProps?: IInputProps;
  labelProps?: ITextProps;
  isEditable?: boolean;
  [rest: string]: any;
}

const defaultLabelStyle: ITextProps = {
  fontSize: "20",
};

const CustomInput = ({
  label,
  name,
  error,
  control,
  value,
  rules = {},
  mask,
  inputProps,
  labelProps,
  isEditable = true,
  ...rest
}: InputProps) => {
  const defaultInputStyle: IInputProps = {
    w: "100%",
    bgColor: "gray.100",
    borderWidth: "2",
    height: "65px",
    fontSize: rest?.placeholder && rest?.placeholder?.length > 50 ? 15 : 20,
  };

  if (!control) {
    return (
      <Stack space={1} w="100%">
        <FormControl w="100%" isInvalid={error ? true : false}>
          {label && (
            <FormControl.Label>
              <Text {...{ ...defaultLabelStyle, ...labelProps }}>{label}</Text>
            </FormControl.Label>
          )}
          <Input
            value={value}
            {...{ ...defaultInputStyle, ...rest, ...inputProps }}
          />
          {error && (
            <FormControl.ErrorMessage>
              {error?.message}
            </FormControl.ErrorMessage>
          )}
        </FormControl>
      </Stack>
    );
  }

  const {
    field: { onChange, value: valueInput },
  } = useController({ name: name || "", control, rules });
  const maskedInputProps = useMaskedInputProps({
    value: valueInput,
    onChangeText: (text) => {
      if (isEditable) {
        onChange(text);
      }
    },
    mask,
  });

  return (
    <Stack space={1} w="100%">
      <FormControl w="100%" isInvalid={error ? true : false}>
        {label && (
          <FormControl.Label {...defaultLabelStyle}>
            <Text {...{ ...defaultLabelStyle, ...labelProps }}>{label}</Text>
          </FormControl.Label>
        )}

        <Input
          {...maskedInputProps}
          {...{ ...defaultInputStyle, ...rest, ...inputProps }}
          isDisabled={!isEditable}
        />

        {error && (
          <FormControl.ErrorMessage>{error?.message}</FormControl.ErrorMessage>
        )}
      </FormControl>
    </Stack>
  );
};

export default memo(CustomInput);
