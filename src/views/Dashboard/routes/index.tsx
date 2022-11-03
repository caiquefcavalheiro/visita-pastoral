import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { memo } from "react";
import Dashboard from "..";
import BaptismRecordRoutes from "../views/BaptismRecord/routes";
import ChurchRoutes from "../views/Church/routes";

const { Navigator, Screen } = createNativeStackNavigator();

function DashboardRoutes() {
  return (
    <Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Dashboard"
    >
      <Screen name="Dashboard" component={Dashboard} />
      <Screen name="BaptismRecordRoutes" component={BaptismRecordRoutes} />
      <Screen name="ChurchRoutes" component={ChurchRoutes} />
    </Navigator>
  );
}

export default memo(DashboardRoutes);
