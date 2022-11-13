import dayjs from "dayjs";
import { Box, Input, SearchIcon, Stack, Text, VStack } from "native-base";
import React, { Fragment, useEffect, useState } from "react";
import ButtonDefault from "../../../../../../components/button";
import { Header } from "../../../../../../components/Header";
import { useDatabaseConnection } from "../../../../../../database/connection";
import { SermonModel } from "../../../../../../database/entities/FamilieChurchPersonSermon";
import useChurchService from "../../../../../../database/services/churchService";
import { ModalCreateSermon } from "./components/ModalCreateSermon";
import { ModalEditSermon } from "./components/ModalEditSermon";

interface SermonsProps {
  route: any;
}

const Sermons = ({ route }: SermonsProps) => {
  const { connection } = useDatabaseConnection();
  const Church = useChurchService(connection);

  const church = route?.params?.church;

  const [isOpen, setIsOpen] = useState(false);
  const [allSermons, setAllSermons] = useState(church.sermons as SermonModel[]);
  const [sermons, setSermons] = useState(church.sermons as SermonModel[]);

  const [sermon, setSermon] = useState({} as SermonModel);
  const [isOpenEditSermon, setIsOpenEditSermon] = useState(false);

  const getSermons = () => {
    Church.getOne(church.id).then((response) => {
      setAllSermons(response?.sermons as any);
      setSermons(response?.sermons as any);
    });
  };

  useEffect(() => {
    getSermons();
  }, []);

  const handleSearchInput = (input: string) => {
    const filterArray = allSermons.filter((sermon) => {
      return sermon.name.toLowerCase().includes(input.toLowerCase());
    });
    setSermons(filterArray);
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
              onChangeText={(event) => handleSearchInput(event)}
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
              {sermons
                ? sermons.map((sermon) => {
                    const formatDate = dayjs(sermon.createdAt).format(
                      "DD/MM/YYYY"
                    );
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
                  })
                : null}
            </Box>
          </Stack>
        </VStack>
      </Box>
    </>
  );
};

export default Sermons;
