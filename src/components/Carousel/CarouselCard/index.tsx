import { useNavigation } from "@react-navigation/native";
import { Container, Image, Text, View } from "native-base";

export const CarouselCard = ({ item, index }: any) => {
  const image = { uri: item.image_url };

  return (
    <Container textAlign={"center"}>
      <Image
        source={image}
        alt="myImage"
        // resizeMode="cover"
        display={"flex"}
        justifyContent="center"
        alignItems="center"
        width="500"
        height="400"
      ></Image>
      <Text textAlign="center" fontSize={18} width="100%">
        {item.title}
      </Text>
      <Text textAlign="center" width="100%">
        {item.text}{" "}
      </Text>
    </Container>
  );
};
