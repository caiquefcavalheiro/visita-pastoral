import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { memo } from "react";
import Church from "..";
import PastoralVisit from "../views/Families/views/PastoralVisit";

const { Navigator, Screen } = createNativeStackNavigator();

function ChurchRoutes() {
  return (
    <Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="PatoralVisit"
    >
      <Screen name="PatoralVisit" component={PastoralVisit} />
      <Screen name="Church" component={Church} />
    </Navigator>
  );
}

export default memo(ChurchRoutes);
