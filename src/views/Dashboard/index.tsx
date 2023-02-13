import { Box, Text, VStack } from "native-base";
import { Header } from "../../components/Header";
import ButtonDefault from "../../components/button";
import pastor from "../../assets/dashboardImages/pastor.png";
import fichaBatismo from "../../assets/dashboardImages/fichaBatismo.png";
import whatsapp from "../../assets/dashboardImages/whatsapp.png";
import { Linking } from "react-native";
import { memo } from "react";

function Dashboard({ navigation }: any) {
  return (
    <Box w="100%" h="100%" bg="gray.200">
      <Header title="Menu principal" />
      <VStack mt="54" space="54">
        <ButtonDefault
          buttonProps={{
            width: "80%",
            onPress: () => navigation.navigate("ChurchRoutes"),
          }}
          imageProps={{ source: pastor }}
        >
          <Text fontSize="20" fontWeight="semibold" color="white">
            Visita Pastoral
          </Text>
        </ButtonDefault>

        {/* **NOTE: Disabled Enable in the future */}

        {/* <ButtonDefault
          buttonProps={{
            width: "80%",
            onPress: () => navigation.navigate("BaptismRecordRoutes"),
          }}
          imageProps={{ source: fichaBatismo }}
        >
          <Text fontSize="20" fontWeight="semibold" color="white">
            Ficha de Batismo
          </Text>
        </ButtonDefault> */}

        <ButtonDefault
          buttonProps={{
            width: "80%",
            onPress: () => {
              Linking.openURL(
                "http://api.whatsapp.com/send?phone=556999161983"
              );
            },
          }}
          imageProps={{ source: whatsapp }}
        >
          <Text fontSize="20" fontWeight="semibold" color="white">
            Contato
          </Text>
        </ButtonDefault>
      </VStack>
    </Box>
  );
}
export default memo(Dashboard);
