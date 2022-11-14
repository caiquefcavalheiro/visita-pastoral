import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { BackHandler } from "react-native";

import { Actionsheet, HStack, Icon } from "native-base";

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
  const pickImageCamera = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();

    if (granted) {
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
    } else {
      BackHandler.exitApp();
    }
  };

  const pickImageGalery = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (granted) {
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
    } else {
      BackHandler.exitApp();
    }
  };
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
          <Icon
            as={MaterialIcons}
            size="60"
            name="camera-alt"
            onPress={pickImageCamera}
          />
        </HStack>
      </Actionsheet.Content>
    </Actionsheet>
  );
}