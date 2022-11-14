import {
  FormControl,
  ITextAreaProps,
  ITextProps,
  Stack,
  Text,
  TextArea,
} from "native-base";
import { memo } from "react";
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseControllerProps,
  useController,
} from "react-hook-form";

interface TextAreaProps {
  label?: string;
  name?: string;
  control?: any;
  value?: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  rules?: UseControllerProps["rules"];
  textAreaProps?: ITextAreaProps;
  labelProps?: ITextProps;
}

const defaultLabelStyle: ITextProps = {
  fontSize: "20",
};

const CustomTextArea = ({
  label,
  name,
  error,
  control,
  value,
  rules = {},
  textAreaProps,
  labelProps,
}: TextAreaProps) => {
  const defaultTextAreaStyle: ITextAreaProps = {
    w: "100%",
    bgColor: "gray.100",
    borderWidth: "2",
    height: "65px",
    fontSize: "24",
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
          <TextArea
            value={value}
            autoCompleteType={10}
            {...{ ...defaultTextAreaStyle, ...textAreaProps }}
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
    field: { onChange, value: valueTextArea },
  } = useController({ name: name || "", control, rules });

  return (
    <Stack space={1} w="100%">
      <FormControl w="100%" isInvalid={error ? true : false}>
        {label && (
          <FormControl.Label {...defaultLabelStyle}>
            <Text {...{ ...defaultLabelStyle, ...labelProps }}>{label}</Text>
          </FormControl.Label>
        )}
        <TextArea
          onChangeText={onChange}
          defaultValue={valueTextArea}
          autoCompleteType
          {...{ ...defaultTextAreaStyle, ...textAreaProps }}
        />
        {error && (
          <FormControl.ErrorMessage>{error?.message}</FormControl.ErrorMessage>
        )}
      </FormControl>
    </Stack>
  );
};

export default memo(CustomTextArea);
