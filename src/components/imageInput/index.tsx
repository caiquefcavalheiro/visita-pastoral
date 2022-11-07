import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  Avatar,
  Box,
  Center,
  Flex,
  IButtonProps,
  ITextProps,
  useToast,
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
import { useCustomToast } from "../../hooks";

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
  const {
    field: { onChange, value },
  } = useController({ name, control, rules });

  const toast = useToast();

  const fetchImageFromUri = async (
    uri: string,
    handleLoad: (file: string | ArrayBuffer | null) => void
  ): Promise<string | void> => {
    fetch(uri)
      .then((res) => res.blob())
      .then((data) => {
        const reader = new FileReader();
        reader.readAsDataURL(data);
        reader.onloadend = () => {
          handleLoad(reader.result);
        };
      });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled && result?.uri) {
      await fetchImageFromUri(result.uri, (file) => {
        if (file) onChange(file as string);
      });
    }
  };

  useEffect(() => {
    if (error?.message) {
      useCustomToast({
        msg: error.message as string,
        toast,
        duration: 2000,
        type: "error",
      });
    }
  }, [error]);

  return (
    <Flex w="145" h="130" position="relative">
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
        <TouchableOpacity onPress={pickImage}>
          <Center h="8" w="8" bg="green.300" borderRadius="full" shadow="9">
            <Entypo name="plus" size={20} color="white" />
          </Center>
        </TouchableOpacity>
      </Box>
    </Flex>
  );
}
