import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { memo } from "react";
import Church from "..";
import Families from "../views/Families";

const { Navigator, Screen } = createNativeStackNavigator();

function ChurchRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Church">
      <Screen name="Church" component={Church} />
      <Screen name="Families" component={Families} />
    </Navigator>
  );
}

export default memo(ChurchRoutes);
