import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { memo } from "react";
import Church from "..";
import PastoralVisit from "../../PastoralVisit";
import Families from "../views/Families";
import PastoralVisitQuestions from "../views/Families/views/PastoralVisit/PastoralVisitQuestions";
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
      <Screen
        name="PastoralVisitQuestions"
        component={PastoralVisitQuestions}
      />
      <Screen name="Positions" component={Positions} />
      <Screen
        name="PeopleAndTheirPositions"
        component={PeopleAndTheirPositions}
      />
    </Navigator>
  );
}

export default memo(ChurchRoutes);
