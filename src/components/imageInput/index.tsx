import React from "react";
import { TouchableOpacity } from "react-native";
import {
  Avatar,
  Box,
  Center,
  IButtonProps,
  ITextProps,
  Text,
  useDisclose,
} from "native-base";
import {
  Control,
  FieldError,
  FieldErrorsImpl,
  Merge,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { Entypo } from "@expo/vector-icons";
import { CameraAndGalery } from "../CameraAndGalery";

type ImageInputProps = {
  defaultImage?: string | null;
  control?: Control<any>;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  rules?: UseControllerProps["rules"];
  name: string;
  buttonStyles?: IButtonProps;
  textProps?: ITextProps;
};

export default function ImageInput({
  name,
  control,
  error,
  rules,
}: ImageInputProps) {
  const { isOpen, onClose, onOpen } = useDisclose();

  const {
    field: { onChange, value },
  } = useController({ name, control, rules });

  return (
    <Center w="145" h="130" position="relative">
      <Avatar
        bg="purple.600"
        alignSelf="center"
        size="2xl"
        {...(value && {
          source: {
            uri: value,
          },
        })}
      >
        FM
      </Avatar>

      <Box position="absolute" right={2} bottom={0}>
        <TouchableOpacity onPress={onOpen}>
          <Center h="8" w="8" bg="green.300" borderRadius="full" shadow="9">
            <Entypo name="plus" size={20} color="white" />
          </Center>
        </TouchableOpacity>
      </Box>
      {error?.message && (
        <Text fontSize="7" mt="3" color="red.600">
          {error?.message as string}
        </Text>
      )}
      <CameraAndGalery
        isOpen={isOpen}
        onClose={onClose}
        handleSelectImage={(image) => {
          onChange(image);
        }}
      />
    </Center>
  );
}
