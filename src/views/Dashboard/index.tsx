import { Box } from "native-base";
import ButtonDefault from "../../components/button";
import { Header } from "../../components/Header";

interface DashboardProps {}

const Dashboard = ({}: DashboardProps) => {
  return (
    <Box w="100%" h="100%" bg="gray.200">
      <Header title="Menu pricipal" />
      <ButtonDefault
        text={"my Button"}
        width={"80%"}
        click={() => null}
      ></ButtonDefault>
    </Box>
  );
};

export default Dashboard;
