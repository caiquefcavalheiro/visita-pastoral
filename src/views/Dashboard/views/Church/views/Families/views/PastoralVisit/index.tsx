import { Box, Input, SearchIcon, Stack, Text, VStack } from "native-base";
import church from "../../../../../../../../assets/pastoralVisitImages/church.png";
import { Header } from "../../../../../../../../components/Header";
import ButtonDefault from "../../../../../../../../components/button";
import { CarouselComponent } from "../../../../../../../../components/Carousel";
import { ModalCreateChurch } from "../../../../components/ModalCreateChurch";
import { useEffect, useState } from "react";
import { useDatabaseConnection } from "../../../../../../../../database/connection";
import useChurchService from "../../../../../../../../database/services/churchService";
import { Church } from "../../../../../../../../database/entities/FamilieChurchPerson";

const PastoralVisit = ({ navigation }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [churchs, setChurchs] = useState([]);

  const { connection } = useDatabaseConnection();
  const Church = useChurchService(connection);

  useEffect(() => {
    const churchs = Church.getAll().then((response) =>
      setChurchs(response as any)
    );
  });

  const whenSelectChurch = (church: Church) => {
    navigation.navigate("Church" as never, { church });
  };

  return (
    <>
      <ModalCreateChurch
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
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
