import { Box, Input, SearchIcon, Stack, Text, VStack } from "native-base";
import church from "../../../../../../../../assets/pastoralVisitImages/church.png";
import { Header } from "../../../../../../../../components/Header";
import ButtonDefault from "../../../../../../../../components/button";
import { CarouselComponent } from "../../../../../../../../components/Carousel";
import { ModalCreateChurch } from "../../../../components/ModalCreateChurch";
import { useEffect, useState } from "react";
import { useDatabaseConnection } from "../../../../../../../../database/connection";
import useChurchService from "../../../../../../../../database/services/churchService";
import { Church } from "../../../../../../../../database/entities/FamilieChurchPersonSermon";

const PastoralVisit = ({ navigation, route }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [allChurchs, setAllChuchs] = useState([] as Church[]);
  const [churchs, setChurchs] = useState([] as Church[]);

  const { connection } = useDatabaseConnection();
  const Church = useChurchService(connection);

  const getChurchs = () => {
    Church.getAll().then((response) => {
      setAllChuchs(response as any);
      setChurchs(response as any);
    });
  };

  useEffect(() => {
    getChurchs();
  }, [route]);

  const whenSelectChurch = (church: Church) => {
    navigation.navigate("Church" as never, { church });
  };

  const handleSearchInput = (input: string) => {
    const filterArray = allChurchs.filter((church) => {
      return church.name.toLowerCase().includes(input.toLowerCase());
    });
    setChurchs(filterArray);
  };

  return (
    <>
      <ModalCreateChurch
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        handleAdd={getChurchs}
      />
      <Box w="100%" h="100%" bg="gray.200">
        <Header title="Visita Pastoral" path="Dashboard" />
        <VStack mt="54" space="54">
          <ButtonDefault
            buttonProps={{
              width: "80%",
              onPress: () => {
                setIsOpen(true);
              },
            }}
            imageProps={{
              source: church,
              width: "12",
              height: "12",
              size: "6",
            }}
          >
            <Text fontSize="16" fontWeight="semibold" color="white">
              Adicionar uma igreja
            </Text>
          </ButtonDefault>
          <Stack alignItems="center">
            <Input
              onChangeText={(event) => handleSearchInput(event)}
              borderRadius="8"
              w={{
                base: "70%",
                md: "25%",
              }}
              InputRightElement={
                <SearchIcon size={5} ml="2" color="black" marginRight="4" />
              }
              placeholder="Buscar uma igreja..."
            />
          </Stack>
          <CarouselComponent
            handleSelectCard={whenSelectChurch}
            data={churchs}
          />
        </VStack>
      </Box>
    </>
  );
};

export default PastoralVisit;
