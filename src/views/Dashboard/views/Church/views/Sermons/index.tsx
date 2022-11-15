import {
  Box,
  FlatList,
  Input,
  SearchIcon,
  Stack,
  Text,
  useToast,
  View,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import ButtonDefault from "../../../../../../components/button";
import { Header } from "../../../../../../components/Header";
import { useDatabaseConnection } from "../../../../../../database/connection";
import { SermonModel } from "../../../../../../database/entities/FamilieChurchPersonSermon";
import useSermonService from "../../../../../../database/services/sermonService";
import { useCustomToast } from "../../../../../../hooks";
import { ModalCreateSermon } from "./components/ModalCreateSermon";
import { ModalEditSermon } from "./components/ModalEditSermon";
import SermonCard from "./components/SermonCard";

interface SermonsProps {
  route: any;
}

const Sermons = ({ route }: SermonsProps) => {
  const { connection } = useDatabaseConnection();

  const sermonService = useSermonService(connection);

  const church = route?.params?.church;

  const toast = useToast();

  const [search, setSearch] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const [sermons, setSermons] = useState(church.sermons as SermonModel[]);

  const [sermon, setSermon] = useState({} as SermonModel);
  const [isOpenEditSermon, setIsOpenEditSermon] = useState(false);

  const getSermons = () => {
    (async () => {
      const response = await sermonService.getAllSermonsOfChurch(church.id);
      church.sermons = response;
      setSermons(response as SermonModel[]);
    })();
  };

  useEffect(() => {
    getSermons();
  }, []);

  const filteredSermons = sermons.filter((sermon) => {
    return sermon.name.toLowerCase().includes(search.toLowerCase());
  });

  const handleDelete = async (sermon: SermonModel) => {
    await sermonService.deleteSermon(sermon.id).then((response) => {
      useCustomToast({
        msg: "Sermão deletado com sucesso!",
        toast,
        type: "sucess",
      });
    });
  };

  return (
    <>
      <ModalCreateSermon
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        handleAdd={getSermons}
        church={church}
      />
      <ModalEditSermon
        open={isOpenEditSermon}
        onClose={() => {
          setIsOpenEditSermon(false);
        }}
        handleAdd={getSermons}
        sermon={sermon}
      />
      <Box w="100%" h="100%" bg="gray.200">
        <Header title="Sermões" path="Church" />
        <VStack mt="54" space="5">
          <ButtonDefault
            buttonProps={{
              width: "60%",
              onPress: () => {
                setIsOpen(true);
              },
            }}
          >
            <Text fontSize="16" fontWeight="semibold" color="white">
              Adicionar sermão
            </Text>
          </ButtonDefault>
          <Stack alignItems="center">
            <Input
              onChangeText={(event) => setSearch(event)}
              borderRadius="8"
              w={{
                base: "60%",
                md: "25%",
              }}
              InputRightElement={
                <SearchIcon size={5} ml="2" color="black" marginRight="4" />
              }
              placeholder="Buscar por sermão..."
            />
          </Stack>

          <FlatList
            data={filteredSermons}
            keyExtractor={(item) => item.id}
            px={10}
            ItemSeparatorComponent={() => <View my={2} />}
            renderItem={({ item }) => (
              <SermonCard
                sermon={item}
                onClick={() => {
                  setSermon(item);
                  setIsOpenEditSermon(true);
                }}
                handleDelete={() => {
                  handleDelete(item);
                  getSermons();
                }}
              />
            )}
          />
        </VStack>
      </Box>
    </>
  );
};

export default Sermons;
