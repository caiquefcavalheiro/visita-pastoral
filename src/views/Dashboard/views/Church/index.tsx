import { FlatList, Text, View } from "native-base";
import { Header } from "../../../../components/Header";
import ButtonDefault from "../../../../components/button";
import family from "../../../../assets/churchImages/family.png";
import peoples from "../../../../assets/churchImages/peoples.png";
import book from "../../../../assets/churchImages/book.png";
import { memo, useEffect, useState } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Church as ChurchModel } from "../../../../database/entities/FamilieChurchPerson";
import { getStorage, setStorage } from "../../../../utils/storage";
import { ModalCreateFamilie } from "../../components/ModalCreateFamilie";

function Church({ navigation, route }: any) {
  const [church, setChurch] = useState(
    route?.params?.church || ({} as ChurchModel)
  );

  const [open, setOpen] = useState(false);

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
        onPress: () => {
          setOpen(true);
        },
      },
      text: "Adicionar Família",
      image: { source: family },
    },
    {
      buttonProps: {
        width: "80%",
        onPress: () => navigation.navigate("Families", { church }),
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

  useEffect(() => {
    (async () => {
      const currentChurch = await getStorage("@visitaPastoralChurch");
      if (route?.params?.church) {
        setChurch(route?.params?.church);
        await setStorage("@visitaPastoralChurch", route?.params?.church);
      } else {
        setChurch(currentChurch);
      }
    })();
  }, []);

  return (
    <View w="100%" h="100%" bg="gray.200">
      <Header title="Nome da igreja" path="PatoralVisit" />
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

      <ModalCreateFamilie
        onClose={() => {
          setOpen(false);
        }}
        open={open}
        church={church}
      />
    </View>
  );
}

export default memo(Church);
