import { FlatList, Text, View } from "native-base";
import { Header } from "../../../../components/Header";
import ButtonDefault from "../../../../components/button";
import family from "../../../../assets/churchImages/family.png";
import peoples from "../../../../assets/churchImages/peoples.png";
import book from "../../../../assets/churchImages/book.png";
import { memo, useEffect, useState } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import { ModalCreateFamilie } from "../../components/ModalCreateFamilie";
import { ChurchModel } from "../../../../database/entities/FamilieChurchPersonSermon";
import { positions } from "../../../../database/actions";
import { useDatabaseConnection } from "../../../../database/connection";
import usePositionService from "../../../../database/services/positionService";
import { ModalEditChurch } from "../../components/ModalEditChurch";

function Church({ navigation, route }: any) {
  const [church, setChurch] = useState(
    route?.params?.church || ({} as ChurchModel)
  );

  const [open, setOpen] = useState(false);
  const [openModalChurch, setOpenModalChurch] = useState(false);

  const { connection } = useDatabaseConnection();

  const { createMany } = usePositionService(connection);

  const whenSelectChurch = (church: ChurchModel) => {
    navigation.navigate("Sermons" as never, { church });
  };

  const buttons = [
    {
      buttonProps: {
        mt: 10,
        minH: "20",
        width: "80%",
        onPress: () => whenSelectChurch(church),
      },
      text: "Sermões Pregados",
      image: { source: book },
    },
    {
      buttonProps: {
        width: "80%",
        minH: "20",
        onPress: () =>
          navigation.navigate("PeopleAndTheirPositions", { church }),
        endIcon: <Ionicons name="add" size={40} color="white" />,
      },
      text: "Visualizar cargos",
    },
    {
      buttonProps: {
        width: "80%",
        minH: "20",
        px: 15,
        onPress: () => navigation.navigate("Positions", { church }),
      },
      text: "Pessoas e seus cargos",
      image: { source: peoples, ml: 5 },
    },
    {
      buttonProps: {
        width: "80%",
        minH: "20",
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
        minH: "20",
        onPress: () => navigation.navigate("Families", { church }),
      },
      text: "Visualizar familias",
      image: { source: family },
    },
    {
      buttonProps: {
        width: "80%",
        mb: 20,
        minH: "20",
        onPress: () => {
          setOpenModalChurch(true);
        },
        endIcon: <Feather name="edit-3" size={40} color="white" />,
      },
      text: "Editar igreja",
    },
  ];

  useEffect(() => {
    (async () => {
      setChurch(route?.params?.church);
      await createMany(positions, church.id);
    })();
  }, []);

  return (
    <View w="100%" h="100%" bg="gray.200">
      <Header title={church?.name ?? ""} path="PatoralVisit" params={church} />
      <FlatList
        data={buttons}
        keyExtractor={(item) => item.text}
        ItemSeparatorComponent={() => <View my={2} />}
        renderItem={({ item }) => (
          <ButtonDefault
            key={item.text}
            buttonProps={item.buttonProps}
            {...(item?.image && {
              imageProps: { ...item.image, height: 18, width: 18 },
            })}
          >
            <Text fontSize="16" fontWeight="semibold" color="white">
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

      <ModalEditChurch
        church={church}
        onClose={() => {
          setOpenModalChurch(false);
        }}
        open={openModalChurch}
        handleEdit={(newChurch) => {
          setChurch(newChurch);
        }}
      />
    </View>
  );
}

export default memo(Church);
