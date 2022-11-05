import { Box, Input, SearchIcon, Stack, Text, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import church from "../../../../../../../../assets/pastoralVisitImages/church.png";
import { Header } from "../../../../../../../../components/Header";
import ButtonDefault from "../../../../../../../../components/button";
import { CarouselComponent } from "../../../../../../../../components/Carousel";
import { ModalCreateChurch } from "../../../../components/ModalCreateChurch";
import { useState } from "react";

const carouselItems = [
  {
    id: "01",
    title: "Item 1",
    text: "Text 1",
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Lake_Perris_Seventh-day_Adventist_Church.jpg/300px-Lake_Perris_Seventh-day_Adventist_Church.jpg",
  },
  {
    id: "02",
    title: "Item 2",
    text: "Text 2",
    image_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbKMn5w3XcvIdeR5W8QVYHE1ROn-s-1oYpVsgmYV6fCAAU4t7c1cepUuUIIjNvuFJP9p8&usqp=CAU",
  },
  {
    id: "03",
    title: "Item 3",
    text: "Text 3",
    image_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTi201E0et9ygIUd2aTICawZ7N7lx_6iDhd91PoYNC4tooZTbWbBGDOBLQn7qadDfDLPc&usqp=CAU",
  },
  {
    id: "04",
    title: "Item 4",
    text: "Text 4",
    image_url:
      "http://files.adventistas.org/noticias/pt/2016/09/22105002/iasd-nova-petropolis.png",
  },
  {
    id: "05",
    title: "Item 5",
    text: "Text 5",
    image_url:
      "http://files.adventistas.org/noticias/pt/2016/05/10121508/13184610_1086851998004498_672081997_o.png",
  },
];

const PastoralVisit = ({}: any) => {
  const { navigate } = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
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
          <CarouselComponent data={carouselItems} />
        </VStack>
      </Box>
    </>
  );
};

export default PastoralVisit;
