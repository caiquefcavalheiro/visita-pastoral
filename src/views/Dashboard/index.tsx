import { Box, Text, VStack } from "native-base";
import { Header } from "../../components/Header";
import ButtonDefault from "../../components/button";

import pastor from "../../assets/dashboardImages/pastor.png";
import fichaBatismo from "../../assets/dashboardImages/fichaBatismo.png";
import whatsapp from "../../assets/dashboardImages/whatsapp.png";
import { useNavigation } from "@react-navigation/native";

interface DashboardProps {}

const Dashboard = ({}: DashboardProps) => {
  const { navigate } = useNavigation();

  return (
    <Box w="100%" h="100%" bg="gray.200">
      <Header title="Menu pricipal" />
      <VStack mt="54" space="54">
        <ButtonDefault
          buttonProps={{
            width: "80%",
          }}
          imageProps={{ source: pastor }}
        >
          <Text fontSize="20" fontWeight="semibold" color="white">
            Visita Pastoral
          </Text>
        </ButtonDefault>
        <ButtonDefault
          buttonProps={{
            width: "80%",
            onPress: () => {
              navigate("Signatures" as never);
            },
          }}
          imageProps={{ source: fichaBatismo }}
        >
          <Text fontSize="20" fontWeight="semibold" color="white">
            Ficha de Batismo
          </Text>
        </ButtonDefault>
        <ButtonDefault
          buttonProps={{
            width: "80%",
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
};

export default Dashboard;
