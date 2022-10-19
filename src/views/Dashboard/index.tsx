import { Box } from "native-base";
import { Header } from "../../components/Header";

interface DashboardProps {}

const Dashboard = ({}: DashboardProps) => {
  return (
    <Box w="100%" h="100%" bg="gray.200">
      <Header title="Menu pricipal" />
    </Box>
  );
};

export default Dashboard;
