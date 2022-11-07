import { FlatList, Text, View } from "native-base";
import { Header } from "../../../../components/Header";
import ButtonDefault from "../../../../components/button";
import family from "../../../../assets/churchImages/family.png";
import peoples from "../../../../assets/churchImages/peoples.png";
import book from "../../../../assets/churchImages/book.png";
import { memo } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";

function Church({ navigation, route }: any) {
  console.log(route.params.church.name);

  const buttons = [
    {
      buttonProps: {
        mt: 16,
        width: "80%",
        onPress: () => navigation.navigate("Sermons"),
      },
      text: "Sermões Pregados",
      image: { source: book },
    },
    {
      buttonProps: {
        width: "80%",
        minH: "24",
        onPress: () => navigation.navigate("BaptismRecord"),
        endIcon: <Ionicons name="add" size={40} color="white" />,
      },
      text: "Candidatar nos cargos",
    },
    {
      buttonProps: {
        width: "80%",
        minH: "24",
        onPress: () => navigation.navigate("BaptismRecord"),
      },
      text: "Pessoas e seus cargos",
      image: { source: peoples },
    },
    {
      buttonProps: {
        width: "80%",
        onPress: () => {},
      },
      text: "Adicionar Família",
      image: { source: family },
    },
    {
      buttonProps: {
        width: "80%",
        onPress: () => navigation.navigate("Families"),
      },
      text: "Visualizar familias",
      image: { source: family },
    },
    {
      buttonProps: {
        width: "80%",
        mb: 20,
        minH: "24",
        onPress: () => navigation.navigate("BaptismRecord"),
        endIcon: <Feather name="edit-3" size={40} color="white" />,
      },
      text: "Editar igreja",
    },
  ];

  return (
    <View w="100%" h="100%" bg="gray.200">
      <Header title="Nome da igreja" path="Dashboard" />
      <FlatList
        data={buttons}
        keyExtractor={(item) => item.text}
        ItemSeparatorComponent={() => <View my={5} />}
        renderItem={({ item }) => (
          <ButtonDefault
            key={item.text}
            buttonProps={item.buttonProps}
            {...(item?.image && {
              imageProps: item.image,
            })}
          >
            <Text fontSize="18" fontWeight="semibold" color="white">
              {item.text}
            </Text>
          </ButtonDefault>
        )}
      />
    </View>
  );
}

export default memo(Church);
