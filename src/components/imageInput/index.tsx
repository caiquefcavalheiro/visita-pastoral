import React, { useEffect, useState } from "react";
import { Button, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { View } from "native-base";

type ImageInputProps = {
  handleAdd: (image: string) => void;
  defaultImage?: string | null;
};

export default function ImageInput({
  handleAdd,
  defaultImage = null,
}: ImageInputProps) {
  const [image, setImage] = useState<string | null>(defaultImage);

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
        console.log(file, "file");
        if (file) handleAdd(file as string);
      });

      setImage(result.uri);
    }
  };

  useEffect(() => {
    defaultImage && setImage(defaultImage);
  }, [defaultImage]);

  return (
    <View h="20" w="100">
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
}
