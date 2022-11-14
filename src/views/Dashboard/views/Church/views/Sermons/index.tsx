import dayjs from "dayjs";
import { Box, Input, SearchIcon, Stack, Text, VStack } from "native-base";
import React, { Fragment, useEffect, useState } from "react";
import ButtonDefault from "../../../../../../components/button";
import { Header } from "../../../../../../components/Header";
import { useDatabaseConnection } from "../../../../../../database/connection";
import { SermonModel } from "../../../../../../database/entities/FamilieChurchPersonSermon";
import useSermonService from "../../../../../../database/services/sermonService";
import { ModalCreateSermon } from "./components/ModalCreateSermon";
import { ModalEditSermon } from "./components/ModalEditSermon";

interface SermonsProps {
  route: any;
}

const Sermons = ({ route }: SermonsProps) => {
  const { connection } = useDatabaseConnection();

  const sermonService = useSermonService(connection);

  const church = route?.params?.church;

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
          <Stack>
            <Box>
              {filteredSermons?.map((sermon) => {
                const formatDate = dayjs(sermon.createdAt).format("DD/MM/YYYY");
                return (
                  <React.Fragment key={sermon.id}>
                    <ButtonDefault
                      buttonProps={{
                        backgroundColor: "yellow.500",
                        minWidth: "300",
                        marginBottom: "2",
                        onPress: () => {
                          setSermon(sermon);
                          setIsOpenEditSermon(true);
                        },
                      }}
                    >
                      {sermon ? (
                        <Text fontSize="18">{`${formatDate} - ${sermon.name}`}</Text>
                      ) : null}
                    </ButtonDefault>
                  </React.Fragment>
                );
              })}
            </Box>
          </Stack>
        </VStack>
      </Box>
    </>
  );
};

export default Sermons;
