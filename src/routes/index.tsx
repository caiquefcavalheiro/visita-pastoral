import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { memo } from "react";

import DashboardRoutes from "../views/Dashboard/routes";

const { Navigator, Screen } = createNativeStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="DashboardRoutes"
      >
        <Screen name="DashboardRoutes" component={DashboardRoutes} />
      </Navigator>
    </NavigationContainer>
  );
}

export default memo(Routes);
