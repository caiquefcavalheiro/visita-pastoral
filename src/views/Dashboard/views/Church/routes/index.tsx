import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { memo } from "react";
import Church from "..";
import Families from "../views/Families";
import PastoralVisit from "../views/Families/views/PastoralVisit";
import PeopleAndTheirPositions from "../views/PeopleAndTheirPositions";
import Positions from "../views/Positions";

const { Navigator, Screen } = createNativeStackNavigator();

function ChurchRoutes() {
  return (
    <Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="PatoralVisit"
    >
      <Screen name="PatoralVisit" component={PastoralVisit} />
      <Screen name="Church" component={Church} />
      <Screen name="Families" component={Families} />
      <Screen name="Positions" component={Positions} />
      <Screen
        name="PeopleAndTheirPositions"
        component={PeopleAndTheirPositions}
      />
    </Navigator>
  );
}

export default memo(ChurchRoutes);
