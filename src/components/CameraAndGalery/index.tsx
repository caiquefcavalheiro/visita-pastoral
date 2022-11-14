import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { BackHandler } from "react-native";

import { Actionsheet, HStack, Icon, Text } from "native-base";
import { useEffect, useState } from "react";

type CameraAndGaleryProps = {
  isOpen: boolean;
  onClose: () => void;
  handleSelectImage: (image: string) => void;
};

export function CameraAndGalery({
  isOpen,
  onClose,
  handleSelectImage,
}: CameraAndGaleryProps) {
  const [pickImageCameraPermission, setPickImageCameraPermission] =
    useState(false);

  const [pickImageGaleryPermission, setPickImageGaleryPermission] =
    useState(false);

  const pickImageCamera = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();

    setPickImageCameraPermission(granted);
    // if (status === "granted" || pickImageCameraPermission) {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled && result?.uri) {
      handleSelectImage(result?.uri);
      onClose();
    }
    // } else {
    //   // BackHandler.exitApp();
    //   alert("Não conseguimos obter a permição");
    // }
  };

  const pickImageGalery = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    setPickImageGaleryPermission(granted);
    // if (status === "granted" || pickImageGaleryPermission) {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled && result?.uri) {
      handleSelectImage(result?.uri);
      onClose();
    }
    // } else {
    //   // BackHandler.exitApp();
    //   alert("Não conseguimos obter a permição");
    // }
  };

  // useEffect(() => {
  //   (async () => {
  //     const { granted } =
  //       await ImagePicker.requestMediaLibraryPermissionsAsync();
  //     setPickImageGaleryPermission(granted);
  //     const { granted: grantedC } =
  //       await ImagePicker.requestCameraPermissionsAsync();
  //     setPickImageCameraPermission(grantedC);
  //   })();
  // }, []);

  return (
    <Actionsheet
      isOpen={isOpen}
      onClose={onClose}
      size="full"
      hideDragIndicator={true}
    >
      <Actionsheet.Content>
        <HStack space={"32"}>
          <Icon
            as={MaterialIcons}
            size="60"
            name="perm-media"
            onPress={pickImageGalery}
          />
          <Text>
            {pickImageGaleryPermission
              ? "pickImageGaleryPermission"
              : "not pickImageGaleryPermission"}
          </Text>

          <Icon
            as={MaterialIcons}
            size="60"
            name="camera-alt"
            onPress={pickImageCamera}
          />
          <Text>
            {pickImageCameraPermission
              ? "pickImageCameraPermission"
              : "not pickImageCameraPermission"}
          </Text>
        </HStack>
      </Actionsheet.Content>
    </Actionsheet>
  );
}
