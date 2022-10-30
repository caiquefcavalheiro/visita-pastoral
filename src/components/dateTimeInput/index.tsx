import DateTimePicker from "@react-native-community/datetimepicker";
import {
  Center,
  FormControl,
  Text,
  ITextProps,
  IInputProps,
} from "native-base";
import { useState } from "react";
import {
  Controller,
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseControllerProps,
} from "react-hook-form";
import { Platform, TouchableOpacity } from "react-native";
import dayjs from "dayjs";
import { InterfaceTextProps } from "native-base/lib/typescript/components/primitives/Text/types";
import { InterfaceCenterProps } from "native-base/lib/typescript/components/composites/Center/types";

interface Props {
  mode?: "time" | "date" | "datetime" | "countdown";
  date?: Date;
  show?: boolean;
  label: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  control?: any;
  name?: string;
  callback?: (date: any) => void;
  labelStyle?: InterfaceTextProps;
  inputStyle?: InterfaceCenterProps;
  rules?: UseControllerProps["rules"];
  [rest: string]: any;
}

const defaultInputStyle: IInputProps = {
  w: "100%",
  bgColor: "white",
  borderWidth: 2,
  borderColor: "gray.500",
  height: "65px",
  fontSize: 20,
  borderRadius: "5",
};

const defaultLabelStyle: ITextProps = {
  fontSize: "20",
};

export const DateTimeInput = ({
  mode,
  show = false,
  label,
  error,
  control,
  name = "",
  callback = () => {},
  labelStyle = {},
  inputStyle = defaultInputStyle,
  rules,
  ...rest
}: Props) => {
  const [showDate, setShowDate] = useState(show);
  const [date, setDate] = useState(new Date());
  const [text, setText] = useState(dayjs(new Date()).format("DD/MM/YYYY"));

  const onChangeText = (
    _: any,
    selectedDate: any,
    onChange = (_: any) => {}
  ) => {
    setShowDate(false);
    const currentDate = selectedDate || date;
    setDate(currentDate);
    const tempDate = new Date(currentDate);

    const newDate = dayjs(tempDate).format("DD/MM/YYYY");
    setText?.(newDate);
    onChange?.(newDate);
    callback?.(newDate);
  };

  if (!control) {
    return (
      <FormControl w="100%" isInvalid={error ? true : false}>
        <FormControl.Label>
          <Text {...{ ...defaultLabelStyle, ...labelStyle }}>{label}</Text>
        </FormControl.Label>
        <TouchableOpacity onPress={() => setShowDate(true)}>
          <Center {...{ ...defaultInputStyle, ...inputStyle }}>
            <Text
              color="black"
              fontSize={
                inputStyle?.fontSize
                  ? inputStyle?.fontSize
                  : Platform.OS === "ios"
                  ? 14
                  : 12
              }
            >
              {text}
            </Text>
          </Center>
        </TouchableOpacity>
        {error && (
          <FormControl.ErrorMessage>{error?.message}</FormControl.ErrorMessage>
        )}
        {showDate && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            display="default"
            locale="pt-BR"
            onChange={(_: any, selectedDate: any) =>
              onChangeText(_, selectedDate)
            }
            {...rest}
          />
        )}
      </FormControl>
    );
  }

  return (
    <Controller
      control={control}
      name={name}
      {...(rules && { rules })}
      render={({ field: { onChange } }) => (
        <FormControl w="100%" isInvalid={error ? true : false}>
          <FormControl.Label>
            <Text {...{ ...defaultLabelStyle, ...labelStyle }}>{label}</Text>
          </FormControl.Label>
          <TouchableOpacity onPress={() => setShowDate(true)}>
            <Center {...{ ...defaultInputStyle, ...inputStyle }}>
              <Text
                color="black"
                fontSize={
                  inputStyle?.fontSize
                    ? inputStyle?.fontSize
                    : Platform.OS === "ios"
                    ? 14
                    : 12
                }
              >
                {text}
              </Text>
            </Center>
          </TouchableOpacity>
          {error && (
            <FormControl.ErrorMessage>
              {error?.message}
            </FormControl.ErrorMessage>
          )}
          {showDate && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              display="default"
              locale="pt-BR"
              onChange={(_: any, selectedDate: any) =>
                onChangeText(_, selectedDate, onChange)
              }
              {...rest}
            />
          )}
        </FormControl>
      )}
    />
  );
};
